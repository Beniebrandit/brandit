import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  TextField,
  Divider,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import "./MegaMenu.css";
import {
  Search,
  AccountCircle,
  ShoppingCart,
  Support,
  ExpandLess,
  ExpandMore,
  Dashboard,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import main_logo from "../../../asset/images/main_logo.png";
import cart_logo from "../../../asset/images/cart_logo.svg";
import Account from "../../../asset/images/Group 6.svg";
import facebook_logo from "../../../asset/images/facebook_logo.svg";
import twitter_logo from "../../../asset/images/twitter_logo.svg";
import linkedin_logo from "../../../asset/images/linkedin_logo.svg";
import youtube_logo from "../../../asset/images/youtube_logo.svg";
import MegaMenu from "./MegaMenu";
import { ProductService } from "../../../services/Product.service";


const Navbar = ({ handleClickOpenLogin, handleClickOpenSignUp }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [selectedTab, setSelectedTab] = useState("Products"); // Default selected tab
  const [allProducts, setAllProducts] = useState([]); // Assuming all products are loaded here
  const [categoryContent, setCategoryContent] = useState([]); // To hold the content for the selected category
  const [currentImage, setCurrentImage] = useState(""); // To track the current image
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategoryContent, setShowCategoryContent] = useState(false); // Flag to toggle category content visibility

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
      <Box sx={{}}>
        <h4 className="row mega-title" style={{ paddingBottom: "7px", fontSize: "16px", textTransform: "capitalize" }}>
          Most Popular
        </h4>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {mostPopularProducts.map((product, index) => {
            console.log("mostPopularProducts", mostPopularProducts);
            return (
            <li
              key={index}
              style={{ paddingBottom: "5px", cursor: "pointer", display: "flex", flexDirection: "column" }}
              onMouseEnter={() => setCurrentImage(product.images?.[0]?.path)}
              //onClick={() => ClickProduct(product.id)}
            >
              <img
                style={{ height: "5rem", width: "7rem", marginBottom: "5px" }}
                src={`${process.env.REACT_APP_API_BASE_URL}/${product.images?.[0]?.path}`}
                alt={product.name || "Default"}
              />
              <a href="#" style={{ width: "7rem", float: "left" }}>
                {product.name}
              </a>
            </li>
          )})}
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
      <Box sx={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
        <Button variant="outlined" onClick={handleBackToCategories} sx={{ mb: 2 }}>
          Back to Categories
        </Button>
        {renderMostPopular(selectedCategory)} {/* Display most popular products */}
        <Box className="stander" sx={{ marginBottom: "15px" }}>
          {Object.entries(groupedProducts).map(([subCategory, products], index) => (
            <div key={index} style={{ paddingBottom: "10px" }}>
              <h4
                className="row mega-title"
                style={{ paddingBottom: "7px", fontSize: "16px", maxWidth: "10rem", textTransform: "capitalize" }}
              >
                {subCategory}
              </h4>
              {products.map((product, itemIndex) => (
                <li key={itemIndex} style={{ paddingBottom: "5px" }} onClick={() => ClickProduct(product.id)}>
                  <a href="#" style={{ fontSize: "14px" }}>
                    {product.name}
                  </a>
                </li>
              ))}
            </div>
          ))}
        </Box>
      </Box>
    );
  };


  const renderCategoryButtons = () => (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button fullWidth variant="outlined" sx={{ mb: 1 }} onClick={() => handleCategoryClick("Banners")}>
        Home
      </Button>
      <Button fullWidth variant="outlined" sx={{ mb: 1 }} onClick={() => handleCategoryClick("Large Format")}>
        Large Format
      </Button>
      <Button fullWidth variant="outlined" sx={{ mb: 1 }} onClick={() => handleCategoryClick("Small Format")}>
        Small Format
      </Button>
      <Button fullWidth variant="outlined" sx={{ mb: 1 }} onClick={() => handleCategoryClick("Decals")}>
        Stickers and Decals
      </Button>
      <Button fullWidth variant="outlined" sx={{ mb: 1 }} onClick={() => handleCategoryClick("Flags")}>
        Flags
      </Button>
      <Button fullWidth variant="outlined" sx={{ mb: 1 }} onClick={() => handleCategoryClick("Signs")}>
        Sign Holders
      </Button>
    </Box>
  );
  // Function to handle tab content based on selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case "Products":
        return showCategoryContent ? renderCategoryContent(selectedCategory) : renderCategoryButtons();
      default:
        return null;
    }
  };

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
    localStorage.removeItem("recentSearches");
    window.location.reload();
  };

  function ClickProduct(id) {
    navigate(`/product/${id}`);
  }
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
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingX: "15px",
              width: { xs: "100%", sm: "100%", md: "30rem", lg: "35rem", xl: "35rem" },
            }}
          >
            {/* Email Section */}
            <Box
              sx={{
                display: "flex",
                // flexDirection: { xs: "column", sm: "row" },
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
                // flexDirection: { xs: "column", sm: "row" },
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
          <Box>
            <MegaMenu />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                columnGap: 2,
                height: "100%",
              }}
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
                    //backgroundColor: anchorEl ? "#e0e0e0" : "inherit",
                    backgroundColor: "transparent",
                    borderTopRightRadius: "5px",
                    borderTopLeftRadius: "5px",
                    padding: "6px !important",
                  }}
                >
                  <img alt="Account" src={Account} style={{ width: "36px", height: "auto", marginRight: "7px" }} />
                  <span style={{ color: "#3f5163" }}>
                    <b style={{ fontSize: { sm: "20px", xs: "14px" } }}>Account </b>
                    <span style={{ fontSize: "12px", display: currentUser ? "flex" : "" }}>
                      {currentUser ? `(${currentUser})` : "(Sign In)"}
                    </span>
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
                      //borderRadius: "0px !important",
                      //backgroundColor: "#e0e0e0 !important",
                      backgroundColor: "white !important",
                      width: anchorEl?.offsetWidth || { sx: "126px !important", sm: "143px !important" },
                      marginTop: "0px !important",
                      boxShadow: "none !important",
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
                  //"&:hover": { backgroundColor: "#e0e0e0" },
                  paddingX: "7px",
                }}
                href="/cart"
              >
                <img alt="cart_logo" src={cart_logo} style={{ width: "36px", height: "auto" }} />
                &nbsp;
                <span style={{ color: "#3f5163", fontSize: { sm: "20px", xs: "14px" } }}>
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
          </Box>
        </Container>

        {/* Drawer Content */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 360,
              boxSizing: "border-box",
            },
          }}
        >
          <Box sx={{ width: 80, backgroundColor: "#f0f0f0", display: "flex", flexDirection: "column" }}>
            <List>
              {[
                { text: "Products", icon: <Dashboard /> },
                { text: "Account", icon: <AccountCircle /> },
                { text: "Support", icon: <Support /> },
                { text: "Cart", icon: <ShoppingCart /> },
              ].map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => setSelectedTab(item.text)}
                  sx={{
                    textAlign: "center",
                    padding: "16px 0",
                    color: selectedTab === item.text ? "#1976d2" : "#333",
                    backgroundColor: selectedTab === item.text ? "#e3f2fd" : "transparent",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
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
          </Box>

          <Divider orientation="vertical" flexItem />
          <Box sx={{ flex: 1 }}>{renderTabContent()}</Box>
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
