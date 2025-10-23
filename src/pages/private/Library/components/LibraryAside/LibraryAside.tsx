import { memo } from "react";
import styles from "./css/LibraryAside.module.css";
import type { Game } from "../../../../../models";

interface LibraryAsideProps {
  games: Game[];
}

export const LibraryAside = memo(({ games }: LibraryAsideProps) => {
  return (
    <div className={styles.libraryAside__list}>
      <ul className={styles.libraryAside__games}>
        {games.map((game) => (
          <li key={game.appId} className={styles.libraryAside__game}>
            <picture>
              <img
                src={game.iconUrl ? game.iconUrl : "/placeholder-image.jpg"}
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
