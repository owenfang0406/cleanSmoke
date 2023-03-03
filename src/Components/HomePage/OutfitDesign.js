import React from 'react'
import Mac from "./Mac"
import  { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage } from '@react-three/drei'

function OutfitDesign() {
  return (
    <Canvas style={{width: '70%', height: '70%'}}>
    <Stage intensity={0.6}>
      <Mac scale="0.01"></Mac>
    </Stage>
    <OrbitControls enableZoom={false} autoRotate></OrbitControls>
  </Canvas>
  )
}

export default OutfitDesign