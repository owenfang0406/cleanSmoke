import React, { useEffect, useRef, useState } from 'react'
import  { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage } from '@react-three/drei'
import Setting from "./Setting"

function ArtDesign() {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);


  useEffect(() => {
    function handleResize() {
      const viewWidth = window.innerWidth;
      if (viewWidth < 1300) {
        setWidth('90%');
        setHeight('90%');
      } else {
        setHeight('70%');
        setWidth('70%');
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Canvas style={{width: width, height: height}}>
      <Stage intensity={0.6}>
        <Setting></Setting>
      </Stage>
      <OrbitControls enableZoom={false} autoRotate></OrbitControls>
    </Canvas>
  )
}

export default ArtDesign