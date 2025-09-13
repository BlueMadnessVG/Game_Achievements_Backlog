import styles from "./css/LibraryDisplay.module.css";

export function LibraryDisplay({ children }: { children?: React.ReactNode }) {
  return (
    <main className={styles.libraryDisplay__Container}>
        <div className={styles.libraryDisplay__Content}>
          {children}
        </div>
    </main>
  )
}