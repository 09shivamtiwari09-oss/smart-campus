import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Camera, 
  Volume2, 
  VolumeX,
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Eye, 
  FileCheck, 
  Sparkles, 
  Info, 
  ChevronRight, 
  ChevronLeft,
  Mic,
  Activity,
  Users,
  UserCheck,
  UserX,
  AlertOctagon,
  XCircle
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../i18n/LanguageContext';
import { apiService } from '../services/api';
import { ProctoredQuestion, ProctorIncident, TestResult } from '../types';

export const ProctoredTestPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { addToast } = useToast();
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastAudioIncidentRef = useRef<number>(0);

  const [questions, setQuestions] = useState<ProctoredQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Proctoring Telemetry State
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [faceStatus, setFaceStatus] = useState<'Normal' | 'Looking Away' | 'Multiple Faces'>('Normal');
  const [ambientDb, setAmbientDb] = useState(24);
  const [soundBars, setSoundBars] = useState<number[]>([15, 20, 25, 20, 15]);
  const [incidents, setIncidents] = useState<ProctorIncident[]>([]);
  const [timeLeftSec, setTimeLeftSec] = useState(900); // 15 mins

  // Multi-Person Camera Detection & Auto-Cancellation State
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [detectedBoxes, setDetectedBoxes] = useState<Array<{
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    label: string;
    conf?: number;
    isAnomaly?: boolean;
  }>>([
    { id: 'CANDIDATE', x: 25, y: 12, w: 50, h: 74, label: 'PERSON 01 (CANDIDATE)', conf: 98.4 }
  ]);
  const [warningCount, setWarningCount] = useState<number>(0); // 0 = clean, 1 = strike 1 warned, 2 = strike 2 triggered
  const [showWarning1Modal, setShowWarning1Modal] = useState<boolean>(false);
  const [isCancelling, setIsCancelling] = useState<boolean>(false);
  const [cancelCountdown, setCancelCountdown] = useState<number | null>(null);
  const [testCancelled, setTestCancelled] = useState<boolean>(false);

  // Sync refs for live async computer vision frame loops
  const warningCountRef = useRef<number>(0);
  warningCountRef.current = warningCount;
  const isCancellingRef = useRef<boolean>(false);
  isCancellingRef.current = isCancelling;
  const testCancelledRef = useRef<boolean>(false);
  testCancelledRef.current = testCancelled;
  const testSubmittedRef = useRef<boolean>(false);
  testSubmittedRef.current = testSubmitted;
  const lastPersonDetectionTimeRef = useRef<number>(0);
  const cooldownAfterWarning1Ref = useRef<number>(0);

  // Load questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProctoredQuestions();
        setQuestions(data);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // Timer Countdown
  useEffect(() => {
    if (testSubmitted || timeLeftSec <= 0) return;
    const timer = setInterval(() => {
      setTimeLeftSec((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [testSubmitted, timeLeftSec]);

  // Handle Automatic Live Acoustic Detection via Web Audio API
  const setupAudioAnalysis = useCallback((stream: MediaStream) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      // Resume context if suspended by browser autoplay policy
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.5;
      analyserRef.current = analyser;

      const audioTrack = stream.getAudioTracks()[0];
      if (!audioTrack) {
        setMicActive(false);
        return;
      }

      const source = audioCtx.createMediaStreamSource(new MediaStream([audioTrack]));
      source.connect(analyser);
      setMicActive(true);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkAudioLevel = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        // Compute average frequency power
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;

        // Map 0-255 average to realistic ambient room decibels (20 dB quiet room - 95 dB loud speech)
        let calculatedDb = 22;
        if (avg > 4) {
          calculatedDb = Math.min(95, Math.max(22, Math.round(20 + (avg / 255) * 140)));
        } else {
          // Micro ambient air hum jitter
          calculatedDb = 22 + Math.floor(Math.sin(Date.now() / 350) * 2);
        }

        setAmbientDb(calculatedDb);

        // Compute 5 visualizer wave heights
        const step = Math.floor(bufferLength / 5);
        const bars: number[] = [];
        for (let i = 0; i < 5; i++) {
          const sliceVal = dataArray[i * step] || 0;
          bars.push(Math.max(12, Math.min(100, Math.round((sliceVal / 255) * 100))));
        }
        setSoundBars(bars);

        // Automatic Anomaly Detection on Speech / Noise Threshold (>= 55 dB)
        if (calculatedDb >= 55) {
          const now = Date.now();
          // 7-second cooldown between auto incidents to prevent spamming
          if (now - lastAudioIncidentRef.current > 7000) {
            lastAudioIncidentRef.current = now;
            const incident: ProctorIncident = {
              id: `inc-a-${now}`,
              timestamp: new Date().toLocaleTimeString(),
              type: 'audio_anomaly',
              severity: 'medium',
              description: language === 'hi' 
                ? `लाइव माइक स्वतः संसूचक: परिवेशीय ध्वनि ${calculatedDb} dB पर पहुंची (बोलने/फुसफुसाहट की सीमा पार)।`
                : `Live Mic Auto-Detect: Acoustic sound reached ${calculatedDb} dB (human speech/whisper threshold exceeded).`,
            };
            setIncidents((prev) => [incident, ...prev]);
            addToast(
              'error',
              language === 'hi' ? 'ध्वनिक चेतावनी: आवाज़ का पता चला' : 'Acoustic Alert: Sound Detected',
              language === 'hi' 
                ? `माइक्रोफ़ोन ने ${calculatedDb} dB की आवाज़ रिकॉर्ड की। घटना लॉग की गई।`
                : `Microphone detected live sound of ${calculatedDb} dB. Incident logged into audit trail.`
            );
          }
        }

        animFrameRef.current = requestAnimationFrame(checkAudioLevel);
      };

      animFrameRef.current = requestAnimationFrame(checkAudioLevel);
    } catch (err) {
      console.warn('Audio analysis setup notice:', err);
      setMicActive(false);
    }
  }, [addToast, language]);

  // Request Combined Webcam & Real Microphone Stream
  useEffect(() => {
    let active = true;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: {
            echoCancellation: true,
            noiseSuppression: false,
            autoGainControl: true,
          },
        })
        .then((stream) => {
          if (!active) return;
          mediaStreamRef.current = stream;

          // Attach video element
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setCameraActive(true);
          }

          // Setup real-time audio analysis
          setupAudioAnalysis(stream);
        })
        .catch(() => {
          // If audio+video fails, try video only as fallback
          if (!active) return;
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((videoStream) => {
              if (!active) return;
              mediaStreamRef.current = videoStream;
              if (videoRef.current) {
                videoRef.current.srcObject = videoStream;
                setCameraActive(true);
              }
              setMicActive(false);
            })
            .catch(() => {
              if (active) {
                setCameraActive(false);
                setMicActive(false);
              }
            });
        });
    }

    // Fallback simulation timer if real mic is denied or unavailable
    const fallbackTimer = setInterval(() => {
      if (!micActive) {
        setAmbientDb((prev) => {
          const delta = (Math.random() - 0.5) * 4;
          return Math.max(20, Math.min(32, Math.round(prev + delta)));
        });
      }
    }, 800);

    return () => {
      active = false;
      clearInterval(fallbackTimer);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [setupAudioAnalysis, micActive]);

  // Window Focus / Tab Switching Trap
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !testSubmitted) {
        const incident: ProctorIncident = {
          id: `inc-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'tab_blur',
          severity: 'high',
          description: language === 'hi'
            ? 'ब्राउज़र टैब बदला गया या विंडो अनफोकस हुई। वेब खोज का प्रयास चिह्नित किया गया।'
            : 'Browser tab switched or window lost focus. Web search attempt flagged.',
        };
        setIncidents((prev) => [incident, ...prev]);
        addToast(
          'error',
          language === 'hi' ? 'प्रॉक्टर चेतावनी: टैब स्विच पकड़ा गया' : 'Proctor Warning: Tab Switch Detected',
          language === 'hi'
            ? 'शैक्षणिक सत्यनिष्ठा रिकॉर्ड में ब्राउज़र अनफ़ोकस घटना दर्ज की गई।'
            : 'Browser unfocus event logged in academic integrity record.'
        );
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [testSubmitted, addToast, language]);

  // Handle Option Select
  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  // Handle Automatic Cancellation on 2nd Strike
  const handleAutomaticCancellation = useCallback(() => {
    setIsCancelling(false);
    setCancelCountdown(null);
    setTestCancelled(true);
    setTestSubmitted(true);

    const cancelIncident: ProctorIncident = {
      id: `inc-cancel-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'video_anomaly',
      severity: 'high',
      description: language === 'hi'
        ? 'गंभीर प्रॉक्टर उल्लंघन (स्ट्राइक 2): कैमरे में पुनः 1 से अधिक व्यक्ति पाए जाने के कारण 3 सेकंड की उलटी गिनती के बाद परीक्षा स्वतः रद्द की गई और छात्र को शून्य अंक के साथ निष्कासित कर दिया गया।'
        : 'Critical Proctor Violation (Strike 2): Multiple persons repeatedly detected in camera frame. Assessment terminated in 3s and student debarred (Score: 0).'
    };

    setIncidents((prev) => [cancelIncident, ...prev]);

    const debarResult: TestResult = {
      testTitle: 'Continuous Proctoring Assessment (B.Tech Computer Science)',
      studentName: 'Aarav Sharma',
      studentId: 'STU-2026-CS-084',
      submittedAt: new Date().toLocaleTimeString(),
      academicScore: 0,
      maxAcademicScore: 100,
      academicPercentage: 0,
      integrityScore: 0,
      verdict: 'DISQUALIFIED / DEBARRED',
      incidents: [cancelIncident, ...incidents],
      honeypotQuestionsPresented: 1,
      honeypotFlagsTriggered: 1
    };
    setTestResult(debarResult);

    addToast(
      'error',
      language === 'hi' ? 'परीक्षा रद्द: शैक्षणिक निष्कासन' : 'Test Cancelled: Academic Debarment',
      language === 'hi'
        ? 'कैमरे में 1 से अधिक व्यक्ति पाए जाने पर परीक्षा 3 सेकंड में स्वतः रद्द कर दी गई।'
        : 'Assessment cancelled due to repeat multi-person camera detection.'
    );
  }, [addToast, incidents, language]);

  // Strike 2: 3-Second Cancellation Countdown Timer
  useEffect(() => {
    if (!isCancelling || cancelCountdown === null) return;

    if (cancelCountdown > 0) {
      const timer = setTimeout(() => {
        setCancelCountdown((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (cancelCountdown === 0) {
      handleAutomaticCancellation();
    }
  }, [isCancelling, cancelCountdown, handleAutomaticCancellation]);

  // Multi-Person Violation Dispatcher
  const handleMultiplePeopleDetected = useCallback((count: number) => {
    if (testSubmittedRef.current || testCancelledRef.current || isCancellingRef.current) return;

    const now = Date.now();
    if (now - lastPersonDetectionTimeRef.current < 1200) return;
    lastPersonDetectionTimeRef.current = now;

    const currentStrikes = warningCountRef.current;

    if (currentStrikes === 0) {
      // Strike 1: Show Warning 1 Modal
      setWarningCount(1);
      setShowWarning1Modal(true);
      cooldownAfterWarning1Ref.current = now + 3500; // 3.5s cooldown before strike 2 can activate

      const strike1Incident: ProctorIncident = {
        id: `inc-mp1-${now}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'video_anomaly',
        severity: 'high',
        description: language === 'hi'
          ? `कैमरा चेतावनी (स्ट्राइक 1 / 2): फ्रेम में ${count} व्यक्ति पाए गए! उम्मीदवार को अकेला रहना होगा। दोबारा व्यक्ति दिखने पर 3 सेकंड में परीक्षा रद्द हो जाएगी।`
          : `Camera Warning (Strike 1 / 2): ${count} persons detected in frame! Candidate must remain alone. Repeat violation will CANCEL test in 3 seconds.`
      };

      setIncidents((prev) => [strike1Incident, ...prev]);
      addToast(
        'error',
        language === 'hi' ? 'प्रॉक्टर चेतावनी: 1 से अधिक व्यक्ति!' : 'Proctor Warning: Multiple People in Frame!',
        language === 'hi' ? 'स्ट्राइक 1 जारी। दोबारा दिखने पर 3 सेकंड में परीक्षा रद्द होगी।' : 'Strike 1 issued. Next violation will terminate the exam in 3 seconds.'
      );
    } else if (currentStrikes >= 1) {
      // Strike 2: Immediate 3-Second Auto-Cancellation Countdown!
      if (now < cooldownAfterWarning1Ref.current) return;

      setWarningCount(2);
      setShowWarning1Modal(false);
      setIsCancelling(true);
      setCancelCountdown(3);

      const strike2Incident: ProctorIncident = {
        id: `inc-mp2-${now}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'video_anomaly',
        severity: 'high',
        description: language === 'hi'
          ? `गंभीर प्रॉक्टर उल्लंघन (स्ट्राइक 2 / 2): पुनः ${count} व्यक्ति पाए गए! 3 सेकंड में परीक्षा स्वतः रद्द की जा रही है।`
          : `Critical Violation (Strike 2 / 2): ${count} persons detected again! Auto-cancelling assessment in 3 seconds.`
      };

      setIncidents((prev) => [strike2Incident, ...prev]);
      addToast(
        'error',
        language === 'hi' ? 'गंभीर उल्लंघन: परीक्षा रद्द हो रही है!' : 'Critical Violation: Cancelling in 3s!',
        language === 'hi' ? 'कैमरे में दोबारा अन्य व्यक्ति दिखा। परीक्षा 3 सेकंड में स्वतः रद्द।' : 'Multiple persons detected again. Auto-terminating test.'
      );
    }
  }, [addToast, language]);

  // Real-Time Computer Vision Frame Analysis Loop
  useEffect(() => {
    if (!cameraActive || testSubmitted || testCancelled || isCancelling) return;

    let isMounted = true;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width = 160;
    canvas.height = 120;

    // Detect browser native FaceDetector if available (Chromium standard)
    const hasFaceDetector = typeof window !== 'undefined' && 'FaceDetector' in window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let nativeFaceDetector: any = null;
    if (hasFaceDetector) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nativeFaceDetector = new (window as any).FaceDetector({ fastMode: true, maxDetectedFaces: 5 });
      } catch {
        nativeFaceDetector = null;
      }
    }

    const interval = setInterval(async () => {
      if (!isMounted || !videoRef.current || videoRef.current.readyState < 2) return;

      try {
        let detectedCount = 1;
        let boxes: Array<{
          id: string;
          x: number;
          y: number;
          w: number;
          h: number;
          label: string;
          conf?: number;
          isAnomaly?: boolean;
        }> = [];

        if (nativeFaceDetector && videoRef.current) {
          try {
            const faces = await nativeFaceDetector.detect(videoRef.current);
            if (faces && faces.length > 0) {
              detectedCount = faces.length;
              const videoW = videoRef.current.videoWidth || 640;
              const videoH = videoRef.current.videoHeight || 480;

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              boxes = faces.map((face: any, idx: number) => {
                const b = face.boundingBox;
                const xPct = Math.max(5, Math.min(85, Math.round((b.x / videoW) * 100)));
                const yPct = Math.max(5, Math.min(85, Math.round((b.y / videoH) * 100)));
                const wPct = Math.max(15, Math.min(50, Math.round((b.width / videoW) * 100)));
                const hPct = Math.max(20, Math.min(60, Math.round((b.height / videoH) * 100)));

                return {
                  id: `FACE_${idx + 1}`,
                  x: xPct,
                  y: yPct,
                  w: wPct,
                  h: hPct,
                  label: idx === 0 ? 'PERSON 01 (CANDIDATE)' : `⚠️ PERSON 0${idx + 1} (UNAUTHORIZED)`,
                  conf: 98,
                  isAnomaly: idx > 0
                };
              });
            }
          } catch {
            // Fallback to canvas
          }
        }

        // Fast pixel skin-chrominance spatial clustering fallback
        if (boxes.length === 0 && ctx && videoRef.current) {
          ctx.drawImage(videoRef.current, 0, 0, 160, 120);
          const imgData = ctx.getImageData(0, 0, 160, 120).data;

          let leftSkinMass = 0;
          let rightSkinMass = 0;
          let centerSkinMass = 0;

          for (let y = 15; y < 95; y += 3) {
            for (let x = 15; x < 145; x += 3) {
              const idx = (y * 160 + x) * 4;
              const r = imgData[idx];
              const g = imgData[idx + 1];
              const b = imgData[idx + 2];

              // Skin chrominance test
              if (r > 60 && g > 40 && b > 20 && r > g && (r - g) > 10 && (r - b) > 10) {
                if (x < 65) leftSkinMass++;
                else if (x > 95) rightSkinMass++;
                else centerSkinMass++;
              }
            }
          }

          // If both left and right contain dense separated skin mass, detect 2 people
          if (leftSkinMass > 65 && rightSkinMass > 65) {
            detectedCount = 2;
            boxes = [
              { id: 'P1', x: 10, y: 14, w: 38, h: 72, label: 'PERSON 01 (CANDIDATE)', conf: 98.4, isAnomaly: false },
              { id: 'P2', x: 54, y: 14, w: 38, h: 72, label: '⚠️ PERSON 02 (UNAUTHORIZED)', conf: 94.2, isAnomaly: true }
            ];
          } else if (leftSkinMass > 45 || rightSkinMass > 45 || centerSkinMass > 45) {
            detectedCount = 1;
            boxes = [
              { id: 'P1', x: 26, y: 12, w: 48, h: 74, label: 'PERSON 01 (CANDIDATE)', conf: 98.4, isAnomaly: false }
            ];
          } else {
            detectedCount = 0;
            boxes = [];
          }
        }

        if (!isMounted) return;

        setPeopleCount(detectedCount);
        if (boxes.length > 0) {
          setDetectedBoxes(boxes);
        }

        if (detectedCount > 1) {
          setFaceStatus('Multiple Faces');
          handleMultiplePeopleDetected(detectedCount);
        } else if (detectedCount === 1) {
          setFaceStatus('Normal');
        } else {
          setFaceStatus('Looking Away');
        }
      } catch {
        // Ignored
      }
    }, 700);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [cameraActive, testSubmitted, testCancelled, isCancelling, handleMultiplePeopleDetected]);

  // Evaluator Simulation Handlers
  const simulatePersonCount = (count: number) => {
    if (testSubmitted || testCancelled || isCancelling) return;

    setPeopleCount(count);

    if (count > 1) {
      setFaceStatus('Multiple Faces');
      setDetectedBoxes([
        { id: 'P1', x: 10, y: 14, w: 38, h: 72, label: 'PERSON 01 (CANDIDATE)', conf: 98.4, isAnomaly: false },
        { id: 'P2', x: 54, y: 14, w: 38, h: 72, label: '⚠️ PERSON 02 (UNAUTHORIZED)', conf: 94.2, isAnomaly: true }
      ]);
      handleMultiplePeopleDetected(count);
    } else if (count === 1) {
      setFaceStatus('Normal');
      setDetectedBoxes([
        { id: 'P1', x: 26, y: 12, w: 48, h: 74, label: 'PERSON 01 (CANDIDATE)', conf: 98.4, isAnomaly: false }
      ]);
      addToast('info', 'Vision Reset', language === 'hi' ? 'कैमरा सामान्य: 1 व्यक्ति (उम्मीदवार)' : 'Vision Normal: 1 Person (Candidate)');
    } else {
      setFaceStatus('Looking Away');
      setDetectedBoxes([]);
      addToast('info', 'Vision Alert', language === 'hi' ? 'कोई व्यक्ति नहीं दिखा' : 'No face in frame');
    }
  };

  // Reset Assessment State for Retake / Demo Testing
  const handleResetAssessment = () => {
    setTestSubmitted(false);
    setTestCancelled(false);
    setIsCancelling(false);
    setCancelCountdown(null);
    setWarningCount(0);
    setShowWarning1Modal(false);
    setPeopleCount(1);
    setFaceStatus('Normal');
    setAnswers({});
    setIncidents([]);
    setCurrentIdx(0);
    setTimeLeftSec(900);
    setDetectedBoxes([
      { id: 'CANDIDATE', x: 25, y: 12, w: 50, h: 74, label: 'PERSON 01 (CANDIDATE)', conf: 98.4 }
    ]);
  };

  // Trigger Simulated Incidents for Demonstration
  const triggerSimulatedIncident = (type: 'video' | 'audio' | 'honeypot') => {
    let incident: ProctorIncident;
    const ts = new Date().toLocaleTimeString();

    if (type === 'video') {
      const nextStatus = faceStatus === 'Normal' ? 'Looking Away' : 'Multiple Faces';
      setFaceStatus(nextStatus);
      incident = {
        id: `inc-v-${Date.now()}`,
        timestamp: ts,
        type: 'video_anomaly',
        severity: 'medium',
        description: `Facial Mesh Anomaly: Candidate detected as ${nextStatus}.`,
      };
      addToast('info', 'Vision Alert', incident.description);
    } else if (type === 'audio') {
      const spikeDb = Math.floor(Math.random() * 25) + 68;
      setAmbientDb(spikeDb);
      incident = {
        id: `inc-a-${Date.now()}`,
        timestamp: ts,
        type: 'audio_anomaly',
        severity: 'medium',
        description: `Manual Acoustic Test: Sound spike simulated at ${spikeDb} dB.`,
      };
      addToast('info', 'Acoustic Alert', incident.description);
    } else {
      incident = {
        id: `inc-h-${Date.now()}`,
        timestamp: ts,
        type: 'honeypot_trap',
        severity: 'high',
        description: 'Out-of-syllabus canary question answered with exact web query signature. Probable LLM copypasta.',
      };
      addToast('error', 'Honeypot Trap Triggered', incident.description);
    }

    setIncidents((prev) => [incident, ...prev]);
  };

  // Submit Test
  const handleSubmitTest = async () => {
    try {
      const result = await apiService.submitProctoredTest({ answers, incidents });
      setTestResult(result);
      setTestSubmitted(true);
      addToast(
        'success',
        language === 'hi' ? 'परीक्षा सफलतापूर्वक सबमिट की गई' : 'Test Submitted Successfully',
        `Score: ${result.academicScore}/${result.maxAcademicScore} • Integrity: ${result.integrityScore}%`
      );
    } catch {
      addToast('error', 'Submission Failed', 'Could not sync answers with evaluation server.');
    }
  };

  const currentQ = questions[currentIdx];
  const minutes = Math.floor(timeLeftSec / 60);
  const seconds = timeLeftSec % 60;

  return (
    <PageContainer
      title={t.proctor.pageTitle}
      subtitle={t.proctor.pageSubtitle}
      badge={
        <span className="text-2xs font-mono bg-[#1e1526] text-[#147b37] border border-[#147b37]/30 px-3 py-1 rounded-full font-bold">
          {language === 'hi' ? 'सक्रिय प्रॉक्टरिंग सत्र' : 'Active Proctoring Session'}
        </span>
      }
      action={
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1e1526] border border-white/10 font-mono text-xs text-white">
            <Clock className="w-4 h-4 text-[#b78ce0]" />
            <span className="font-bold">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>

          {!testSubmitted && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmitTest}
              leftIcon={<FileCheck className="w-4 h-4" />}
            >
              {t.proctor.submitTest}
            </Button>
          )}
        </div>
      }
    >
      <SEO
        title="Anti-Cheating Proctored Assessment"
        description="Comprehensive anti-cheating test engine with webcam tracking, live auto acoustic microphone detection, and canary traps."
      />

      {/* Proctoring Multi-Modal Live Sensor Strip in OCTA Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sensor 1: Computer Vision & Multi-Person Detector */}
        <div className={`p-4 rounded-[20px] border flex items-center justify-between text-[#1e1526] transition-all ${
          peopleCount > 1 
            ? 'bg-[#ad3568]/15 border-[#ad3568]' 
            : 'bg-[#eee3f7] border-[#d9bef0]'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              peopleCount > 1
                ? 'bg-[#ad3568]/20 text-[#ad3568] animate-pulse'
                : faceStatus === 'Normal' 
                ? 'bg-[#147b37]/15 text-[#147b37]' 
                : 'bg-amber-500/20 text-amber-700'
            }`}>
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xs uppercase text-[#57495f] font-bold block">{t.proctor.visionSensor}</span>
                {warningCount > 0 && (
                  <span className="text-3xs font-mono font-bold px-1.5 py-0.5 rounded bg-[#ad3568] text-white animate-pulse">
                    Strike {warningCount}/2
                  </span>
                )}
              </div>
              <strong className={`text-xs font-extrabold ${
                peopleCount > 1 ? 'text-[#ad3568]' : faceStatus === 'Normal' ? 'text-[#147b37]' : 'text-amber-800'
              }`}>
                {peopleCount > 1 
                  ? `${peopleCount} ${language === 'hi' ? 'व्यक्ति (उल्लंघन!)' : 'Persons (Violation!)'}` 
                  : faceStatus === 'Normal' 
                  ? t.proctor.faceCentered 
                  : (language === 'hi' ? 'चेहरा फ्रेम से बाहर' : faceStatus)}
              </strong>
            </div>
          </div>
          <button
            onClick={() => simulatePersonCount(peopleCount > 1 ? 1 : 2)}
            className="text-2xs text-[#7c4bb0] hover:underline font-bold px-2 py-1 rounded bg-white/60 border border-[#d9bef0]"
            title="Toggle multi-person simulation"
          >
            {peopleCount > 1 ? '[Reset Solo]' : '[Simulate +1 Person]'}
          </button>
        </div>

        {/* Sensor 2: Automatic Live Acoustic Sound Sensor */}
        <div className={`p-4 rounded-[20px] border flex items-center justify-between text-[#1e1526] transition-all ${
          ambientDb >= 55 ? 'bg-[#ad3568]/15 border-[#ad3568]' : 'bg-[#eee3f7] border-[#d9bef0]'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              ambientDb >= 55 
                ? 'bg-[#ad3568]/20 text-[#ad3568] animate-bounce' 
                : ambientDb >= 45 
                ? 'bg-amber-500/20 text-amber-700' 
                : 'bg-[#7c4bb0]/15 text-[#7c4bb0]'
            }`}>
              {micActive ? <Mic className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xs uppercase text-[#57495f] font-bold block">{t.proctor.acousticSensor}</span>
                {micActive && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#147b37] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#147b37]" />
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 mt-0.5">
                <strong className={`text-xs font-mono font-extrabold ${
                  ambientDb >= 55 ? 'text-[#ad3568]' : ambientDb >= 45 ? 'text-amber-800' : 'text-[#1e1526]'
                }`}>
                  {ambientDb} dB
                </strong>
                <span className={`text-3xs font-bold px-1.5 py-0.5 rounded ${
                  ambientDb >= 55 ? 'bg-[#ad3568] text-white' : 'bg-white/80 text-[#57495f]'
                }`}>
                  {ambientDb < 45 
                    ? (language === 'hi' ? 'शांत / अनुमत' : 'Silent / Permitted') 
                    : ambientDb < 55 
                    ? (language === 'hi' ? 'चेतावनी स्तर' : 'Caution Level') 
                    : (language === 'hi' ? 'आवाज़ स्पाइक अलर्ट!' : 'Voice Spike Alert!')}
                </span>
              </div>

              {/* Live Audio Equalizer Waveform */}
              <div className="flex items-end gap-1 mt-1.5 h-3">
                {soundBars.map((height, i) => (
                  <span
                    key={i}
                    style={{ height: `${Math.max(4, (height / 100) * 12)}px` }}
                    className={`w-1 rounded-full transition-all duration-75 ${
                      ambientDb >= 55 ? 'bg-[#ad3568]' : 'bg-[#7c4bb0]'
                    }`}
                  />
                ))}
                <span className="text-3xs font-mono text-[#57495f] ml-1">
                  {micActive ? (language === 'hi' ? 'ऑटो लाइव' : 'Auto Live') : (language === 'hi' ? 'सिम्युलेटेड' : 'Simulated')}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => triggerSimulatedIncident('audio')}
            className="text-2xs text-[#7c4bb0] hover:underline font-bold self-start mt-1"
            title="Simulate high decibel voice spike"
          >
            [Test Audio]
          </button>
        </div>

        {/* Sensor 3: Honeypot Web/AI Bot Trap Status */}
        <div className="bg-[#eee3f7] p-4 rounded-[20px] border border-[#d9bef0] flex items-center justify-between text-[#1e1526]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#7c4bb0]/15 text-[#7c4bb0]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xs uppercase text-[#57495f] font-bold block">{t.proctor.honeypotSensor}</span>
              <strong className="text-xs font-extrabold text-[#7c4bb0]">
                {language === 'hi' ? '2 कैनरी सक्रिय (0 अंक)' : '2 Canaries Active (0 Marks)'}
              </strong>
            </div>
          </div>
          <button
            onClick={() => triggerSimulatedIncident('honeypot')}
            className="text-2xs text-[#7c4bb0] hover:underline font-bold"
            title="Simulate event for live testing"
          >
            [Test Bot Trap]
          </button>
        </div>
      </div>

      {!testSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Question Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {currentQ && (
              <Card>
                <div className="flex items-center justify-between pb-4 border-b border-[#d9bef0]/60">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-[#1e1526] text-white">
                      Q{currentIdx + 1} of {questions.length}
                    </span>
                    <span className="text-xs font-bold text-[#57495f]">
                      {currentQ.category}
                    </span>
                  </div>

                  {currentQ.isHoneypot ? (
                    <span className="inline-flex items-center gap-1.5 text-2xs font-extrabold text-[#7c4bb0] bg-[#7c4bb0]/15 border border-[#7c4bb0]/35 px-3 py-1 rounded-full">
                      <Sparkles className="w-3 h-3 text-[#7c4bb0]" />
                      {t.proctor.canaryAlert}
                    </span>
                  ) : (
                    <span className="text-xs font-mono font-extrabold text-[#147b37] bg-[#147b37]/15 px-3 py-1 rounded-full border border-[#147b37]/35">
                      {currentQ.marks} {language === 'hi' ? 'अंक' : 'Marks'}
                    </span>
                  )}
                </div>

                {/* Honeypot Trap Explanation Callout */}
                {currentQ.isHoneypot && (
                  <div className="mt-4 p-4 rounded-xl bg-[#7c4bb0]/15 border border-[#7c4bb0]/35 text-xs text-[#1e1526] space-y-1">
                    <p className="font-extrabold flex items-center gap-1.5 text-[#7c4bb0]">
                      <Info className="w-4 h-4 text-[#7c4bb0]" />
                      {language === 'hi' ? 'एंटी-चीट विशेषता: आउट-ऑफ़-सिलेबस हनीपॉट' : 'Anti-Cheat Feature: Out-of-Syllabus Honeypot'}
                    </p>
                    <p className="text-2xs text-[#57495f] leading-relaxed">
                      {currentQ.trapExplanation}
                    </p>
                  </div>
                )}

                {/* Question Body */}
                <div className="py-6">
                  <h3 className="text-base sm:text-lg font-extrabold text-[#1e1526] leading-relaxed">
                    {currentQ.questionText}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3 mt-6">
                    {currentQ.options.map((opt, optIdx) => {
                      const isSelected = answers[currentQ.id] === optIdx;

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectOption(currentQ.id, optIdx)}
                          className={`p-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-start gap-3.5 ${
                            isSelected
                              ? 'bg-[#7c4bb0]/15 border-2 border-[#7c4bb0] text-[#1e1526] shadow-sm'
                              : 'bg-white/80 border-[#d9bef0] hover:bg-white text-[#1e1526]'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-extrabold shrink-0 mt-0.5 ${
                              isSelected
                                ? 'bg-[#7c4bb0] text-white'
                                : 'bg-[#1e1526] text-white'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1 leading-relaxed">{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-[#d9bef0]/60">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentIdx === 0}
                    onClick={() => setCurrentIdx((prev) => Math.max(prev - 1, 0))}
                    leftIcon={<ChevronLeft className="w-4 h-4" />}
                  >
                    {language === 'hi' ? 'पिछला' : 'Previous'}
                  </Button>

                  <div className="flex items-center gap-1.5">
                    {questions.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIdx(i)}
                        className={`w-7 h-7 rounded-lg text-2xs font-mono font-extrabold transition-all ${
                          i === currentIdx
                            ? 'bg-[#7c4bb0] text-white shadow-sm'
                            : answers[questions[i]?.id] !== undefined
                            ? 'bg-[#147b37]/20 text-[#147b37] border border-[#147b37]/40'
                            : 'bg-[#f6eefb] text-[#57495f] border border-[#d9bef0]'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    disabled={currentIdx === questions.length - 1}
                    onClick={() => setCurrentIdx((prev) => Math.min(prev + 1, questions.length - 1))}
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                  >
                    {language === 'hi' ? 'अगला' : 'Next'}
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column: Live Video Monitor & Telemetry Incident Feed */}
          <div className="lg:col-span-4 space-y-6">
            {/* Live Camera Stream with Multi-Person Detection */}
            <Card variant="dark" noPadding className="overflow-hidden border-2 border-white/10 shadow-lg">
              <div className="p-3.5 bg-[#16111e] text-white flex items-center justify-between text-xs border-b border-white/10">
                <span className="font-extrabold flex items-center gap-2 text-[#b78ce0]">
                  <span className={`w-2.5 h-2.5 rounded-full ${peopleCount > 1 ? 'bg-[#ff3366] animate-ping' : 'bg-[#147b37]'}`} />
                  {language === 'hi' ? 'प्रॉक्टर कैमरा विजन' : 'Proctor Cam Vision Stream'}
                </span>

                {/* Real-time People Counter Badge */}
                <div className="flex items-center gap-2">
                  <span className={`text-2xs font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    peopleCount > 1 
                      ? 'bg-[#ad3568] text-white animate-pulse' 
                      : peopleCount === 1 
                      ? 'bg-[#147b37]/30 text-[#147b37] border border-[#147b37]/40' 
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  }`}>
                    <Users className="w-3 h-3" />
                    <span>
                      {peopleCount} {peopleCount === 1 ? (language === 'hi' ? 'व्यक्ति' : 'Person') : (language === 'hi' ? 'लोग' : 'People')}
                    </span>
                  </span>
                  <span className="text-2xs font-mono text-[#aaa1b2]">30 FPS</span>
                </div>
              </div>

              <div className="relative aspect-video bg-[#0b0a0c] flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${cameraActive ? '' : 'hidden'}`}
                />

                {!cameraActive && (
                  <div className="text-center p-4 text-[#aaa1b2] space-y-2">
                    <Camera className="w-10 h-10 mx-auto text-[#7c4bb0] animate-pulse" />
                    <p className="text-2xs">{language === 'hi' ? 'वेबकैम फीड सक्रिय' : 'Camera Feed Active'}</p>
                    <span className="text-3xs font-mono text-[#147b37] block bg-[#1e1526] px-2.5 py-1 rounded-full border border-white/10 font-bold">
                      {language === 'hi' ? 'एआई बहु-व्यक्ति संसूचक तैयार' : 'AI Multi-Person Vision Ready'}
                    </span>
                  </div>
                )}

                {/* Dynamic AI Facial & Person Bounding Box Overlays */}
                {detectedBoxes.map((box) => (
                  <div
                    key={box.id}
                    className={`absolute rounded-xl pointer-events-none transition-all duration-300 flex flex-col justify-between p-2 text-3xs font-mono font-bold ${
                      box.isAnomaly 
                        ? 'border-2 border-[#ff3366] bg-[#ff3366]/10 text-[#ff3366] shadow-[0_0_15px_rgba(255,51,102,0.5)] animate-pulse' 
                        : 'border-2 border-[#147b37] bg-[#147b37]/10 text-[#147b37] shadow-[0_0_10px_rgba(20,123,55,0.3)]'
                    }`}
                    style={{
                      left: `${box.x}%`,
                      top: `${box.y}%`,
                      width: `${box.w}%`,
                      height: `${box.h}%`
                    }}
                  >
                    <div className="flex justify-between items-center bg-black/60 px-1.5 py-0.5 rounded">
                      <span className="truncate">{box.label}</span>
                      <span>CONF: {box.conf || 98}%</span>
                    </div>
                    <div className="flex justify-between items-center bg-black/60 px-1.5 py-0.5 rounded">
                      <span>{box.isAnomaly ? 'VIOLATION DETECTED' : 'SOLO VERIFIED'}</span>
                      <span>{box.isAnomaly ? `STRIKE ${warningCount}` : 'OK'}</span>
                    </div>
                  </div>
                ))}

                {/* If 0 people detected */}
                {peopleCount === 0 && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4">
                    <div className="bg-[#1e1526] border border-amber-500/50 p-4 rounded-xl text-center text-amber-400 space-y-1">
                      <UserX className="w-8 h-8 mx-auto" />
                      <p className="text-xs font-bold">{t.proctor.noFaceDetected}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Status and Strike Indicators */}
              <div className="p-3 bg-[#1e1526] border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-2xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#aaa1b2] font-semibold">{t.proctor.multiPersonTitle}:</span>
                    <strong className={`font-bold ${peopleCount > 1 ? 'text-[#ff3366]' : 'text-[#147b37]'}`}>
                      {peopleCount > 1 
                        ? `${peopleCount} ${language === 'hi' ? 'लोग (उल्लंघन!)' : 'People (Violation!)'}` 
                        : (language === 'hi' ? '1 व्यक्ति (अनुपालन में)' : '1 Person (Compliant)')}
                    </strong>
                  </div>

                  {/* Warning Strikes Badge */}
                  <div className="flex items-center gap-1 font-mono text-3xs font-extrabold">
                    <span className="text-[#aaa1b2]">{language === 'hi' ? 'स्ट्राइक:' : 'Strikes:'}</span>
                    <span className={`px-2 py-0.5 rounded-full ${
                      warningCount === 0 
                        ? 'bg-[#147b37]/20 text-[#147b37] border border-[#147b37]/30' 
                        : warningCount === 1 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse' 
                        : 'bg-[#ad3568] text-white'
                    }`}>
                      {warningCount} / 2 {warningCount === 1 ? (language === 'hi' ? '(अंतिम चेतावनी)' : '(Final Warning)') : ''}
                    </span>
                  </div>
                </div>

                {/* Evaluator Simulation Toolbar */}
                <div className="pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-3xs uppercase tracking-wider text-[#aaa1b2] font-mono font-bold">
                      {language === 'hi' ? 'परीक्षक सिमुलेशन परीक्षण' : 'Evaluator Quick Triggers:'}
                    </span>
                    {warningCount > 0 && (
                      <button
                        onClick={() => {
                          setWarningCount(0);
                          setShowWarning1Modal(false);
                          addToast('info', 'Strikes Reset', 'Proctor strikes cleared to 0.');
                        }}
                        className="text-3xs text-[#b78ce0] hover:underline font-mono"
                      >
                        [{language === 'hi' ? 'स्ट्राइक रीसेट' : 'Reset Strikes'}]
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-3xs font-mono font-bold">
                    <button
                      onClick={() => simulatePersonCount(2)}
                      className="px-2 py-1.5 rounded-lg bg-[#ad3568]/20 border border-[#ad3568]/50 text-[#ff7090] hover:bg-[#ad3568]/30 transition-all flex items-center justify-center gap-1"
                      title="Trigger Strike 1 or Strike 2 cancellation"
                    >
                      <Users className="w-3 h-3 shrink-0" />
                      <span>{t.proctor.simMultipleBtn}</span>
                    </button>

                    <button
                      onClick={() => simulatePersonCount(1)}
                      className="px-2 py-1.5 rounded-lg bg-[#147b37]/20 border border-[#147b37]/50 text-[#68d391] hover:bg-[#147b37]/30 transition-all flex items-center justify-center gap-1"
                    >
                      <UserCheck className="w-3 h-3 shrink-0" />
                      <span>{t.proctor.simSoloBtn}</span>
                    </button>

                    <button
                      onClick={() => simulatePersonCount(0)}
                      className="px-2 py-1.5 rounded-lg bg-white/5 border border-white/15 text-[#aaa1b2] hover:bg-white/10 transition-all flex items-center justify-center gap-1"
                    >
                      <UserX className="w-3 h-3 shrink-0" />
                      <span>{t.proctor.simNoFaceBtn}</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Live Incident Log Drawer */}
            <Card>
              <CardHeader
                title={t.proctor.auditTrailTitle}
                subtitle={language === 'hi' ? 'संकाय सत्यापन हेतु वास्तविक समय में दर्ज घटनाएं' : 'Real-time chronological events recorded for faculty audit'}
              />

              <div className="pt-3 space-y-2 max-h-56 overflow-y-auto custom-scrollbar">
                {incidents.length === 0 ? (
                  <p className="text-2xs text-[#147b37] bg-[#147b37]/15 p-3 rounded-xl border border-[#147b37]/35 font-bold">
                    {t.proctor.zeroIncidents}
                  </p>
                ) : (
                  incidents.map((inc) => (
                    <div
                      key={inc.id}
                      className="p-3 rounded-xl border border-[#ad3568]/35 bg-[#ad3568]/15 text-2xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-mono font-bold text-[#ad3568]">
                        <span>{inc.type.toUpperCase()}</span>
                        <span>{inc.timestamp}</span>
                      </div>
                      <p className="text-[#1e1526] leading-tight font-medium">{inc.description}</p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      ) : testResult ? (
        /* Post Submission Results View */
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="text-center p-8 sm:p-10 space-y-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-md ${
              testCancelled 
                ? 'bg-[#ad3568]/15 text-[#ad3568] border border-[#ad3568]/40 animate-pulse' 
                : 'bg-[#147b37]/15 text-[#147b37] border border-[#147b37]/35'
            }`}>
              {testCancelled ? <ShieldAlert className="w-8 h-8" /> : <FileCheck className="w-8 h-8" />}
            </div>

            <div>
              <span className={`text-xs font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full ${
                testCancelled 
                  ? 'bg-[#ad3568] text-white' 
                  : 'bg-[#1e1526] text-[#b78ce0] border border-white/10'
              }`}>
                {testCancelled ? t.proctor.testCancelledTitle : t.proctor.examCompleted}
              </span>
              <h2 className="text-2xl font-extrabold text-[#1e1526] mt-2 font-heading">
                {testResult.testTitle}
              </h2>
              <p className="text-xs text-[#57495f] mt-1">
                {testResult.studentName} ({testResult.studentId}) • {testResult.submittedAt}
              </p>
            </div>

            {/* Test Cancelled Debarment Banner if Auto-Terminated */}
            {testCancelled && (
              <div className="p-5 rounded-2xl bg-[#ad3568]/15 border-2 border-[#ad3568] text-left space-y-3">
                <div className="flex items-center gap-2 text-[#ad3568]">
                  <AlertOctagon className="w-5 h-5 shrink-0" />
                  <strong className="text-sm font-bold uppercase font-heading">
                    {language === 'hi' ? 'परीक्षा स्वतः रद्द - शैक्षणिक कदाचार' : 'Automatic Test Cancellation - Academic Debarment'}
                  </strong>
                </div>
                <p className="text-xs text-[#1e1526] leading-relaxed font-medium">
                  {t.proctor.testCancelledDebarment}
                </p>
                <div className="p-3 bg-white/90 rounded-xl border border-[#ad3568]/30 font-mono text-3xs text-[#ad3568] space-y-0.5">
                  <div>• {language === 'hi' ? 'उल्लंघन: कैमरे में बार-बार 1 से अधिक व्यक्ति की पहचान (स्ट्राइक 2 / 2)' : 'VIOLATION: Multiple persons detected in camera frame twice (Strike 2 / 2)'}</div>
                  <div>• {language === 'hi' ? 'प्रोटोकॉल: 3 सेकंड आपातकालीन उलटी गिनती के पश्चात परीक्षा स्वतः रद्द' : 'PROTOCOL: Auto-terminated following 3-second countdown emergency sequence'}</div>
                  <div>• {language === 'hi' ? 'निर्णय: अयोग्य / अकादमिक अंक शून्य दर्ज' : 'VERDICT: Debarred / Zero marks assigned'}</div>
                </div>
              </div>
            )}

            {/* Score & Integrity Dual Score Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-2">
              <div className="bg-[#f6eefb] p-5 rounded-[20px] border border-[#d9bef0]">
                <span className="text-2xs uppercase text-[#57495f] font-bold block">{t.proctor.academicScore}</span>
                <span className={`text-4xl font-extrabold font-mono mt-1 block ${testCancelled ? 'text-[#ad3568]' : 'text-[#1e1526]'}`}>
                  {testResult.academicScore} <span className="text-base text-[#6f6178]">/ {testResult.maxAcademicScore}</span>
                </span>
                <span className={`text-xs font-bold block mt-1 ${testCancelled ? 'text-[#ad3568]' : 'text-[#147b37]'}`}>
                  {testResult.academicPercentage}% {testCancelled ? (language === 'hi' ? 'रद्द / निष्कासित' : 'Voided') : 'Academic Marks'}
                </span>
                <span className="text-3xs text-[#6f6178] mt-0.5 block">
                  {language === 'hi' ? '(कैनरी हनीपॉट अंक बहिष्कृत)' : '(Canary Honeypot Marks Excluded)'}
                </span>
              </div>

              <div className="bg-[#f6eefb] p-5 rounded-[20px] border border-[#d9bef0]">
                <span className="text-2xs uppercase text-[#57495f] font-bold block">{t.proctor.integrityIndex}</span>
                <span className={`text-4xl font-extrabold font-mono mt-1 block ${testCancelled ? 'text-[#ad3568]' : 'text-[#7c4bb0]'}`}>
                  {testResult.integrityScore}%
                </span>
                <span className="text-xs font-bold text-[#1e1526] block mt-1">
                  Status: {testResult.verdict}
                </span>
                <span className="text-3xs text-[#6f6178] mt-0.5 block">
                  {testResult.incidents.length} {language === 'hi' ? 'विसंगतियाँ दर्ज की गईं' : 'anomalies logged'}
                </span>
              </div>
            </div>

            {/* Honeypot Canary Summary */}
            <div className="p-4 rounded-xl bg-[#7c4bb0]/15 border border-[#7c4bb0]/35 text-xs text-[#1e1526] text-left max-w-lg mx-auto space-y-1">
              <strong className="block font-bold text-[#7c4bb0]">{t.proctor.honeypotAuditTitle}</strong>
              <p className="leading-relaxed text-[#57495f]">
                {language === 'hi' 
                  ? `${testResult.honeypotQuestionsPresented} कैनरी ट्रैप प्रश्न पेपर में जोड़े गए थे ताकि निष्पक्ष समस्या-समाधान की पुष्टि की जा सके। ये प्रश्न 0 अकादमिक अंक वहन करते हैं और एलएलएम बॉट चीटिंग से रक्षा करते हैं।`
                  : `${testResult.honeypotQuestionsPresented} canary trap questions were mixed into the paper to verify unassisted problem solving. These questions carry 0 academic weight and protect against LLM bot copying.`}
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <Button
                variant="outline"
                size="md"
                onClick={handleResetAssessment}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                {t.proctor.retakeBtn}
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => window.location.href = '/student'}
              >
                {t.proctor.returnHub}
              </Button>
            </div>
          </Card>
        </div>
      ) : null}

      {/* Strike 1 Warning Modal */}
      {showWarning1Modal && !testSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-[#1e1526] border-2 border-amber-500 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl relative space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="text-center space-y-2">
              <span className="text-3xs uppercase tracking-widest font-mono font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {language === 'hi' ? 'चेतावनी स्ट्राइक 1 / 2' : 'Warning Strike 1 of 2'}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white font-heading">
                {t.proctor.multiPersonWarning1Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#d9bef0] leading-relaxed">
                {t.proctor.multiPersonWarning1Desc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1">
              <strong className="block font-bold">
                {language === 'hi' ? '⚠️ सख्त शैक्षणिक निर्देश:' : '⚠️ Strict Examination Protocol:'}
              </strong>
              <p className="leading-tight text-3xs sm:text-2xs text-[#d9bef0]">
                {language === 'hi' 
                  ? 'यदि आपके कैमरे में पुनः कोई अन्य व्यक्ति दिखाई देता है, तो सिस्टम 3 सेकंड की उलटी गिनती शुरू करेगा और परीक्षा को शून्य अंक के साथ स्वतः रद्द कर देगा।' 
                  : 'If another person appears in your camera frame again, the AI proctor will initiate a 3-second countdown and permanently CANCEL this assessment.'}
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setShowWarning1Modal(false);
                  simulatePersonCount(1);
                }}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                {t.proctor.acknowledgedBtn}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Strike 2 Critical 3-Second Cancellation Countdown Overlay */}
      {isCancelling && cancelCountdown !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-[#1a0a14] border-4 border-[#ff3366] rounded-3xl max-w-lg w-full p-6 sm:p-10 text-white shadow-[0_0_60px_rgba(255,51,102,0.6)] text-center relative space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-[#ff3366]/20 text-[#ff3366] border-2 border-[#ff3366] flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <ShieldAlert className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-mono font-black px-4 py-1.5 rounded-full bg-[#ff3366] text-white inline-block shadow-md">
                {language === 'hi' ? '🚨 गंभीर उल्लंघन - स्ट्राइक 2 / 2' : '🚨 CRITICAL VIOLATION - STRIKE 2 / 2'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                {t.proctor.multiPersonCancelTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#ff99af] max-w-md mx-auto">
                {t.proctor.multiPersonCancelDesc}
              </p>
            </div>

            {/* Huge Pulsing Countdown Display */}
            <div className="py-2">
              <span className="text-3xs font-mono uppercase tracking-widest text-[#aaa1b2] block mb-1">
                {t.proctor.cancelCountdownText}
              </span>
              <div className="text-8xl sm:text-9xl font-mono font-black text-[#ff3366] leading-none animate-pulse drop-shadow-[0_0_30px_rgba(255,51,102,0.8)]">
                {cancelCountdown}
              </div>
              <span className="text-xs font-mono text-[#ff99af] font-bold block mt-2">
                {language === 'hi' ? 'सेकंड शेष' : 'seconds remaining'}
              </span>
            </div>

            {/* Shrinking Progress Bar */}
            <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-[#ff3366] transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${(cancelCountdown / 3) * 100}%` }}
              />
            </div>

            <p className="text-3xs text-[#aaa1b2] font-mono">
              {language === 'hi' 
                ? 'शैक्षणिक सत्यनिष्ठा सुरक्षा प्रोटोकॉल: ऑटो-टर्मिनेशन प्रक्रिया प्रगति पर है।' 
                : 'Academic Integrity Debarment Protocol Active: Auto-termination in progress.'}
            </p>
          </div>
        </div>
      )}
    </PageContainer>
  );
};
