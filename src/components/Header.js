import React from "react";
import {
  Grid,
  Container,
  Typography,
  IconButton,
  Button,
  TextField,
  Box,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import main_logo from "../asset/images/main_logo.png";
import cart_logo from "../asset/images/cart_logo.svg";
import facebook_logo from "../asset/images/facebook_logo.svg";
import twitter_logo from "../asset/images/twitter_logo.svg";
import linkedin_logo from "../asset/images/linkedin_logo.svg";
import youtube_logo from "../asset/images/youtube_logo.svg";

const Header = () => {
  return (
    <>
      <Box className="header">
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            padding: "10px 0",
          }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ marginBottom: { xs: "10px", sm: "0" } }}
          >
            <Grid item xs={12} sm="auto">
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <EmailOutlinedIcon sx={{ color: "#E0CE8F" }} />
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    Email:{" "}
                    <a
                      href="mailto:sales@brandt.net"
                      style={{ color: "white" }}
                    >
                      sales@brandt.net
                    </a>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm="auto">
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <PhoneInTalkOutlinedIcon sx={{ color: "#E0CE8F" }} />
                </Grid>
                <Grid item>
                  <Typography variant="body2">Phone: 800-935-8231</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                placeholder="Search here.."
                sx={{ backgroundColor: "white", width: "100%" }}
              />
            </Grid>

            <Grid item xs={12} sm="auto">
              <Grid container spacing={1} justifyContent="center">
                <Grid item>
                  <IconButton>
                    <img alt="facebook_logo" src={facebook_logo} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton>
                    <img alt="twitter_logo" src={twitter_logo} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton>
                    <img alt="linkedin_logo" src={linkedin_logo} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton>
                    <img alt="youtube_logo" src={youtube_logo} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container className="inner_header">
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm="auto" container justifyContent="center">
            <img
              alt="main_logo"
              src={main_logo}
              style={{ width: "50%", height: "auto", maxWidth: "200px" }}
            />
          </Grid>

          <Grid item xs={12} sm="auto">
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Typography variant="body2">Large Format</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Stickers and Labels</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Fabrics</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Accessories</Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" className="header_btn">
                  Login
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" className="header_btn">
                  Register
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm="auto" container justifyContent="center">
            <Box sx={{ position: "relative" }}>
              <img
                alt="cart_logo"
                src={cart_logo}
                style={{ width: "30px", height: "auto" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Header;
