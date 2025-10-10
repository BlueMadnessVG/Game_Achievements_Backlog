import { SearchBar, ViewBar } from "../../../../../components/layout";
import styles from "./css/LibraryHeader.module.css";

import { memo } from "react";


export const LibraryHeader = memo(() => {
  return (
    <header className={styles.libraryHeader}>
      <div className={styles.libraryHeader__buttons}>
        <button className={styles.libraryHeader__button}>Home</button>
        <button className={styles.libraryHeader__button}>Collections</button>
        <button className={styles.libraryHeader__button}>History</button>
      </div>
      <div className={styles.libraryHeader__search}>
        <SearchBar />
      </div>
      <div className={styles.libraryHeader__view}>
        <ViewBar />
      </div>
    </header>
  );
});
