"use client"
import FallbackErrorComponent from '@/components/Fallback';
import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMsg: string | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMsg: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render shows the fallback UI
    return { hasError: true, errorMsg: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error to an error reporting service
    console.error('Error caught by Error Boundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI and show the error message
      return (
        <FallbackErrorComponent error={{
              message: this.state.errorMsg
          }} />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
