// import "./HeaderHome.css";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import main_logo from "../asset/images/main_logo.png";
import cart_logo from "../asset/images/cart_logo.svg";
import Account from "../asset/images/Account.svg";
import star from "../asset/images/Star.png";
import MaskGroup from "../asset/images/Mask Group.png";
import facebook_logo from "../asset/images/facebook_logo.svg";
import twitter_logo from "../asset/images/twitter_logo.svg";
import linkedin_logo from "../asset/images/linkedin_logo.svg";
import youtube_logo from "../asset/images/youtube_logo.svg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PopUp from "./Pop_Up";

const HeaderHome = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <PopUp open={open} handleClose={handleClose} />
      <Box className="background">
        <Box className="header">
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: {
                  xs: "20rem", // width for extra-small screens
                  sm: "30rem", // width for small screens
                  md: "30rem", // width for medium screens
                  lg: "35rem", // width for large screens
                  xl: "35rem", // width for extra-large screens
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "left", sm: "center" },
                }}
              >
                {/* <img alt="email_logo" src={email_logo} /> */}
                <EmailOutlinedIcon
                  sx={{
                    color: "#E0CE8F",
                    marginRight: "10px",
                    fontSize: { xs: "16px", sm: "24px" },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "12px", sm: "15px" } }}
                >
                  Email:{" "}
                  <a
                    href="mailto:sales@brandt.net"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    sales@brandt.net
                  </a>
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "left", sm: "center" },
                  fontSize: { xs: "12px", sm: "15px" },
                }}
              >
                <PhoneInTalkOutlinedIcon
                  sx={{
                    color: "#E0CE8F",
                    marginRight: "10px",
                    fontSize: { xs: "16px", sm: "24px" },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "12px", sm: "15px" } }}
                >
                  Phone: 800-935-8231
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
            >
              <IconButton>
                <img alt="facebook_logo" src={facebook_logo} />
              </IconButton>
              <IconButton>
                <img alt="twitter_logo" src={twitter_logo} />
              </IconButton>
              <IconButton>
                <img alt="linedin_logo" src={linkedin_logo} />
              </IconButton>
              <IconButton>
                <img alt="youtube_logo" src={youtube_logo} />
              </IconButton>
            </Box>
          </Container>
        </Box>

        <Box className="inner_header">
          <Container
            maxWidth="lg"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box className="header_box">
              <img
                alt="main_logo"
                src={main_logo}
                style={{ width: "50px", height: "auto" }}
              />
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "space-around",
                width: "40rem",
              }}
            >
              {[
                "Home",
                "Large Format",
                "Small Format",
                "Stickers and Decals",
                "Flags",
                "Sign Holders",
              ].map((text) => (
                <Typography
                  key={text}
                  variant="body2"
                  style={{ paddingRight: "10px" }}
                >
                  {text}
                </Typography>
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "1rem",
                }}
              >
                <img
                  alt="Account"
                  src={Account}
                  style={{ width: "46px", height: "auto" }}
                />
                <span>Account</span>
              </Box>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "1rem",
                }}
              >
                <img
                  alt="cart_logo"
                  src={cart_logo}
                  style={{ width: "36px", height: "auto" }}
                />
                &nbsp;
                <span>Cart</span>
              </Box>
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              sx={{ display: { lg: "none" } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Container>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            sx={{
              "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
            }}
          >
            <List>
              {[
                "Home",
                "Large Format",
                "Small Format",
                "Stickers and Decals",
                "Flags",
                "Sign Holders",
              ].map((text) => (
                <ListItem button key={text} onClick={toggleDrawer(false)}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>

        <Box
          sx={{
            marginLeft: {
              lg: "10rem",
              md: "8rem",
            },
            marginTop: "1rem",
            padding: "2rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={star} alt="star" />
            <Typography
              sx={{ fontSize: { xs: "13px", sm: "16px" }, padding: "1rem" }}
            >
              Rated By Hundreds Of Satisfied Customers
            </Typography>
          </Box>
          <Typography sx={{ fontSize: { xs: "25px", sm: "35px" } }}>
            Create <span style={{ color: "#E0CE8F" }}>Custom</span> <br />
            Sign in Minutes!
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", paddingTop: "5px" }}
          >
            <CheckCircleIcon sx={{ fontSize: { xs: "18px", sm: "24px" } }} />

            <Typography sx={{ fontSize: { xs: "13px", sm: "16px" } }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", paddingTop: "5px" }}
          >
            <CheckCircleIcon sx={{ fontSize: { xs: "18px", sm: "24px" } }} />

            <Typography sx={{ fontSize: { xs: "13px", sm: "16px" } }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", paddingTop: "5px" }}
          >
            <CheckCircleIcon sx={{ fontSize: { xs: "18px", sm: "24px" } }} />

            <Typography sx={{ fontSize: { xs: "13px", sm: "16px" } }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            marginLeft: {
              lg: "10rem",
              md: "8rem",
            },
            marginTop: "0rem",
            padding: "2rem",
            position: "relative",
          }}
        >
          <Box sx={{margin:"auto"}}>
            <img src={MaskGroup} alt="MaskGroup" height={90} />
          </Box>
          <Box sx={{ padding: { sx: "2rem", sm: "1rem" },margin:"auto" }}>
            <img src={star} alt="star" style={{margin:"auto",display:{sx:"block",sm:"inline"}}}/>
            <Typography sx={{textAlign:{sx:"center",sm:"left"}}}>John Doe</Typography>
            <Typography sx={{ width: { sx: "200px", sm: "300px" },textAlign:{sx:"center",sm:"left"} }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ margin: "auto", marginTop: "-3rem", position: "relative" }}>
        <Container
          sx={{
            width: {
              lg: "50rem",
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
              padding: "1rem",
              borderRadius: "1rem",
              // border:"1px solid gray",
              boxShadow: "10px 10px 35px -15px",
            }}
          >
            <Box sx={{ margin: "auto" }}>
              <Typography>Material</Typography>
              <TextField placeholder="Stickers and Decals" />
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
            <Button onClick={handleOpen} sx={{ width: "7rem", margin: "auto" }}>Design Now</Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HeaderHome;
