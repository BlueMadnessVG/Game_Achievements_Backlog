import "./App.css";
import { Display } from "./components/Display/Display";
import { Modal } from "./components/Modal";
import { useModalContext } from "./context/modal.context";
import { Game_Case_Model } from "./utility/3D Models/Game_Case";
import { HoloCard } from "holo-card";

const testMask = "/assets/img/215_mask_etched_swsecret_2x.webp";
const testFoil = "/assets/img/215_foil_etched_swsecret_2x.webp";

const testMask2 = "/assets/img/116_foil_holo_reverse_2x.webp";
const testFoil2 = "/assets/img/116_foil_holo_reverse_2x_foil.webp";

const testImg = "/assets/img/215_hires.png";
const testImg2 = "assets/img/116_hires.png";

const testImgTicket = "assets/img/IMG-20250602-WA0010.jpg";

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
        <HoloCard
          img={testImgTicket}
          radius={"4.55% / 3.5%"}
          foil={testFoil}
          mask={testMask}
          data_set={"Radiant"}
        />
      </div>

      <div></div>
    </>
  );
}

export default App;
