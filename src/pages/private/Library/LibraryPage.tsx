import styles from "./css/LibraryPage.module.css";

import { type Key } from "react";
import { LibraryAside } from "./LibraryAside";
import { LibraryDisplay } from "./LibraryDisplay";
import { LibraryHeader } from "./LibraryHeader";
import { GameCard } from "../../../components/layout";
import { useGetGameCover } from "../../../hooks/useGetGameCover";
import type { GameCardModel } from "../../../models/GameCard.model";

const gamesFetch = "fields name, cover.image_id; limit 10;";

export function Library() {
  const { data, loading, error } = useGetGameCover(gamesFetch);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div className={`${styles.libraryContainer}`}>
      <LibraryHeader />
      <div className={`${styles.libraryContent}`}>
        <LibraryAside games={data} />
        <LibraryDisplay>
          {data.map((game: GameCardModel, index: Key | null | undefined) => (
            <GameCard key={index} game={game} />
          ))}
        </LibraryDisplay>
      </div>
    </div>
  );
}
