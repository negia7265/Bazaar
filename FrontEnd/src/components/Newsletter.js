import React from "react";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;
const Desc = styled.p`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
`;
const Input = styled.input`
  flex: 8;
  border: none;
  padding-left: 20px;
`;
const Button = styled.button`
  flex: 2;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
export default function Newsletter() {
  return (
    <div>
      <Container>
        <Title>Newsletter</Title>
        <Desc>Get Updates From your products!!</Desc>
        <InputContainer>
          <Input placeholder="Your Email!" />
          <Button>
            <SendIcon />
          </Button>
        </InputContainer>
      </Container>
    </div>
  );
}
