/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: NateSquared (https://sketchfab.com/NateSquared)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/game-case-b9f59fa49f4c465c94ec262b21898d54
Title: Game Case
*/

import { Mesh, MeshStandardMaterial } from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { memo, useCallback, useRef, useState } from "react";
import { Select } from "@react-three/postprocessing";

type GLTFResult = GLTF & {
  nodes: Record<string, Mesh>;
  materials: Record<string, MeshStandardMaterial>;
};

export const Game_Case_Model = memo((props: any) => {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    "/3D_Models/game_case.glb"
  ) as unknown as GLTFResult;
  const [hovered, setHovered] = useState<string | null>();

  const hover = useCallback((name: string | null  | undefined) => {
    setHovered((prev) => (prev !== name ? name : prev));
  }, []);

  return (
    <group ref={group} {...props} dispose={null} >
      <Select name="case" enabled={ hovered === "case" }>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.BoxArt_Rounded}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.Case}
        />
      </Select>
    </group>
  );
});

useGLTF.preload("/3D_Models/game_case.glb");
