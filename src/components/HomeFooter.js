import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import React from "react";
  import footer_logo from "../asset/images/footer_logo.png";
  import blog1_img from "../asset/images/blog1_img (1).png";
  import care_img from "../asset/images/care_img.png";
  import facebook1 from "../asset/images/facebook1.png";
  import facebook2 from "../asset/images/facebook2.png";
  import facebook3 from "../asset/images/facebook3.png";
  import facebook4 from "../asset/images/facebook4.png";
  import facebook5 from "../asset/images/facebook5.png";
  import facebook6 from "../asset/images/facebook6.png";
  import facebook7 from "../asset/images/facebook7.png";
  import facebook8 from "../asset/images/facebook8.png";
  import visa from "../asset/images/visa_image.svg";
  import paypal from "../asset/images/paypal_image.svg";
  import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
  import InstagramIcon from "@mui/icons-material/Instagram";
  import LinkedInIcon from "@mui/icons-material/LinkedIn";
  const HomeFooter = () => {
    return (
      <>
        <Box
          sx={{
            backgroundColor: "#93CAEC",
            marginTop: "100px",
            paddingBottom: "90px",
          }}
        >
          <Container sx={{ paddingTop: "90px" }}>
            <Grid container spacing={2}>
              <Grid item md={4} sm={12} xs={12}>
                <img
                  alt="footer_logo"
                  src={footer_logo}
                  width="50%"
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
                <Box sx={{ marginTop: "20px" }}>
                  <FacebookOutlinedIcon sx={{ fontSize: "40px" }} />
                  <InstagramIcon sx={{ fontSize: "40px" }} />
                  <LinkedInIcon sx={{ fontSize: "40px" }} />
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
                  Lorem Ipsum{" "}
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
                  Lorem Ipsum{" "}
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
                  Lorem Ipsum{" "}
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
                    <img
                      alt="facebook1"
                      src={facebook1}
                      width="100%"
                      height="100%"
                    />
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
  
            <Grid container sx={{ marginTop: "30px" }} spacing={8}>
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
                <Box sx={{ marginTop: "30px",padding:"3px"}}>
                  <Button sx={{color:"#545454",border:"1px solid #545454",margin:"3px"}}>STDIO</Button>
                  <Button sx={{color:"#545454",border:"1px solid #545454",margin:"3px"}}>EVENT</Button>
                  <Button sx={{color:"#545454",border:"1px solid #545454",margin:"3px"}}>SPORTS</Button>
                  <Button sx={{color:"#545454",border:"1px solid #545454",margin:"3px"}}>BLOG</Button>
                  <Button sx={{color:"#545454",border:"1px solid #545454",margin:"3px"}}>CLEAN</Button>
                  <Button sx={{color:"#545454",border:"1px solid #545454",margin:"3px"}}>CREATIVE</Button>
                  <Button sx={{color:"#545454",border:"1px solid #545454",margin:"3px"}}>ELEGENT</Button>
                  <Button sx={{color:"#545454",border:"1px solid #545454",margin:"3px"}}>MINIMAL</Button>
                  <Button sx={{color:"#545454",border:"1px solid #545454",margin:"3px"}}>MEGA</Button>
                </Box>
              </Grid>
            </Grid>


              <Box sx={{padding: "90px 0px 90px 0px" }}>
          <Container>
            <Grid container spacing={8} style={{margin:"auto"}}>
              <Grid item md={6} sm={12} xs={12} >
                <Typography
                  sx={{ color: "#FFFFFF", fontWeight: "600", fontSize: "20px",margin:"auto",textAlign:"center" }}
                >
                  PAYMENT OPTIONS
                </Typography>
                <Box sx={{margin:"auto",textAlign:"center"}}>
                    <img src={visa} alt=""/>
                    <img src={paypal} alt=""/>
                </Box>
                
              </Grid>
              
              <Grid item md={6} sm={12} xs={12}>
                <Typography
                  sx={{ color: "#FFFFFF", fontWeight: "600", fontSize: "20px" }}
                >
                  Subscribe
                </Typography>
                <Box>
                  <TextField
                    placeholder="Email address"
                    sx={{
                      borderRadius: "0px",
                      marginTop: "10px",
                      backgroundColor: "white",
                    }}
                    />
                    <Button sx={{backgroundColor:"#3F5163",marginTop:"10px"}}>+</Button>
                </Box>
                
              </Grid>
            </Grid>
          </Container>
        </Box>

          </Container>
        </Box>
        <Box sx={{ backgroundColor: "#3F5163", padding: "90px 0px 90px 0px" }}>
          <Container>
            <Grid container gap={1} columns={13}>
              <Grid item md={4} sm={12} xs={12} sx={{margin:"auto"}}>
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
                
              </Grid>
              <Grid item md={4} sm={12} xs={12} sx={{margin:"auto"}}>
                <Typography
                  sx={{ color: "#FFFFFF", fontWeight: "600", fontSize: "20px" }}
                >
                  Help
                </Typography>
                <Typography sx={{ color: "#FFFFFF", marginTop: "10px" }}>
                  Reach out and connect with the Brandit team and we'll bring your
                  vision to life without delay.when your brand is at stake ,why
                  wait?
                </Typography>
                
              </Grid>
              <Grid item md={4} sm={12} xs={12}>
                
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
                      margin:"auto"
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
  
  export default HomeFooter;
  