import styles from "./css/LibraryAside.module.css";

interface LibraryAsideProps {
  games: string[];
}

export function LibraryAside({ games }: LibraryAsideProps) {
  return (
    <div className={styles.libraryAside__list}>
      <ul className={styles.libraryAside__games}>
        {games.map((game, index) => (
          <li key={index} className={styles.libraryAside__game}>
            <picture>
              <img src="https://i.pinimg.com/736x/24/74/c9/2474c927dd0ae7ad68e2eb5daab5b7db.jpg" alt={game} />
            </picture>
            <span>{game}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}