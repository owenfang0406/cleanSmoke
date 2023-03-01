import React from 'react'
import styled from 'styled-components'
import Contact from './Contact'
import Hero from './Hero'
import Works from './Works'
import Who from './Who'

const Container = styled.div`
height: 100vh;
max-width: 1400px;
margin: auto;
/* background-color: rebeccapurple; */
scroll-snap-type: y mandatory;
scroll-behavior: smooth;
overflow-y: auto;
scrollbar-width: none;
color: white;
background-image: linear-gradient(to bottom, rgba(211,211,211,0.5), rgba(211,211,211,0.5)), linear-gradient(to bottom, #ffffff, #ffffff);
&::-webkit-scrollbar {
    display: none;
}
`


function HomePage() {
  return (
    <Container>
        <Hero></Hero>
        <Who></Who>
        <Works></Works>
        <Contact></Contact>
    </Container>
  )
}

export default HomePage