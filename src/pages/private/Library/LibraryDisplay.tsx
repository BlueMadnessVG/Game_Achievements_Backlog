import styles from "./css/LibraryDisplay.module.css";
import { GameCard } from "../../../components/layout";

export function LibraryDisplay() {
  return (
    <main className={styles.libraryDisplay__Container}>
        <div className={styles.libraryDisplay__Content}>
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />

          
        </div>
    </main>
  )
}