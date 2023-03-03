import React, { useEffect, useState } from 'react'
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';

    const Section = styled.div`
    height: 100vh;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    scroll-snap-align: center;
    @media only screen and (max-width:768px) {
      height: 100vh;
      flex-direction: column;
      align-items: center;
    }

    `;
    const Left = styled.div`
     flex: 2;
     display: flex;
     flex-direction: column;
     justify-content: center;
     gap: 20px;
     @media only screen and (max-width:768px) {
        flex: inherit;
        height: 100%;
        align-items: center;
        justify-content: flex-start;
        margin: 50px;
      }

    `;
    const Title = styled.div`
     font-size: 74px;
     color: black;
     font-family: 'Sulphur Point';
     @media only screen and (max-width:1300px) {
        font-size: 60px;
     }
     @media only screen and (max-width:768px) {
     text-align: center;
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
      @media only screen and (max-width:768px) {
        padding: 20px;
        text-align: center;
     }

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

    const Right = styled.div`
      flex: 3;
      position: relative;
      @media only screen and (max-width:1300px) {
        flex: 2;
        display: flex;
        justify-content: center;
      }
      @media only screen and (max-width:768px) {
        display: none;
        width: 100%;
        height: 100vh;
      }
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
    @media only screen and (max-width:768px) {
      width: 400px;
      height: 400px;
    }

    @keyframes animate {
      100%{
        transform: translateY(20px);
      }
    }
    `;

    const StyledCanvas = styled(Canvas)`
    @media only screen and (max-width: 768px) {
      width: 100vw;
      height: 50vh;
    }
    `;

function Hero() {
  const Navigate = useNavigate();
  const [scale, setScale] = useState(1.0);

  useEffect(() => {
    function handleResize () {
      const width = window.innerWidth;
      if (width < 1300) {
        setScale(0.8);
      } else {
        setScale(1.1);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return (
    <Section>
      <Left>
        <Title>Capture. Create. Inspire.</Title>
        <WhatWeDo>
          <Line></Line>
          <Subtitle>What we do</Subtitle>
        </WhatWeDo>
        <Desc>
          We craft meaningful, emotive digital experiences that bring your photographs to life.
        </Desc>
        <Link to="/appoint"> <Button>See Prices</Button></Link>
      </Left>
      <Right>
        <Canvas camera={{fov:25, position:[5,5,5]}}>
          <OrbitControls enableZoom={false} ></OrbitControls>
          <ambientLight intensity={1}></ambientLight>
          <directionalLight position={[3, 2, 1]}></directionalLight>
          <Sphere args={[1,100,200]} scale={[scale, scale, scale]}>
            <MeshDistortMaterial
            color="#b6312c"
            attach="material"
            distort={0.8}
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