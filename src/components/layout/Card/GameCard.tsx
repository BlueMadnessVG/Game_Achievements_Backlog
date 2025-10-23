import { memo } from "react";
import type { GameCardModel } from "../../../models/GameCard.model";
import styles from "./css/GameCard.module.css";
import type { Game } from "../../../models";

interface GameCardProps {
  game: Game;
}

export const GameCard = memo(({ game }: GameCardProps) => {
  return (
    <div className={styles.gameCard}>
      <picture>
        <img
          src={
            game.coverUrl
              ? game.coverUrl
              : "/placeholder-image.jpg"
          }
          alt={game.name}
        />
      </picture>
    </div>
  );
});
