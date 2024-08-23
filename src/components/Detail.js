import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import installation_img from "../asset/images/installation_img.png";
import care_img from "../asset/images/care_img.png"
const Detail = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "#CFE5F9", marginTop: "100px" }}>
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
          <Grid item md={6}>
            <Box sx={{ padding: "130px 150px 50px 220px" }}>
              <Typography
                sx={{
                  color: "#3F5163",
                  fontSize: "60px",
                  lineHeight: "auto",
                  fontWeight: "600",
                  
                }}
              >
                Installation
              </Typography>
              <Typography
                sx={{
                  color: "#8C8E8F",
                  fontSize: "18px",
                  fontWeight: "500",
                  lineHeight: "28px",
                  marginTop: "20px",
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
                    fontSize: "18px",
                    fontWeight: "500",
                    lineHeight: "28px",
                    marginTop: "10px",
                  }}
                >
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </Typography>
                <Typography
                  sx={{
                    color: "#8C8E8F",
                    fontSize: "18px",
                    fontWeight: "500",
                    lineHeight: "28px",
                    marginTop: "10px",
                  }}
                >
                  {" "}
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
          <Grid item md={6}>
            <img
              alt="installation_img"
              src={installation_img}
              width="100%"
              height="100%"
            />
          </Grid>
          <Grid item md={6}>
            <img
              alt="care_img"
              src={care_img}
              width="100%"
              height="100%"
            />
          </Grid>
          <Grid item md={6}>
            <Box sx={{ padding: "50px 220px 50px 90px" }}>
              <Typography
                sx={{
                  color: "#3F5163",
                  fontSize: "60px",
                  lineHeight: "auto",
                  fontWeight: "600",
                }}
              >
                Care
              </Typography>
              <Typography
                sx={{
                  color: "#8C8E8F",
                  fontSize: "18px",
                  fontWeight: "500",
                  lineHeight: "28px",
                  marginTop: "20px",
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
                    fontSize: "18px",
                    fontWeight: "500",
                    lineHeight: "28px",
                    marginTop: "10px",
                  }}
                >
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </Typography>
                <Typography
                  sx={{
                    color: "#8C8E8F",
                    fontSize: "18px",
                    fontWeight: "500",
                    lineHeight: "28px",
                    marginTop: "10px",
                  }}
                >
                  {" "}
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
      </Box>
    </>
  );
};

export default Detail;
