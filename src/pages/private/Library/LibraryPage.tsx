import { LibraryAside } from "./LibraryAside"
import { LibraryDisplay } from "./LibraryDisplay"
import { LibraryHeader } from "./LibraryHeader"

export function Library() {
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