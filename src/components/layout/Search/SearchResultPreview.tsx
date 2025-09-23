interface SearchResultPreviewProps {
  results: any[];
}

export const SearchResultPreview = ({ results }: SearchResultPreviewProps) => {
  return (
    <div className="search-result-preview">
      {results.map((game) => (
        <div key={game.id} className="search-result-item">
          {game.cover && <img src={game.cover.url} alt={game.name} />}
          <span>{game.name}</span>
        </div>
      ))}
    </div>
  );
};
