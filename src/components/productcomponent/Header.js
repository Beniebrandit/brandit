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

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log("API_BASE_URL:", API_BASE_URL);

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deviceName, setDeviceName] = useState("Iphone");
  const [currentUser, setCurrentUser] = useState("");

  const handleClickOpen = () => {
    setLoginOpen(true);
  };

  const handleClose = () => {
    setLoginOpen(false);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://flagg.devlopix.com/api/getToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, device_name: deviceName }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const token = await response.text();
      localStorage.setItem("authToken", token);
      handleClose();

      // Fetch user data after successful login
      await fetchUserData(token);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("https://flagg.devlopix.com/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setCurrentUser(data.name);
      localStorage.setItem("currentUser", data.name); // Store user name in local storage
      console.log(data, "getUser");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      fetchUserData(token);
    } else {
      // Check if currentUser exists in local storage and set state
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        setCurrentUser(storedUser);
      }
    }
  }, []); // Empty dependency array to run once on mount

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
                <Grid item sx={{ display: "flex", margin: "auto" }}>
                  <Typography variant="contained">{currentUser}</Typography>
                </Grid>
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12} sm="auto" container justifyContent="center">
              <Box sx={{ position: "relative", display: "flex" }}>
                <Grid item>
                  <Button onClick={handleClickOpen} variant="contained" className="header_btn">
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

      <Dialog open={loginOpen} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{ marginTop: "16px" }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
