import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  IconButton,
  ThemeProvider,
  Menu,
  MenuItem,
  createTheme,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import main_logo from "../../asset/images/main_logo.png";
import cart_logo from "../../asset/images/cart_logo.svg";
import Account from "../../asset/images/Group 6.svg";
import facebook_logo from "../../asset/images/facebook_logo.svg";
import twitter_logo from "../../asset/images/twitter_logo.svg";
import linkedin_logo from "../../asset/images/linkedin_logo.svg";
import youtube_logo from "../../asset/images/youtube_logo.svg";
import { useRef } from "react";

const Navbar = ({ handleClickOpenLogin, handleClickOpenSignUp }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [activeItem, setActiveItem] = useState("Home");
  const [isMegaMenuOpen, setMegaMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isHoveringMegaMenu, setIsHoveringMegaMenu] = useState(false);
  const menuCloseTimeout = useRef(null);

  // When mouse enters a menu item
  const handleMouseEnterItem = (text) => {
    setHoveredItem(text);
    setMegaMenuOpen(true);
    clearTimeout(menuCloseTimeout.current);
  };

  // When mouse leaves a menu item
  const handleMouseLeaveItem = () => {
    menuCloseTimeout.current = setTimeout(() => {
      if (!isHoveringMegaMenu) {
        setHoveredItem(null);
        setMegaMenuOpen(false);
      }
    }, 200);
  };

  // When mouse enters the mega menu
  const handleMegaMenuEnter = () => {
    setIsHoveringMegaMenu(true);
    clearTimeout(menuCloseTimeout.current);
    setMegaMenuOpen(true);
  };

  // When mouse leaves the mega menu
  const handleMegaMenuLeave = (e) => {
    // Only close the mega menu if the mouse is leaving both the mega menu and the menu items
    setIsHoveringMegaMenu(false);

    // Use a timeout to delay closing to avoid abrupt transitions
    menuCloseTimeout.current = setTimeout(() => {
      if (!hoveredItem && !isHoveringMegaMenu) {
        setMegaMenuOpen(false);
      }
    }, 200);
  };

  useEffect(() => {
    return () => clearTimeout(menuCloseTimeout.current);
  }, []);
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

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const Logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  const menuItems = ["Home", "Large Format", "Small Format", "Stickers and Decals", "Flags", "Sign Holders"];
  return (
    <>
      <Box className="header">
        <Container
          maxWidth="lg"
          sx={{ padding: "0px", justifyContent: "space-between", display: "flex", alignItems: "center" }}
        >
          {/* Email and Phone Info */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: { xs: "20rem", sm: "30rem", md: "30rem", lg: "35rem", xl: "35rem" },
            }}
          >
            {/* Email Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "left", sm: "center" },
              }}
            >
              <EmailOutlinedIcon sx={{ color: "#E0CE8F", marginRight: "10px", fontSize: { xs: "16px", sm: "24px" } }} />
              <Typography className="verdana-font" variant="body2" sx={{ fontSize: { xs: "12px", sm: "15px" } }}>
                Email:{" "}
                <a
                  className="verdana-font"
                  href="mailto:sales@brandt.net"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  sales@brandt.net
                </a>
              </Typography>
            </Box>
            {/* Phone Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "left", sm: "center" },
                fontSize: { xs: "12px", sm: "15px" },
              }}
            >
              <PhoneInTalkOutlinedIcon
                sx={{ color: "#E0CE8F", marginRight: "10px", fontSize: { xs: "16px", sm: "24px" } }}
              />
              <Typography className="verdana-font" variant="body2" sx={{ fontSize: { xs: "12px", sm: "15px" } }}>
                Phone: 800-935-8231
              </Typography>
            </Box>
          </Box>
          {/* Social Media Icons */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            <IconButton>
              <img alt="facebook_logo" src={facebook_logo} />
            </IconButton>
            <IconButton>
              <img alt="twitter_logo" src={twitter_logo} />
            </IconButton>
            <IconButton>
              <img alt="linkedin_logo" src={linkedin_logo} />
            </IconButton>
            <IconButton>
              <img alt="youtube_logo" src={youtube_logo} />
            </IconButton>
          </Box>
        </Container>
      </Box>

      <Box className="inner_header">
        <Container maxWidth="lg" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box className="header_box">
            <img alt="main_logo" src={main_logo} style={{ width: "50px", height: "auto" }} />
          </Box>

          {/* Navigation Links */}
          <Box>
            {/* Main menu items */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "space-around",
                width: "40rem",
              }}
            >
              {menuItems.map((text) => (
                <Typography
                  key={text}
                  variant="body2"
                  sx={{
                    paddingRight: "10px",
                    fontSize: "16px",
                    fontWeight: "400",
                    color: hoveredItem === text ? "#3F5163" : "#8C8E8F",
                    textDecoration: hoveredItem === text ? "underline" : "none",
                    textUnderlineOffset: "4px",
                  }}
                  onMouseEnter={() => handleMouseEnterItem(text)}
                  onMouseLeave={handleMouseLeaveItem}
                >
                  {text}
                </Typography>
              ))}
            </Box>

            {/* Mega Menu */}
            {isMegaMenuOpen && hoveredItem === "Large Format" && (
              <Paper
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
                sx={{
                  position: "absolute",
                  top: "110px",
                  left: "23%",
                  maxWidth: "1200px",
                  padding: "20px 30px",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "space-around",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  zIndex: 10,
                  borderRadius: "8px",
                }}
              >
                {/* Column 2 - Banners */}
                <Box sx={{ flex: "1" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Vinyl Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Mesh Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Fabric Banners
                  </Typography>
                  {/* Add more items as needed */}
                </Box>

                {/* Column 3 - Banner Stands */}
                <Box sx={{ flex: "1" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Banner Stands
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Retractable Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Step & Repeat Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Backdrops
                  </Typography>
                </Box>

                {/* Column 4 - Flag Banners */}
                <Box sx={{ flex: "1" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Flag Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Feather Flag
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Angled Flag
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Rectangle Flag
                  </Typography>
                </Box>

                {/* Optional - Show All Banners */}
                <Box sx={{ flex: "1", textAlign: "center", alignSelf: "center" }}>
                  <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
                    Show All Banners
                  </Typography>
                </Box>
              </Paper>
            )}
            {isMegaMenuOpen && hoveredItem === "Home" && (
              <Paper
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
                sx={{
                  position: "absolute",
                  top: "110px",
                  left: "23%",
                  maxWidth: "1200px",
                  padding: "20px 30px",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "space-around",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  zIndex: 10,
                  borderRadius: "8px",
                }}
              >
                {/* Column 1 - Most Popular */}
                <Box sx={{ flex: "1" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Most Popular
                  </Typography>
                  <Box
                    component="img"
                    src="path-to-image"
                    alt="Popular Banner"
                    sx={{ width: "100%", marginTop: "10px" }}
                  />
                  <Typography variant="body2" mt={1}>
                    Vinyl Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Feather Flag Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Fabric Banners
                  </Typography>
                </Box>

                {/* Column 2 - Banners */}
                <Box sx={{ flex: "1" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Vinyl Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Mesh Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Fabric Banners
                  </Typography>
                  {/* Add more items as needed */}
                </Box>

                {/* Column 3 - Banner Stands */}
                <Box sx={{ flex: "1" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Banner Stands
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Retractable Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Step & Repeat Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Backdrops
                  </Typography>
                </Box>

                {/* Column 4 - Flag Banners */}
                <Box sx={{ flex: "1" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Flag Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Feather Flag
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Angled Flag
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Rectangle Flag
                  </Typography>
                </Box>

                {/* Optional - Show All Banners */}
                <Box sx={{ flex: "1", textAlign: "center", alignSelf: "center" }}>
                  <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
                    Show All Banners
                  </Typography>
                </Box>
              </Paper>
            )}
            {isMegaMenuOpen && hoveredItem === "Small Format" && (
              <Paper
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
                sx={{
                  position: "absolute",
                  top: "110px",
                  left: "23%",
                  maxWidth: "1200px",
                  padding: "20px 30px",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "space-around",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  zIndex: 10,
                  borderRadius: "8px",
                }}
              >
                {/* Column 1 - Most Popular */}
                <Box sx={{ flex: "1" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Most Popular
                  </Typography>
                  <Box
                    component="img"
                    src="path-to-image"
                    alt="Popular Banner"
                    sx={{ width: "100%", marginTop: "10px" }}
                  />
                  <Typography variant="body2" mt={1}>
                    Vinyl Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Feather Flag Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Fabric Banners
                  </Typography>
                </Box>

                {/* Column 3 - Banner Stands */}
                <Box sx={{ flex: "1" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Banner Stands
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Retractable Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Step & Repeat Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Backdrops
                  </Typography>
                </Box>

                {/* Optional - Show All Banners */}
                <Box sx={{ flex: "1", textAlign: "center", alignSelf: "center" }}>
                  <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
                    Show All Banners
                  </Typography>
                </Box>
              </Paper>
            )}
            {isMegaMenuOpen && hoveredItem === "Stickers and Decals" && (
              <Paper
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
                sx={{
                  position: "absolute",
                  //top: "110px",
                  //left: "23%",
                  maxWidth: "1200px",
                  padding: "20px 30px",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "space-around",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  zIndex: 10,
                  borderRadius: "8px",
                }}
              >
                {/* Column 1 - Most Popular */}
                <Box sx={{ flex: "1" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Most Popular
                  </Typography>
                  <Box
                    component="img"
                    src="path-to-image"
                    alt="Popular Banner"
                    sx={{ width: "100%", marginTop: "10px" }}
                  />
                  <Typography variant="body2" mt={1}>
                    Vinyl Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Feather Flag Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Fabric Banners
                  </Typography>
                </Box>

                {/* Optional - Show All Banners */}
                <Box sx={{ flex: "1", textAlign: "center", alignSelf: "center" }}>
                  <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
                    Show All Banners
                  </Typography>
                </Box>
              </Paper>
            )}
            {isMegaMenuOpen && hoveredItem === "Flags" && (
              <Paper
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
                sx={{
                  position: "absolute",
                  top: "110px",
                  left: "23%",
                  maxWidth: "1200px",
                  padding: "20px 30px",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "space-around",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  zIndex: 10,
                  borderRadius: "8px",
                }}
              >
                {/* Column 1 - Most Popular */}
                <Box sx={{ flex: "1" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Most Popular
                  </Typography>
                  <Box
                    component="img"
                    src="path-to-image"
                    alt="Popular Banner"
                    sx={{ width: "100%", marginTop: "10px" }}
                  />
                  <Typography variant="body2" mt={1}>
                    Vinyl Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Feather Flag Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Fabric Banners
                  </Typography>
                </Box>

                {/* Optional - Show All Banners */}
              </Paper>
            )}
            {isMegaMenuOpen && hoveredItem === "Flags" && (
              <Paper
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
                sx={{
                  position: "absolute",
                  top: "110px",
                  left: "23%",
                  maxWidth: "1200px",
                  padding: "20px 30px",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "space-around",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  zIndex: 10,
                  borderRadius: "8px",
                }}
              >
                {/* Column 1 - Most Popular */}
                <Box sx={{ flex: "1" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Most Popular
                  </Typography>
                  <Box
                    component="img"
                    src="path-to-image"
                    alt="Popular Banner"
                    sx={{ width: "100%", marginTop: "10px" }}
                  />
                  <Typography variant="body2" mt={1}>
                    Vinyl Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Feather Flag Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Fabric Banners
                  </Typography>
                </Box>

                {/* Optional - Show All Banners */}
              </Paper>
            )}
            {isMegaMenuOpen && hoveredItem === "Sign Holders" && (
              <Paper
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
                sx={{
                  position: "absolute",
                  top: "110px",
                  left: "23%",
                  maxWidth: "1200px",
                  padding: "20px 30px",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "space-around",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  zIndex: 10,
                  borderRadius: "8px",
                }}
              >
                {/* Column 1 - Most Popular */}
                <Box sx={{ flex: "1" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Most Popular
                  </Typography>
                  <Box
                    component="img"
                    src="path-to-image"
                    alt="Popular Banner"
                    sx={{ width: "100%", marginTop: "10px" }}
                  />
                  <Typography variant="body2" mt={1}>
                    Vinyl Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Feather Flag Banners
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Fabric Banners
                  </Typography>
                </Box>

                {/* Optional - Show All Banners */}
              </Paper>
            )}
          </Box>
          {/* Account and Cart Section */}
          <Box
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", columnGap: 2, height: "100%" }}
          >
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
                  backgroundColor: anchorEl ? "#e0e0e0" : "inherit",
                  borderTopRightRadius: "5px",
                  borderTopLeftRadius: "5px",
                  padding: "6px !important",
                }}
              >
                <img alt="Account" src={Account} style={{ width: "36px", height: "auto" }} />
                <span style={{ color: "#3f5163" }}>
                  <b style={{ fontSize: "20px" }}>Account </b>
                  <span style={{ fontSize: "12px" }}>{currentUser ? `(${currentUser})` : "(Sign In)"}</span>
                </span>
              </Box>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleDropdownClose}
                onMouseLeave={handleDropdownClose}
                PaperProps={{
                  sx: {
                    borderRadius: "0px !important",
                    backgroundColor: "#e0e0e0 !important",
                    width: anchorEl?.offsetWidth || "200px !important", // Set the menu width to match the button
                    marginTop: "0px !important", // Adjust vertical alignment
                    boxShadow: "none !important", // Add subtle shadow
                  },
                }}
              >
                <MenuItem key="my-design" onClick={handleDropdownClose} component={Link} to="/saved-design">
                  My design
                </MenuItem>
                {!currentUser ? (
                  <>
                    <MenuItem
                      key="signin"
                      onClick={() => {
                        handleDropdownClose();
                        handleClickOpenLogin();
                      }}
                    >
                      Sign in
                    </MenuItem>
                    <MenuItem
                      key="create-account"
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
                    key="logout"
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
                paddingLeft: "0 !important", // To override MUI padding, use `0` without `px`
                textTransform: "none",
                borderTopRightRadius: "5px",
                borderTopLeftRadius: "5px",
                borderBottomRightRadius: "0px",
                borderBottomLeftRadius: "0px",
                "&:hover": { backgroundColor: "#e0e0e0" },
                paddingX: "7px",
              }}
              href="/cart"
            >
              <img alt="cart_logo" src={cart_logo} style={{ width: "36px", height: "auto" }} />
              &nbsp;
              <span style={{ color: "#3f5163", fontSize: "20px" }}>
                <b>Cart</b>
              </span>
            </Button>
          </Box>

          {/* Drawer for smaller screens */}
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

        {/* Drawer Content */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{ "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" } }}
        >
          <List>
            {["Home", "Large Format", "Small Format", "Stickers and Decals", "Flags", "Sign Holders"].map((text) => (
              <ListItem
                button
                key={text}
                onClick={() => {
                  setActiveItem(text);
                  toggleDrawer(false)();
                }}
              >
                <ListItemText primary={text} sx={{ textDecoration: activeItem === text ? "underline" : "none" }} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
