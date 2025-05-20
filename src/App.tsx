import "./App.css";
import { Display } from "./components/Display/Display";
import { Modal } from "./components/Modal";
import { useModalContext } from "./context/modal.context";
import { Game_Case_Model } from "./utility/3D Models/Game_Case";

function App() {
  const { setState } = useModalContext();

  const handleOpenModal = () => {
    setState(true);
  };

  return (
    <>
      <div className="absolute w-full h-full insert-0 flex items-center justify-center">
        <Display>
          <Game_Case_Model scale={5} />
        </Display>
      </div>
    </>
  );
}

export default App;
