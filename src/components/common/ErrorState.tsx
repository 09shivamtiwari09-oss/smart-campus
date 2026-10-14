import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Failed to load telemetry',
  message = 'An unexpected network error occurred while communicating with the analytics server.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-[#ad3568]/10 border border-[#ad3568]/35 rounded-[20px]">
      <div className="w-12 h-12 rounded-2xl bg-[#ad3568] flex items-center justify-center text-white mb-3 shadow-md">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h4 className="text-base font-extrabold text-[#ad3568]">{title}</h4>
      <p className="text-xs sm:text-sm text-[#1e1526] max-w-md mt-1 mb-4 leading-relaxed">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RotateCcw className="w-4 h-4" />}
          className="border-[#ad3568]/40 text-[#ad3568] hover:bg-[#ad3568]/10"
        >
          Retry Request
        </Button>
      )}
    </div>
  );
};
