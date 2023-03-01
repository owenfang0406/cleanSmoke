import { useRef } from "react"
import React from 'react'
import { PerspectiveCamera, RenderTexture, Text} from "@react-three/drei";
import { useFrame } from "@react-three/fiber"

function Cube() {
    const textRef = useRef();
    useFrame(
        (state) => 
            (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2)
    );
  return (
    <mesh>
        <boxGeometry />
        <meshStandardMaterial>
            <RenderTexture attach="map">
                <PerspectiveCamera makeDefault position={[0, 0, 5]}/>
                <color attach="background" args={["#dc9dcd"]}></color>
                <Text ref={textRef} fontSize={1} color="#555">
                    ClearSmoke
                </Text>
            </RenderTexture>
        </meshStandardMaterial>
    </mesh>
  )
}

export default Cube