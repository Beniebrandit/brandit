import React, { useState } from "react";
import { Grid, Box, Typography, TextField, FormControl, Select, MenuItem, Button } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

const DesignRequestForm = () => {
  const [fileUpload, setFileUpload] = useState(null); // State for file upload
  const [signtype, setSigntype] = useState("Banner");
  const [printedSides, setPrintedSides] = useState("Single Sided");
  const [thickness, setThickness] = useState("Thin");
  const [edgeFinish, setEdgeFinish] = useState("None(Flush Cut)");
  const [grommets, setgrommets] = useState("Every 2-3 ft");
  const [polepockets, setpolepockets] = useState("None");
  const [accessories, setaccessories] = useState("None");
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);

  const handleFileUpload = (e) => {
    setFileUpload(e.target.files[0]); // Store selected file
  };

  const handleChangeSignType = (event) => {
    setSigntype(event.target.value);
  };

  const handleChangePrintedSides = (event) => {
    setPrintedSides(event.target.value);
  };

  const handleChangeThickness = (event) => {
    setThickness(event.target.value);
  };

  const handleChangeEdgeFinish = (event) => {
    setEdgeFinish(event.target.value);
  };

  const handleChangeGrommets = (event) => {
    setgrommets(event.target.value);
  };

  const handleChangePolePockets = (event) => {
    setpolepockets(event.target.value);
  };

  const handleChangeAccessories = (event) => {
    setaccessories(event.target.value);
  };

  const widthChange = (event) => {
    setWidth(event.target.value);
  };
  const heightchange = (event) => {
    setHeight(event.target.value);
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
      <Box sx={{ border: "1px solid #cfd4d9", width: "100%", mt: 4 }}>
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

        <Grid container sx={{ padding: { sm: "21px 32px", xs: "12px" } }}>
          <Grid item xs={12} md={6}>
            <Box sx={{}}>
              <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Sign Type</Typography>
              <FormControl fullWidth required>
                <Select value={signtype} onChange={handleChangeSignType}>
                  <MenuItem value="Banner">Banner</MenuItem>
                  <MenuItem value="Aluminum sign">Aluminum sign</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Printed Sides</Typography>
              <FormControl fullWidth required>
                <Select value={printedSides} onChange={handleChangePrintedSides}>
                  <MenuItem value="Single Sided">Single Sided</MenuItem>
                  <MenuItem value="Double Sided">Double Sided</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Thickness</Typography>
              <FormControl fullWidth required>
                <Select value={thickness} onChange={handleChangeThickness}>
                  <MenuItem value="Thin">Thin</MenuItem>
                  <MenuItem value="Thick">Thick</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Edge Finish</Typography>
              <FormControl fullWidth required>
                <Select value={edgeFinish} onChange={handleChangeEdgeFinish}>
                  <MenuItem value="Welded Hem">Welded Hem</MenuItem>
                  <MenuItem value="Sewn Hem">Sewn Hem</MenuItem>
                  <MenuItem value="None(Flush Cut)">{"None(Flush Cut)"}</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Grommets</Typography>
              <FormControl fullWidth required>
                <Select value={grommets} onChange={handleChangeGrommets}>
                  <MenuItem value="Every 2-3 ft">Every 2-3 ft</MenuItem>
                  <MenuItem value="4 Corners">4 Corners</MenuItem>
                  <MenuItem value="top Corners">top Corners</MenuItem>
                  <MenuItem value="None">None</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Pole Pockets</Typography>
              <FormControl fullWidth required>
                <Select value={polepockets} onChange={handleChangePolePockets}>
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value={`3" Pockets{"(Top & Bottom)"}`}>3" Pockets{"(Top & Bottom)"}</MenuItem>
                  <MenuItem value={`3" Pockets{"(Top Only)"}`}>3" Pockets{"(Top Only)"}</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Accessories</Typography>
              <FormControl fullWidth required>
                <Select value={accessories} onChange={handleChangeAccessories}>
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value={`Bungees(8)`}>{"Bungees(8)"}</MenuItem>
                  <MenuItem value={`Bungees(8)`}>{"Bungees(8)"}</MenuItem>
                  <MenuItem value={`Zip Ties(10)`}>{"Zip Ties(10)"}</MenuItem>
                  <MenuItem value={`10ft Nylone Rope(4)`}>{"10ft Nylone Rope(4)"}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ paddingLeft: { md: "30px" } }}>
            <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Size</Typography>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>W</Typography>
                <FormControl sx={{ minWidth: 70 }}>
                  <Select value={width} onChange={widthChange}>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="20">20</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              &nbsp;&nbsp;&nbsp;
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>H</Typography>
                <FormControl sx={{ minWidth: 70 }}>
                  <Select value={height} onChange={heightchange}>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="20">20</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Optional Details */}
            <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px", mt: 3 }}>
              Design Details{"(Optional)"}
            </Typography>
            {["Text", "Color", "Other details for your design"].map((label, index) => (
              <Box sx={{ mt: 3 }} key={index}>
                <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>{label}</Typography>
                <TextField placeholder={`Enter ${label.toLowerCase()}`} multiline rows={4} fullWidth />
              </Box>
            ))}
            <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>File Upload</Typography>
            <Box sx={{ mt: 3 }}>
              <input type="file" onChange={handleFileUpload} />
              {fileUpload && (
                <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>
                  Uploaded file: {fileUpload.name}
                </Typography>
              )}
            </Box>

            <Box sx={{ background: "#f4fde8", padding: "20px", mt: 2 }}>
              <Typography sx={{ color: "#8CC53F", fontSize: "30px", fontWeight: "500" }}>$10.00</Typography>
              <Typography>Applied as a full credit to your product order.</Typography>
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
