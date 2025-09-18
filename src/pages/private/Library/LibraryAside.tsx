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
        {games.map((game) => (
          <li key={game.id} className={styles.libraryAside__game}>
            <picture>
              <img
                src={
                  game.cover?.image_id
                    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
                    : "/placeholder-image.jpg"
                }
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
