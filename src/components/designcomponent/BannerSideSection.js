import { Box, Button, Container, Divider } from "@mui/material";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ReactComponent as Eye } from "../../asset/images/Eye.svg";

const BannerSideSection = () => {
  return (
    <>
      <Box
        style={{
          height: "82vh", // Full height of the viewport
          width: "15rem", // Width of the sidebar
          boxShadow: "0px 5px 30px -15px", // Background color of the sidebar
          display: "flex",
          flexDirection: "column",
          alignItems: "end", // Align items to the end of the flex container
          padding: "20px 0", // Padding at the top and bottom
          position: "fixed", // Fixes the sidebar to the right
          right: "0.5rem", // Move the sidebar to the right
          top: "5rem", // Set the top position of the sidebar
          color: "#3F5163", // Text color
          borderRadius: "6px",
        }}
      >
        <Accordion sx={{ width: "96%" }}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography sx={{ paddingLeft: "1rem" }}>
              <b>Banner</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Divider />
            <Box
              sx={{ margin: "auto", marginTop: "1rem", position: "relative" }}
            >
              <Box
                sx={{
                  display: "grid",
                  // gridTemplateColumns: "3fr 2fr 1fr 1fr 1.5fr",
                  gridTemplateColumns: "1fr",
                  gap: "1rem",
                  backgroundColor: "white",
                  padding: "1rem",
                  borderRadius: "1rem",
                  // border:"1px solid gray",
                  // boxShadow: "10px 10px 35px -15px",
                }}
              >
                <Box>
                  <Typography>Material</Typography>
                  <Typography sx={{ fontSize: "12px" }}>
                    Stickers and Decals
                  </Typography>
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
                  <Typography sx={{}}>
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
    </>
  );
};

export default BannerSideSection;
