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
import Reviews from "../components/common/Reviews";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PopUp from "../components/landingcomponent/Pop_Up";
import AssistanceBanner from "../components/common/AssistanceBanner";
const HomePage = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [pricePerProduct, setPricePerProduct] = useState();

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
      <HeaderHome
        pricePerProduct={pricePerProduct}
        setPricePerProduct={setPricePerProduct}
        handleClickOpenLogin={handleClickOpenLogin}
        handleClickOpenSignUp={handleClickOpenSignUp}
      />
      <Categories />
      <TrendingProducts />
      <WhyBranditSignage />
      <Reviews />
      <HomeFooter />

      {isVisible && <AssistanceBanner pricePerProduct={pricePerProduct} />}

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
