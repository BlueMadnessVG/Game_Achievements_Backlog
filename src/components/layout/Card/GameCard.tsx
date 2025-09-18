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
          src={
            game.cover?.image_id
              ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
              : "/placeholder-image.jpg"
          }
          alt={game.name}
        />
      </picture>
    </div>
  );
});
