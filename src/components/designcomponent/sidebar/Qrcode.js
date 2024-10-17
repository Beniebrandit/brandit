import { Box, Button, Input, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import QRCode from "qrcode";

const Qrcode = ({ setImage }) => {
  const [qrcode, setQrcode] = useState();
  //  const [image, setImage] = useState();

  function handleClick() {
    QRCode.toDataURL(qrcode)
      .then((url) => {
        setImage(url);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <>
      <Box sx={{ p: 4, border: "1px solid #e0e0e0", borderRadius: 2, maxWidth: 600, margin: "0 auto" }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          QR Code Configuration
        </Typography>
        <TextField
          id="standard-basic"
          variant="standard"
          placeholder="https://www.example.com"
          sx={{ width: "13rem" }}
          onChange={(e) => setQrcode(e.target.value)}
        />
        <br></br>
        <Button variant="contained" sx={{ mt: 3, px: 5 }} color="primary" onClick={handleClick}>
          Generate Qrcode
        </Button>
      </Box>
    </>
  );
};

export default Qrcode;
