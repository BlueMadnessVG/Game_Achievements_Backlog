import styles from "./css/LibraryPage.module.css";

import { LibraryAside } from "./components/LibraryAside/LibraryAside";
import { LibraryDisplay } from "./components/LibraryDisplay/LibraryDisplay";
import { LibraryHeader } from "./components/LibraryHeader/LibraryHeader";
import { GameCard } from "../../../components/layout";
import { useGetGameCover } from "./hooks/useGetGameCover";
import type { GameCardModel } from "../../../models/GameCard.model";
import ErrorBoundary from "../../../components/common/ErrorBoundary/ErrorBoundary";
import { LibrarySkeleton } from "./states/LibrarySkeleton";
import { DataErrorState } from "./states/DataErrorState";
import { EmptyLibraryState } from "./states/EmptyLibraryState";
import { LibraryCrashFallback } from "./states/LibraryCrashFallback";

const gamesFetch = "fields name, cover.image_id; limit 10;";

export function Library() {
  const { data, isLoading, error, refetch } = useGetGameCover({
    onSuccess: (games) => console.log(`Loaded ${games.length} games`),
    onError: (err) => console.error("Library load failed:", err),
    fetchParams: gamesFetch,
  });

  if (isLoading) return <LibrarySkeleton />;
  if (error) return <DataErrorState error={error} refetch={refetch} />;
  if (!data?.length) return <EmptyLibraryState />;

  return (
    <ErrorBoundary
      onError={(error) => console.log("Library crashed:", error)}
      fallback={<LibraryCrashFallback refetch={refetch} />}
    >
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
