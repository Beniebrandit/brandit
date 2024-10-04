import React, { useState } from "react";
import { Container, Grid, Typography, Button, Box, Divider } from "@mui/material";
import { styled } from "@mui/system";
import Navbar from "../components/landingcomponent/Navbar";
import DesignRequestForm from "../components/designservice/DesignRequestForm";
import CustomerFeedback from "../components/designservice/CustomerFeedback";
import { DesignServiceFooter } from "../components/designservice/DesignServiceFooter";

// Styled button for uploading files
const UploadButton = styled(Button)({
  marginTop: "1rem",
  width: "100%",
  textAlign: "center",
  backgroundColor: "#f9f9f9",
  border: "1px dashed #cccccc",
  padding: "15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const DesignService = () => {
  const [signType, setSignType] = useState("");
  const [thickness, setThickness] = useState("");
  const [printedSides, setPrintedSides] = useState("");
  const [edgeFinish, setEdgeFinish] = useState("");
  const [grommets, setGrommets] = useState("");
  const [polePockets, setPolePockets] = useState("");
  const [accessories, setAccessories] = useState("");

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Design Service Request
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          How It Works
        </Typography>
        <Grid container columnSpacing={"80px"} justifyContent="center" sx={{ mb: 4 }}>
          <Grid item xs={9} md={4}>
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <img src="https://s1-ecp.signs.com/2503/NowHiring-ProductThumbnails-Artboard-15-5040.png" alt="img" />
            </Box>
            <Typography variant="body1" align="center">
              Tell us about your design needs below and pay for the professional esign service.
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: "25px", // Adjust this value to position the left arrow
                top: "50%",
                width: "10px",
                height: "10px",
                borderTop: "2px solid black",
                borderRight: "2px solid black",
                transform: "rotate(45deg)",
                display: { xs: "none", md: "block" }, // Show only on medium+ screens
              },
              "&::after": {
                content: '""',
                position: "absolute",
                right: "-30px", // Adjust this value to position the right arrow
                top: "50%",
                width: "10px",
                height: "10px",
                borderTop: "2px solid black",
                borderRight: "2px solid black",
                transform: "rotate(45deg)",
                display: { xs: "none", md: "block" }, // Show only on medium+ screens
              },
            }}
          >
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <img src="https://s1-ecp.signs.com/2504/NowHiring-ProductThumbnails-Artboard-17-5042.png" alt="img" />
            </Box>
            <Typography variant="body1" align="center">
              Within 1-2 business days you will be contacted by a professional designer who will help create your
              perfect product design.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <img src="https://s1-ecp.signs.com/2505/NowHiring-ProductThumbnails-Artboard-18-5043.png" alt="img" />
            </Box>
            <Typography variant="body1" align="center">
              Order your finished product which will include a full credit of the design service fee.
            </Typography>
          </Grid>
        </Grid>
        <Divider
          sx={{
            height: "15px",
            fontSize: "50px",
            width: "100%",
            fontWeight: "bold",
            marginBottom: "4rem",
            padding: "2rem",
            borderBottomWidth: 2,
          }}
        />
      </Container>
    </>
  );
};

export default DesignService;
