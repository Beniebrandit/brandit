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

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [deviceName, setDeviceName] = useState("Iphone");
  const [currentUser, setCurrentUser] = useState("");
  const [mailMessage,setMailMessage] = useState(false);

  const toggleDrawer = (open0) => () => {
    setDrawerOpen(open0);
  };

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleDropdownClose() {
    setAnchorEl(null);
  }

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

  const nameRegex = /([a-zA-Z]{3,30}s*)+/;
  const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
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
      case "name":
        error = !nameRegex.test(value) && value ? "Name is invalid" : "";
        break;
      case "email":
        error = (!emailRegex.test(value) && value) ? "Enter a valid email address" : "";
        break;
      case "password":
        error = !passwordRegex.test(value) && value ? "Password must be valid" : "";
        break;
      case "password_confirmation":
        error = value !== state.password ? "Passwords do not match" : "";
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
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.password_confirmation &&
      state.name &&
      state.email &&
      state.password &&
      state.password_confirmation
    );
  };

  console.log("state", state);
  const createAccount = () => {
    if (isFormValid()) {
      console.log("Form is valid, proceed with account creation");
      ProductService.registers(state)
        .then((res) => {
          console.log("registers", res);
          // Handle success here, e.g., redirecting or updating UI
          setCurrentUser(res?.user.name);
          localStorage.setItem("currentUser", res?.user.name); // Store user name in local storage
          const token = res.access_token;
          localStorage.setItem("authToken", token);
          handleClose();
          toast("registered successfully");
          setState({ name: "", email: "", password: "", password_confirmation: "" });
        })
        .catch((error) => {
          // Handle error here
          if (error.response) {
            console.error("Error response data:", error.response.data);

            if (error.response.status === 422) {
              const emailError = emailRegex.test(state.email)
                ? "Enter a valid email address"
                : "";
              setErrors((prevErrors) => ({
                ...prevErrors,
                email: emailError, // Update email field with the error message
              }));
              toast.error(`${error.response.data.email}`); // Show toast with the error message
            }
          } else if (error.request) {
              toast.error(`${error.request}`);
          } else {
              toast.error(`${error.message}`);
          }
        });
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
  }, []);

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
                <MenuItem
                  onClick={() => {
                    handleDropdownClose();
                    handleClickOpen();
                  }}
                >
                  Sign in
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleDropdownClose();
                    handleOpenSignUp();
                  }}
                >
                  Create account
                </MenuItem>
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
      {/*<LoginModal handleClose={handleClosemodal} open={open} setOpen={setOpen} />*/}
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
            name="name"
            value={state.name}
            variant="outlined"
            label="First Name"
            margin="normal"
            helperText={errors.name}
            error={!!errors.name}
            onChange={handleChange}
            sx={{ borderRadius: "10px" }}
          />
          <TextField
            fullWidth
            name="email"
            value={state.email}
            variant="outlined"
            label="Email Address"
            margin="normal"
            type="email"
            helperText={errors.email}
            error={!!errors.email}
            onChange={handleChange}
            sx={{ borderRadius: "10px" }}
          />
          {/*{mailMessage && <Typography sx={{color:"red"}}>use another mail or login</Typography>}*/}
          <TextField
            fullWidth
            name="password"
            value={state.password}
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
            helperText={errors.password}
            error={!!errors.password}
            onChange={handleChange}
            sx={{ borderRadius: "10px" }}
          />
          <TextField
            fullWidth
            name="password_confirmation"
            value={state.password_confirmation}
            variant="outlined"
            label="Confirm Password"
            type="password"
            margin="normal"
            helperText={errors.password_confirmation}
            error={!!errors.password_confirmation}
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
      <ToastContainer />
    </>
  );
};

export default Navbar;
