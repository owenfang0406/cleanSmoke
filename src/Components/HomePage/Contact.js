import React from 'react'
import styled from 'styled-components'
import Map from "./Map"

    const Section = styled.div`
      height: 100vh;
      scroll-snap-align: center;
    `;

    const Container = styled.div`
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      gap: 50px;
    `;

    const Left = styled.div`
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    `;

    const Title = styled.h1`
      font-weight: 200;
    `;

    const Form = styled.form`
      width: 500px;
      display: flex;
      flex-direction: column;
      gap: 25px;
    `;

    const Input = styled.input`
      padding: 20px;
      background-color: lightgray;
      border: none;
      border-radius: 5px;
    `;

    const TextArea = styled.textarea`
      padding: 20px;
      border: none;
      border-radius: 5px;
      background-color: #e8e6e6;
    `;


    const Right = styled.div`
     flex: 1;
     display: flex;
     flex-direction: column;
     justify-content: center;
    `;

    const Button = styled.button`
      background-color: var(--mainColor);
      color: white;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 5px;
      padding: 20px;
    `;

const handleSubmit = (event) => {
  event.preventDefault()

}

function Contact() {
  return (
    <Section>
      <Container>
        <Left>
          <Form onSubmit={handleSubmit}>
            <Title>Contact Us</Title>
            <Input placeholder="Name"></Input>
            <Input placeholder="Email"></Input>
            <TextArea rows="10" placeholder="Write your message"></TextArea>
            <Button type='submit'>Send</Button>
          </Form>
        </Left>
        <Right>
          <Map></Map>
        </Right>
      </Container>
    </Section>
  )
}

export default Contact