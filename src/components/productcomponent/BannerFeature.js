import { Box, Card, Container, Grid, Typography } from "@mui/material";
import React from "react";
import banner_image from "../../asset/images/banner_image.png";
import Bg from "../../asset/images/Bg.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Sample data array
const cardData = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    iconColor: "#E0CE8F",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    iconColor: "#E0CE8F",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    iconColor: "#E0CE8F",
  },
];

const CardComponent = ({ title, description, iconColor }) => (
  <Card
    sx={{
      borderRadius: "20px",
      backgroundColor: "#FFFFFF",
      height: "100%",
      width: "100%",
      maxWidth: "400px",
      padding: "20px",
      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    }}
  >
    <CheckCircleIcon sx={{ color: iconColor, fontSize: "60px" }} />
    <Typography
      sx={{
        color: "#000000",
        fontSize: "20px",
        lineHeight: "30px",
        fontWeight: "600",
        marginTop: "15px",
      }}
    >
      {title}
    </Typography>
    <Typography
      sx={{
        color: "#868686",
        fontSize: "14px",
        lineHeight: "24px",
        fontWeight: "400",
        marginTop: "10px",
      }}
    >
      {description}
    </Typography>
  </Card>
);

const BannerFeature = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FAF8EE",
        padding: { xs: "60px 0px", md: "90px 0px 250px" },
        position: "relative",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: { xs: "36px", md: "60px" },
          lineHeight: "auto",
          fontFamily: "Avenir LT Std",
          fontWeight: "600",
          color: "#3F5163",
          marginBottom: "50px",
        }}
      >
        Banners Features
      </Typography>

      <Container>
        <Grid
          container
          spacing={2}
          sx={{
            alignItems: "center",
            marginBottom: "50px",
            zIndex:"1",
            position:"relative",
          }}
        >
          <Grid item md={6} xs={12}>
            <Box
              sx={{
                backgroundColor: "#E0CE8F",
                borderRadius: "30px",
                width: "100%",
                height: "auto",
                aspectRatio: "499 / 540",
                overflow: "hidden",
              }}
            >
              <img
                alt="banner_image"
                src={banner_image}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box>
              <Typography
                sx={{
                  color: "#3F5163",
                  fontSize: { xs: "24px", md: "40px" },
                  lineHeight: "auto",
                  fontFamily: "Avenir LT Std",
                  fontWeight: "bold",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur
              </Typography>
              <Typography
                sx={{
                  color: "#8C8E8F",
                  fontSize: { xs: "14px", md: "18px" },
                  lineHeight: "24px",
                  fontWeight: "500",
                  marginTop: "10px",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur.
              </Typography>
              <Typography
                sx={{
                  color: "#8C8E8F",
                  fontSize: { xs: "14px", md: "18px" },
                  lineHeight: "24px",
                  fontWeight: "500",
                  marginTop: "10px",
                }}
              >
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
            sx={{
              
              height: "600px",
              width: "1000px",
              position: "absolute",
              zIndex: "0",
              backgroundColor: "white",
              marginTop:"-110px",
              borderRadius:"10px",
              display: {
                xs: 'none', 
                md: 'none', // Hide on medium screens (up to 960px)
                lg: 'none', // Hide on large screens (up to 1050px)
                xl: 'block', // Show on extra large screens (above 1050px)
              },
            }}
          ></Box>

        <Grid
          container
          spacing={2}
          sx={{
            alignItems: "flex-start",
            marginBottom: "50px",
            zIndex:"1",
            position:"relative",
          }}
        >
          <Grid item md={6} xs={12}>
            <Box sx={{ paddingLeft: { xs: "20px", md: "53px",marginTop:"4rem" } }}>
              <Typography
                sx={{
                  color: "#3F5163",
                  fontSize: { xs: "24px", md: "40px" },
                  lineHeight: "auto",
                  fontFamily: "Avenir LT Std",
                  fontWeight: "bold",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur
              </Typography>
              <Typography
                sx={{
                  color: "#8C8E8F",
                  fontSize: { xs: "14px", md: "18px" },
                  lineHeight: "24px",
                  fontWeight: "500",
                  marginTop: "10px",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur.
              </Typography>
              <Typography
                sx={{
                  color: "#8C8E8F",
                  fontSize: { xs: "14px", md: "18px" },
                  lineHeight: "24px",
                  fontWeight: "500",
                  marginTop: "10px",
                }}
              >
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Box>
          </Grid>
          <Grid item md={6} xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                backgroundColor: "#E0CE8F",
                borderRadius: "30px",
                width: "100%",
                height: "auto",
                aspectRatio: "499 / 540",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt="Bg"
                src={Bg}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <Container>
            <Grid container spacing={4} justifyContent="center">
              {cardData.map((card) => (
                <Grid key={card.id} item xs={12} sm={6} md={4}>
                  <CardComponent
                    title={card.title}
                    description={card.description}
                    iconColor={card.iconColor}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box> */}
      </Container>
    </Box>
  );
};

export default BannerFeature;
