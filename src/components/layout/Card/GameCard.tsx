import styles from "./css/GameCard.module.css";

export const GameCard = () => {
  return (
    <div className={styles.gameCard}>
      <picture>
        <img src="gameImg.jpg" alt="Game Title" />
      </picture>
    </div>
  );
};
