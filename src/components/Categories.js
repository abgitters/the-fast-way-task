import React, { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";

const Link = styled(NavLink)({
  color: "#fff",
  padding: "3px 10px",
  margin: 10,
  display: "block",
  textDecoration: "none",
});

const Categories = () => {
  const { category } = useParams();
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);

  const loadCategories = () => {
    axios
      .get("https://dummyjson.com/products/categories?limit=100")
      .then((response) => {
        setCategoryList(response?.data);
      })
      .catch(console.error);
  };

  const loadBrands = () => {
    axios
      .get(`https://dummyjson.com/products/category/${category}?select=brand`)
      .then(async (response) => {
        const details = await response?.data?.products;
        setBrandList(details);
        console.log(details);
      })
      .catch((err) => console.error(err));
  };

  console.log("brand list", brandList);

  useEffect(() => {
    loadCategories();
  }, [category]);

  useEffect(() => {
    loadBrands();
  }, [category]);
  return (
    <Box sx={{ p: 1, backgroundColor: "#e9d6e18f" }}>
      {/*-----------------------------------Categories Accordion */}
      <Accordion sx={{ backgroundColor: "#d3abc2d6" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="aside"
            sx={{
              p: 2,
              backgroundColor: "#8bb0cb",
              borderRadius: 2,
            }}
          >
            <Link
              to={`/all`}
              end
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#f00" : "#f008",
              })}
            >
              all
            </Link>
            {Array.isArray(categoryList) &&
              categoryList.map((cat, i) => (
                <Link
                  key={cat + i}
                  to={`/${cat}`}
                  end
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#f00" : "#f008",
                  })}
                >
                  {cat}
                </Link>
              ))}
          </Box>
        </AccordionDetails>
      </Accordion>
      {/*----------------------------------------Brand Accordion */}
      <Accordion sx={{ backgroundColor: "#d3abc2d6" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Brand</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {Array.isArray(brandList) &&
            brandList.map((brand, i) => (
              <Link
                key={brand + i}
                // to={`/${brand}`}
                end
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#f00" : "#f008",
                })}
              >
                {brand?.brand}
              </Link>
            ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Categories;
