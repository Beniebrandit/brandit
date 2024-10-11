import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import main_logo from "../../asset/images/main_logo.png";
import cart_logo from "../../asset/images/cart_logo.svg";
import Account from "../../asset/images/Account.svg";
import facebook_logo from "../../asset/images/facebook_logo.svg";
import twitter_logo from "../../asset/images/twitter_logo.svg";
import linkedin_logo from "../../asset/images/linkedin_logo.svg";
import youtube_logo from "../../asset/images/youtube_logo.svg";
import {
  Box,
  Container,
  Typography,
  IconButton,
  ThemeProvider,
  Menu,
  MenuItem,
  createTheme,
  Grid,
  Button,
  TextField,
  Drawer,
  List,
  ListItem,
  Dialog,
  DialogContent,
  InputAdornment,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ProductService } from "../../services/Product.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginDialog from "../common/LoginDialog";
import CreateAccountDialog from "../common/CreateAccountDialog";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const toggleDrawer = (open0) => () => {
    setDrawerOpen(open0);
  };

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleDropdownClose() {
    setAnchorEl(null);
  }

  const handleClickOpenLogin = () => setLoginOpen(true);
  const handleCloseLogin = () => setLoginOpen(false);

  const handleClickOpenSignUp = () => {
    setOpenSignUp(true);
    setLoginOpen(false);
  };

  const handleCloseSignUp = () => setOpenSignUp(false);

  const theme = createTheme({
    components: {
      MuiList: {
        defaultProps: {
          onMouseLeave: (e) => {
            handleDropdownClose(e);
          },
        },
      },
    },
  });

  const fetchUserData = async (token) => {
    const response = await fetch("https://flagg.devlopix.com/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setCurrentUser(data.name);
    localStorage.setItem("currentUser", data.name);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) {
      setCurrentUser(storedUser);
    }

    if (token) {
      fetchUserData(token);
    }
  }, []);

  const Logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    window.location.reload();
  };

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
              <Typography variant="body2" sx={{ fontSize: { xs: "12px", sm: "15px" } }}>
                Email:{" "}
                <a href="mailto:sales@brandt.net" style={{ color: "white", textDecoration: "none" }}>
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
              <Typography variant="body2" sx={{ fontSize: { xs: "12px", sm: "15px" } }}>
                Phone: 800-935-8231
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
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
            <img alt="main_logo" src={main_logo} style={{ width: "50px", height: "auto" }} />
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "space-around",
              width: "40rem",
            }}
          >
            {["Home", "Large Format", "Small Format", "Stickers and Decals", "Flags", "Sign Holders"].map((text) => (
              <Typography key={text} variant="body2" style={{ paddingRight: "10px" }}>
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
            <ThemeProvider theme={theme}>
              <Box
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup="true"
                //onClick={handleClick}
                onMouseEnter={handleClick}
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "1rem",
                  textTransform: "none",
                }}
              >
                <img alt="Account" src={Account} style={{ width: "46px", height: "auto" }} />
                <span style={{ color: "#3f5163" }}>
                  <b>Account </b>
                  <span style={{ fontSize: "12px" }}>{currentUser && `(${currentUser})`}</span>
                </span>
              </Box>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleDropdownClose}
                onMouseLeave={handleDropdownClose}
              >
                <MenuItem onClick={handleDropdownClose} component={Link} to="/saved-design">
                  My design
                </MenuItem>
                {!currentUser ? (
                  <>
                    <MenuItem
                      onClick={() => {
                        handleDropdownClose();
                        handleClickOpenLogin();
                      }}
                    >
                      Sign in
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleDropdownClose();
                        handleClickOpenSignUp();
                      }}
                    >
                      Create account
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem
                    onClick={() => {
                      Logout();
                    }}
                  >
                    Log out
                  </MenuItem>
                )}
              </Menu>
            </ThemeProvider>
            <Button
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                paddingLeft: "1rem",
                textTransform: "none",
                "& :hover": {
                  backgroundColor: "transparent",
                },
              }}
              href="/cart"
            >
              <img alt="cart_logo" src={cart_logo} style={{ width: "36px", height: "auto" }} />
              &nbsp;
              <span style={{ color: "#3f5163" }}>
                <b>Cart</b>
              </span>
            </Button>
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
            {["Home", "Large Format", "Small Format", "Stickers and Decals", "Flags", "Sign Holders"].map((text) => (
              <ListItem button key={text} onClick={toggleDrawer(false)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>

      <LoginDialog
        open={loginOpen}
        handleClose={handleCloseLogin}
        handleOpenSignUp={handleClickOpenSignUp}
        fetchUserData={fetchUserData}
      />
      <CreateAccountDialog open={openSignUp} handleClose={handleCloseSignUp} setCurrentUser={setCurrentUser} />
      <ToastContainer />
    </>
  );
};

export default Navbar;
