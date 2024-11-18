import React, { useEffect, useState } from "react";
import Header from "../components/productcomponent/Header";
import ProductDescription from "../components/productcomponent/ProductDescription";
import Services from "../components/productcomponent/Services";
import BannerFeature from "../components/productcomponent/BannerFeature";
import Bannerslider from "../components/productcomponent/Bannerslider";
import Detail from "../components/productcomponent/Detail";
import Faq from "../components/productcomponent/Faq";
import Footer from "../components/productcomponent/Footer";
import Product from "../components/productcomponent/Product";
import Reviews from "../components/common/Reviews";
import { Box, Button, Grid, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const ProductPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const threshold = 1100;

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
      <Header />
      <Product />
      <ProductDescription />
      <Services />
      <BannerFeature />

      <Bannerslider />
      <Detail />
      <Faq />
      <Reviews />
      <Footer />

      {isVisible && (
        <Box
        
          className="scroll_div"
          sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", gap: 2 ,width:"100%"}}
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
              height:"48px"
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
    </>
  );
};

export default ProductPage;
