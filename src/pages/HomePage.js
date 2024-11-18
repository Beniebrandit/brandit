import React, { useEffect, useState } from "react";
import Categories from "../components/landingcomponent/Categories";
import TrendingProducts from "../components/landingcomponent/TrendingProduct";
import WhyBranditSignage from "../components/landingcomponent/WhyBranditSignage";
import Brandit_image from "../asset/images/Brandit.png";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import HomeFooter from "../components/landingcomponent/HomeFooter";
import HeaderHome from "../components/landingcomponent/Banner";
import LoginDialog from "../components/common/LoginDialog";
import CreateAccountDialog from "../components/common/CreateAccountDialog";
import PhoneIcon from "@mui/icons-material/Phone";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Reviews from '../components/common/Reviews'
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
const HomePage = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const handleClickOpenLogin = () => setLoginOpen(true);
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
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 900;

      if (scrollPosition > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <HeaderHome handleClickOpenLogin={handleClickOpenLogin} handleClickOpenSignUp={handleClickOpenSignUp} />
      <Categories />
      <TrendingProducts />
      <WhyBranditSignage />
      <Reviews />
      <HomeFooter />

      {isVisible && (
        <Box
          className="scroll_div"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            width: "100%",
          }}
        >
          {/* Need Assistance - Display on sm and xs screens only */}
          <Box
            sx={{
              display: { md: "none", sm: "none", xs: "none", lg: "flex", xl: "flex" },
              alignItems: "start",
              //width: { xs: "100%", sm: "33%", lg: "25%", md: "25%" },
            }}
          >
            <PhoneIcon sx={{ marginRight: 1 }} />
            <Box>
              <Typography variant="body1" fontWeight="bold">
                Need Assistance?
              </Typography>
              <Typography variant="body2">1-888-222-4929</Typography>
              <Typography variant="body2">support@signs.com</Typography>
            </Box>
          </Box>

          {/* Ready to Ship */}
          <Box
            sx={{
              display: { md: "flex", sm: "none", xs: "none", lg: "flex", xl: "flex" },
              alignItems: "start",
              //width: { xs: "100%", sm: "33%", lg: "25%", md: "25%" },
            }}
          >
            <LocalShippingIcon sx={{ marginRight: 1 }} />
            <Box>
              <Typography variant="body1" fontWeight="bold">
                Ready to Ship
              </Typography>
              <Typography variant="body2">One Business Day - Ships on Tuesday, Oct 22</Typography>
              <Typography variant="body2" sx={{ color: "#3f5163" }}>
                Estimate Shipping
              </Typography>
            </Box>
          </Box>

          {/* Price Each */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              //width: { xs: "100%", sm: "16%", lg: "25%", md: "25%" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocalOfferIcon sx={{ marginRight: 1 }} />
              <Typography>Price Each</Typography>
            </Box>
            <Typography variant="h5" color="#3f5163" sx={{ fontWeight: "bold" }}>
              $58.03
            </Typography>
          </Box>

          {/* Get Started Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "14rem",
              height: "48px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#3f5163",
                borderRadius: "10px",
                width: "90%",
                "&:hover": {
                  backgroundColor: "#3f5163",
                },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      )}

      <LoginDialog
        open={loginOpen}
        handleClose={handleCloseLogin}
        handleOpenSignUp={handleClickOpenSignUp}
        fetchUserData={fetchUserData}
      />
      <CreateAccountDialog open={openSignUp} handleClose={handleCloseSignUp} setCurrentUser={setCurrentUser} />
    </>
  );
};

export default HomePage;
