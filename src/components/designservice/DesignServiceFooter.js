import React from "react";
import { Container, Grid, TextField, Typography, Button, Box } from "@mui/material";
import logo1 from "../../asset/images/100-satisfaction-guarantee.png";
import logo2 from "../../asset/images/30-yrs-prod-exp.png";
import logo3 from "../../asset/images/inc-5000-grey.png";
import logo4 from "../../asset/images/price-match-guarantee.png";
import logo5 from "../../asset/images/trust-badge-new.png";
import logo6 from "../../asset/images/trust-cards.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const DesignServiceFooter = () => {
  return (
    <>
      <Box sx={{ marginTop: "70px" }}>
        <Typography sx={{ textAlign: "center", fontSize: "28px", padding: "1rem" }}>
          Your trusted, custom signage provider.
        </Typography>
        <Box sty>
          <Container>
            <Grid container>
              <Grid lg={2.4} md={2.4} sm={12} xs={12}>
                <img src={logo1} alt="demo" />
              </Grid>
              <Grid lg={2.4} md={2.4} sm={12} xs={12}>
                {" "}
                <img src={logo2} alt="demo" />
              </Grid>
              <Grid lg={2.4} md={2.4} sm={12} xs={12}>
                {" "}
                <img src={logo5} alt="demo" style={{ height: "41px" }} />
              </Grid>
              <Grid lg={2.4} md={2.4} sm={12} xs={12}>
                {" "}
                <img src={logo4} alt="demo" />
              </Grid>
              <Grid lg={2.4} md={2.4} sm={12} xs={12}>
                {" "}
                <img src={logo3} alt="demo" />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box>
          <Container>
            <Box container sx={{ backgroundColor: "aliceblue", marginTop: "1rem" }}>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "3rem" }}>
                <img src={logo6} alt="demo" />
              </Box>
            </Box>
          </Container>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Container>
            <Grid container>
              <Grid lg={2.4} md={2.4} sm={12} xs={12}>
                <Typography sx={{ paddingBottom: "1rem", fontSize: "16px" }}>
                  <b>Company</b>
                </Typography>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>About</Typography>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>News</Typography>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>Policies</Typography>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>CA Transparency Act</Typography>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>Legal Matters</Typography>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>Our Advantage</Typography>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>Customer Reviews</Typography>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>Editorial Team</Typography>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>Accessibility Statement</Typography>
              </Grid>
              <Grid lg={2.4} md={2.4} sm={12} xs={12}>
                <Typography sx={{ paddingBottom: "1rem", fontSize: "16px" }}>
                  <b>Resources</b>
                </Typography>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>FAQ</Typography>{" "}
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>Design Services</Typography>{" "}
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>Sample Pack</Typography>{" "}
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>
                  {" "}
                  Printable Coronavirus Signage
                </Typography>{" "}
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>Site Map</Typography>
              </Grid>
              <Grid lg={2.4} md={2.4} sm={12} xs={12}>
                <Typography sx={{ paddingBottom: "1rem", fontSize: "16px" }}>
                  <b>Support</b>
                </Typography>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>Contact Us</Typography>{" "}
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>How Tos</Typography>{" "}
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>Careers</Typography>
              </Grid>
              <Grid lg={2.4} md={2.4} sm={12} xs={12}>
                <Typography sx={{ paddingBottom: "1rem", fontSize: "16px" }}>
                  <b>Shop</b>
                </Typography>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>Branded Signage Portals</Typography>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>Templates</Typography>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>Price Calculator</Typography>
              </Grid>
              <Grid lg={2.4} md={2.4} sm={12} xs={12}>
                <Typography sx={{ paddingBottom: "1rem", fontSize: "16px" }}>
                  <b>Community</b>
                </Typography>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>Signs.com Blog</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                    <FacebookOutlinedIcon sx={{ fontSize: "30px" }} />
                    <InstagramIcon sx={{ fontSize: "30px" }} />
                    <LinkedInIcon sx={{ fontSize: "30px" }} />
                </Box>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>
                  Sign up for exclusive offers!
                </Typography>
                <TextField inputProps={{ "aria-label": "Without label" }} placeholder="Email Address" />
                <Button>Subscribe Now!</Button>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>
                  This site is protected by reCAPCHA and the Google Privacy Policy and Terms of Service apply.
                </Typography>
                <Typography sx={{ paddingBottom: "0.5rem", fontSize: "14px" }}>
                  Do Not Share or Sell My Information
                </Typography>
              </Grid>
            </Grid>
            <Typography sx={{ textAlign: "center", color: "grey", fontSize: "12px", marginTop: "30px" }}>
              *Next Day Production excludes large orders, promo products, business cards, post cards, door hangers, rack
              cards, bumper stickers, brochures, table tents, flyers, metal photo prints, wood prints, neck gaiters, and
              orders placed on weekends and the day before observed holidays (upcoming holidays: 7/4/24, 9/2/24,
              11/28/24, 11/29/24,12/25/24, 1/1/25)
            </Typography>
            <Typography sx={{ textAlign: "center", color: "grey", fontSize: "12px" }}>
              *Free ground shipping to contiguous United States. Excludes rigid materials over 36" and orders that
              require freight shipping.
            </Typography>
            <Typography
              sx={{ textAlign: "center", color: "grey", fontSize: "12px", marginTop: "40px", marginBottom: "30px" }}
            >
              ©2024 signs.com All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
};
