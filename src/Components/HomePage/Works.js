import React, { useState } from 'react'
import styled from 'styled-components'
import ArtDesign from "./ArtDesign"
import OutfitDesign from "./OutfitDesign"
import PostureGuide from "./PostureGuide"
import ModelingLecture from "./ModelingLecture"
import TimelessArtWorks from "./TimelessArtWorks"


const data = [
    "Studio",
    "PhotoShop",
    "Make-up",
]

const Section = styled.div`
    height: 100vh;
    max-width:1400px;
    scroll-snap-align: center;
    display: flex;
    @media only screen and (max-width: 1300px) {
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    `;
    
    const Container = styled.div`
        width: 100%;
        display: flex;
        justify-content: space-between;
        @media only screen and (max-width: 1300px) { 
        flex: inherit;
        flex-wrap: wrap;
        width: 100%;
        }
        @media only screen and (max-width: 768px) {
            width: 100%;
            flex-direction: column;
            text-align: center;
         }
    `;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    height: 100%;

    @media only screen and (max-width: 1300px) { 
        flex: inherit;
        width: 100%;
    }

    @media only screen and (max-width: 768px) {
    flex: inherit;
    height: fit-content;
    justify-content: center;
    }
`;

const LeftCon = styled.div`
    width: 100%;

`

const Title = styled.h1`
      width: 100%;
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

const List = styled.ul`
    margin: 30px 0px;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
`;

const ListItem = styled.li`
    width: 100%;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    color: transparent;
    -webkit-text-stroke: 1px gray;
    position: relative;

    ::after {
        content: "${(props)=>props.text}";
        position: absolute;
        top: 0;
        left: 0;
        color: grey;
        width: 0px;
        overflow: hidden;
        white-space: nowrap;
    }

    &:hover {
        ::after {
            animation: moveText 0.5s linear both;

            @keyframes moveText {
                to{
                    width: 400px;
                }
            }
        }
    }


    @media only screen and (max-width: 1300px) {
        font-size: 32px;
    }

    @media only screen and (max-width: 768px) {
        font-size: 24px;
        color: black;
        text-align: center;
        -webkit-text-stroke: 0px gray;
        animation: moveText 0s linear both;
        ::after {
            display: none;
            animation: moveText 0s linear both;
        } 
        &.clicked::after {   
            animation:none ;
        }    
     }
`;


const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    /* flex-wrap: wrap; */
    @media only screen and (max-width: 1300px) { 
        flex: inherit;
        width: 100%;
    }
    @media only screen and (max-width: 768px) {
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        height: 40vh;
     }
`;

const ModelCon = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0px;
`

function Works() {
    const [work, setWork] = useState("Art Design")
  return (
    <Section>
        <Container>
            <Left>
                <LeftCon>
                    <Title>Comprehensive Packages.</Title>
                    <WhatWeDo>
                    <Line></Line>
                    <Subtitle>What we can provide</Subtitle>
                    </WhatWeDo>
                    <Desc>
                    Ensure that you look and feel your best in front of the camera.
                    </Desc>
                    {/* <List>
                        {data.map(item => (
                            <ListItem onClick={() => setWork(item)} keys={item} text={item}>{item}</ListItem>
                        ))}
                    </List> */}
                </LeftCon>
            </Left>
            <Right>
            <List>
                    {data.map(item => (
                        <ListItem onClick={() => setWork(item)} keys={item} text={item}>{item}</ListItem>
                    ))}
            </List>
            <ModelCon>
            {work === "Studio" ? (
                <ArtDesign/>
            ) : work === "PhotoShop" ? (
                <OutfitDesign/>
            ) : (<PostureGuide/>)}
            </ModelCon>
            </Right>
        </Container>
    </Section>
  )
}

export default Works