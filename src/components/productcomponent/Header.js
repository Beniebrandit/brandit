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


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log("API_BASE_URL:", API_BASE_URL);

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deviceName, setDeviceName] = useState("Iphone");
  const [currentUser, setCurrentUser] = useState("");
    const [state, setState] = useState({
      fName: "",
      lName: "",
      Email: "",
      Password: "",
      confirmPassword: "",
    });
    const [errors, setErrors] = useState({
      fName: "",
      lName: "",
      Email: "",
      Password: "",
      confirmPassword: "",
    });
      const [showPassword, setShowPassword] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleClickOpen = () => {
    setLoginOpen(true);
  };

  const handleClose = () => {
    setLoginOpen(false);
    setOpenSignUp(false);
  };

    const handleOpenSignUp = () => {
      setOpenSignUp(true);
      setLoginOpen(false); // Close login dialog when opening sign-up
    };

    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const fnameRegex = /([a-zA-Z]{3,30}s*)+/;
    const lnameRegex = /[a-zA-Z]{3,30}/;
    //const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const passwordRegex = /[a-zA-Z]{3,30}/;

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      validateField(name, value);
    };

    const validateField = (name, value) => {
      let error = "";
      switch (name) {
        case "fName":
          error = !fnameRegex.test(value) && value ? "First name is invalid" : "";
          break;
        case "lName":
          error = !lnameRegex.test(value) && value ? "Last name is invalid" : "";
          break;
        case "Email":
          error = !emailRegex.test(value) && value ? "Enter a valid email address" : "";
          break;
        case "Password":
          error = !passwordRegex.test(value) && value ? "Password must be valid" : "";
          break;
        case "confirmPassword":
          error = value !== state.Password ? "Passwords do not match" : "";
          break;
        default:
          break;
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    };

    const isFormValid = () => {
      return (
        !errors.fName &&
        !errors.lName &&
        !errors.Email &&
        !errors.Password &&
        !errors.confirmPassword &&
        state.fName &&
        state.lName &&
        state.Email &&
        state.Password &&
        state.confirmPassword
      );
    };

    const createAccount = () => {
      if (isFormValid()) {
        console.log("Form is valid, proceed with account creation");
      } else {
        console.log("Form has errors, fix them before submitting");
      }
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
                  <Button onClick={handleOpenSignUp} variant="contained" className="header_btn">
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

      <Dialog
        open={loginOpen}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            padding: 4,
            background: "linear-gradient(135deg, #e0f7fa 30%, #80deea 100%)",
            borderRadius: "20px",
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Log In to Your Account
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ borderRadius: "10px" }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ borderRadius: "10px" }}
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

      <Dialog
        open={openSignUp}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            padding: 4,
            background: "linear-gradient(135deg, #e0f7fa 30%, #80deea 100%)",
            borderRadius: "20px",
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Create a New Account
          </Typography>
          <Typography variant="body2" gutterBottom>
            Stay updated with your orders by creating an account.
          </Typography>
          <TextField
            fullWidth
            name="fName"
            value={state.fName}
            variant="outlined"
            label="First Name"
            margin="normal"
            helperText={errors.fName}
            error={!!errors.fName}
            onChange={handleChange}
            sx={{ borderRadius: "10px" }}
          />
          <TextField
            fullWidth
            name="lName"
            value={state.lName}
            variant="outlined"
            label="Last Name"
            margin="normal"
            helperText={errors.lName}
            error={!!errors.lName}
            onChange={handleChange}
            sx={{ borderRadius: "10px" }}
          />
          <TextField
            fullWidth
            name="Email"
            value={state.Email}
            variant="outlined"
            label="Email Address"
            margin="normal"
            type="email"
            helperText={errors.Email}
            error={!!errors.Email}
            onChange={handleChange}
            sx={{ borderRadius: "10px" }}
          />
          <TextField
            fullWidth
            name="Password"
            value={state.Password}
            variant="outlined"
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={errors.Password}
            error={!!errors.Password}
            onChange={handleChange}
            sx={{ borderRadius: "10px" }}
          />
          <TextField
            fullWidth
            name="confirmPassword"
            value={state.confirmPassword}
            variant="outlined"
            label="Confirm Password"
            type="password"
            margin="normal"
            helperText={errors.confirmPassword}
            error={!!errors.confirmPassword}
            onChange={handleChange}
            sx={{ borderRadius: "10px" }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={createAccount}
            sx={{
              backgroundColor: "#007bff",
              padding: "12px",
              marginTop: 2,
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#005bb5",
              },
            }}
            disabled={!isFormValid()}
          >
            Create My Account
          </Button>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
