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
  Divider,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import main_logo from "../../../asset/images/main_logo.png";
import cart_logo from "../../../asset/images/cart_logo.svg";
import facebook_logo from "../../../asset/images/facebook_logo.svg";
import twitter_logo from "../../../asset/images/twitter_logo.svg";
import linkedin_logo from "../../../asset/images/linkedin_logo.svg";
import youtube_logo from "../../../asset/images/youtube_logo.svg";
import { useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import dropdown from "../../../asset/images/chevron-down-svgrepo-com.svg";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ProductService } from "../../../services/Product.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginDialog from "../../common/LoginDialog";
import CreateAccountDialog from "../../common/CreateAccountDialog";
import { borderRadius, minWidth, padding, styled } from "@mui/system";
import SearchBar from "./Searchbar";
import MegaMenuGrid from "./MegaMenuGrid";
import { useMediaQuery, useTheme } from "@mui/material";
import { AccountCircle, Dashboard } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const items = [
  { text: "Products", icon: <Dashboard /> },
  { text: "Account", icon: <AccountCircle /> },
];

  const categories = [
    { label: "Large Format", category: "Large Format" },
    { label: "Stickers and Labels", category: "Decals" },
    { label: "Fabrics", category: "Banners" },
    { label: "Accessories", category: "Signs" },
  ];


const CustomMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#e0e0e0", // Set your desired background color here
    color: theme.palette.text.primary,
  },
}));

const CustomMenuItem = styled(MenuItem)(() => ({
  //backgroundColor: "#e0e0e0", // Match the menu background color
  width: "100%",
  "& .MuiMenuItem-gutters": {
    borderRadius: 0, // Remove the border radius completely
  },
  "&:hover": {
    backgroundColor: "white", // Add a slight hover effect if desired
  },
}));

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Header = () => {
    const navigate = useNavigate();
    const theme0 = useTheme();
    const isBelowMd = useMediaQuery(theme0.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
    const [selectedTab, setSelectedTab] = useState(isBelowMd ? "Products" : "Account"); // Default selected tab
    const [allProducts, setAllProducts] = useState([]); // Assuming all products are loaded here
    const [categoryContent, setCategoryContent] = useState([]); // To hold the content for the selected category
    const [currentImage, setCurrentImage] = useState(""); // To track the current image
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showCategoryContent, setShowCategoryContent] = useState(false);
    const filteredItems = items.filter((item) => (item.text === "Products" ? isBelowMd : true));

  const handleCategoryClick = async (categoryName) => {
    setSelectedCategory(categoryName);
    setShowCategoryContent(true); // Show category content section
    // Fetch category-specific content logic
    try {
      const params = { with: ["images", "productCategory"] };
      const res = await ProductService.ProductList(params);
      const filteredContent = res.data.filter((product) => product.productCategory?.parent_name === categoryName);
      setCategoryContent(filteredContent); // Set the content to display
      console.log("categoryContent", categoryContent);
    } catch (error) {
      console.error("Error fetching category content:", error);
    }
  };

  // Back button functionality
  const handleBackToCategories = () => {
    setShowCategoryContent(false); // Hide category content and show buttons
  };

  const renderMostPopular = (categoryName) => {
    const filteredProducts = categoryContent.filter((product) => product.productCategory?.parent_name === categoryName);
    console.log("filteredProducts", filteredProducts);
    // Group products by their subcategory
    const groupedBySubCategory = filteredProducts.reduce((acc, product) => {
      const subCategoryName = product.productCategory?.name;
      if (!acc[subCategoryName]) acc[subCategoryName] = [];
      acc[subCategoryName].push(product);
      return acc;
    }, {});

    // Get all subcategories for the current category
    const subCategories = Object.keys(groupedBySubCategory);

    // Determine the number of products to display
    const limit = subCategories.length > 3 ? 3 : subCategories.length;

    // Collect the first product of each subcategory, up to the limit
    const mostPopularProducts = subCategories.slice(0, limit).map(
      (subCategory) => groupedBySubCategory[subCategory][0] // Get the first product from each subcategory
    );

    return (
      <Box sx={{ width: "100%", borderBottom: "1px solid #ddd", padding: "0 20px" }}>
        <h4 className="row mega-title" style={{ paddingBottom: "7px", fontSize: "16px", textTransform: "capitalize" }}>
          Most Popular
        </h4>
        <ul style={{ listStyleType: "none", padding: 0, display: "flex", justifyContent: "space-between" }}>
          {mostPopularProducts.map((product, index) => {
            console.log("mostPopularProducts", mostPopularProducts);
            return (
              <li
                key={index}
                style={{
                  padding: "0 15px 5px 0",
                  cursor: "pointer",
                  display: "flex",
                  width: "50%",
                  flexDirection: "column",
                }}
                onMouseEnter={() => setCurrentImage(product.images?.[0]?.path)}
                onClick={() => ClickProduct(product.id)}
              >
                <img
                  style={{ height: "100%", width: "100%", marginBottom: "5px", maxHeight: "150px" }}
                  src={`${process.env.REACT_APP_API_BASE_URL}/${product.images?.[0]?.path}`}
                  alt={product.name || "Default"}
                />
                <a href="#" style={{ float: "left", padding: "10px 0" }}>
                  {product.name}
                </a>
              </li>
            );
          })}
        </ul>
      </Box>
    );
  };

  // Function to render products for the selected category
  const renderCategoryContent = (categoryName) => {
    const groupedProducts = categoryContent
      .filter((product) => product.productCategory.parent_name === categoryName)
      .reduce((acc, product) => {
        const name = product.productCategory.name;
        if (!acc[name]) acc[name] = [];
        acc[name].push(product);
        return acc;
      }, {});
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={handleBackToCategories} sx={{ width: "100%", margin: "20px" }}>
          Back to Categories
        </Button>
        {renderMostPopular(selectedCategory)} {/* Display most popular products */}
        <Box className="stander" sx={{ margin: "15px 0", width: "100%", padding: "0 20px" }}>
          {Object.entries(groupedProducts).map(([subCategory, products], index) => (
            <div key={index} sx={{ paddingBottom: "10px", width: "100%" }}>
              <h4
                className="row mega-title"
                style={{ paddingBottom: "7px", fontSize: "16px", textTransform: "capitalize" }}
              >
                {subCategory}
              </h4>
              {products.map((product, itemIndex) => (
                <li
                  key={itemIndex}
                  style={{
                    paddingBottom: "5px",
                    paddingLeft: "5px",
                    listStyle: "none",
                  }}
                  onClick={() => ClickProduct(product.id)}
                >
                  <a href="#" style={{ fontSize: "14px" }}>
                    {product.name}
                  </a>
                </li>
              ))}
              <Divider orientation="horizontal" flexItem sx={{ margin: "8px 0px 8px" }} />
            </div>
          ))}
        </Box>
      </Box>
    );
  };

  const renderCategoryButtons = () => (
    <Box sx={{ display: "flex", flexDirection: "column", padding: "20px 15px" }}>
      {categories.map(({ label, category }) => (
        <Button
          key={category}
          fullWidth
          variant="text"
          sx={{
            mb: 1,
            justifyContent: "flex-start",
            color: "#3F5163",
            textTransform: "capitalize",
            fontWeight: "bold",
            borderLeft: "1px solid black",
            "&:hover": { backgroundColor: "#e0e0e0" },
          }}
          onClick={() => handleCategoryClick(category)}
        >
          {label}
        </Button>
      ))}
    </Box>
  );

  const accountRender = () => {
    return (
      <ThemeProvider theme={theme}>
        <Button
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            color: "#3F5163",
            textTransform: "capitalize",
            fontWeight: "bold",
            borderLeft: "1px solid black",
            "&:hover": { backgroundColor: "#e0e0e0" },
            ml: "1rem",
            p: "8px 16px",
            mt: "1rem",
          }}
        >
          <span style={{ color: "#3F5163" }}>
            <b style={{ fontSize: { sm: "20px", xs: "14px" } }}>Account </b>
            <span
              style={{
                fontSize: "12px",
                display: currentUser ? "inline-flex" : "inline",
              }}
            >
              {currentUser ? `(${currentUser})` : "(Sign In)"}
            </span>
          </span>
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            backgroundColor: "white",
            mt: 1,
            pl: "1rem",
            width: "100%",
            borderRadius: "4px",
          }}
        >
          <Button
            sx={{
              p: "8px 16px",
              width: "100%",
              justifyContent: "flex-start",
              color: "#3F5163",
              textTransform: "capitalize",
              fontWeight: "bold",
              borderLeft: "1px solid black",
              "&:hover": { backgroundColor: "#e0e0e0" },
              mb: 1,
            }}
          >
            <Link
              to="/saved-design"
              style={{
                textDecoration: "none",
                textTransform: "capitalize",
                color: "#3F5163",
              }}
            >
              My design
            </Link>
          </Button>

          {!currentUser ? (
            <>
              <Button
                sx={{
                  p: "8px 16px",
                  width: "100%",
                  justifyContent: "flex-start",
                  color: "#3F5163",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  borderLeft: "1px solid black",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                  mb: 1,
                }}
                onClick={() => {
                  handleClickOpenLogin();
                }}
              >
                Sign in
              </Button>
              <Button
                sx={{
                  p: "8px 16px",
                  width: "100%",
                  justifyContent: "flex-start",
                  color: "#3F5163",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  borderLeft: "1px solid black",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                  mb: 1,
                }}
                onClick={() => {
                  handleClickOpenSignUp();
                }}
              >
                Create account
              </Button>
            </>
          ) : (
            <Button
              sx={{
                p: "8px 16px",
                width: "100%",
                justifyContent: "flex-start",
                color: "#3F5163",
                textTransform: "capitalize",
                fontWeight: "bold",
                borderLeft: "1px solid black",
                "&:hover": { backgroundColor: "#e0e0e0" },
                mb: 1,
              }}
              onClick={() => {
                Logout();
              }}
            >
              Log out
            </Button>
          )}
        </Box>
      </ThemeProvider>
    );
  };
  // Function to handle tab content based on selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case "Products":
        return showCategoryContent ? renderCategoryContent(selectedCategory) : renderCategoryButtons();
      case "Account":
        return accountRender();
      default:
        return null;
    }
  };

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }
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
    localStorage.removeItem("recentSearches");
    window.location.reload();
  };

    function ClickProduct(id) {
      navigate(`/product/${id}`);
    }
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
              justifyContent: "space-between",
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
              <SearchBar />
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
            <MegaMenuGrid />
          </Grid>
          <Box sx={{ display: { xs: "none", lg: "flex" } }}>
            {currentUser ? (
              <Grid
                item
                xs={12}
                sm="auto"
                container
                justifyContent="center"
                sx={{
                  paddingLeft: "0px !important",
                  //backgroundColor: anchorEl ? "#e0e0e0" : "inherit",
                  backgroundColor: "transparent",
                  borderTopRightRadius: "5px",
                  borderTopLeftRadius: "5px",
                }}
              >
                {/* Button with Account Icon and User Name */}
                <Button
                  id="basic-button"
                  onClick={handleClick}
                  sx={{
                    color: "black",
                    textTransform: "capitalize",
                    width: "200px", // Set a fixed width or make it dynamic
                    justifyContent: "left",
                  }}
                  aria-controls={anchorEl ? "basic-menu" : undefined}
                  aria-expanded={anchorEl ? "true" : undefined}
                  aria-haspopup={anchorEl ? "true" : undefined}
                  onMouseOver={handleClick} // Trigger on hover
                >
                  <AccountCircleIcon sx={{ fontSize: "36px", color: "#3f5163" }} />
                  <span style={{ color: "#3f5163", marginLeft: "8px" }}>
                    <b>{currentUser ? currentUser : "My Account (Sign In)"}</b>
                  </span>
                </Button>

                {/* Dropdown Menu */}
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                    onMouseLeave: handleClose, // Close menu when mouse leaves
                  }}
                  PaperProps={{
                    sx: {
                      //borderRadius: "0px !important",
                      //backgroundColor: "#e0e0e0 !important",
                      backgroundColor: "white !important",
                      width: anchorEl?.offsetWidth || "200px !important",
                      marginTop: "0px !important",
                      boxShadow: "none !important",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      Logout();
                      handleClose();
                    }}
                  >
                    Log Out
                  </MenuItem>
                </Menu>
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
          </Box>
          <Grid
            item
            xs={12}
            sm="auto"
            container
            justifyContent="center"
            sx={{
              //"&:hover": { backgroundColor: "#e0e0e0" },
              borderTopRightRadius: "5px",
              borderTopLeftRadius: "5px",
              paddingLeft: "0px !important",
            }}
          >
            <Button sx={{ position: "relative" }} href="/cart">
              <img alt="cart_logo" src={cart_logo} style={{ width: "30px", height: "auto" }} />
            </Button>
          </Grid>

          <Grid item xs={12} sm="auto" sx={{ display: { lg: "none" } }}>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "calc(100vw - 63px)", sm: "calc(100vw - 96px)" },
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box sx={{ width: 80, backgroundColor: "#f0f0f0", display: "flex", flexDirection: "column" }}>
            <List>
              {filteredItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => setSelectedTab(item.text)}
                  sx={{
                    textAlign: "center",
                    padding: "16px 0",
                    justifyContent: "center",
                    color: selectedTab === item.text ? "#1976d2" : "#333",
                    backgroundColor: selectedTab === item.text ? "#e3f2fd" : "transparent",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                >
                  <Box
                    sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
                  >
                    {item.icon}
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
            <Divider orientation="vertical" flexItem />
          </Box>
          <Box sx={{ flex: 1 }}>{renderTabContent()}</Box>
        </Box>
      </Drawer>

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
