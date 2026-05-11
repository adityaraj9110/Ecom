import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    
    const classes = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth ? styles.fullWidth : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <button ref={ref} className={classes} disabled={disabled || isLoading} {...props}>
        {isLoading && <span className={styles.spinner} />}
        {!isLoading && leftIcon}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
