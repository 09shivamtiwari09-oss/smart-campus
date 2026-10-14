import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-[#f6eefb] border border-dashed border-[#b78ce0]/50 rounded-[20px]">
      <div className="w-12 h-12 rounded-2xl bg-[#1e1526] flex items-center justify-center text-[#b78ce0] mb-3 shadow-md">
        {icon || <Inbox className="w-6 h-6" />}
      </div>
      <h4 className="text-sm sm:text-base font-extrabold text-[#1e1526]">{title}</h4>
      <p className="text-xs sm:text-sm text-[#57495f] max-w-sm mt-1 mb-4 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
