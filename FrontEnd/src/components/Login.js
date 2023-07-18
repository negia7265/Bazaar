import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("https://images.pexels.com/photos/94825/pexels-photo-94825.jpeg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
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
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`;
const Input = styled.input`
  flex: 1;
  padding: 15px;
  margin: 6px;
`;

const Button = styled.button`
  border: none;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 15px 20px;
  cursor: pointer;
  background-color: teal;
  color: white;
`;
const Link = styled.a`
  margin: 8px 3px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`;
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  const { error, isFetching } = useSelector((state) => state.user);

  return (
    <div>
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
            <Input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
            <Input
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button className="loginButton" onClick={handleClick}>
              LOG IN
            </Button>
            {error && <Error>Something went wrong....</Error>}
            <Link>FORGOT THE PASSWORD</Link>
            <Link>CREATE A NEW ACCOUNT</Link>
          </Form>
        </Wrapper>
      </Container>
    </div>
  );
}
