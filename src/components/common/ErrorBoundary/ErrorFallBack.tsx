import styles from "./css/ErrorFallback.module.css";

export interface ErrorFallbackProps {
  error?: Error;
  onReset: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, onReset }) => {
  return (
    <div className={styles.errorContainer} role="alert">
      <div className={styles.errorContent}>
        <div className={styles.errorIcon}>⚠️</div>
        <h2 className={styles.errorTitle}>Something went wrong</h2>
        <p className={styles.errorMessage}>
          We apologize for the inconvenience. Please try refreshing the page or
          click the button below to retry.
        </p>

        {error && (
          <details className={styles.errorDetails}>
            <summary>Error Details (Development Only)</summary>
            <pre className={styles.errorStack}>
              {error.message}
              {"\n"}
              {error.stack}
            </pre>
          </details>
        )}

        <button
          className={styles.retryButton}
          onClick={onReset}
          aria-label="Retry loading the application"
        >
          Try Again
        </button>

        <div className={styles.helpText}>
          If the problem persists, please contact support.
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;