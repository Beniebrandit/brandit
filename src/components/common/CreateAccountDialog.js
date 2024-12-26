import React, { useState } from "react";
import { Dialog, DialogContent, TextField, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { ProductService } from "../../services/Product.service";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateAccountDialog = ({ open, handleClose, setCurrentUser, handleOpenLogin }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const nameRegex = /([a-zA-Z]{3,30}s*)+/;
  const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const passwordRegex = /[a-zA-Z]{3,30}/;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
      case "name":
        error = !nameRegex.test(value) && value ? "Name is invalid" : "";
        break;
      case "email":
        error = !emailRegex.test(value) && value ? "Enter a valid email address" : "";
        break;
      case "password":
        error = !passwordRegex.test(value) && value ? "Password must be valid" : "";
        break;
      case "password_confirmation":
        error = value !== state.password ? "Passwords do not match" : "";
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
    return (
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.password_confirmation &&
      state.name &&
      state.email &&
      state.password &&
      state.password_confirmation
    );
  };

  const createAccount = () => {
    if (isFormValid()) {
      console.log("Form is valid, proceed with account creation");
      ProductService.registers(state)
        .then((res) => {
          console.log("registers", res);
          // Handle success here, e.g., redirecting or updating UI
          setCurrentUser(res?.user.name);
          localStorage.setItem("currentUser", res?.user.name); // Store user name in local storage
          const token = res.access_token;
          localStorage.setItem("authToken", token);
          handleClose();
          toast("registered successfully", {
            autoClose: 3000,
            onClose: () => {
              window.location.reload();
            },
          });
          setState({ name: "", email: "", password: "", password_confirmation: "" });
        })
        .catch((error) => {
          // Handle error here
          if (error.response) {
            console.error("Error response data:", error.response.data);

            if (error.response.status === 422) {
              const emailError = emailRegex.test(state.email) ? "Enter a valid email address" : "";
              setErrors((prevErrors) => ({
                ...prevErrors,
                email: emailError, // Update email field with the error message
              }));
              toast.error(`${error.response.data.email}`); // Show toast with the error message
            }
          } else if (error.request) {
            toast.error(`${error.request}`);
          } else {
            toast.error(`${error.message}`);
          }
        });
    } else {
      console.log("Form has errors, fix them before submitting");
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
            Create a New Account
          </Typography>
          <Typography variant="h7" sx={{ marginBottom: "10px" }}>
            Already have an account?{" "}
            <span style={{ color: "blue" }} onClick={handleOpenLogin}>
              Sign In
            </span>
          </Typography>
          <Typography variant="body2" gutterBottom>
            Stay updated with your orders by creating an account.
          </Typography>
          <TextField
            fullWidth
            name="name"
            value={state.name}
            variant="outlined"
            label="First Name"
            margin="normal"
            helperText={errors.name}
            error={!!errors.name}
            onChange={handleChange}
            sx={{ borderRadius: "10px" }}
          />
          <TextField
            fullWidth
            name="email"
            value={state.email}
            variant="outlined"
            label="Email Address"
            margin="normal"
            type="email"
            helperText={errors.email}
            error={!!errors.email}
            onChange={handleChange}
            sx={{ borderRadius: "10px" }}
          />
          {/*{mailMessage && <Typography sx={{color:"red"}}>use another mail or login</Typography>}*/}
          <TextField
            fullWidth
            name="password"
            value={state.password}
            variant="outlined"
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={errors.password}
            error={!!errors.password}
            onChange={handleChange}
            sx={{ borderRadius: "10px" }}
          />
          <TextField
            fullWidth
            name="password_confirmation"
            value={state.password_confirmation}
            variant="outlined"
            label="Confirm Password"
            type="password"
            margin="normal"
            helperText={errors.password_confirmation}
            error={!!errors.password_confirmation}
            onChange={handleChange}
            sx={{ borderRadius: "10px" }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={createAccount}
            sx={{
              backgroundColor: "#007bff",
              padding: "12px",
              marginTop: 2,
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#005bb5",
              },
            }}
            disabled={!isFormValid()}
          >
            Create My Account
          </Button>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </Typography>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default CreateAccountDialog;
