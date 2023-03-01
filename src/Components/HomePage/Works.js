import React, { useState } from 'react'
import styled from 'styled-components'
import ArtDesign from "./ArtDesign"
import OutfitDesign from "./OutfitDesign"
import PostureGuide from "./PostureGuide"
import ModelingLecture from "./ModelingLecture"
import TimelessArtWorks from "./TimelessArtWorks"


const data = [
    "Art Design",
    "Outfit Design",
    "Posture Guide",
    "Modeling Lecture",
    "Timeless Art Works",
]

const Section = styled.div`
    height: 100vh;
    max-width:1400px;
    scroll-snap-align: center;
    display: flex;
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const List = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ListItem = styled.li`
    width: 400px;
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
`;


const Right = styled.div`
    flex: 2;
`;

function Works() {
    const [work, setWork] = useState("Art Design")
  return (
    <Section>
        <Container>
            <Left>
                <List>
                    {data.map(item => (
                        <ListItem onClick={() => setWork(item)} keys={item} text={item}>{item}</ListItem>
                    ))}
                </List>
            </Left>
            <Right>
            {work === "Art Design" ? (
                <ArtDesign/>
            ) : work === "Outfit Design" ? (
                <OutfitDesign/>
            ) : work === "Posture Guide" ? (
                <PostureGuide/>
            ) : work === "Modeling Lecture" ? (
                <ModelingLecture/>
            ) : ( <TimelessArtWorks/> )}

            </Right>
        </Container>
    </Section>
  )
}

export default Works