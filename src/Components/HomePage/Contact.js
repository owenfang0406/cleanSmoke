import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import Map from "./Map"
import emailjs from '@emailjs/browser';

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
      @media only screen and (max-width: 1300px) {
        width: 100%;
        justify-content: center;
        align-items: center;
        /* padding:20%; */
      }
    `;

    const Title = styled.h1`
      font-family: 'Sulphur Point';
      font-weight: bolder;
      color: black;
      font-size: 40px;
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
      color: black;
      border: none;
      border-radius: 5px;
      background-color: #e8e6e6;
    `;


    const Right = styled.div`
     flex: 1;
     display: flex;
     flex-direction: column;
     justify-content: center;

     @media only screen and (max-width: 1300px) {
      display: none;
     }
    `;

    const Button = styled.button`
      background-color: var(--mainColor);
      color: white;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 5px;
      padding: 20px;
      @media only screen and (max-width: 768px) {
        height: 30px;
        padding: 0px;
     }
    `;

    const SendMsg = styled.div`
      color: red;
      font-size: larger;
      margin-bottom: 20px;
    `


function Contact() {
  const ref = useRef();
  const [success, setSuccess] = useState(false)

    const handleSubmit = (event) => {
    event.preventDefault()

    emailjs.sendForm('service_g1tfsrz', 'template_hz4eabe', ref.current, 'R68SNgEGSgZt4oQE5')
        .then((result) => {
            console.log(result.text);
            setSuccess(true)
        }, (error) => {
            console.log(error.text);
            setSuccess(false)
        });

    }
  return (
    <Section>
      <Container>
        <Left>
          <Form ref={ref} onSubmit={handleSubmit}>
            <Title>Contact Us</Title>
            <Input placeholder="Name" name='name'></Input>
            <Input placeholder="Email" name='email'></Input>
            <TextArea rows="10" name='message' placeholder="You are welcome to provide us any feedback or issue for us to improve our user experience"></TextArea>
            <Button type='submit'>Send</Button>
            <SendMsg>
            {success && 
            "Your message has been sent. We will get back to you soon"}
            </SendMsg>
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