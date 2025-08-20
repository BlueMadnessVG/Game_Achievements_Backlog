import { SearchInput, SearchResultPreview } from "../../../components/layout";

export function LibraryHeader() {
  return (
    <header className="library-header">
      <div className="library-header__buttons">
        <button className="library-header__button">Home</button>
        <button className="library-header__button">Collections</button>
        <button className="library-header__button">History</button>
      </div>
      <div className="library-header__search">
        <SearchInput />
        <div className="library-header__filters"></div>
        <SearchResultPreview />
      </div>
      <div className="library-header__view">
        <button className="library-header__view-button">Grid</button>
        <button className="library-header__view-button">List</button>
        <button className="library-header__view-button">Detail</button>
      </div>
    </header>
  );
}
