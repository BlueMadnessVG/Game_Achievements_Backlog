import styles from "./css/SearchResultPreview.module.css"

interface SearchResultPreviewProps {
  results: any[];
}

export const SearchResultPreview = ({ results }: SearchResultPreviewProps) => {
  return (
    <div className={styles.searchResultPreview}>
      {results.map((game) => (
        <div key={game.id} className={styles.searchResultItem}>
          {game.cover && <img src={game.cover.url} alt={game.name} />}
          <span>{game.name}</span>
        </div>
      ))}
    </div>
  );
};
