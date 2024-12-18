import React, { useState, useEffect } from "react";
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
import { ReactComponent as Sidebarsetting } from "../../asset/images/sidebar_setting.svg";
import { ReactComponent as Eye } from "../../asset/images/Eye.svg";

const BannerSideSection = ({
  onToggleAccordion,
  productDetails,
  alldata,
  setShowSection,
  setValue,
  setIsTabOpen,
  storedPayload,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [finalProductData, setFinalProductData] = useState({});
  const theme = useTheme();

  // Toggle Accordion
  const handleAccordionChange = () => {
    setIsAccordionOpen((prevState) => !prevState);
    onToggleAccordion(!isAccordionOpen);
  };

  // Open Config Tab
  const OpenConfig = () => {
    setValue(0);
    setIsTabOpen(true);
  };

  // Set initial product data based on storedPayload
  useEffect(() => {
    if (storedPayload) {
      setFinalProductData({
        width: storedPayload.width || "",
        height: storedPayload.height || "",
        quantity: storedPayload.quantity || 1,
        price: storedPayload.price || null,
        ProductId: alldata?.id || null,
      });
    }
  }, [storedPayload, alldata]);

  //console.log("finalProductData", finalProductData);
  //console.log("productDetails", productDetails);

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
                borderRadius: "1rem",
              }}
            >
              {/* Material Section */}
              <Box sx={{ display: "grid", gap: "6px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography sx={{ color: "#3F5163", fontSize: "16px", fontWeight: 500 }}>Material</Typography>
                    <Typography sx={{ fontSize: "16px", color: "#868686" }}>{alldata?.name}</Typography>
                  </Box>
                  <Box sx={{ display: "grid", paddingLeft: "2px" }} onClick={OpenConfig}>
                    <Sidebarsetting style={{ paddingLeft: "8px", height: "23px" }} />
                    <Typography sx={{ fontSize: "16px", color: "#3F5163", fontWeight: 400 }}>Config</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Size Section */}
              <Box>
                <Typography sx={{ color: "#3F5163", fontSize: "16px", fontWeight: 500 }}>Size</Typography>
                <Typography sx={{ fontSize: "16px", color: "#868686" }}>
                  {productDetails?.width == "" ? finalProductData?.width : productDetails?.width || "N/A"}" W X{" "}
                  {productDetails?.height == "" ? finalProductData?.height : productDetails?.height || "N/A"}" H
                </Typography>
              </Box>

              {/* Quantity Section */}
              <Box>
                <Typography sx={{ color: "#3F5163", fontSize: "16px", fontWeight: 500 }}>Quantity</Typography>
                <Typography sx={{ fontSize: "16px", color: "#868686" }}>
                  {productDetails?.quantity == "" ? finalProductData?.quantity : productDetails?.quantity || 1} qty
                </Typography>
              </Box>

              {/* Price Section */}
              <Box>
                <Typography sx={{ color: "#3F5163", fontSize: "16px", fontWeight: 500 }}>Price</Typography>
                <Typography sx={{ fontSize: "16px", color: "#868686" }}>
                  <span style={{ color: "#E0CE8F" }}>
                    ${finalProductData?.price || productDetails?.price || "0.00"}
                  </span>{" "}
                  each
                </Typography>
              </Box>

              {/* View Proof */}
              <Box sx={{ display: "flex" }}>
                <Eye style={{ width: "25px", height: "auto" }} />
                &nbsp;
                <Typography
                  onClick={() => setShowSection(false)}
                  sx={{ color: "#3F5163", fontWeight: "bold", fontSize: "20px", cursor: "pointer" }}
                >
                  View Proof
                </Typography>
              </Box>

              <Divider />

              {/* Save & Continue */}
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
