import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import installation_img from "../../asset/images/installation_img.png";
import care_img from "../../asset/images/care_img.png";

const Detail = () => {
  return (
    <Box sx={{ backgroundColor: "#EFF7FC", mt: 10 }}>
      <Grid
        container
        spacing={0}
        alignItems="center"
        sx={{ py: 0, "& .MuiGrid-item": { paddingLeft: "0px", paddingTop: "0px" } }}
      >
        {/* Installation Section */}
        <Grid item xs={12} md={6} sx={{ paddingTop: "0px" }}>
          <Box sx={{ padding: { xs: "20px", md: "40px", xl: "70px" } }}>
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
                fontSize: { xs: "14px", md: "16px", lg: "18px" },
                fontWeight: "500",
                lineHeight: "28px",
                mt: 2,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.
              <Typography
                sx={{
                  color: "#8C8E8F",
                  fontSize: { xs: "14px", md: "18px" },
                  fontWeight: "500",
                  lineHeight: "28px",
                  mt: 1,
                }}
              >
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            alt="installation_img"
            src={installation_img}
            sx={{
              width: "100%",
              height: { xs: "auto", md: "42rem" },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            alt="care_img"
            src={care_img}
            sx={{
              width: "100%",
              height: { xs: "auto", md: "42rem" },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ padding: { xs: "20px", md: "40px", xl: "70px" } }}>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.
              <Typography
                sx={{
                  color: "#8C8E8F",
                  fontSize: { xs: "14px", md: "18px" },
                  fontWeight: "500",
                  lineHeight: "28px",
                  mt: 1,
                }}
              >
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </Typography>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Detail;
