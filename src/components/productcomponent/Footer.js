import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import facebook1 from "../../asset/images/facebook1.png";
import facebook2 from "../../asset/images/facebook2.png";
import facebook3 from "../../asset/images/facebook3.png";
import facebook4 from "../../asset/images/facebook4.png";
import facebook5 from "../../asset/images/facebook5.png";
import facebook6 from "../../asset/images/facebook6.png";
import facebook7 from "../../asset/images/facebook7.png";
import facebook8 from "../../asset/images/facebook8.png";
import visa from "../../asset/images/visa_image.svg";
import paypal from "../../asset/images/paypal_image.svg";
import twitter from "../../asset/images/twiiter1.svg";
import facebook from "../../asset/images/facebook.svg";
import youtube from "../../asset/images/youtube.svg";
import logo from "../../asset/images/logo1.svg";
import logo2 from "../../asset/images/logo2.svg";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";


const Footer = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#EFF7FC",
          marginTop: "100px",
          paddingBottom: "90px",
        }}
      >
        <Container sx={{ paddingTop: "90px" }}>
          <Grid container spacing={2}>
            <Grid item md={4} sm={12} xs={12}>
              <Box sx={{ display: "flex", gap: "1rem", padding: "0rem 0rem 1rem 0rem" }}>
                <img alt="footer_logo" src={logo} />
                <img alt="footer_logo" src={logo2} />
              </Box>
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "27px",
                  color: "#545454",
                  fontWeight: "600",
                }}
              >
                Brandit brings your brand to life from the moment you get in touch{" "}
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "20px",
                  fontWeight: "600",
                  lineHeight: "17px",
                  marginTop: "20px",
                }}
              >
                Follow Us{" "}
              </Typography>
              <Box sx={{ marginTop: "20px", display: "flex", gap: "1rem" }}>
                <Box className="social-icon">
                  <img src={twitter} alt="Twitter" height="16" width="21px" />
                </Box>
                {/* <Box className="social-icon" sx={{ backgroundColor: "#3F5163" }}>
                  <img src={printrest} alt="Printrest" width="20px" height="23px" />
                </Box> */}
                <Box className="social-icon">
                  <img src={facebook} alt="facebook" width="12px" height="22px" />
                </Box>
                <Box className="social-icon">
                  <img src={youtube} alt="youtube" width="22px" height="15.46px" />
                </Box>
              </Box>
            </Grid>

            <Grid item md={2} sm={12} xs={12}>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "17px",
                }}
              >
                Shop
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "27px",
                  color: "#545454",
                  fontWeight: "600",
                  marginTop: "30px",
                }}
              >
                Shop apparel
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "27px",
                  color: "#545454",
                  fontWeight: "600",
                  marginTop: "10px",
                }}
              >
                Shop Promo/Gifts
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "27px",
                  color: "#545454",
                  fontWeight: "600",
                  marginTop: "10px",
                }}
              >
                Brandit.net
              </Typography>
            </Grid>

            <Grid item md={2} sm={12} xs={12}>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "17px",
                }}
              >
                Quick Link
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "27px",
                  color: "#545454",
                  fontWeight: "600",
                  marginTop: "30px",
                }}
              >
                Shop apparel
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "27px",
                  color: "#545454",
                  fontWeight: "600",
                  marginTop: "10px",
                }}
              >
                Shop Promo/Gifts
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "27px",
                  color: "#545454",
                  fontWeight: "600",
                  marginTop: "10px",
                }}
              >
                Brandit.net
              </Typography>
            </Grid>

            <Grid item md={4} sm={12} xs={12}>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "17px",
                  marginBottom: "30px",
                }}
              >
                Facebook
              </Typography>
              <Grid container spacing={1}>
                <Grid item md={3}>
                  <img alt="facebook1" src={facebook1} width="100%" height="100%" />
                </Grid>
                <Grid item md={3}>
                  <img alt="facebook2" src={facebook2} width="100%" height="100%" />
                </Grid>
                <Grid item md={3}>
                  <img alt="facebook3" src={facebook3} width="100%" height="100%" />
                </Grid>
                <Grid item md={3}>
                  <img alt="facebook4" src={facebook4} width="100%" height="100%" />
                </Grid>
                <Grid item md={3}>
                  <img alt="facebook5" src={facebook5} width="100%" height="100%" />
                </Grid>
                <Grid item md={3}>
                  <img alt="facebook6" src={facebook6} width="100%" height="100%" />
                </Grid>
                <Grid item md={3}>
                  <img alt="facebook7" src={facebook7} width="100%" height="100%" />
                </Grid>
                <Grid item md={3}>
                  <img alt="facebook8" src={facebook8} width="100%" height="100%" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/*<Grid container sx={{ marginTop: "30px" }} spacing={8}>
            <Grid item md={3} sm={12} xs={12}>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "17px",
                }}
              >
                Customer Service
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "27px",
                  color: "#545454",
                  fontWeight: "600",
                  marginTop: "30px",
                }}
              >
                Lorem Ipsum
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "27px",
                  color: "#545454",
                  fontWeight: "600",
                  marginTop: "10px",
                }}
              >
                Lorem Ipsum
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "27px",
                  color: "#545454",
                  fontWeight: "600",
                  marginTop: "10px",
                }}
              >
                Lorem Ipsum
              </Typography>
            </Grid>

            <Grid item md={2} sm={12} xs={12}>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "17px",
                }}
              >
                Shop
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "27px",
                  color: "#545454",
                  fontWeight: "600",
                  marginTop: "30px",
                }}
              >
                Shop apparel
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "27px",
                  color: "#545454",
                  fontWeight: "600",
                  marginTop: "10px",
                }}
              >
                Shop Promo/Gifts
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "27px",
                  color: "#545454",
                  fontWeight: "600",
                  marginTop: "10px",
                }}
              >
                Brandit.net
              </Typography>
            </Grid>

            <Grid item md={3} sm={12} xs={12}>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "17px",
                }}
              >
                Recent News
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "30px",
                }}
              >
                <img alt="blog1_img" src={blog1_img} width="20%" height="20%" />
                <Box sx={{ marginLeft: "10px" }}>
                  <Typography>Lorem Ipsum is dummy text</Typography>
                  <Typography>Aug 12 | 2017</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "30px",
                }}
              >
                <img alt="blog1_img" src={blog1_img} width="20%" height="20%" />
                <Box sx={{ marginLeft: "10px" }}>
                  <Typography>Lorem Ipsum is dummy text</Typography>
                  <Typography>Aug 12 | 2017</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item md={4} sm={12} xs={12}>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "17px",
                }}
              >
                Instagram
              </Typography>
              <Box sx={{ marginTop: "30px", padding: "3px" }}>
                <Button sx={{ color: "#545454", border: "1px solid #545454", margin: "3px" }}>STDIO</Button>
                <Button sx={{ color: "#545454", border: "1px solid #545454", margin: "3px" }}>EVENT</Button>
                <Button sx={{ color: "#545454", border: "1px solid #545454", margin: "3px" }}>SPORTS</Button>
                <Button sx={{ color: "#545454", border: "1px solid #545454", margin: "3px" }}>BLOG</Button>
                <Button sx={{ color: "#545454", border: "1px solid #545454", margin: "3px" }}>CLEAN</Button>
                <Button sx={{ color: "#545454", border: "1px solid #545454", margin: "3px" }}>CREATIVE</Button>
                <Button sx={{ color: "#545454", border: "1px solid #545454", margin: "3px" }}>ELEGENT</Button>
                <Button sx={{ color: "#545454", border: "1px solid #545454", margin: "3px" }}>MINIMAL</Button>
                <Button sx={{ color: "#545454", border: "1px solid #545454", margin: "3px" }}>MEGA</Button>
              </Box>
            </Grid>
          </Grid>*/}
        </Container>
      </Box>
      <Box sx={{ backgroundColor: "#F9F9F9", height: "196px" }}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            flexWrap: "wrap",
            paddingRight: { xs: "24px", lg: "90px !important" }
          }}
        >
          <Grid item md={6} sm={12} xs={12}>
            <Typography sx={{ color: "black", fontWeight: "600", fontSize: "20px", margin: "auto" }}>
              PAYMENT OPTIONS
            </Typography>
            <Box sx={{ margin: "auto" }}>
              <img src={visa} alt="" />
              &nbsp;&nbsp;
              <img src={paypal} alt="" />
            </Box>
          </Grid>

          <Grid item md={6} sm={12} xs={12} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ color: "black", fontWeight: "600", fontSize: "20px", width: "53%" }}>
              Subscribe
            </Typography>
            <Box>
              <TextField
                placeholder="Email address"
                sx={{
                  borderRadius: "0px !important",
                  marginTop: "10px",
                  backgroundColor: "white",
                  "& .MuiInputBase-input": { padding: "6.5px 14px !important" },
                }}
              />
              <Button
                sx={{
                  backgroundColor: "#3F5163",
                  marginTop: "10px",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#3F5163",
                  },
                }}
              >
                <ArrowForwardIosOutlinedIcon />
              </Button>
            </Box>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: "#3F5163", padding: "90px 0px 160px 0px" }}>
        <Container>
          <Grid container gap={1} columns={13}>
            <Grid item md={4} sm={12} xs={12} sx={{ margin: "0 auto" }}>
              <Typography sx={{ color: "#FFFFFF", fontWeight: "600", fontSize: "20px" }}>Address</Typography>
              <Typography sx={{ color: "#FFFFFF", textAlign: "start", marginTop: "10px" }}>
                Graphics Sign Shop 2773 Jefferson Street Austell,GA 30168
              </Typography>
            </Grid>
            <Grid item md={4} sm={12} xs={12} sx={{ margin: "auto" }}>
              <Typography sx={{ color: "#FFFFFF", fontWeight: "600", fontSize: "20px" }}>Help</Typography>
              <Typography sx={{ color: "#FFFFFF", marginTop: "10px" }}>
                Reach out and connect with the Brandit team and we'll bring your vision to life without delay.when your
                brand is at stake ,why wait?
              </Typography>
            </Grid>
            <Grid item md={4} sm={12} xs={12} sx={{ margin: "auto" }}>
              <Box
                sx={{ display: { md: "flex", sm: "block" }, margin: "auto", justifyContent: { sm: "center", xs: "left" }, alignItems: "center", height: "100%" }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#E0CE8F",
                    color: "#3F5163",
                    borderRadius: "8px",
                    fontWeight: "400",
                    padding: "9px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#E0CE8F",
                    },
                    margin: { sm: "auto", xs: "20px 0" },
                    width: "174px",
                    height: "60px",
                  }}
                >
                  Contact Us{" "}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
