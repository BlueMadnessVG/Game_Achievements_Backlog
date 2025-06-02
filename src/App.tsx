import "./App.css";
import { Card } from "./components";
import { Display } from "./components/Display/Display";
import { Modal } from "./components/Modal";
import { useModalContext } from "./context/modal.context";
import { Game_Case_Model } from "./utility/3D Models/Game_Case";

const testMask = "/assets/img/160_foil_etched_swsecret_2x.webp";
const testFoil = "/assets/img/160_foil_etched_swsecret_2x_foil.webp";

const testMask2 = "/assets/img/116_foil_holo_reverse_2x.webp";
const testFoil2 = "/assets/img/116_foil_holo_reverse_2x_foil.webp";

const testImg = "/assets/img/160_hires.png";
const testImg2 = "assets/img/116_hires.png";

const testImgTicket = "assets/img/twice_ticket2.png";

function App() {
  const { setState } = useModalContext();

  const handleOpenModal = () => {
    setState(true);
  };

  return (
    <>
      <div className="absolute w-full h-full insert-0 flex items-center justify-center flex-row gap-10">
        {/* <Display>
          <Game_Case_Model scale={5} />
        </Display> */}
        <Card
          img={testImg2}
          radius={"4.55% / 3.5%"}
          foil={testFoil2}
          mask={testMask2}
          
        />

        <Card
          img={testImgTicket}
          radius={"5% / 10%"}
          foil={testFoil}
          mask={testMask}
          data_set={"Shiny_raycast"}
        />
      </div>

      <div></div>
    </>
  );
}

export default App;
