import { Box, Card, Container, Grid, Typography } from "@mui/material";
import React from "react";
import banner_image from "../asset/images/banner_image.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
              <Box sx={{ paddingLeft: "80px" }}>
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
                    fontFamily: "Cerebri Sans",
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
                    fontFamily: "Cerebri Sans",
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

          <Box sx={{ position: "absolute", top: "85%", left: "10%" }}>
            <Container>
              <Grid container spacing={4}>
                <Grid item md={4} sm={12} xs={12}>
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
                    <CheckCircleIcon
                      sx={{ color: "#E0CE8F", fontSize: "90px" }}
                    />
                    <Typography
                      sx={{
                        color: "#000000",
                        fontSize: "26px",
                        lineHeight: "40px",
                        fontWeight: "600",
                        marginTop: "20px",
                      }}
                    >
                      Lorem ipsum dolor
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
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </Typography>
                  </Card>
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
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
                    <CheckCircleIcon
                      sx={{ color: "#E0CE8F", fontSize: "90px" }}
                    />
                    <Typography
                      sx={{
                        color: "#000000",
                        fontSize: "26px",
                        lineHeight: "40px",
                        fontWeight: "600",
                        marginTop: "20px",
                      }}
                    >
                      Lorem ipsum dolor
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
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </Typography>
                  </Card>
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
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
                    <CheckCircleIcon
                      sx={{ color: "#E0CE8F", fontSize: "90px" }}
                    />
                    <Typography
                      sx={{
                        color: "#000000",
                        fontSize: "26px",
                        lineHeight: "40px",
                        fontWeight: "600",
                        marginTop: "20px",
                      }}
                    >
                      Lorem ipsum dolor
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
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BannerFeature;
