import React from 'react';

export type CardVariant = 'lilac' | 'soft' | 'dark';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  variant?: CardVariant;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  noPadding = false,
  variant = 'lilac',
  ...props
}) => {
  const variantStyles: Record<CardVariant, string> = {
    lilac: 'bg-[#eee3f7] text-[#1e1526] border border-[#d9bef0]/70 shadow-lg shadow-purple-950/10',
    soft: 'bg-[#f6eefb] text-[#1e1526] border border-[#d9bef0]/50 shadow-sm',
    dark: 'bg-[#16111e] text-[#eee3f7] border border-[#a06cd5]/30 shadow-xl shadow-black/40',
  };

  return (
    <div
      className={`${variantStyles[variant]} rounded-[20px] transition-all duration-200 ${
        noPadding ? '' : 'p-5 sm:p-6'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
  isDark?: boolean;
}> = ({ title, subtitle, action, badge, className = '', isDark = false }) => {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 ${
        isDark ? 'border-b border-white/10' : 'border-b border-[#d9bef0]/60'
      } ${className}`}
    >
      <div>
        <div className="flex items-center gap-2.5">
          <h3
            className={`text-base sm:text-lg font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-[#1e1526]'
            }`}
          >
            {title}
          </h3>
          {badge}
        </div>
        {subtitle && (
          <p
            className={`text-xs sm:text-sm mt-0.5 ${
              isDark ? 'text-[#aaa1b2]' : 'text-[#57495f]'
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
