import React from 'react'
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import styled from 'styled-components'
    const Section = styled.div`
    height: 100vh;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    scroll-snap-align: center;
    `;
    const Left = styled.div`
     flex: 2;
     display: flex;
     flex-direction: column;
     justify-content: center;
     gap: 20px;

    `;
    const Title = styled.h1`
     font-size: 74px;
    `;
    const WhatWeDo = styled.div`
     display: flex;
     align-items: center;
     gap: 10px;
    `;
    const Desc = styled.p`
    font-size: 24px;
    color: lightgray;

    `;
    const Line = styled.img`
        width: 30px;
        height: 5px;
        background-color: var(--mainColor);

    `;
    const Subtitle = styled.h2`
    color: var(--textColor);
    `;
    const Button = styled.button`
    background-color: var(--mainColor);
    color: white;
    font-weight: 500;
    width: 300px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    `;
    const Right = styled.div`
      flex: 3;
      position: relative;
    `;
    const Img = styled.img`
    margin: 0 auto;
    width: 800px;
    height: 600px;
    object-fit: contain;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    animation: animate 2s infinite ease alternate;

    @keyframes animate {
      100%{
        transform: translateY(20px);
      }
    }
    `;

function Hero() {

  return (
    <Section>
      <Left>
        <Title>Think. Make. Solve</Title>
        <WhatWeDo>
          <Line></Line>
          <Subtitle>What we do</Subtitle>
        </WhatWeDo>
        <Desc>
          We enjoy creating delightful, human-created digital experience.
        </Desc>
        <Button>Learn More</Button>
      </Left>
      <Right>
        <Canvas camera={{fov:25, position:[5,5,5]}}>
          <OrbitControls enableZoom={false} ></OrbitControls>
          <ambientLight intensity={1}></ambientLight>
          <directionalLight position={[3, 2, 1]}></directionalLight>
          <Sphere args={[1,100,200]} scale={1.2}>
            <MeshDistortMaterial
            color="#b6312c"
            attach="material"
            distort={0.5}
            speed={2}
            ></MeshDistortMaterial>
          </Sphere>
        </Canvas>
        <Img src={require('./Camera.png')} alt="Camera"></Img>
      </Right>
    </Section>
  )
}

export default Hero