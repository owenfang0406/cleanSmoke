import { OrbitControls } from '@react-three/drei';
import { Canvas } from "@react-three/fiber"
import Cube from './Cube';
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
    const Section = styled.div`
    height: 100vh;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    scroll-snap-align: center;
    `;
    const Left = styled.div`
     flex: 1;
     @media only screen and (max-width: 768px) {
        display: none;
     }
    `;
    const Right = styled.div`
     flex: 1;
     display: flex;
     flex-direction: column;
     justify-content: center;
     gap: 20px;
     @media only screen and (max-width: 768px) {
        flex: inherit;
        height: 100%;
        align-items: center;
        justify-content: center;
        padding-bottom: 100px;
     }
     `;
     const Title = styled.h1`
      font-size: 74px;
      color: black;
      font-family: 'Sulphur Point';
      @media only screen and (max-width:1300px) {
        font-size: 60px;
     }
      @media only screen and (max-width: 768px) {
        font-size: 50px;
     }
     `;
     const WhatWeDo = styled.div`
      display: flex;
      align-items: center;
      gap: 10px;
     `;
     const Desc = styled.p`
     font-size: 24px;
     color: black;
     font-family: 'Sulphur Point';
     `;
     const Line = styled.img`
         width: 30px;
         height: 5px;
         background-color: var(--mainColor);
 
     `;
     const Subtitle = styled.h2`
     color: var(--mainColor);
     font-family: 'Sulphur Point';
     font-weight: bolder;
     `;
     const Button = styled.button`
     background-color: var(--mainColor);
     color: white;
     font-family: 'Sulphur Point';
     font-weight: 500;
     width: 300px;
     padding: 10px;
     border: none;
     border-radius: 5px;
     `;

function Who() {

  return (
    <Section>
      <Left>
        <Canvas camera={{fov:25, position:[5,5,5]}}>
          <OrbitControls enableZoom={false} autoRotate></OrbitControls>
          <ambientLight intensity={1}></ambientLight>
          <directionalLight position={[3, 2, 1]}></directionalLight>
          <Cube/>
        </Canvas>
      </Left>
      <Right>
        <Title>Experience creativity without limits.</Title>
        <WhatWeDo>
          <Line></Line>
          <Subtitle>Who we are</Subtitle>
        </WhatWeDo>
        <Desc>
          a creative group of designers with a passion for photography.
        </Desc>
        <Link to="/gallery"><Button>See users' posts</Button></Link>
      </Right>
    </Section>
  )
}

export default Who