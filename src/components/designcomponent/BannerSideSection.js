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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ReactComponent as Sidebarsetting } from "../../asset/images/sidebar_setting.svg";
import React, { useState } from "react";
import { ReactComponent as Eye } from "../../asset/images/Eye.svg";

const BannerSideSection = ({ onToggleAccordion }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const theme = useTheme();

  const handleAccordionChange = () => {
    setIsAccordionOpen((prevState) => !prevState); // Toggles the state
    onToggleAccordion(!isAccordionOpen); // Notify parent of the new state
  };

  return (
    <Box
      sx={{
        height: isAccordionOpen ? "76vh" : "auto",
        width: "15rem",
        boxShadow: "0px 5px 30px -15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        padding: "20px 0",
        position: "fixed",
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
      <Accordion expanded={isAccordionOpen} onChange={handleAccordionChange} sx={{ width: "96%" }}>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />} aria-controls="panel2-content" id="panel2-header">
          <Typography sx={{ paddingLeft: "1rem" }}>
            <b>Banner</b>
          </Typography>
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
                padding: "1rem",
                borderRadius: "1rem",
              }}
            >
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Material</Typography>
                  <Box sx={{ display: "flex", gap: "5px", paddingLeft: "2px" }}>
                    <Sidebarsetting
                      style={{
                        borderLeft: "1.5px dashed #b8b8b8",
                        height: "18px",
                        paddingLeft: "5px",
                      }}
                    />
                    <Typography sx={{ fontSize: "10px" }}>Config</Typography>
                  </Box>
                </Box>

                <Typography sx={{ fontSize: "12px" }}>Stickers and Decals</Typography>
              </Box>
              <Box>
                <Typography>Size</Typography>
                <Typography sx={{ fontSize: "12px" }}>6 x 24</Typography>
              </Box>
              <Box>
                <Typography>Quantity</Typography>
                <Typography sx={{ fontSize: "12px" }}>2 qty</Typography>
              </Box>
              <Box>
                <Typography>Price</Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  <span style={{ color: "#E0CE8F" }}>$13.31</span> each{" "}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Eye style={{ width: "20px", height: "auto" }} />
                &nbsp;
                <Typography>
                  <b>View Proof</b>
                </Typography>
              </Box>
              <Divider />
              <Button
                sx={{
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
