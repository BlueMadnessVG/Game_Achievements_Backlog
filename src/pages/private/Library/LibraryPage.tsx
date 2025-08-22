import styles from "./css/LibraryPage.module.css";

import { useEffect } from "react";
import { LibraryAside } from "./LibraryAside";
import { LibraryDisplay } from "./LibraryDisplay";
import { LibraryHeader } from "./LibraryHeader";
import { fetchGames } from "../../../services";

const gamesData = ["Persona 5", "Final Fantasy VII", "The Legend of Zelda"];

export function Library() {
/*   useEffect(() => {
    // Fetch user games when the component mounts
    const fetchUserGames = async () => {
      const games = await fetchGames();
      console.log(games);
    };
    fetchUserGames();
  }, []); */

  return (
    <div className={`${styles.libraryContainer}`}>
      <LibraryHeader />
      <div className={`${styles.libraryContent}`}>
        <LibraryAside games={gamesData} />
        <LibraryDisplay />
      </div>
    </div>
  );
}
