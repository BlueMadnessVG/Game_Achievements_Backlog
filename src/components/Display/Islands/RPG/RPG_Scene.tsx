import { Canvas } from "@react-three/fiber"
import { DirectionalLight } from "three"
import { OrbitControls, Stars } from "@react-three/drei"

const games = [
  { id: 1, name: 'Final Fantasy VII', position: [2, 1, 0] },
  { id: 2, name: 'Persona 5', position: [-2, 1, 0] },
]

export function RPG_Scene() {
  return (
    <Canvas camera={{ position: [0, 5 ,10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} />
      <Stars />
      <OrbitControls />

      
      
    </Canvas>
  )
}
