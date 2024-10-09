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

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
      const [loginOpen, setLoginOpen] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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

    const [deviceName, setDeviceName] = useState("Iphone");
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
                  <b>Account {`(${currentUser})`}</b>
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

export default Navbar;
