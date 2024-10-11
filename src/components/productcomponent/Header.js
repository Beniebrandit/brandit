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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  createTheme,
  Menu,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import main_logo from "../../asset/images/main_logo.png";
import cart_logo from "../../asset/images/cart_logo.svg";
import facebook_logo from "../../asset/images/facebook_logo.svg";
import twitter_logo from "../../asset/images/twitter_logo.svg";
import linkedin_logo from "../../asset/images/linkedin_logo.svg";
import youtube_logo from "../../asset/images/youtube_logo.svg";
import { useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ProductService } from "../../services/Product.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginDialog from "../common/LoginDialog";
import CreateAccountDialog from "../common/CreateAccountDialog";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Header = () => {
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

  const handleClickOpenLogin = () => setLoginOpen(true);
  const handleCloseLogin = () => setLoginOpen(false);

  const handleClickOpenSignUp = () => {
    setOpenSignUp(true);
    setLoginOpen(false);
  };

  const handleCloseSignUp = () => setOpenSignUp(false);

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
                    <a href="mailto:sales@brandt.net" style={{ color: "white", textDecoration: "none" }}>
                      mailto:sales@brandt.net
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
            <img alt="main_logo" src={main_logo} style={{ width: "50%", height: "auto", maxWidth: "200px" }} />
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
          {currentUser ? (
            <Grid item xs={12} sm="auto" container justifyContent="center">
              <Box sx={{ position: "relative", display: "flex" }}>
                <Grid item>
                  <AccountCircleIcon sx={{ fontSize: "36px", color: "#3f5163" }} />
                </Grid>
                &nbsp;
                <ThemeProvider theme={theme}>
                  <Box
                    aria-owns={anchorEl ? "simple-menu" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handleClick}
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "1rem",
                      textTransform: "none",
                    }}
                  >
                    <span style={{ color: "#3f5163" }}>
                      <b>{currentUser} </b>
                    </span>
                  </Box>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleDropdownClose}
                    onMouseLeave={handleDropdownClose}
                  >
                    <MenuItem
                      onClick={() => {
                        Logout();
                      }}
                    >
                      Log out
                    </MenuItem>
                  </Menu>
                </ThemeProvider>
                {/*<Grid item sx={{ display: "flex", margin: "auto" }}>
                  <Typography variant="contained">{currentUser}</Typography>
                </Grid>*/}
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12} sm="auto" container justifyContent="center">
              <Box sx={{ position: "relative", display: "flex" }}>
                <Grid item>
                  <Button onClick={handleClickOpenLogin} variant="contained" className="header_btn">
                    Login
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={handleClickOpenSignUp} variant="contained" className="header_btn">
                    Register
                  </Button>
                </Grid>
              </Box>
            </Grid>
          )}
          <Grid item xs={12} sm="auto" container justifyContent="center">
            <Button sx={{ position: "relative" }} href="/cart">
              <img alt="cart_logo" src={cart_logo} style={{ width: "30px", height: "auto" }} />
            </Button>
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

export default Header;
