import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Announcement from "./Announcement";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Newsletter from "./Newsletter";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { publicRequest } from "./requestMethods";
import { useLocation } from "react-router";
import axios from "axios";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
const Container = styled.div``;
const ImgContainer = styled.div`
  flex: 1;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;
const Title = styled.h1`
  font-weight: 100;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.h1`
  margin-right: 8px;
  margin-left: 14px;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 5px;
  margin-left: 8px;
  margin-top: 8px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  height: 30px;
  margin-top: 10px;
`;
const AddContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 50%;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 20px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid teal;
  border-radius: 20%;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  &:hover {
    background-color: #f8f4f4;
  }
`;
const FilterSizeOption = styled.option``;
export default function Product() {
  const [product, setProduct] = useState({});
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);

  const temp = location.pathname.split("/");
  const id = temp[temp.length - 1];
  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/product/${id}`);
        //const res = await axios.get(`http://localhost:5000/api/product/${id}`);
        //console.log(res.data);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);
  const [color, setColor] = useState(product?.color?.[0]);
  const [size, setSize] = useState(product?.size?.[0]);
  const handleQuantity = (type) => {
    if (type === "dec") {
      if (quantity > 1) setQuantity(quantity - 1);
      else setQuantity(1);
    } else setQuantity(quantity + 1);
  };
  const handleClick = () => {
    dispatch(addProduct({ product, quantity, color, size }));
  };
  const handleSize = (e) => {
    setSize(e.target.value);
  };
  const handleColor = (s) => {
    setColor(s);
  };

  return (
    <div>
      <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
          <ImgContainer>
            <Image src={product.img} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price>${product.price}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {product.color &&
                  Array.isArray(product.color) &&
                  product.color.map((s) => (
                    <FilterColor color={s} onClick={() => handleColor(s)} />
                  ))}

                <FilterTitle>Size</FilterTitle>
                {product.size && Array.isArray(product.size) && (
                  <FilterSize onChange={handleSize}>
                    {product.size.map((s) => (
                      <FilterSizeOption key={s}>{s}</FilterSizeOption>
                    ))}
                  </FilterSize>
                )}
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <AddIcon onClick={() => handleQuantity("inc")} />
                <Amount>{quantity}</Amount>
                <RemoveIcon onClick={() => handleQuantity("dec")} />
              </AmountContainer>
              <Button onClick={handleClick}>Add to Cart</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer />
      </Container>
    </div>
  );
}
