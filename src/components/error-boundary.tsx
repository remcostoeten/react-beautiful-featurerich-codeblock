"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./code-block/button";

type TErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

type TErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

export class ErrorBoundary extends Component<TErrorBoundaryProps, TErrorBoundaryState> {
  constructor(props: TErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<TErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by boundary:", error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center"
        >
          <div className="flex flex-col items-center gap-4">
            <AlertTriangle 
              className="h-12 w-12 text-red-400" 
              aria-hidden="true"
            />
            <div>
              <h2 className="text-lg font-semibold text-red-400">
                Something went wrong
              </h2>
              <p className="mt-2 text-sm text-red-300">
                An error occurred while rendering this component. Please try again.
              </p>
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-xs text-red-400">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 overflow-auto rounded bg-red-950/50 p-2 text-xs text-red-300">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
            <Button
              onClick={this.handleReset}
              className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function ErrorBoundaryFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center"
    >
      <div className="flex flex-col items-center gap-4">
        <AlertTriangle 
          className="h-12 w-12 text-red-400" 
          aria-hidden="true"
        />
        <div>
          <h2 className="text-lg font-semibold text-red-400">
            Component Error
          </h2>
          <p className="mt-2 text-sm text-red-300">
            {error.message || "An unexpected error occurred"}
          </p>
        </div>
        <Button
          onClick={resetError}
          className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Reset Component
        </Button>
      </div>
    </div>
  );
}

export { ErrorBoundaryFallback };
