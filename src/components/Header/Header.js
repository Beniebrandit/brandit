import React from "react";
import "./Header.css";
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
import main_logo from "../../asset/images/main_logo.png";
import cart_logo from "../../asset/images/cart_logo.svg";
import facebook_logo from "../../asset/images/facebook_logo.svg";
import twitter_logo from "../../asset/images/twitter_logo.svg";
import linkedin_logo from "../../asset/images/linkedin_logo.svg";
import youtube_logo from "../../asset/images/youtube_logo.svg";
const Header = () => {
  return (
    <>
      <Box className="header">
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <img alt="email_logo" src={email_logo} /> */}
            <EmailOutlinedIcon sx={{ color: "#E0CE8F", marginRight: "10px" }} />
            <Typography variant="body2">
              Email:{" "}
              <a href="mailto:sales@brandt.net" style={{ color: "white" }}>
                sales@brandt.net
              </a>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PhoneInTalkOutlinedIcon
              sx={{ color: "#E0CE8F", marginRight: "10px" }}
            />
            <Typography variant="body2">Phone: 800-935-8231</Typography>
          </Box>

          <Box className="header_box">
            <TextField
              placeholder="Search here.."
              sx={{ backgroundColor: "white" }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
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
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box className="header_box">
            <img
              alt="main_logo"
              src={main_logo}
              style={{ width: "50%", height: "50%" }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ paddingRight: "10px" }}>
              Large Format
            </Typography>
            <Typography variant="body2" sx={{ paddingRight: "10px" }}>
              Stickers and Labels
            </Typography>
            <Typography variant="body2" sx={{ paddingRight: "10px" }}>
              Fabrics
            </Typography>
            <Typography variant="body2" sx={{ paddingRight: "10px" }}>
              Accessories
            </Typography>
            <Button variant="contained" className="header_btn">
              Login
            </Button>
            <Button variant="contained" className="header_btn">
              Register
            </Button>
          </Box>

          <Box className="header_box">
            <Box sx={{ position: "relative" }}>
              <img
                alt="cart_logo"
                src={cart_logo}
                sx={{ width: "30px", height: "auto" }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Header;
