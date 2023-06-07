import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const [currentRating, setCurrentRating] = React.useState(0);
  const theme = useTheme();
  const maxSteps = product?.images?.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res?.data);
        setCurrentRating(res?.data?.rating);
      })
      .catch(console.error);
  }, [id]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>{product?.title}</h2>
      {/*-----------------------------------------------Carousal */}
      <Box sx={{ maxWidth: 800, flexGrow: 1 }}>
        <Paper elevation={3} sx={{ p: 1, borderRadius: 2 }}>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {product?.images?.map((step, i) => (
              <div key={i}>
                {Math.abs(activeStep - i) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: 255,
                      display: "block",
                      maxWidth: 800,
                      overflow: "hidden",
                      width: "100%",
                      borderRadius: 1,
                    }}
                    src={step}
                    alt=""
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Paper>
      </Box>
      {/*-------------------------------------------Description */}
      <Box>
        <Typography>
          <b style={{ marginRight: 2, fontSize: 20 }}>Price : $</b>
          {product?.price}
        </Typography>
        <Typography>
          <b style={{ marginRight: 2, fontSize: 20 }}>Rating :</b>
          <Rating name="read-only" value={currentRating} readOnly />
        </Typography>
        <Typography>
          <b style={{ marginRight: 2, fontSize: 20 }}>Description :</b>
          {product?.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductDetails;
