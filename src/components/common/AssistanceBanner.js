import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PopUp from "../landingcomponent/Pop_Up";
import { Circles } from "react-loader-spinner";

const AssistanceBanner = ({ pricePerProduct, payload0, price, selectedCategory }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedPrice, setDisplayedPrice] = useState(pricePerProduct);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (pricePerProduct !== displayedPrice) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setDisplayedPrice(pricePerProduct);
      }, 2000);

      return () => clearTimeout(timeout); // Cleanup the timeout
    }
  }, [pricePerProduct, displayedPrice]);

  useEffect(() => {
    // Show the banner after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Cleanup on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Box
        className="scroll_div"
        sx={{
          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? "visible" : "hidden",
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.5s ease-out, opacity 0.5s ease-out, visibility 0.5s ease-out",
          position: "fixed",
          width: "100%",
          bottom: 0,
          padding: "19px 0px",
          backgroundColor: "#fff",
          borderTop: "1px solid #cfd4d9",
          zIndex: 2,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          height: "10%",
        }}
      >
        {/* Need Assistance */}
        <Box
          sx={{
            display: { md: "none", sm: "none", xs: "none", lg: "flex", xl: "flex" },
            alignItems: "start",
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
        {isLoading ? (
          <Circles
            height="40"
            width="40"
            color="#f2d388"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocalOfferIcon sx={{ marginRight: 1 }} />
              <Typography>Price Each</Typography>
            </Box>
            <Typography variant="h5" color="#3f5163" sx={{ fontWeight: "bold" }}>
              ${displayedPrice}
            </Typography>
          </Box>
        )}

        {/* Design Now Button */}
        <Box sx={{ display: "flex", justifyContent: "center", width: { sm: "14rem", xs: "10rem" }, height: "48px" }}>
          <Button
            variant="contained"
            onClick={handleOpen}
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
            Design Now
          </Button>
        </Box>
      </Box>

      <PopUp
        open={open}
        handleClose={handleClose}
        payload0={payload0}
        price={price}
        selectedCategory={selectedCategory}
      />
    </>
  );
};

export default AssistanceBanner;
