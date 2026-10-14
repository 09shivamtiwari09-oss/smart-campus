import React from 'react';
import { StudentSegment } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

interface SegmentBadgeProps {
  segment: StudentSegment;
  size?: 'sm' | 'md';
  showDot?: boolean;
}

export const SegmentBadge: React.FC<SegmentBadgeProps> = ({
  segment,
  size = 'md',
  showDot = true,
}) => {
  const { language } = useLanguage();

  const styles: Record<StudentSegment, { bg: string; text: string; border: string; dot: string; hi: string }> = {
    'High performers': {
      bg: 'bg-[#147b37]/15',
      text: 'text-[#147b37]',
      border: 'border-[#147b37]/35',
      dot: 'bg-[#147b37]',
      hi: 'उच्च प्रदर्शनकर्ता',
    },
    'Hidden potential': {
      bg: 'bg-[#7c4bb0]/15',
      text: 'text-[#7c4bb0]',
      border: 'border-[#7c4bb0]/35',
      dot: 'bg-[#7c4bb0]',
      hi: 'छिपी प्रतिभा',
    },
    'Steady but stuck': {
      bg: 'bg-[#b48ede]/20',
      text: 'text-[#54337d]',
      border: 'border-[#b48ede]/40',
      dot: 'bg-[#7c4bb0]',
      hi: 'स्थिर पर अटके',
    },
    'At risk': {
      bg: 'bg-[#ad3568]/15',
      text: 'text-[#ad3568]',
      border: 'border-[#ad3568]/35',
      dot: 'bg-[#ad3568]',
      hi: 'जोखिम में',
    },
    'Placement-ready': {
      bg: 'bg-[#0D9488]/15',
      text: 'text-[#0D9488]',
      border: 'border-[#0D9488]/35',
      dot: 'bg-[#0D9488]',
      hi: 'प्लेसमेंट-तैयार',
    },
  };

  const current = styles[segment] || {
    bg: 'bg-[#eee3f7]',
    text: 'text-[#1e1526]',
    border: 'border-[#d9bef0]',
    dot: 'bg-[#7c4bb0]',
    hi: segment,
  };

  const label = language === 'hi' ? current.hi : segment;
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-2xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold rounded-full border ${current.bg} ${current.text} ${current.border} ${sizeClasses}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />}
      <span>{label}</span>
    </span>
  );
};
