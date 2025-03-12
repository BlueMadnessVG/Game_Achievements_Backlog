import "./App.css";
import { Modal } from "./components/Modal";
import { useModalContext } from "./context/modal.context";

function App() {
  const { setState } = useModalContext();

  const handleOpenModal = () => {
    setState(true);
  };

  return (
    <>
      <Modal>
        <h2>Hola este es un modal</h2>
      </Modal>
      <button onClick={handleOpenModal}> Open Modal </button>
    </>
  );
}

export default App;
