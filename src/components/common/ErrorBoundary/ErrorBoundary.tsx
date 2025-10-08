import { Component, type ErrorInfo, type ReactNode } from "react";
import ErrorFallback from "./ErrorFallBack";


interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("Error Boundary caught an error", error, errorInfo);

    this.logErrorToServer(error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private logErrorToServer(error: Error, errorInfo: ErrorInfo) {
    console.group("Application Error");
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
    console.error("Component Stack:", errorInfo.componentStack);
    console.groupEnd();
  }

  private resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: undefined,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback
          error={this.state.error}
          onReset={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;