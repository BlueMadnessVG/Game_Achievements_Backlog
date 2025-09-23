import styles from "./css/LibraryHeader.module.css";

import { memo } from "react";
import { SearchBar } from "../../../components/layout/Search/SearchBar";

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
        <button className={styles.libraryHeader__viewButton}>Grid</button>
        <button className={styles.libraryHeader__viewButton}>List</button>
        <button className={styles.libraryHeader__viewButton}>Detail</button>
      </div>
    </header>
  );
});
