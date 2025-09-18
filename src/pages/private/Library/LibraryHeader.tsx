import styles from "./css/LibraryHeader.module.css";

import { memo } from "react";
import { SearchInput, SearchResultPreview } from "../../../components/layout";

export const LibraryHeader = memo(() => {
  return (
    <header className={styles.libraryHeader}>
      <div className={styles.libraryHeader__buttons}>
        <button className={styles.libraryHeader__button}>Home</button>
        <button className={styles.libraryHeader__button}>Collections</button>
        <button className={styles.libraryHeader__button}>History</button>
      </div>
      <div className={styles.libraryHeader__search}>
        <SearchInput />
        <div className={styles.libraryHeader__filters}></div>
        <SearchResultPreview />
      </div>
      <div className={styles.libraryHeader__view}>
        <button className={styles.libraryHeader__viewButton}>Grid</button>
        <button className={styles.libraryHeader__viewButton}>List</button>
        <button className={styles.libraryHeader__viewButton}>Detail</button>
      </div>
    </header>
  );
});
