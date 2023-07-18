import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("https://images.pexels.com/photos/15637666/pexels-photo-15637666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 700px;
  padding: 20px;
  background-color: white;
  max-height: 880px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  width: 60%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Input = styled.input`
  flex: 1;
  padding: 5px;
  margin: 6px;
`;
const Agreement = styled.span``;
const Button = styled.button`
  border: none;
  margin-top: 10px;
  padding: 15px 20px;
  cursor: pointer;
  background-color: teal;
  color: white;
  margin: 7%;
`;
export default function Register() {
  return (
    <div>
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form>
            <Input placeholder="name"></Input>
            <Input placeholder="last name"></Input>
            <Input placeholder="username"></Input>
            <Input placeholder="email"></Input>
            <Input placeholder="password"></Input>
            <Input placeholder="confirm password"></Input>
            <Agreement>
              By creating an account. I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Link to="/login" style={{}}>
              <Button style={{ margin: "10px" }}>CREATE</Button>
            </Link>
            <Link to="/login">
              <Button style={{ margin: "10px" }}>LOGIN</Button>
            </Link>
          </Form>
        </Wrapper>
      </Container>
    </div>
  );
}
