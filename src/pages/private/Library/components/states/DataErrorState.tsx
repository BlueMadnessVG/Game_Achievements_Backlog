import styles from "./css/DataErrorState.module.css";

interface DataErrorStateProps {
  error: string;
  refetch: () => Promise<void>;
}

export const DataErrorState = ({ error, refetch }: DataErrorStateProps) => {
  return (
    <div className={styles.errorState} role="alert">
      <h2>Couldn't Load Your Library</h2>
      <p>{error}</p>
      <button onClick={refetch} className={styles.retryButton}>
        Reload Library
      </button>
    </div>
  );
};
