import { memo } from "react";
import styles from "./css/LibraryDisplay.module.css";

export const LibraryDisplay = memo(
  ({ children }: { children?: React.ReactNode }) => {
    return (
      <main className={styles.libraryDisplay__Container}>
        <div className={styles.libraryDisplay__Content}>{children}</div>
      </main>
    );
  }
);
