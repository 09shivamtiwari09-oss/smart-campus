import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'slate' | 'blue' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'purple' | 'dark';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    slate: 'bg-[#1e1526]/10 text-[#1e1526] border-[#d9bef0]/60',
    blue: 'bg-blue-500/10 text-blue-700 border-blue-400/30',
    emerald: 'bg-[#147b37]/15 text-[#147b37] border-[#147b37]/35',
    amber: 'bg-amber-500/15 text-amber-800 border-amber-400/35',
    rose: 'bg-[#ad3568]/15 text-[#ad3568] border-[#ad3568]/35',
    indigo: 'bg-[#7c4bb0]/15 text-[#7c4bb0] border-[#7c4bb0]/35',
    purple: 'bg-[#b78ce0]/25 text-[#4a2e6f] border-[#b78ce0]/40',
    dark: 'bg-[#1e1526] text-[#eee3f7] border border-[#a06cd5]/30',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-2xs',
    md: 'px-2.5 py-0.5 text-xs',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-bold rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
