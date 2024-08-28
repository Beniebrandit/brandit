import React from 'react'
import HeaderHome from '../components/HeaderHome'
import Categories from '../components/Categories'
import TrendingProducts from '../components/TrendingProduct'
import WhyBranditSignage from '../components/WhyBranditSignage'
import ReviewCard from '../components/ReviewCard'
import Brandit_image from "../asset/images/Brandit.png";
import { Box, Container, Typography } from '@mui/material'
import HomeFooter from '../components/HomeFooter'

const HomePage = () => {
  return (
    <>
    <HeaderHome/>
    <Categories/>
    <TrendingProducts/>
    <WhyBranditSignage/>
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
              paddingLeft: {xs:"1rem",sm:"3rem"},
              color: "white",
            }}
          >
            Lorem ipsum dolor sit amet, <br />
            consectetur adipiscing elit.
          </Typography>
          <img
            src={Brandit_image}
            alt=""
            style={{ margin: "auto", height: "100%", width: "100%" }}
          />
        </Container>
      </Box>
    <HomeFooter/>
    </>
  )
}

export default HomePage