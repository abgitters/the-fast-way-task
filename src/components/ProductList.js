import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import axios from "axios";
import Product from "./Product";

const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let url = "https://dummyjson.com/products?limit=100";

    if (category != "all")
      url = `https://dummyjson.com/products/category/${category}`;

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data?.products);
      })
      .catch(console.error);
  }, [category]);
  return (
    <>
      <Box
        component="section"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          backgroundColor: "#a0e1e1",
          padding: 2,
          borderRadius: 1,
        }}
      >
        {Array.isArray(products) &&
          products.map((prod, i) => <Product key={prod.id} {...prod} />)}
      </Box>
    </>
  );
};

export default ProductList;
