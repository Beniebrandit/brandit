import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import footer_logo from "../../asset/images/footer_logo.png";
import blog1_img from "../../asset/images/blog1_img (1).png";
import care_img from "../../asset/images/care_img.png";
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
import linkedin_logo from "../../asset/images/linkedin_logo.svg";

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
              <img alt="footer_logo" src={footer_logo} width="50%" height="30%" />
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "27px",
                  color: "#545454",
                  fontWeight: "600",
                  marginTop: "10px",
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
                  <img src={facebook} alt="facebook" width="12px" height="22px" />
                </Box>
                <Box className="social-icon">
                  <img src={twitter} alt="Twitter" height="16" width="21px" />
                </Box>
                <Box className="social-icon">
                  <img
                    src={linkedin_logo}
                    alt="youtube"
                    width="22px"
                    height="15.46px"
                    style={{
                      backgroundColor: "#3F5163",
                      height: "auto",
                      width: "auto",
                      padding: "3px",
                      borderRadius: "3px",
                    }}
                  />
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
                About Us
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
                About Brandit{" "}
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
                  <img alt="facebook2" src={facebook2} />
                </Grid>
                <Grid item md={3}>
                  <img alt="facebook3" src={facebook3} />
                </Grid>
                <Grid item md={3}>
                  <img alt="facebook4" src={facebook4} />
                </Grid>
                <Grid item md={3}>
                  <img alt="facebook5" src={facebook5} />
                </Grid>
                <Grid item md={3}>
                  <img alt="facebook6" src={facebook6} />
                </Grid>
                <Grid item md={3}>
                  <img alt="facebook7" src={facebook7} />
                </Grid>
                <Grid item md={3}>
                  <img alt="facebook8" src={facebook8} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            style={{
              marginTop: "30px",
              marginLeft: "0px",
              width: "auto",
            }}
            spacing={8}
          >
            <Grid className="customGridItem" sx={{ paddingLeft: "0px" }} item md={4} sm={12} xs={12}>
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
                  textAlign: "left",
                  fontSize: "18px",
                  lineHeight: "27px",
                  color: "#545454",
                  fontWeight: "600",
                  marginTop: "40px",
                  width: "22rem",
                }}
              >
                Need help? Just give us call at <span style={{ color: "#E0CE8F" }}> 800-905-8851</span> or email us at{" "}
                <span style={{ color: "#E0CE8F" }}> contactus@brandit.net</span> and one of our associates will be happy
                to assist you
              </Typography>
            </Grid>

            <Grid className="customGridItem" item md={4} sm={12} xs={12}>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "17px",
                }}
              >
                Recent Blogs
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

            <Grid className="customGridItem" item md={4} sm={12} xs={12}>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "17px",
                }}
              >
                Youtube
              </Typography>
              <Box sx={{ marginTop: "30px", height: "53%" }}>
                <img alt="care_img" src={care_img} width="100%" height="100%" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: "#3F5163", padding: "90px 0px 150px 0px" }}>
        <Container>
          <Grid container spacing={8}>
            <Grid item md={4} sm={12} xs={12}>
              <Typography sx={{ color: "#FFFFFF", fontWeight: "600", fontSize: "20px" }}>Address</Typography>
              <Typography sx={{ color: "#FFFFFF", textAlign: "start", marginTop: "10px" }}>
                Graphics Sign Shop 2773 Jefferson Street Austell,GA 30168
              </Typography>
              <Typography sx={{ color: "#FFFFFF", textAlign: "start", marginTop: "40px" }}>
                Apparel and Corporate Office 1395 S. Marietta Parkway SE Building 100,Suitte 116 Marietta,GA 30067
              </Typography>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <Typography sx={{ color: "#FFFFFF", fontWeight: "600", fontSize: "20px" }}>
                Need a Helping Hand?
              </Typography>
              <Typography sx={{ color: "#FFFFFF", marginTop: "10px" }}>
                Reach out and connect with the Brandit team and we'll bring your vision to life without delay.when your
                brand is at stake ,why wait?
              </Typography>
              <Typography
                sx={{
                  color: "#FFFFFF",
                  marginTop: "10px",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                Payment Options
              </Typography>
              <Box>
                <img src={visa} alt="" />
                <img src={paypal} alt="" />
              </Box>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                Subscribe
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <TextField
                  placeholder="Email address"
                  sx={{
                    borderRadius: "1px",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "& .MuiInputBase-input": { padding: "7.5px 14px !important" },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#E0CE8F",
                    color: "#3F5163",

                    fontWeight: "400",
                    padding: "9px",
                    width: "100px",
                    height: "38px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#E0CE8F",
                    },

                    "& .MuiButtonBase-root": {
                      borderRadius: "0px !important",
                    },
                  }}
                >
                  Send
                </Button>
              </Box>
              <Box sx={{ marginTop: "40px" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#E0CE8F",
                    color: "#3F5163",
                    borderRadius: "8px",
                    fontWeight: "400",
                    padding: "9px",
                    width: "7rem",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#E0CE8F",
                    },
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
