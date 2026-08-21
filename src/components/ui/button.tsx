import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'ghost' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', isLoading, variant = 'primary', children, disabled, ...props }, ref) => {
    const variants = {
      primary:
        'bg-primary text-white shadow-sm hover:bg-primary-dark focus:ring-primary-light',
      ghost:
        'bg-transparent text-[var(--app-foreground)] shadow-none hover:bg-[var(--app-hover)] focus:ring-[var(--app-ring)]',
      outline:
        'border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-foreground)] shadow-none hover:bg-[var(--app-hover)] focus:ring-[var(--app-ring)]',
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--app-background)] disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${variants[variant]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em]" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
