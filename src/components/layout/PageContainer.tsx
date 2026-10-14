import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
  badge,
  action,
  className = '',
}) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#0b0a0c] text-[#eee3f7] overflow-x-hidden selection:bg-[#7c4bb0] selection:text-white">
      {/* Background ambient radial glows for OCTA aesthetic */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-[160px] opacity-25 z-0"
        style={{ background: 'radial-gradient(circle, #a06cd5, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-[45%] -right-44 h-[560px] w-[560px] rounded-full blur-[170px] opacity-20 z-0"
        style={{ background: 'radial-gradient(circle, #7c4bb0, transparent 70%)' }}
      />

      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {(title || action) && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-heading">
                  {title}
                </h1>
                {badge}
              </div>
              {subtitle && (
                <p className="text-xs sm:text-sm text-[#b48ede] mt-1 max-w-2xl leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
            {action && <div className="shrink-0 flex items-center gap-2.5">{action}</div>}
          </div>
        )}
        <div className={`space-y-6 sm:space-y-8 ${className}`}>{children}</div>
      </main>
    </div>
  );
};
