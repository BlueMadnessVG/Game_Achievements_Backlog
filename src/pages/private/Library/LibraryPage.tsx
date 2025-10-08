import styles from "./css/LibraryPage.module.css";

import { LibraryAside } from "./LibraryAside";
import { LibraryDisplay } from "./LibraryDisplay";
import { LibraryHeader } from "./LibraryHeader";
import { GameCard } from "../../../components/layout";
import { useGetGameCover } from "./hooks/useGetGameCover";
import type { GameCardModel } from "../../../models/GameCard.model";
import ErrorBoundary from "../../../components/common/ErrorBoundary/ErrorBoundary";

const gamesFetch = "fields name, cover.image_id; limit 10;";

export function Library() {
  const { data, isLoading, error, refetch } = useGetGameCover({
    onSuccess: (games) => console.log(`Loaded ${games.length} games`),
    onError: (err) => console.error("Library load failed:", err),
    fetchParams: gamesFetch,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data?.length) return <p>No data available</p>;

  return (
    <ErrorBoundary  onError={(error) => console.log('Library crashed:', error)}>
      <div className={`${styles.libraryContainer}`}>
        <LibraryHeader />
        <div className={`${styles.libraryContent}`}>
          <LibraryAside games={data} />
          <LibraryDisplay>
            {data.map((game: GameCardModel) => (
              <GameCard key={game.id} game={game} />
            ))}
          </LibraryDisplay>
        </div>
      </div>
    </ErrorBoundary>
  );
}
