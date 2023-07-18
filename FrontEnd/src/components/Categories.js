import React from "react";
import styled from "styled-components";
import { categories } from "./data";
import Categoryitem from "./Categoryitem";
const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;
export default function Categories() {
  return (
    <div>
      <Container>
        {categories.map((item) => (
          <Categoryitem item={item} />
        ))}
      </Container>
    </div>
  );
}
