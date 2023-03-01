import React from 'react'
import  { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage } from '@react-three/drei'
import Setting from "./Setting"
import Mac from "./Mac"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function ArtDesign() {
  // const SettingModel = new GLTFLoader();
  // SettingModel.load("./Setting-transformed.glb")
  return (
    <Canvas>
      <Stage environment="studio" intensity={0.6}>
        <Setting></Setting>
      </Stage>
      <OrbitControls autoRotate></OrbitControls>
    </Canvas>
  )
}

export default ArtDesign