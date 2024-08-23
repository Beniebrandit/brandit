import { Box, Card, Container, Grid, Typography } from "@mui/material";
import React from "react";
import banner_image from "../asset/images/banner_image.png";
import Bg from "../asset/images/Bg.png";
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
      width: "80%",
      padding: "20px 40px",
      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    }}
  >
    <CheckCircleIcon sx={{ color: iconColor, fontSize: "90px" }} />
    <Typography
      sx={{
        color: "#000000",
        fontSize: "26px",
        lineHeight: "40px",
        fontWeight: "600",
        marginTop: "20px",
      }}
    >
      {title}
    </Typography>
    <Typography
      sx={{
        color: "#868686",
        fontSize: "16px",
        lineHeight: "30px",
        fontWeight: "400",
        marginTop: "20px",
      }}
    >
      {description}
    </Typography>
  </Card>
);

const BannerFeature = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#FAF8EE",
          marginTop: "90px",
          padding: "90px 0px 250px 0px",
          position: "relative",
          height: "100%",
          zIndex:"-2"
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "60px",
            lineHeight: "auto",
            fontFamily: "Avenir LT Std",
            fontWeight: "600",
            color: "#3F5163",
          }}
        >
          Banners Features
        </Typography>

        <Container>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <Grid item md={6} sm={12} xs={12}>
              {" "}
              <Box
                sx={{
                  backgroundColor: "#E0CE8F",
                  borderRadius: "30px",
                  width: "499px",
                  height: "540px",
                }}
              >
                <img
                  alt="banner_image"
                  src={banner_image}
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              {" "}
              <Box sx={{}}>
                <Typography
                  sx={{
                    color: "#3F5163",
                    fontSize: "40px",
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
                    fontSize: "18px",
                    lineHeight: "28px",
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
                    fontSize: "18px",
                    lineHeight: "28px",
                    fontWeight: "500",
                    marginTop: "10px",
                  }}
                >
                  {" "}
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
              zIndex: "-1",
              backgroundColor: "white",
              marginTop:"-70px",
              borderRadius:"10px"
            }}
          ></Box>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "flex-start",
              marginTop: "50px",
              marginBottom: "50px",
              position:"relative"
            }}
          >
            <Grid item md={6} sm={12} xs={12} >
              {" "}
              <Box sx={{paddingLeft:"53px",marginTop:"50px"}}>
                <Typography
                  sx={{
                    color: "#3F5163",
                    fontSize: "40px",
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
                    fontSize: "18px",
                    lineHeight: "28px",
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
                    fontSize: "18px",
                    lineHeight: "28px",
                    fontWeight: "500",
                    marginTop: "10px",
                  }}
                >
                  {" "}
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </Typography>
              </Box>
            </Grid>
            <Grid item md={6} sm={12} xs={12} sx={{position:"relative"}}>
              {" "}
              <Box
                sx={{
                  backgroundColor: "#E0CE8F",
                  borderRadius: "30px",
                  width: "499px",
                  height: "540px",
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <img
                  alt="banner_image"
                  src={Bg}
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Grid>
          </Grid>

          <Box sx={{position:"absolute",bottom:"-6%",left:"10%"}}>
            <Container>
              <Grid container spacing={4}>
                {cardData.map((card) => (
                  <Grid key={card.id} item md={4} sm={12} xs={12}>
                    <CardComponent
                      title={card.title}
                      description={card.description}
                      iconColor={card.iconColor}
                    />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BannerFeature;
