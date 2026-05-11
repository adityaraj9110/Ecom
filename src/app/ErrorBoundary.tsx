import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@components/ui/Button/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}


const ErrorFallback: React.FC<{ error: Error | null; onReset: () => void }> = ({ error, onReset }) => {
  return (
    <div style={{ maxWidth: '500px', margin: '8rem auto', textAlign: 'center', padding: '0 1rem' }}>
      <h1 style={{ fontSize: '3rem', color: 'var(--color-gray-200)', marginBottom: '1rem' }}>Oops</h1>
      <h2 style={{ marginBottom: '0.5rem' }}>Something went wrong</h2>
      <p style={{ color: 'var(--color-gray-500)', marginBottom: '2rem', fontSize: 'var(--font-size-sm)' }}>
        {error?.message || 'An unexpected error occurred.'}
      </p>
      <Button onClick={onReset}>
        Back to Home
      </Button>
    </div>
  );
};


export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  override render() {

    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

