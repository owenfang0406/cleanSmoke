import React from 'react'
import styled from 'styled-components'
import Contact from './Contact'
import Hero from './Hero'
import Works from './Works'
import Who from './Who'

const Container = styled.div`
height: 100%;
max-width: 1400px;
padding: 0px 50px;
margin: auto;
scroll-snap-type: y mandatory;
scroll-behavior: smooth;
overflow-y: auto;
scrollbar-width: none;
color: white;
background-image: white;
scroll-padding-bottom: 80px;
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