import { Container, Box, Typography, Grid } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Services = () => {
  return (
    <>
      <Container sx={{ marginTop: "130px" }}>
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: "30px", // Mobile
                sm: "35px", // Small tablets
                md: "50px", // Tablets and small laptops
                lg: "60px", // Larger laptops and desktops
              },
              lineHeight: "auto",
              fontFamily: "Avenir LT Std",
              fontWeight: "bold",
              color: "#3F5163",
            }}
          >
            Lorem Ipsum dummy text 
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              lineHeight: "28px",
              color: "#8C8E8F",
              fontWeight: "500",
              marginTop: "23px",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at nisi tincidunt, iaculis velit ac, suscipit
            elit.
          </Typography>
        </Box>
        <Box sx={{ marginTop: "70px" }}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12} sm={12}>
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  borderRadius: "20px",
                  position: "relative",
                  padding: "30px",
                  marginTop: "30px",
                }}
              >
                <CheckCircleIcon
                  sx={{
                    fontSize: "90px",
                    position: "absolute",
                    top: "-15%",
                    color: "#E0CE8F",
                  }}
                />
                <Box sx={{ marginTop: "30px" }}>
                  <Typography
                    sx={{
                      color: "#3F5163",
                      fontSize: "26px",
                      lineHeight: "34px",
                      fontWeight: "600",
                    }}
                  >
                    Lorem Ipsum is simply dummy text
                  </Typography>
                  <Typography
                    sx={{
                      color: "#8C8E8F",
                      fontSize: "18px",
                      lineHeight: "28px",
                      fontWeight: "400",
                      marginTop: "10px",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at nisi tincidunt, iaculis velit ac,
                    suscipit elit. Vestibulum tincidunt vel metus sit amet condimentum
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12} sm={12}>
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  borderRadius: "20px",
                  position: "relative",
                  padding: "30px",
                  marginTop: "30px",
                }}
              >
                <CheckCircleIcon
                  sx={{
                    fontSize: "90px",
                    position: "absolute",
                    top: "-15%",
                    color: "#E0CE8F",
                  }}
                />
                <Box sx={{ marginTop: "30px" }}>
                  <Typography
                    sx={{
                      color: "#3F5163",
                      fontSize: "26px",
                      lineHeight: "34px",
                      fontWeight: "600",
                    }}
                  >
                    Lorem Ipsum is simply dummy text
                  </Typography>
                  <Typography
                    sx={{
                      color: "#8C8E8F",
                      fontSize: "18px",
                      lineHeight: "28px",
                      fontWeight: "400",
                      marginTop: "10px",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at nisi tincidunt, iaculis velit ac,
                    suscipit elit. Vestibulum tincidunt vel metus sit amet condimentum
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12} sm={12}>
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  borderRadius: "20px",
                  position: "relative",
                  padding: "30px",
                  marginTop: "30px",
                }}
              >
                <CheckCircleIcon
                  sx={{
                    fontSize: "90px",
                    position: "absolute",
                    top: "-15%",
                    color: "#E0CE8F",
                  }}
                />
                <Box sx={{ marginTop: "30px" }}>
                  <Typography
                    sx={{
                      color: "#3F5163",
                      fontSize: "26px",
                      lineHeight: "34px",
                      fontWeight: "600",
                    }}
                  >
                    Lorem Ipsum is simply dummy text
                  </Typography>
                  <Typography
                    sx={{
                      color: "#8C8E8F",
                      fontSize: "18px",
                      lineHeight: "28px",
                      fontWeight: "400",
                      marginTop: "10px",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at nisi tincidunt, iaculis velit ac,
                    suscipit elit. Vestibulum tincidunt vel metus sit amet condimentum
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12} sm={12}>
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  borderRadius: "20px",
                  position: "relative",
                  padding: "30px",
                  marginTop: "30px",
                }}
              >
                <CheckCircleIcon
                  sx={{
                    fontSize: "90px",
                    position: "absolute",
                    top: "-15%",
                    color: "#E0CE8F",
                  }}
                />
                <Box sx={{ marginTop: "30px" }}>
                  <Typography
                    sx={{
                      color: "#3F5163",
                      fontSize: "26px",
                      lineHeight: "34px",
                      fontWeight: "600",
                    }}
                  >
                    Lorem Ipsum is simply dummy text
                  </Typography>
                  <Typography
                    sx={{
                      color: "#8C8E8F",
                      fontSize: "18px",
                      lineHeight: "28px",
                      fontWeight: "400",
                      marginTop: "10px",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at nisi tincidunt, iaculis velit ac,
                    suscipit elit. Vestibulum tincidunt vel metus sit amet condimentum
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Services;
