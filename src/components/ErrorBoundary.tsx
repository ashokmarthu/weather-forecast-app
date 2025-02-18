"use client";
import FallbackErrorComponent from "@/components/Fallback";
import React, { Component, ReactNode } from "react";

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
    return { hasError: true, errorMsg: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <FallbackErrorComponent
          error={{
            message: this.state.errorMsg,
          }}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
