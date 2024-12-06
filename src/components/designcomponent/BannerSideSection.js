import {
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Vector from "../../asset/images/ArrowIcon.svg";
import { ReactComponent as Sidebarsetting } from "../../asset/images/sidebar_setting.svg";
import React, { useState } from "react";
import { ReactComponent as Eye } from "../../asset/images/Eye.svg";

const BannerSideSection = ({ onToggleAccordion, productDetails, setShowSection, setValue, setIsTabOpen }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const theme = useTheme();

  const handleAccordionChange = () => {
    setIsAccordionOpen((prevState) => !prevState); // Toggles the state
    onToggleAccordion(!isAccordionOpen); // Notify parent of the new state
  };

  const OpenConfig = () => {
    setValue(0);
    setIsTabOpen(true);
  };
  return (
    <Box
      sx={{
        height: isAccordionOpen ? "78vh" : "auto",
        width: { sm: "300px" },
        marginTop: "20px",
        boxShadow: "0px 5px 30px -15px",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #868686",
        alignItems: "end",
        // padding: {md:"20px 0"},
        position: "fixed",
        background: "#fff",
        right: "0.5rem",
        top: "5rem",
        color: isAccordionOpen
          ? {
              xs: "transparent",
              sm: "transparent",
              md: "#3F5163",
              lg: "#3F5163",
            }
          : "transparent", // fully transparent when accordion is closed
        borderRadius: "6px",
        zIndex: "1000",
      }}
    >
      <Accordion
        expanded={isAccordionOpen}
        onChange={handleAccordionChange}
        sx={{ width: "100%", boxShadow: "none", background: "#fff", position: "relative", zIndex: "1" }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
          <Typography sx={{ color: "#3F5163", fontWeight: "bold", fontSize: "20px" }}>Banner</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <Box sx={{ margin: "auto", marginTop: "1rem", position: "relative" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1rem",
                backgroundColor: "white",
                // padding: "1rem",
                borderRadius: "1rem",
              }}
            >
              <Box sx={{ display: "grid", gap: "6px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography sx={{ color: "#3F5163", fontSize: "16px", fontWeight: 500 }}>Material</Typography>
                    <Typography sx={{ fontSize: "16px", color: "#868686" }}>Stickers and Decals</Typography>
                  </Box>
                  <Box sx={{ display: "grid", paddingLeft: "2px" }} onClick={OpenConfig}>
                    <Sidebarsetting
                      style={{
                        paddingLeft: "8px",
                        height: "23px",
                      }}
                    />
                    <Typography sx={{ fontSize: "16px", color: "#3F5163", fontWeight: 400 }}>Config</Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography sx={{ color: "#3F5163", fontSize: "16px", fontWeight: 500 }}>Size</Typography>
                <Typography sx={{ fontSize: "16px", color: "#868686" }}>
                  {productDetails?.width}" W X {productDetails?.height}" H
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ color: "#3F5163", fontSize: "16px", fontWeight: 500 }}>Quantity</Typography>
                <Typography sx={{ fontSize: "16px", color: "#868686" }}>{productDetails?.quantity} qty</Typography>
              </Box>{" "}
              <Box>
                <Typography sx={{ color: "#3F5163", fontSize: "16px", fontWeight: 500 }}>Price</Typography>
                <Typography sx={{ fontSize: "16px", color: "#868686" }}>
                  <span style={{ color: "#E0CE8F" }}>${productDetails?.price}</span> each{" "}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Eye style={{ width: "25px", height: "auto" }} />
                &nbsp;
                <Typography
                  onClick={() => setShowSection(false)}
                  sx={{ color: "#3F5163", fontWeight: "bold", fontSize: "20px" }}
                >
                  View Proof
                </Typography>
              </Box>
              <Divider />
              <Button
                sx={{
                  borderRadius: "10px",
                  height: "50px",
                  color: "white",
                  backgroundColor: "#3F5163",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#3F5163",
                  },
                }}
              >
                Save & Continue
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default BannerSideSection;
