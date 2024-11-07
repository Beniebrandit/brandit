import { Box, Container, Typography, Button, TextField } from "@mui/material";
import banner1 from "../../asset/images/banner1.png";
import MaskGroup from "../../asset/images/Mask Group.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useState } from "react";
import PopUp from "./Pop_Up";
import Navbar from "./Navbar";

const HeaderHome = ({ handleClickOpenLogin, handleClickOpenSignUp }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <PopUp open={open} handleClose={handleClose} />

      <Box>
        <Navbar handleClickOpenSignUp={handleClickOpenSignUp} handleClickOpenLogin={handleClickOpenLogin} />

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src={banner1}
              width="100%"
              height="100%"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </div>

          <Box
            sx={{
              position: "relative",
              zIndex: 99,
              padding: "70px 50px 130px",
              marginLeft: {
                lg: "10rem",
                md: "8rem",
              },
              marginTop: "1rem",
            }}
          >
            {/*<Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={star} alt="star" />
            <Typography sx={{ fontSize: { xs: "13px", sm: "16px" }, padding: "1rem" }}>
              Rated By Hundreds Of Satisfied Customers
            </Typography>
          </Box>*/}
            <Typography
              sx={{
                fontSize: {
                  xs: "40px",
                  sm: "35px",
                  color: " white",
                  fontWeight: "600",
                  lineHeight: "52.8px",
                  margin: 0,
                  //fontSize: "40px",
                },
              }}
            >
              CREATE <br />
              SIGN IN MINUTES!
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", paddingTop: "5px" }}>
              <CheckCircleIcon sx={{ fontSize: { xs: "18px", sm: "24px" }, color: "white" }} />
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "400",
                  //margin: "16px 0 0 0",
                  fontSize: { xl: "20px", sm: "16px" },
                  lineHeight: "30px",
                }}
                // sx={{ fontSize: { xs: "13px", sm: "16px" } }}
              >
                High-quality materials and printing
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", paddingTop: "5px" }}>
              <CheckCircleIcon sx={{ fontSize: { xs: "18px", sm: "24px" }, color: "white" }} />

              <Typography
                sx={{
                  color: "white",
                  fontWeight: "400",

                  fontSize: { xl: "20px", sm: "16px" },
                  lineHeight: "30px",
                }}
              >
                Fast and easy online customization
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", paddingTop: "5px" }}>
              <CheckCircleIcon sx={{ fontSize: { xs: "18px", sm: "24px" }, color: "white" }} />

              <Typography
                sx={{
                  color: "white",
                  fontWeight: "400",
                  fontSize: { xl: "20px", sm: "16px" },
                  lineHeight: "30px",
                }}
              >
                Perfect for events, promotions, and branding
              </Typography>
            </Box>
          </Box>
        </div>
        {/*<Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              marginLeft: {
                lg: "10rem",
                md: "8rem",
              },
              padding: "2rem",
            }}
            className="demophoto"
          >
            <Box>
              <img src={MaskGroup} alt="MaskGroup" height={90} style={{ display: "block", margin: "auto" }} />
            </Box>
            <Box sx={{ padding: { sx: "2rem", sm: "1rem" } }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", sm: "flex-start" },
                  alignItems: "center",
                }}
              >
                <img src={star} alt="star" style={{ display: "block" }} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", sm: "flex-start" },
                  alignItems: "center",
                }}
              >
                <Typography sx={{ textAlign: { sx: "center", sm: "left" } }}>John Doe</Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    width: { sx: "200px", sm: "300px" },
                    // textAlign: { sx: "center", sm: "left" }, not working in inline
                  }}
                  className="protext"
                >
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>*/}
      </Box>
      <Box sx={{ margin: "auto", marginTop: "-3rem", position: "relative" }}>
        <Container
          sx={{
            width: {
              lg: "1200px",
              md: "40rem",
              sm: "35rem",
            },
          }}
        >
          <Box
            sx={{
              display: "grid",
              // gridTemplateColumns: "3fr 2fr 1fr 1fr 1.5fr",
              gridTemplateColumns: {
                xl: "repeat(5, 1fr)", //
                lg: "repeat(5, 1fr)",
                md: "repeat(3, 1fr)",
                sm: "repeat(2 ,1fr)",
                xs: "repeat(1 ,1fr)",
              },
              gap: "1rem",
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "1rem",
              // border:"1px solid gray",
              boxShadow: "10px 10px 35px -15px",
            }}
          >
            <Box sx={{ margin: "auto" }}>
              <Typography>Material</Typography>
              <TextField placeholder="Stickers and Decals" sx={{ padding: "6.5px 14px !important" }} />
            </Box>
            <Box sx={{ margin: "auto" }}>
              <Typography>Size</Typography>
              <TextField placeholder="6 x 24" />
            </Box>
            <Box sx={{ margin: "auto" }}>
              <Typography>Qty</Typography>
              <TextField placeholder="1" />
            </Box>
            <Box sx={{ margin: "auto" }}>
              <Box
                sx={{
                  width: "10rem",
                  margin: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography>$10.65</Typography>
                <Typography>
                  <span style={{ color: "#E0CE8F" }}>$13.31</span> each{" "}
                </Typography>
              </Box>
            </Box>
            <Button onClick={handleOpen} sx={{ width: "7rem", margin: "auto" }}>
              Design Now
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HeaderHome;
