import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Categories from "./Categories";
import Paper from "@mui/material/Paper";
import { Route, Routes } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
const Products = () => {
  return (
    <>
      {/* <h2>Products</h2> */}
      <Container sx={{ my: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Paper elevation={5}>
              <Categories />
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper elevation={5}>
              <Routes>
                <Route path=":category" element={<ProductList />} />
                <Route path="details/:id" element={<ProductDetails />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Products;
