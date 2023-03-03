import React from 'react'
import  { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage } from '@react-three/drei'
import Mirror from "./Mirror"

function PostureGuide() {
  return (
    <Canvas style={{width: '70%', height: '100%'}}>
      <Stage intensity={0.6}>
        <Mirror scale={[0.1,0.1,0.1]}/>
      </Stage>
      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  )
}

export default PostureGuide