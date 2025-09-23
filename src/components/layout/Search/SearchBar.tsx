import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/useDeobunce";
import { SearchInput } from "./SearchInput";
import { SearchResultPreview } from "./SearchResultPreview";
import { useSearchGame } from "./hook/useSearchGame";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { result, loading, error } = useSearchGame(query);

  return (
    <div className="search-bar">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search a game..."
      />

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">⚠ {error}</div>}
      {result.length > 0 && <SearchResultPreview results={result} />}
    </div>
  );
};
