import React from "react";
import Categories from "../components/landingcomponent/Categories";
import TrendingProducts from "../components/landingcomponent/TrendingProduct";
import WhyBranditSignage from "../components/landingcomponent/WhyBranditSignage";
import ReviewCard from "../components/common/ReviewCard";
import Brandit_image from "../asset/images/Brandit.png";
import { Box, Container, Typography } from "@mui/material";
import HomeFooter from "../components/landingcomponent/HomeFooter";
import HeaderHome from "../components/landingcomponent/Banner";

const HomePage = () => {
  return (
    <>
      <HeaderHome />
      <Categories />
      <TrendingProducts />
      <WhyBranditSignage />
      <ReviewCard />
      <Box sx={{ marginTop: "5rem" }}>
        <Container>
          <Typography
            sx={{
              position: "absolute",
              textAlign: "left",
              fontSize: {
                xs: "12px", // Mobile
                sm: "26px", // Small tablets
                md: "30px", // Tablets and small laptops
                lg: "40px", // Larger laptops and desktops
              },
              // width: "auto",
              marginTop: "16%",
              paddingLeft: { xs: "1rem", sm: "3rem" },
              color: "white",
            }}
          >
            Lorem ipsum dolor sit amet, <br />
            consectetur adipiscing elit.
          </Typography>
          <img src={Brandit_image} alt="" style={{ margin: "auto", height: "100%", width: "100%" }} />
        </Container>
      </Box>
      <HomeFooter />
    </>
  );
};

export default HomePage;
