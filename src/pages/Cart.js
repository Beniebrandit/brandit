import React, { useState } from "react";
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button, TextField, Box } from "@mui/material";
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import Navbar from "../components/landingcomponent/Navbar/Navbar";
import { DesignServiceFooter } from "../components/designservice/DesignServiceFooter";
import LoginDialog from "../components/common/LoginDialog";
import CreateAccountDialog from "../components/common/CreateAccountDialog";
import Cartform from "../components/cartcomponent/Cartform";

const products = [
  {
    title: "Banners",
    description: "13 oz durable vinyl banner for indoor and outdoor use.",
    img: "https://via.placeholder.com/150",
  },
  {
    title: "Aluminum",
    description: "White Cal Coated, 2MM Thick, Indoor and Outdoor.",
    img: "https://via.placeholder.com/150",
  },
  {
    title: "Yard Signs",
    description: "4MM corrugated plastic yard signs with full color digital printing.",
    img: "https://via.placeholder.com/150",
  },
  {
    title: "Plastic Signs",
    description: "Durable plastic with a matte finish. Offered in either 3MM or 6MM.",
    img: "https://via.placeholder.com/150",
  },
  {
    title: "Acrylic Signs",
    description: 'Beautiful 1/8" or 1/4" cast polymer with the appearance of glass.',
    img: "https://via.placeholder.com/150",
  },
  {
    title: "Feather Flags",
    description: "Trade shows, events and more with flexible feather banners and a variety.",
    img: "https://via.placeholder.com/150",
  },
];

const Cart = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

    const handleClickOpenLogin = () => {
      setLoginOpen(true);
      setOpenSignUp(false);
    };
    const handleCloseLogin = () => setLoginOpen(false);

    const handleClickOpenSignUp = () => {
      setOpenSignUp(true);
      setLoginOpen(false);
    };

    const handleCloseSignUp = () => setOpenSignUp(false);

    const fetchUserData = async (token) => {
      if (!token) {
        console.warn("Token is null or undefined, skipping fetch.");
        return; // Exit the function if the token is null
      }

      console.log("Fetching user data from: https://flagg.devlopix.com/api/user");

      try {
        const response = await fetch("https://flagg.devlopix.com/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch user data:", response.status);
          return;
        }

        const data = await response.json();
        setCurrentUser(data.name);
        localStorage.setItem("currentUser", data.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  return (
    <>
      <Navbar handleClickOpenLogin={handleClickOpenLogin} handleClickOpenSignUp={handleClickOpenSignUp} />
      <Cartform/>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        {/* Shopping Cart Heading */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" gutterBottom>
            Shopping Cart (0 Items) 🛒
          </Typography>
          <Typography variant="body1">
            Looks like there is nothing in your cart yet. Let's fix that! Here are a few things you can try to get
            started:
          </Typography>
        </Box>

        {/* Links and Suggestions */}
        <Box textAlign="center" mb={4} sx={{ display: "flex", mx: "auto", justifyContent: "center" }}>
          <Box style={{ width: "50%", textAlign: "left" }}>
            <li variant="text" sx={{ mb: 1 }}>
              <span style={{ color: "#3FA9F5" }}>Sign in </span>
              to your account
            </li>
            <li variant="text" sx={{ color: "#007bff", mb: 1 }}>
              Start designing a <span style={{ color: "#3FA9F5" }}>custom sign </span>
            </li>
            <li variant="text" sx={{ color: "#007bff", mb: 1 }}>
              Check out our <span style={{ color: "#3FA9F5" }}>homepage </span>
            </li>
            <li variant="text" sx={{ color: "#007bff", mb: 1 }}>
              Search for products/sign templates
            </li>
            <li variant="text" sx={{ color: "#007bff", mb: 1 }}>
              Check out our{" "}
              <span href="/design-service" style={{ color: "#3FA9F5" }}>
                design services{" "}
              </span>
            </li>
            <li variant="text" sx={{ color: "#007bff", mb: 1 }}>
              <span style={{ color: "#3FA9F5" }}>Contact us </span>if you need assistance
            </li>
          </Box>
        </Box>

        {/* Search Section */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h6" gutterBottom>
            Search for Products or Sign Templates
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <TextField fullWidth placeholder="Search" sx={{ maxWidth: 400 }} />
          </Box>
        </Box>

        {/* Most Popular Products Section */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h5" gutterBottom>
            Most Popular Products
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardMedia component="img" height="140" image={product.img} alt={product.title} />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Why Signs.com Section */}
        <Box textAlign="center" mt={6} mb={4}>
          <Typography variant="h5" gutterBottom>
            Why Signs.com?
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: "center", height: "100%" }}>
              <CardContent>
                <InventoryRoundedIcon sx={{ fontSize: "50px" }} />
                <Typography variant="h6" gutterBottom>
                  Next Day Production
                </Typography>
                <Typography variant="body2">
                  Order by 5PM EST and we’ll have your sign completed and shipped the very next business day.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: "center", height: "100%" }}>
              <CardContent>
                <LocalShippingOutlinedIcon sx={{ fontSize: "50px" }} />
                <Typography variant="h6" gutterBottom>
                  Free Shipping on Orders over $99
                </Typography>
                <Typography variant="body2">
                  For orders over $99 your order ships free! *Excludes rigid signs over 36" in either dimension.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: "center", height: "100%" }}>
              <CardContent>
                <EmojiEventsOutlinedIcon sx={{ fontSize: "50px" }} />
                <Typography variant="h6" gutterBottom>
                  Award-Winning Customer Service
                </Typography>
                <Typography variant="body2">
                  Winners of numerous customer service awards, our customer experience team keeps you our priority.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <DesignServiceFooter />
      <LoginDialog
        open={loginOpen}
        handleClose={handleCloseLogin}
        handleOpenSignUp={handleClickOpenSignUp}
        fetchUserData={fetchUserData}
      />
      <CreateAccountDialog
        open={openSignUp}
        handleClose={handleCloseSignUp}
        setCurrentUser={setCurrentUser}
        handleOpenLogin={handleClickOpenLogin}
      />
    </>
  );
};

export default Cart;
