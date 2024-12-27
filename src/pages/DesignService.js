import React, { useState } from "react";
import { Container, Grid, Typography, Button, Box, Divider, TextField } from "@mui/material";
import { styled } from "@mui/system";
import Navbar from "../components/landingcomponent/Navbar/Navbar";
import DesignRequestForm from "../components/designservice/DesignRequestForm";
import CustomerFeedback from "../components/designservice/CustomerFeedback";
import { DesignServiceFooter } from "../components/designservice/DesignServiceFooter";
import LoginDialog from "../components/common/LoginDialog";
import CreateAccountDialog from "../components/common/CreateAccountDialog";
import ReCAPTCHA from "react-google-recaptcha";
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
  const [loginOpen, setLoginOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [forms, setForms] = useState([{ id: 1 }]);

  const addForm = () => {
    setForms([...forms, { id: forms.length + 1 }]);
  };

  const deleteForm = (id) => {
    setForms(forms.filter((form) => form.id !== id));
  };

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

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (
    <>
      <Navbar handleClickOpenLogin={handleClickOpenLogin} handleClickOpenSignUp={handleClickOpenSignUp} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Design Service Request
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          How It Works
        </Typography>
        <Grid container justifyContent="center" sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
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
        <Grid container spacing={3}>
          {["First Name", "Last Name", "Email", "Phone Number"].map((label, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Typography>{label}*</Typography>
              <Box sx={{ mt: 2 }}>
                <TextField fullWidth />
              </Box>
            </Grid>
          ))}
        </Grid>
        {forms.map((form) => (
          <DesignRequestForm key={form.id} formNumber={form.id} onDelete={() => deleteForm(form.id)} />
        ))}
        <Button sx={{ mt: 2 }} onClick={addForm}>
          + Request another design item
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            mt: 2,
          }}
        >
          <ReCAPTCHA sitekey="Your client site key" onChange={onChange} />
          <Button
            sx={{
              border: "1px solid #8CC53F",
              color: "#fff",
              background: "#8CC53F",
              cursor: "pointer",
              fontWeight: "600",
              mt: 3,
              width: "35%",
            }}
          >
            Continue to Cart
          </Button>
        </Box>
        <CustomerFeedback />
        <DesignServiceFooter />
      </Container>
      <LoginDialog
        open={loginOpen}
        handleClose={handleCloseLogin}
        handleOpenSignUp={handleClickOpenSignUp}
        fetchUserData={fetchUserData}
      />
      <CreateAccountDialog
        open={openSignUp}
        handleClose={handleCloseSignUp}
        setCurrentUser={setCurrentUser}
        handleOpenLogin={handleClickOpenLogin}
      />
    </>
  );
};

export default DesignService;
