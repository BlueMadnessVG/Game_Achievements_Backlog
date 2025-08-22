import { GameCard } from "../../../components/layout";

export function LibraryDisplay() {
  return (
    <main className="library-display__container">
        <h1>Library Display</h1>
        <div className="library-display__content">
          <GameCard />
        </div>
    </main>
  )
}