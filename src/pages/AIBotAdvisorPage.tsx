import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Bot, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Briefcase, 
  BookOpen, 
  User, 
  RefreshCw, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../i18n/LanguageContext';
import { apiService } from '../services/api';
import { UnbiasedDiagnosticReport, AIChatMessage } from '../types';

export const AIBotAdvisorPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { addToast } = useToast();
  const [report, setReport] = useState<UnbiasedDiagnosticReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'diagnostic' | 'chat'>('diagnostic');

  // Chatbot State
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'bot',
      text: language === 'hi'
        ? 'नमस्ते आरव। मैं आपका सारथी एआई शैक्षणिक परामर्शदाता हूँ। मैंने आपके निरंतर प्रदर्शन डेटा (14 संकेतकों) का विश्लेषण किया है। मैं निष्पक्ष समीक्षाएं उत्पन्न करता हूँ, ठोस समाधानों के साथ कमियों को उजागर करता हूँ और आपके कौशल के अनुसार इंटर्नशिप से जोड़ता हूँ। आज मैं आपकी क्या सहायता कर सकता हूँ?'
        : 'Hello Aarav. I am your Sarthi AI Academic Counselor. I have analyzed your continuous performance data (14 signals across lab submissions, git telemetry, and attendance). I generate unbiased diagnostic reviews, highlight exact deficiencies with verifiable solutions, and match internships to your tested skills. How can I guide you today?',
      timestamp: '09:30 AM',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const data = await apiService.getUnbiasedDiagnosticReport();
        setReport(data);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim()) return;

    const userMsg: AIChatMessage = {
      id: `msg-u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    try {
      const botResponse = await apiService.askAICounselor(query);
      const botMsg: AIChatMessage = {
        id: `msg-b-${Date.now()}`,
        sender: 'bot',
        text: botResponse.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      addToast('error', 'Advisor Offline', 'Unable to reach intelligence server.');
    } finally {
      setIsTyping(false);
    }
  };

  const promptSuggestions = language === 'hi' ? [
    'ऑपरेटिंग सिस्टम में मेरी क्या कमी है और उसका सटीक समाधान क्या है?',
    'मेरे सबसे मजबूत और सबसे कमजोर बिंदु दिखाएं।',
    'मेरे वर्तमान कौशल स्तर से कौन सी इंटर्नशिप मेल खाती है?',
    '85+ सफलता स्कोर तक पहुँचने के लिए मुझे क्या प्राथमिकता देनी चाहिए?',
  ] : [
    'Where do I lack in Operating Systems and what is the exact solution?',
    'Show my strongest and weakest points with score metrics.',
    'Which internships match my current skills level?',
    'What should I prioritize to reach 85+ Success Score?',
  ];

  return (
    <PageContainer
      title={t.aiAdvisor.pageTitle}
      subtitle={t.aiAdvisor.pageSubtitle}
      badge={
        <span className="text-2xs font-mono bg-[#1e1526] text-[#b78ce0] border border-[#a06cd5]/30 px-3 py-1 rounded-full font-bold">
          {language === 'hi' ? 'निष्पक्ष ऑडिट इंजन' : 'Unbiased Audit Engine'}
        </span>
      }
      action={
        <div className="flex items-center gap-2">
          <div className="flex bg-[#1e1526] p-1 rounded-xl text-xs font-bold border border-white/10">
            <button
              onClick={() => setActiveTab('diagnostic')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'diagnostic'
                  ? 'bg-[#7c4bb0] text-white shadow-sm'
                  : 'text-[#aaa1b2] hover:text-white'
              }`}
            >
              {t.aiAdvisor.diagnosticTab}
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'chat'
                  ? 'bg-[#7c4bb0] text-white shadow-sm'
                  : 'text-[#aaa1b2] hover:text-white'
              }`}
            >
              {t.aiAdvisor.chatTab}
            </button>
          </div>
          <NavLink to="/internships">
            <Button size="sm" variant="primary" rightIcon={<Briefcase className="w-3.5 h-3.5" />}>
              {t.aiAdvisor.matchedInternships}
            </Button>
          </NavLink>
        </div>
      }
    >
      <SEO
        title="Sarthi AI Academic Counselor & Unbiased Diagnostic"
        description="Personalized AI advisor detailing student strengths, weaknesses, deficiency solutions, and skill-level internship applications."
      />

      {/* Unbiased Ethical Audit Guarantee Callout */}
      <div className="bg-[#16111e] text-white rounded-[20px] p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#a06cd5]/30">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-[#1e1526] text-[#b78ce0] border border-[#a06cd5]/40 shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white">
              {t.aiAdvisor.ethicalGuaranteeTitle}
            </h3>
            <p className="text-xs text-[#aaa1b2] mt-0.5 leading-relaxed">
              {t.aiAdvisor.ethicalGuaranteeSub}
            </p>
          </div>
        </div>
        <div className="shrink-0 text-right sm:border-l sm:border-white/10 sm:pl-6">
          <span className="text-xs font-mono font-extrabold text-[#147b37] block">
            {language === 'hi' ? 'शीर्ष 21.6% समूह स्थान' : 'Top 21.6% Cohort Standing'}
          </span>
          <span className="text-2xs text-[#aaa1b2]">
            {language === 'hi' ? '78.4 प्रतिशतक रैंक' : '78.4 Percentile Rank'}
          </span>
        </div>
      </div>

      {activeTab === 'diagnostic' && report && (
        <div className="space-y-8">
          {/* Diagnostic Summary Verdict */}
          <Card>
            <CardHeader
              title={t.aiAdvisor.verdictTitle}
              subtitle={report.assessmentCycle}
              badge={
                <span className="text-2xs font-mono text-[#1e1526] bg-[#f6eefb] border border-[#d9bef0] px-2.5 py-0.5 rounded-full font-bold">
                  {report.generatedAt}
                </span>
              }
            />
            <div className="pt-4 space-y-4">
              <div className="p-4 rounded-xl bg-[#f6eefb] border border-[#d9bef0] text-xs text-[#1e1526] leading-relaxed font-medium">
                {report.unbiasedVerdict}
              </div>
            </div>
          </Card>

          {/* Strengths & Weaknesses Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strong Points */}
            <Card>
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#147b37]/30">
                <span className="p-1 rounded-lg bg-[#147b37]/15 text-[#147b37]">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-[#147b37]">
                    {t.aiAdvisor.strengthsTitle}
                  </h3>
                  <p className="text-2xs text-[#57495f]">
                    {language === 'hi' ? 'वस्तुनिष्ठ उच्च-प्रतिशतक क्षमताएं' : 'Objective high-percentile capabilities'}
                  </p>
                </div>
              </div>

              <div className="pt-4 space-y-3.5">
                {report.strengths.map((s, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-[#d9bef0] bg-white/80 space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#1e1526]">{s.area}</h4>
                      <span className="text-xs font-mono font-extrabold text-[#147b37] bg-[#147b37]/10 px-2 py-0.5 rounded-full border border-[#147b37]/30">
                        +{s.impactScore} pts
                      </span>
                    </div>
                    <div className="text-2xs font-mono text-[#147b37] font-bold">
                      {s.observedMetric}
                    </div>
                    <p className="text-2xs text-[#57495f] leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Weak Points & Drag Factors */}
            <Card>
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#ad3568]/30">
                <span className="p-1 rounded-lg bg-[#ad3568]/15 text-[#ad3568]">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-[#ad3568]">
                    {t.aiAdvisor.weaknessesTitle}
                  </h3>
                  <p className="text-2xs text-[#57495f]">
                    {language === 'hi' ? '85+ स्कोर की प्रगति में बाधक अंतराल' : 'Gaps impeding progression to 85+ score'}
                  </p>
                </div>
              </div>

              <div className="pt-4 space-y-3.5">
                {report.weaknesses.map((w, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-[#d9bef0] bg-white/80 space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#1e1526]">{w.area}</h4>
                      <span className="text-xs font-mono font-extrabold text-[#ad3568] bg-[#ad3568]/10 px-2 py-0.5 rounded-full border border-[#ad3568]/30">
                        {w.dragImpact} pts
                      </span>
                    </div>
                    <div className="text-2xs font-mono text-[#ad3568] font-bold">
                      {w.observedMetric}
                    </div>
                    <p className="text-2xs text-[#57495f] leading-relaxed">
                      {w.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Deficiency & Concrete Actionable Solution Matrix */}
          <Card>
            <CardHeader
              title={t.aiAdvisor.solutionMatrixTitle}
              subtitle={language === 'hi' ? 'सटीक रूप से दर्शाता है कि आप कहाँ कमी महसूस करते हैं, मूल कारण और चरण-दर-चरण निवारण योजना' : 'Shows exactly where you lack, the root cause, and the step-by-step remediation plan'}
            />

            <div className="pt-6 space-y-4">
              {report.improvementRoadmap.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-[18px] border border-[#d9bef0] bg-white/80 hover:border-[#7c4bb0] transition-colors shadow-sm space-y-3.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#1e1526] text-white text-xs font-bold flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-extrabold text-[#1e1526]">{item.deficiency}</h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#7c4bb0] bg-[#f6eefb] px-3 py-1 rounded-full border border-[#d9bef0] self-start sm:self-auto">
                      {language === 'hi' ? 'समयसीमा:' : 'Timeline:'} {item.targetTimeline}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                    <div className="space-y-1 bg-[#f6eefb] p-3.5 rounded-xl border border-[#d9bef0]">
                      <span className="text-2xs uppercase tracking-wider font-extrabold text-[#1e1526] block">
                        {t.aiAdvisor.rootCause}
                      </span>
                      <p className="text-[#57495f] leading-relaxed">{item.rootCause}</p>
                    </div>

                    <div className="space-y-1 bg-[#147b37]/10 p-3.5 rounded-xl border border-[#147b37]/30">
                      <span className="text-2xs uppercase tracking-wider font-extrabold text-[#147b37] block">
                        {t.aiAdvisor.actionableSolution}
                      </span>
                      <p className="text-[#1e1526] font-medium leading-relaxed">{item.actionableSolution}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#d9bef0]/60 text-2xs">
                    <div className="flex items-center gap-1.5 text-[#57495f]">
                      <BookOpen className="w-3.5 h-3.5 text-[#7c4bb0]" />
                      <span>{language === 'hi' ? 'अनुशंसित:' : 'Recommended:'} <strong className="text-[#1e1526]">{item.recommendedResource}</strong></span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-[#6f6178]">{language === 'hi' ? 'पूर्वापेक्षा:' : 'Pre-requisite for:'}</span>
                      {item.matchedInternshipSkills.map((sk) => (
                        <span key={sk} className="bg-[#1e1526] text-[#eee3f7] px-2 py-0.5 rounded-full font-mono font-bold">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Skill-Level Internship Bridging Section */}
          <div className="p-6 sm:p-8 rounded-[20px] bg-[#16111e] text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#a06cd5]/30">
            <div className="space-y-2 max-w-2xl">
              <span className="text-2xs font-extrabold uppercase tracking-wider text-[#b78ce0] block">
                {language === 'hi' ? 'कौशल-स्तरीय इंटर्नशिप मिलान इंजन' : 'Skill-Level Internship Matching Engine'}
              </span>
              <h3 className="text-xl font-extrabold text-white font-heading">
                {language === 'hi' ? 'आपकी सत्यापित इंजीनियरिंग प्रवीणता के अनुरूप इंटर्नशिप' : 'Internships Tailored to Your Verified Engineering Mastery'}
              </h3>
              <p className="text-xs text-[#aaa1b2] leading-relaxed">
                {language === 'hi'
                  ? 'आपके व्यावहारिक लैब स्कोर (92%) और निरंतर डीएसए घंटे (7.5 घंटे/सप्ताह) आपको शीर्ष स्तरीय सॉफ्टवेयर इंजीनियरिंग और क्लाउड अवसंरचना इंटर्नशिप के योग्य बनाते हैं।'
                  : 'Your practical lab scores (92%) and continuous DSA hours (7.5h/wk) qualify you for 3 top-tier software engineering and cloud infrastructure internship tracks.'}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {report.suggestedInternshipPaths.map((path, i) => (
                  <span key={i} className="text-2xs bg-[#1e1526] text-[#eee3f7] px-3 py-1 rounded-full border border-white/10 font-bold">
                    {path}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0">
              <NavLink to="/internships">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  {language === 'hi' ? 'इंटर्नशिप डैशबोर्ड देखें' : 'Explore Internship Dashboard'}
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Chat View in OCTA Theme */}
      {activeTab === 'chat' && (
        <Card className="flex flex-col h-[650px] p-0 overflow-hidden" noPadding>
          {/* Chat Header */}
          <div className="p-4 sm:p-5 border-b border-[#d9bef0]/60 bg-[#f6eefb] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#1e1526] text-[#b78ce0] flex items-center justify-center font-bold shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1e1526]">Sarthi AI Academic Counselor</h3>
                <span className="text-2xs text-[#147b37] flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#147b37] animate-pulse" />
                  {language === 'hi' ? 'ऑनलाइन • छात्र आईडी: 21BCSE104 से सत्यापित' : 'Online • Grounded in Student ID: 21BCSE104'}
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMessages([messages[0]]);
                addToast('info', 'Chat Session Cleared', 'Conversation history reset.');
              }}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              {t.aiAdvisor.resetChat}
            </Button>
          </div>

          {/* Chat Scroll Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar space-y-4 bg-[#f6eefb]/40">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      isUser
                        ? 'bg-[#1e1526] text-white'
                        : 'bg-[#7c4bb0] text-white'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-[#1e1526] text-[#eee3f7] rounded-tr-none'
                        : 'bg-white/95 border border-[#d9bef0] text-[#1e1526] shadow-sm rounded-tl-none font-medium'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span
                      className={`block text-2xs mt-1.5 font-mono ${
                        isUser ? 'text-[#aaa1b2] text-right' : 'text-[#6f6178]'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-3 text-xs text-[#57495f] italic">
                <div className="w-8 h-8 rounded-full bg-[#7c4bb0] text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-[#d9bef0] px-4 py-2.5 rounded-2xl shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#7c4bb0] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#7c4bb0] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#7c4bb0] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-4 py-2.5 border-t border-[#d9bef0]/60 bg-white/90 flex items-center gap-2 overflow-x-auto custom-scrollbar text-2xs">
            <span className="text-[#57495f] font-extrabold shrink-0">{t.aiAdvisor.ask}</span>
            {promptSuggestions.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(sug)}
                className="shrink-0 px-3 py-1 rounded-full bg-[#f6eefb] hover:bg-[#7c4bb0] hover:text-white text-[#1e1526] border border-[#d9bef0] font-bold transition-colors"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3.5 bg-[#f6eefb] border-t border-[#d9bef0]/60 flex items-center gap-2">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={t.aiAdvisor.chatPlaceholder}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#d9bef0] bg-white text-[#1e1526] placeholder:text-[#6f6178] focus:outline-none focus:ring-2 focus:ring-[#7c4bb0] font-medium"
            />
            <Button
              variant="primary"
              size="md"
              onClick={() => handleSendMessage()}
              rightIcon={<Send className="w-4 h-4" />}
            >
              {language === 'hi' ? 'भेजें' : 'Send'}
            </Button>
          </div>
        </Card>
      )}
    </PageContainer>
  );
};
