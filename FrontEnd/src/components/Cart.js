import React from "react";
import styled from "styled-components";
import Announcement from "./Announcement";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "./requestMethods";
import axios from "axios";
const Container = styled.div``;
const Wrapper = styled.div``;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TopButton = styled.button`
  padding: 10px;
  margin: 16px;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  margin-left: 40px;
`;
const TopTexts = styled.div`
  font-size: 20px;
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Info = styled.div`
  flex: 3;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 53vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 15px;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductDetail = styled.div`
  justify-content: space-between;
  display: flex;
  flex: 1;
  margin-left: 40px;
  margin-top: 30px;
`;
const Image = styled.img`
  width: 300px;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const ProductName = styled.span`
  margin-bottom: 20px;
`;
const ProductID = styled.span`
  margin-bottom: 20px;
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-bottom: 20px;
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  font-size: 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  width: 100%;
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  font-size: ${(props) => props.total === "total" && "30px"};
  font-weight: ${(props) => props.total === "total" && "80"};
`;
const SummaryItemText = styled.div``;
const SummaryItemPrice = styled.div``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
  border-radius: 10px;
`;

export default function Cart() {
  const cart = useSelector((state) => state.cart.products);
  const quantity = useSelector((state) => state.cart.quantity);
  const total = useSelector((state) => state.cart.total);
  const product_quantity = useSelector((state) => state.cart.product_quantity);
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/payment", {
          tokenId: stripeToken.id,
          amount: total,
        });
        // const res = await axios.post("http://localhost:5000/api/payment", {
        //   tokenId: stripeToken.id,
        //   amount: total,

        // const res = await userRequest.post("/payment", {
        //   tokenId: stripeToken.id,
        //   amount: total,
        // });
      } catch (err) {
        console.log("payment error");
        console.log(err);
      }
    };
    makeRequest();
  }, [stripeToken]);
  return (
    <div>
      <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <TopButton direction="left">CONTINUE SHOPPING</TopButton>
            <TopTexts>
              <TopText>Shopping Bag(2)</TopText>
              <TopText>Your Wishlist(0)</TopText>
            </TopTexts>
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          </Top>
          <Bottom>
            <Info>
              {cart.map((product, index) => (
                <Product>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductID>
                        <b>ID:</b>
                        {product._id}
                      </ProductID>
                      <ProductColor color={product.color[0]} />
                      <ProductSize>
                        <b>Size : </b>
                        {product.size[0]}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <AddIcon />
                      <ProductAmount>{product_quantity[index]}</ProductAmount>
                      <RemoveIcon />
                    </ProductAmountContainer>
                    <ProductPrice>{`$${product.price}`}</ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>{`$${total}`}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ -5.80</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -7.0</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem total="total">
                <SummaryItemText>
                  <b>Total</b>
                </SummaryItemText>
                <SummaryItemPrice>
                  <b>{`$${total}`}</b>
                </SummaryItemPrice>
              </SummaryItem>
              <StripeCheckout
                name="Bazaar"
                image="https://img.freepik.com/free-vector/cute-dog-logo_1051-3349.jpg?w=740&t=st=1685336099~exp=1685336699~hmac=d2a4cac0620e2732aa2f995ac4f9c3f7f361df0e48575e2c689af99048b88055"
                billingAddress
                shippingAddress
                description={`Your total is $${total}`}
                amount={total * 100}
                token={onToken}
                stripeKey={process.env.REACT_APP_STRIPE}
              >
                <Button>CHECKOUT</Button>
              </StripeCheckout>
            </Summary>
          </Bottom>
        </Wrapper>
        <Footer />
      </Container>
    </div>
  );
}
