import styles from "./css/SearchBar.module.css";
import FilterIcon from "../../../assets/icons/Filter.svg";
import HistoryIcon from "../../../assets/icons/History.svg";
import VectorIcon from "../../../assets/icons/Vector.svg";

import { useState } from "react";
import { SearchInput } from "./SearchInput";
import { SearchResultPreview } from "./SearchResultPreview";
import { useSearchGame } from "./hook/useSearchGame";
import { SearchFilterButtons } from "./SearchFilterButtons";
import { useDebounce } from "../../../hooks/useDeobunce";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { result, loading, error } = useSearchGame(query);

  useDebounce(query, 300, (debounceValue) => {
    console.log(result)
    console.log('Debounced search:', debounceValue);
    setQuery(debounceValue);
  })

  return (
    <div className={styles.searchBar}>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search a game..."
      />

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">⚠ {error}</div>}
      {result.length > 0 && <SearchResultPreview results={result} />}

      <div className={styles.SearchBar__filters}>
        <SearchFilterButtons
          iconSrc={FilterIcon}
          label="Filter"
          onClick={() => {}}
        />
        <SearchFilterButtons
          iconSrc={HistoryIcon}
          label="History"
          onClick={() => {}}
        />
        <SearchFilterButtons
          iconSrc={VectorIcon}
          label="Vector"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
