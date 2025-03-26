import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Game_Case_Model } from "../../utility/3D Models/Game_Case";
import { PerspectiveCamera } from "@react-three/drei";

export function Display() {
  return (
    <>
      <Canvas dpr={[1.5, 2]} linear shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 16]} fov={25}>

        </PerspectiveCamera>

        <Suspense fallback={null}>
          <Game_Case_Model scale={30} />
        </Suspense>
      </Canvas>
    </>
  );
}
