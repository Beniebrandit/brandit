import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import installation_img from "../asset/images/installation_img.png";
import care_img from "../asset/images/care_img.png";

const Detail = () => {
  return (
    <Box sx={{ backgroundColor: "#CFE5F9", mt: 10 }}>
      <Container>
        <Grid container spacing={2} alignItems="center" sx={{ py: 5 }}>
          {/* Installation Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: { xs: "20px", md: "40px" } }}>
              <Typography
                sx={{
                  color: "#3F5163",
                  fontSize: { xs: "36px", md: "60px" },
                  lineHeight: "auto",
                  fontWeight: "600",
                }}
              >
                Installation
              </Typography>
              <Typography
                sx={{
                  color: "#8C8E8F",
                  fontSize: { xs: "14px", md: "18px" },
                  fontWeight: "500",
                  lineHeight: "28px",
                  mt: 2,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
                <Typography
                  sx={{
                    color: "#8C8E8F",
                    fontSize: { xs: "14px", md: "18px" },
                    fontWeight: "500",
                    lineHeight: "28px",
                    mt: 1,
                  }}
                >
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </Typography>
                <Typography
                  sx={{
                    color: "#8C8E8F",
                    fontSize: { xs: "14px", md: "18px" },
                    fontWeight: "500",
                    lineHeight: "28px",
                    mt: 1,
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              alt="installation_img"
              src={installation_img}
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              alt="care_img"
              src={care_img}
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: { xs: "20px", md: "40px" } }}>
              <Typography
                sx={{
                  color: "#3F5163",
                  fontSize: { xs: "36px", md: "60px" },
                  lineHeight: "auto",
                  fontWeight: "600",
                }}
              >
                Care
              </Typography>
              <Typography
                sx={{
                  color: "#8C8E8F",
                  fontSize: { xs: "14px", md: "18px" },
                  fontWeight: "500",
                  lineHeight: "28px",
                  mt: 2,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
                <Typography
                  sx={{
                    color: "#8C8E8F",
                    fontSize: { xs: "14px", md: "18px" },
                    fontWeight: "500",
                    lineHeight: "28px",
                    mt: 1,
                  }}
                >
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </Typography>
                <Typography
                  sx={{
                    color: "#8C8E8F",
                    fontSize: { xs: "14px", md: "18px" },
                    fontWeight: "500",
                    lineHeight: "28px",
                    mt: 1,
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Detail;
