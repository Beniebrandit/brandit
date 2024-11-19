import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PopUp from "../landingcomponent/Pop_Up";

const AssistanceBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // Show the banner after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Cleanup on unmount
    return () => clearTimeout(timer);
  }, []);

  // Toggle visibility (for testing; you could hook this to other logic)
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

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
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalOfferIcon sx={{ marginRight: 1 }} />
            <Typography>Price Each</Typography>
          </Box>
          <Typography variant="h5" color="#3f5163" sx={{ fontWeight: "bold" }}>
            $58.03
          </Typography>
        </Box>

        {/* Design Now Button */}
        <Box sx={{ display: "flex", justifyContent: "center", width: "14rem", height: "48px" }}>
          <Button
            variant="contained"
            onClick={toggleVisibility}
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

      <PopUp open={open} handleClose={handleClose} />
    </>
  );
};

export default AssistanceBanner;
