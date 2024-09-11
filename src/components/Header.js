import React, { useState } from "react";
import {
  Grid,
  Container,
  Typography,
  IconButton,
  Button,
  TextField,
  Box,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import main_logo from "../asset/images/main_logo.png";
import cart_logo from "../asset/images/cart_logo.svg";
import facebook_logo from "../asset/images/facebook_logo.svg";
import twitter_logo from "../asset/images/twitter_logo.svg";
import linkedin_logo from "../asset/images/linkedin_logo.svg";
import youtube_logo from "../asset/images/youtube_logo.svg";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <Box className="header" sx={{ padding: { xs: "10px 0", sm: "15px 0" } }}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Grid
            container
            alignItems="center"
            spacing={2}
            sx={{
              marginBottom: { xs: "10px", sm: "0" },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Grid item xs={12} sm="auto">
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <EmailOutlinedIcon sx={{ color: "#E0CE8F" }} />
                </Grid>
                <Grid item>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    Email:{" "}
                    <a
                      href="mailto:sales@brandt.net"
                      style={{ color: "white", textDecoration: "none" }}
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
                  <Typography variant="body2" sx={{ color: "white" }}>
                    Phone: 800-935-8231
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                placeholder="Search here.."
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: 1,
                  "& .MuiInputBase-root": {
                    height: "100%",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm="auto">
              <Grid container spacing={1} justifyContent="center">
                <Grid item>
                  <IconButton>
                    <img alt="facebook_logo" src={facebook_logo} style={{ width: "24px", height: "24px" }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton>
                    <img alt="twitter_logo" src={twitter_logo} style={{ width: "24px", height: "24px" }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton>
                    <img alt="linkedin_logo" src={linkedin_logo} style={{ width: "24px", height: "24px" }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton>
                    <img alt="youtube_logo" src={youtube_logo} style={{ width: "24px", height: "24px" }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container className="inner_header">
        <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
          <Grid item xs={12} sm="auto" container justifyContent="center">
            <img
              alt="main_logo"
              src={main_logo}
              style={{ width: "50%", height: "auto", maxWidth: "200px" }}
            />
          </Grid>

          <Grid item xs={12} sm="auto" sx={{ display: { xs: "none", md: "block" } }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
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
            </Grid>
          </Grid>

          <Grid item xs={12} sm="auto" container justifyContent="center">
            <Box sx={{ position: "relative",display:"flex" }}>
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
            </Box>
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

          <Grid item xs={12} sm="auto" sx={{ display: { md: "none" } }}>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <List>
                <ListItem>
                  <Typography variant="body2">Large Format</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body2">Stickers and Labels</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body2">Fabrics</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body2">Accessories</Typography>
                </ListItem>
              </List>
            </Drawer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Header;
