import { OrbitControls } from '@react-three/drei';
import { Canvas } from "@react-three/fiber"
import Cube from './Cube';
import React from 'react'
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
     flex: 1;
    `;
    const Right = styled.div`
     flex: 1;
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
        <Title>Think outside the square space</Title>
        <WhatWeDo>
          <Line></Line>
          <Subtitle>Who we are</Subtitle>
        </WhatWeDo>
        <Desc>
          a creative group of designers with a passion for the arts.
        </Desc>
        <Button>See our works</Button>
      </Right>
    </Section>
  )
}

export default Who