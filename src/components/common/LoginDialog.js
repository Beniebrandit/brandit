import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, InputAdornment, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginDialog = ({ open, handleClose, handleOpenSignUp, fetchUserData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [deviceName] = useState("Iphone"); // Static device name

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    try {
      const response = await fetch("https://flagg.devlopix.com/api/getToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, device_name: deviceName }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const token = await response.text();
      localStorage.setItem("authToken", token);
      setEmail("");
      setPassword("");
      handleClose();

      // Fetch user data after successful login
      await fetchUserData(token);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          padding: 4,
          background: "linear-gradient(135deg, #e0f7fa 30%, #80deea 100%)",
          borderRadius: "20px",
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Log In to Your Account
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ borderRadius: "10px" }}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ borderRadius: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          style={{ marginTop: "16px" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
