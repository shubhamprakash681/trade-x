import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`flex h-10 w-full rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-2 text-sm text-[var(--app-foreground)] placeholder:text-[var(--app-muted-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--app-ring)] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${
            error ? 'border-[var(--color-danger)] focus:ring-[var(--color-danger)]' : ''
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-[var(--color-danger)]">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
