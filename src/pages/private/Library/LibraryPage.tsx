import { useEffect } from "react"
import { LibraryAside } from "./LibraryAside"
import { LibraryDisplay } from "./LibraryDisplay"
import { LibraryHeader } from "./LibraryHeader"
import { fetchGames } from "../../../services";

export function Library() {

  useEffect(() => {
    // Fetch user games when the component mounts
    const fetchUserGames = async () => {
      const games = await fetchGames();
      console.log(games);
    };
    fetchUserGames();
  }, []);

  return (
    <div className="library-container">
      <LibraryHeader />
      <div className="library-content">
        <LibraryAside />
        <LibraryDisplay />
      </div>
    </div>
  )
}