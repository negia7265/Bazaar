import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "./data";
import ProductItems from "./ProductItems";
import axios from "axios";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default function Products({ cat, filter, sort }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  function isFiltered(item) {
    if (
      filter.color &&
      filter.size &&
      item.color.includes(filter.color) &&
      item.size.includes(filter.size)
    )
      return true;
    else if (item.color && item.color.includes(filter.color)) return true;
    else if (item.size && item.size.includes(filter.size)) return true;
    else return false;
  }
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products/all?category=${cat}`
            : "http://localhost:5000/api/allproducts"
        );
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);
  // useEffect(() => {
  //   cat &&
  //     setFilteredProducts(
  //       products.filter(
  //         (item) =>
  //           // Object.entries(filter).every(([key, value]) =>
  //           //   item[key].includes(value)
  //           // )
  //           item.color[0] === filter.color
  //       )
  //     );
  // }, [products, cat, filter]);
  useEffect(() => {
    async function filtered() {
      cat && setFilteredProducts(products.filter((item) => isFiltered(item)));
    }
    filtered();
  }, [products, cat, filter]);
  useEffect(() => {
    if (sort === "Newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "Price(asc)") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => parseInt(a.price) - parseInt(b.price))
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => parseInt(b.price) - parseInt(a.price))
      );
    }
  }, [sort]);

  return (
    <div>
      <Container>
        {filteredProducts.length === 0
          ? products.map((item) => <ProductItems item={item} />)
          : filteredProducts.map((item) => <ProductItems item={item} />)}
      </Container>
    </div>
  );
}
