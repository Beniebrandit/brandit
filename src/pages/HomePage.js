import React from 'react'
import HeaderHome from '../components/HeaderHome'
import Categories from '../components/Categories'
import TrendingProducts from '../components/TrendingProduct'
import WhyBranditSignage from '../components/WhyBranditSignage'
import ReviewCard from '../components/ReviewCard'
import Brandit_image from "../asset/images/Brandit.png";
import { Box, Container } from '@mui/material'
import HomeFooter from '../components/HomeFooter'

const HomePage = () => {
  return (
    <>
    <HeaderHome/>
    <Categories/>
    <TrendingProducts/>
    <WhyBranditSignage/>
    <ReviewCard />
    <Box sx={{marginTop:"5rem"}}>
        <Container>
          <h1 style={{position:"absolute",textAlign:"left",width:"30rem",marginTop:"20%",paddingLeft:"3rem",color:"white"}}>Lorem ipsum dolor sit amet, 
          consectetur adipiscing elit.</h1>
          <img src={Brandit_image} alt="" style={{margin:"auto",height:"100%" , width:"100%"}} />
        </Container>
    </Box>
    <HomeFooter/>
    </>
  )
}

export default HomePage