import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
const Product = ({ id, title, price, brand, rating, thumbnail }) => {
  return (
    <Card sx={{ margin: 1, padding: 1, width: 220 }}>
      <CardMedia
        component="img"
        alt=""
        height="130"
        image={thumbnail}
        sx={{ borderRadius: 2 }}
      />
      <CardContent>
        <Link to={`/details/${id}`} style={{ textDecoration: "none" }}>
          <h4>
            {id} - {title}
          </h4>
        </Link>
        <Typography>
          <b>Price: </b>
          {price}
        </Typography>
        <Rating name="read-only" value={rating} readOnly />
        <Typography>
          <b>Price: </b>
          {brand}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
