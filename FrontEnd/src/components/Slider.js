import React, { useState } from "react";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { sliderItems } from "./data";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: white;
  align-items: center;
  overflow: hidden;
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  left: ${(props) =>
    props.direction === "right" ? "calc(100% - 50px)" : "0px"};
  right: ${(props) =>
    props.direction === "left" ? "0px" : "calc(100% - 50px)"};
`;

const Slide = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: space-between;
  align-items: center;
  flex: 0 0 100%;
`;

const ImgContainer = styled.div`
  margin-left: 50px;
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;
`;
const InfoContainer = styled.div`
  margin-right: 80px;
  flex: 1;
  padding: 50px;
`;
const Title = styled.h1`
  font-size: 70px;
`;
const Desc = styled.p`
  font-size: 20px;
  margin: 50px 0px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  font-size: 20px;
  padding: 10px;
  background-color: transparent;
  cursor: pointer;
`;
const Image = styled.img`
  height: 80%;
`;
export default function Slider() {
  const [slideindex, setslideindex] = useState(0);
  const [slideno, setslideno] = useState(0);
  const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    transition: all 0.5s ease-in-out;

    transform: translateX(-${slideindex}%);
  `;

  const handleClick = (direction) => {
    console.log(direction);
    if (direction === "right" && slideno !== sliderItems.length - 1) {
      setslideno(slideno + 1);
      setslideindex(slideindex + 100);
    } else if (direction === "left" && slideno > 0) {
      setslideno(slideno - 1);
      setslideindex(slideindex - 100);
    }
  };
  return (
    <div>
      <Container>
        <Wrapper>
          {sliderItems.map((items) => (
            <Slide>
              <ImgContainer>
                <Image src={items.img} />
              </ImgContainer>
              <InfoContainer>
                <Title>{items.title}</Title>
                <Desc>{items.desc}</Desc>
                <Button>SHOP NOW</Button>
              </InfoContainer>
            </Slide>
          ))}
        </Wrapper>
        <Arrow onClick={() => handleClick("left")} direction="left">
          <ArrowBackIosIcon />
        </Arrow>
        <Arrow onClick={() => handleClick("right")} direction="right">
          <ArrowForwardIosIcon />
        </Arrow>
      </Container>
    </div>
  );
}
