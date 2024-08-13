import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import footer_logo from "../../asset/images/footer_logo.png";
import blog1_img from "../../asset/images/blog1_img (1).png";
import care_img from "../../asset/images/care_img.png";
const Footer = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#CFE5F9",
          marginTop: "100px",
          paddingBottom: "90px",
        }}
      >
        <Container sx={{ paddingTop: "90px" }}>
          <Grid container spacing={8}>
            <Grid item md={3} sm={12} xs={12}>
              <img
                alt="footer_logo"
                src={footer_logo}
                width="70%"
                height="30%"
              />
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "27px",
                  color: "#545454",
                  fontWeight: "600",
                  marginTop: "10px",
                }}
              >
                Brandit brings your brand to life from the moment you get in
                touch{" "}
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

            <Grid item md={3} sm={12} xs={12}>
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

            <Grid item md={3} sm={12} xs={12}>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "17px",
                }}
              >
                Facebook
              </Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ marginTop: "30px" }} spacing={8}>
            <Grid item md={4} sm={12} xs={12}>
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
                  textAlign: "justify",
                  fontSize: "18px",
                  lineHeight: "27px",
                  color: "#545454",
                  fontWeight: "600",
                  marginTop: "20px",
                }}
              >
                Need help? Just give us call at 800-905-8851 or email us at
                contactus@brandit.net and one of our associates will be happy to
                assist you{" "}
              </Typography>
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

            <Grid item md={4} sm={12} xs={12}>
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
              <Box sx={{ marginTop: "30px" }}>
                <img alt="care_img" src={care_img} width="100%" height="100%" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: "#3F5163", padding: "90px 0px 90px 0px" }}>
        <Container>
          <Grid container spacing={8}>
            <Grid item md={4} sm={12} xs={12}>
              <Typography
                sx={{ color: "#FFFFFF", fontWeight: "600", fontSize: "20px" }}
              >
                Address
              </Typography>
              <Typography
                sx={{ color: "#FFFFFF", textAlign: "start", marginTop: "10px" }}
              >
                Graphics Sign Shop 2773 Jefferson Street Austell,GA 30168
              </Typography>
              <Typography
                sx={{ color: "#FFFFFF", textAlign: "start", marginTop: "40px" }}
              >
                Apparel and Corporate Office 1395 S. Marietta Parkway SE
                Building 100,Suitte 116 Marietta,GA 30067
              </Typography>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <Typography
                sx={{ color: "#FFFFFF", fontWeight: "600", fontSize: "20px" }}
              >
                Need a Helping Hand?
              </Typography>
              <Typography sx={{ color: "#FFFFFF", marginTop: "10px" }}>
                Reach out and connect with the Brandit team and we'll bring your
                vision to life without delay.when your brand is at stake ,why
                wait?
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
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <Typography
                sx={{ color: "#FFFFFF", fontWeight: "600", fontSize: "20px" }}
              >
                Subscribe
              </Typography>
              <div>
                <TextField
                  placeholder="Email address"
                  sx={{
                    borderRadius: "0px",
                    marginTop: "10px",
                    backgroundColor: "white",
                  }}
                />
              </div>
              <Box sx={{ marginTop: "40px" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#E0CE8F",
                    color: "#3F5163",
                    borderRadius: "8px",
                    fontWeight: "400",
                    padding: "9px",
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
