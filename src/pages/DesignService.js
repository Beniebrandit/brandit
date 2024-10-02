import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Box,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ReCAPTCHA from "react-google-recaptcha";
import Navbar from "../components/landingcomponent/Navbar";

// Styled button for uploading files
const UploadButton = styled(Button)({
  marginTop: "1rem",
  width: "100%",
  textAlign: "center",
  backgroundColor: "#e0f7fa",
  border: "1px dashed #00acc1",
  padding: "10px",
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
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* Title */}
        <Typography variant="h4" align="center" gutterBottom>
          Design Service Request
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          How It Works
        </Typography>

        {/* Steps Section */}
        <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" align="center">
              Tell us about your design needs below and pay for the professional design service.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" align="center">
              Within 1-2 business days you will be contacted by a professional designer who will help create your
              perfect product design.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" align="center">
              Order your finished product which will include a full credit of the design service fee.
            </Typography>
          </Grid>
        </Grid>

        {/* Form Section */}
        <Card sx={{ p: 2, mb: 4 }}>
          <CardContent>
            <Grid container spacing={2}>
              {/* First Name */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="First Name" variant="outlined" required />
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Last Name" variant="outlined" required />
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" variant="outlined" required />
              </Grid>

              {/* Phone Number */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone Number" variant="outlined" required />
              </Grid>

              {/* Sign Type */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Sign Type</InputLabel>
                  <Select value={signType} onChange={(e) => setSignType(e.target.value)} label="Sign Type">
                    <MenuItem value="banner">Banner</MenuItem>
                    <MenuItem value="vinyl">Vinyl</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Thickness */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Thickness</InputLabel>
                  <Select value={thickness} onChange={(e) => setThickness(e.target.value)} label="Thickness">
                    <MenuItem value="13_oz_vinyl">13 oz Vinyl</MenuItem>
                    <MenuItem value="15_oz_vinyl">15 oz Vinyl</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Printed Sides */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Printed Sides</InputLabel>
                  <Select value={printedSides} onChange={(e) => setPrintedSides(e.target.value)} label="Printed Sides">
                    <MenuItem value="single_sided">Single Sided</MenuItem>
                    <MenuItem value="double_sided">Double Sided</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Edge Finish */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Edge Finish</InputLabel>
                  <Select value={edgeFinish} onChange={(e) => setEdgeFinish(e.target.value)} label="Edge Finish">
                    <MenuItem value="welded_hem">Welded Hem</MenuItem>
                    <MenuItem value="none">None</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Grommets */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Grommets</InputLabel>
                  <Select value={grommets} onChange={(e) => setGrommets(e.target.value)} label="Grommets">
                    <MenuItem value="every_2_3_ft">Every 2-3 ft</MenuItem>
                    <MenuItem value="none">None</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Pole Pockets */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Pole Pockets</InputLabel>
                  <Select value={polePockets} onChange={(e) => setPolePockets(e.target.value)} label="Pole Pockets">
                    <MenuItem value="none">None</MenuItem>
                    <MenuItem value="top_bottom">Top & Bottom</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Accessories */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Accessories</InputLabel>
                  <Select value={accessories} onChange={(e) => setAccessories(e.target.value)} label="Accessories">
                    <MenuItem value="none">None</MenuItem>
                    <MenuItem value="bungee_cords">Bungee Cords</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Size Inputs */}
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Width"
                  variant="outlined"
                  required
                  InputProps={{ endAdornment: <InputAdornment position="end">W</InputAdornment> }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Height"
                  variant="outlined"
                  required
                  InputProps={{ endAdornment: <InputAdornment position="end">H</InputAdornment> }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Depth"
                  variant="outlined"
                  required
                  InputProps={{ endAdornment: <InputAdornment position="end">D</InputAdornment> }}
                />
              </Grid>

              {/* Design Details */}
              <Grid item xs={12}>
                <TextField fullWidth label="Design Details (Optional)" variant="outlined" multiline rows={4} />
              </Grid>

              {/* Color and Other Details */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Color" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Other details for your design" variant="outlined" multiline rows={4} />
              </Grid>

              {/* File Upload */}
              <Grid item xs={12}>
                <UploadButton variant="contained" component="label" startIcon={<CloudUploadIcon />}>
                  Upload a File
                  <input type="file" hidden />
                </UploadButton>
                <Typography variant="caption" display="block" align="center">
                  $10.00 Applied as a full credit to your product order.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Recaptcha and Continue Button */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={4} textAlign="center">
            <ReCAPTCHA sitekey="Your-Site-Key-Here" />
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <Button variant="contained" color="primary" size="large" fullWidth>
              Continue to Cart
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DesignService;
