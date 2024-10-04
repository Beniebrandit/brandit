import React, { useState } from "react";
import { Grid, Box, Typography, TextField, FormControl, Select, MenuItem, Button } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

const DesignRequestForm = () => {
  const [printedSides, setPrintedSides] = useState("");

  const handleChange = (event) => {
    setPrintedSides(event.target.value);
  };

    function onChange(value) {
      console.log("Captcha value:", value);
    }

  return (
    <div>
      {/* Personal Information Section */}
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

      {/* Design Request Details Section */}
      <Box sx={{ marginTop: "80px", border: "1px solid #cfd4d9", width: "100%" }}>
        <Box
          sx={{
            borderBottom: "1px solid #cfd4d9",
            padding: "8px 16px",
            backgroundColor: "#f3f3f3",
            color: "#333",
            fontWeight: 400,
          }}
        >
          Design request details
        </Box>

        <Grid container sx={{ padding: "21px 32px" }}>
          <Grid item xs={12} md={6}>
            {["Sign Type", "Thickness", "Printed Sides", "Edge Finish", "Grommets", "Pole Pockets", "Accessories"].map(
              (label, index) => (
                <Box sx={{ mt: 2 }} key={index}>
                  <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>{label}</Typography>
                  <FormControl fullWidth required>
                    <Select value={printedSides} onChange={handleChange}>
                      <MenuItem value="single_sided">Single Sided</MenuItem>
                      <MenuItem value="double_sided">Double Sided</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )
            )}
          </Grid>

          <Grid item xs={12} md={6} sx={{ paddingLeft: "30px" }}>
            <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Size</Typography>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Typography>W</Typography>
                <FormControl sx={{ minWidth: 70 }}>
                  <Select value={printedSides} onChange={handleChange}>
                    <MenuItem value="single_sided">Single Sided</MenuItem>
                    <MenuItem value="double_sided">Double Sided</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mt: 2 }}>
                <Typography>H</Typography>
                <FormControl sx={{ minWidth: 70 }}>
                  <Select value={printedSides} onChange={handleChange}>
                    <MenuItem value="single_sided">Single Sided</MenuItem>
                    <MenuItem value="double_sided">Double Sided</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Optional Details */}
            {["Design Details(Optional)", "Color", "Other details for your design"].map((label, index) => (
              <Box sx={{ mt: 3 }} key={index}>
                <Typography>{label}</Typography>
                <TextField placeholder={`Enter ${label.toLowerCase()}`} multiline rows={4} fullWidth />
              </Box>
            ))}

            {/* File Upload Section */}
            <Box sx={{ mt: 3 }}>
              <Typography>File Upload (Optional)</Typography>
              <Box sx={{ background: "#f3f3f3", padding: "30px", border: "1px solid #cfd4d9", textAlign: "center" }}>
                <Button sx={{ background: "#53B8E8", border: "1px solid #53B8E8", color: "#fff" }}>
                  Upload a File
                </Button>
                <Typography sx={{ mt: 2 }}>or drag files here</Typography>
              </Box>
              <Typography sx={{ fontSize: "12px", mt: 1 }}>
                If you wish to upload more than one image, please upload them in a ZIP file.
              </Typography>

              <Box sx={{ background: "#f4fde8", padding: "20px", mt: 2 }}>
                <Typography sx={{ color: "#8CC53F", fontSize: "30px", fontWeight: "500" }}>$10.00</Typography>
                <Typography>Applied as a full credit to your product order.</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Button sx={{ mt: 2 }}>+ Request another design item</Button>
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
    </div>
  );
};

export default DesignRequestForm;
