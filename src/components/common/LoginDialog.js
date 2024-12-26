import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginDialog = ({ open, handleClose, handleOpenSignUp, fetchUserData }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [deviceName] = useState("Iphone"); // Static device name

  const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const passwordRegex = /[a-zA-Z0-9]{6,}/;

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        error = !emailRegex.test(value) && value ? "Enter a valid email address" : "";
        break;
      case "password":
        error = !passwordRegex.test(value) && value ? "Password must be at least 6 characters" : "";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const isFormValid = () => {
    return !errors.email && !errors.password && state.email && state.password;
  };

  const handleLogin = async () => {
    if (!isFormValid()) {
      toast.error("Invalid inputs");
      return;
    }
    try {
      const response = await fetch("https://flagg.devlopix.com/api/getToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: state.email, password: state.password, device_name: deviceName }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const token = await response.text();

      // Validate the token format (example regex: alphanumeric and at least 20 characters)
      const tokenRegex = /^[A-Za-z0-9|]{20,}$/; // Adjust regex based on actual token format
      if (!tokenRegex.test(token)) {
        throw new Error("Invalid token received");
      }

      // If token is valid, store it and proceed with login success
      localStorage.setItem("authToken", token);
      setState({ email: "", password: "" });

      toast("Login successful", {
        autoClose: 3000, // 3 seconds auto-close delay
        onClose: () => {
          handleClose(); // Close dialog only after toast finishes
          window.location.reload();
        },
      });

      // Fetch user data after successful login
      await fetchUserData(token);
    } catch (error) {
      // Display error toast if anything goes wrong
      toast.error(`Login failed: ${error.message}`);
      console.error("Error:", error);
    }
  };

  return (
    <>
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
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={state.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ borderRadius: "10px" }}
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            fullWidth
            value={state.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
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
          <Typography>
            Don't have an account?{" "}
            <span style={{ color: "blue", cursor: "pointer" }} onClick={handleOpenSignUp}>
              Create Account
            </span>
          </Typography>
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
      <ToastContainer />
    </>
  );
};

export default LoginDialog;
