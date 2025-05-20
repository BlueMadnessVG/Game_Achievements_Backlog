import { Canvas } from "@react-three/fiber";
import { ReactNode, Suspense, useRef } from "react";
import { Game_Case_Model } from "../../utility/3D Models/Game_Case";
import { Bounds, CameraControls, PerspectiveCamera } from "@react-three/drei";
import {
  EffectComposer,
  Outline,
  Selection,
  SMAA,
  SSAO,
} from "@react-three/postprocessing";
import { Color } from "three";

interface DisplayProps {
  children: ReactNode;
}

export function Display({ children }: DisplayProps) {
  const cameraControlRef = useRef<CameraControls | null>(null);


  return (
    <>
      <Canvas dpr={[1.5, 2]} linear shadows>
        <Suspense fallback={null}>
          <ambientLight intensity={0.75} />
          <PerspectiveCamera
            makeDefault
            position={[0, -0.10, 10]}
            fov={10}
          ></PerspectiveCamera>
          <CameraControls ref={cameraControlRef} />

          <Selection>
            <EffectComposer multisampling={0} autoClear={false} enableNormalPass>
              <SSAO
                radius={0.05}
                intensity={150}
                luminanceInfluence={0.5}
                color={new Color("Black")}
              />
              <Outline
                visibleEdgeColor={1}
                hiddenEdgeColor={1}
                blur
                width={1000}
                edgeStrength={100}
              />
              <SMAA />
            </EffectComposer>


            <Bounds fit clip margin={1.2}>
              {children}
            </Bounds>
          </Selection>
        </Suspense>
      </Canvas>
    </>
  );
}
