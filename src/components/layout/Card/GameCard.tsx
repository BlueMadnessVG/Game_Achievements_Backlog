import { memo } from "react";
import type { GameCardModel } from "../../../models/GameCard.model";
import styles from "./css/GameCard.module.css";

interface GameCardProps {
  game: GameCardModel;
}

export const GameCard = memo(({ game }: GameCardProps) => {
  return (
    <div className={styles.gameCard}>
      <picture>
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
          alt={game.name}
        />
      </picture>
    </div>
  );
});
