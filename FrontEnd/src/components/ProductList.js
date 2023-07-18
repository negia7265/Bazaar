import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import Announcement from "./Announcement";
import Products from "./Products";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import { useLocation } from "react-router";
const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;
const Option = styled.option``;
export default function ProductList() {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filter, setFilters] = useState({});
  const [sort, setSort] = useState("Newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFilters((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <Container>
        <Navbar />
        <Announcement />
        <Title>Dresses</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Fitler Products:</FilterText>
            <Select name="color" onChange={handleFilters}>
              <Option disabled selected>
                Color
              </Option>
              <Option>white</Option>
              <Option>black</Option>
              <Option>red</Option>
              <Option>blue</Option>
              <Option>yellow</Option>
              <Option>green</Option>
            </Select>
            <Select name="size" onChange={handleFilters}>
              <Option disabled selected>
                Size
              </Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
              <Option>XXL</Option>
            </Select>
          </Filter>

          <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select onChange={(e) => setSort(e.target.value)}>
              <Option selected>Newest</Option>
              <Option>Price(asc)</Option>
              <Option>Price(desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products cat={cat} filter={filter} sort={sort} />
        <Newsletter />
        <Footer />
      </Container>
    </div>
  );
}
