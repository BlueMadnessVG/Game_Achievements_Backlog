import styles from "./css/LibraryCrashFallback.module.css";

interface LibraryCrashFallbackProps {
  refetch: () => Promise<void>;
}

export const LibraryCrashFallback = ({
  refetch,
}: LibraryCrashFallbackProps) => {
  return (
    <div className={styles.crashFallback}>
      <h2>Library Temporarily Unavailable</h2>
      <p>We're having trouble displaying your game library.</p>
      <button onClick={refetch} className={styles.retryButton}>
        Reload Library
      </button>
    </div>
  );
};
