import { memo } from "react";
import type { GameCardModel } from "../../../models/GameCard.model";
import styles from "./css/LibraryAside.module.css";

interface LibraryAsideProps {
  games: GameCardModel[];
}

export const LibraryAside = memo(({ games }: LibraryAsideProps) => {
  return (
    <div className={styles.libraryAside__list}>
      <ul className={styles.libraryAside__games}>
        {games.map((game, index) => (
          <li key={index} className={styles.libraryAside__game}>
            <picture>
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                alt={game.name}
              />
            </picture>
            <span>{game.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});
