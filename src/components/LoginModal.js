import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  TextField,
  Typography,
  Link,
  Box,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginModal = ({ open, setOpen, handleClose }) => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [state, setState] = useState({
    fName: "",
    lName: "",
    Email: "",
    Password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fName: "",
    lName: "",
    Email: "",
    Password: "",
    confirmPassword: "",
  });

    const [showPassword, setShowPassword] = useState(false);

  let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  let fnameRegex = /([a-zA-Z]{3,30}s*)+/;
  let lnameRegex = /[a-zA-Z]{3,30}/;
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const handleClose0 = () => {
    setOpen(false);
    setIsForgotPassword(false); // Reset when closing
    setIsSignUp(false); // Reset when closing
    handleClose();
  };

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false);
    setIsSignUp(false);
  };

  const handleSignUp = () => {
    setIsSignUp(true);
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
      case "fName":
        error = !fnameRegex.test(value) && value ? "First name is invalid" : "";
        break;
      case "lName":
        error = !lnameRegex.test(value) && value ? "Last name is invalid" : "";
        break;
      case "Email":
        error = !emailRegex.test(value) && value ? "Enter a valid email address" : "";
        break;
      case "Password":
        error =
          !passwordRegex.test(value) && value
            ? "Minimum eight characters, at least one letter, one number, and one special character"
            : "";
        break;
      case "confirmPassword":
        error = value !== state.Password ? "Passwords do not match" : "";
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
      !errors.fName &&
      !errors.lName &&
      !errors.Email &&
      !errors.Password &&
      !errors.confirmPassword &&
      state.fName &&
      state.lName &&
      state.Email &&
      state.Password &&
      state.confirmPassword
    );
  };

  const createAccount = () => {
    if (isFormValid()) {
      console.log("Form is valid, proceed with account creation");
      // Perform sign-up logic here
    } else {
      console.log("Form has errors, fix them before submitting");
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose0} maxWidth="xs" fullWidth>
        <IconButton
          aria-label="close"
          onClick={handleClose0}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {/* Login Form */}
          {!isForgotPassword && !isSignUp && (
            <>
              <Typography variant="h6" gutterBottom>
                Log In
              </Typography>
              <TextField
                fullWidth
                name="Email"
                value={state.Email}
                variant="outlined"
                label="Email Address"
                margin="normal"
                type="email"
                helperText={errors.Email}
                error={!!errors.Email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                name="Password"
                value={state.Password}
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
                helperText={errors.Password}
                error={!!errors.Password}
                onChange={handleChange}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Link
                  href="#"
                  variant="body2"
                  onClick={handleForgotPassword}
                  sx={{ display: "inline-block", marginBottom: 2 }}
                >
                  Forgot password??????
                </Link>
              </Box>
              <Button fullWidth variant="contained" color="primary" sx={{ backgroundColor: "#007bff" }}>
                LOG IN
              </Button>
            </>
          )}

          {/* Forgot Password Form */}
          {isForgotPassword && (
            <>
              <Typography variant="h6" gutterBottom>
                Forgot Password
              </Typography>
              <Typography variant="body2" gutterBottom>
                Enter your email address and we will send you instructions to reset your password.
              </Typography>
              <TextField
                fullWidth
                name="Email"
                value={state.Email}
                variant="outlined"
                label="Email Address"
                margin="normal"
                type="email"
                helperText={errors.Email}
                error={!!errors.Email}
                onChange={handleChange}
              />
              <Button fullWidth variant="contained" color="primary" sx={{ backgroundColor: "#007bff", marginTop: 2 }}>
                SEND RESET LINK
              </Button>
              <Button fullWidth variant="text" color="primary" onClick={handleBackToLogin} sx={{ marginTop: 1 }}>
                Back to Log In
              </Button>
            </>
          )}

          {/* Sign-Up Form */}
          {isSignUp && (
            <>
              <Typography variant="h6" gutterBottom>
                First Time Here?
              </Typography>
              <Typography variant="body2" gutterBottom>
                Create an account to get updates on your order.
              </Typography>
              <TextField
                fullWidth
                name="fName"
                value={state.fName}
                variant="outlined"
                label="First Name"
                margin="normal"
                helperText={errors.fName}
                error={!!errors.fName}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                name="lName"
                value={state.lName}
                variant="outlined"
                label="Last Name"
                margin="normal"
                helperText={errors.lName}
                error={!!errors.lName}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                name="Email"
                value={state.Email}
                variant="outlined"
                label="Email Address"
                margin="normal"
                type="email"
                helperText={errors.Email}
                error={!!errors.Email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                name="Password"
                value={state.Password}
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
                helperText={errors.Password}
                error={!!errors.Password}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                name="confirmPassword"
                value={state.confirmPassword}
                variant="outlined"
                label="Confirm Password"
                type="password"
                margin="normal"
                helperText={errors.confirmPassword}
                error={!!errors.confirmPassword}
                onChange={handleChange}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={createAccount}
                sx={{ backgroundColor: "#007bff", marginTop: 2 }}
                disabled={!isFormValid()} // Disable if form is invalid
              >
                CREATE MY ACCOUNT
              </Button>
              <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                By creating an account, you agree to our Terms of Service and Privacy Policy.
              </Typography>
              <Button fullWidth variant="text" color="primary" onClick={handleBackToLogin} sx={{ marginTop: 1 }}>
                Already have an account? Log In
              </Button>
            </>
          )}
        </DialogContent>
        {!isForgotPassword && !isSignUp && (
          <DialogActions sx={{ justifyContent: "center" }}>
            <Typography variant="body2">New to Signs?</Typography>
            <Button variant="outlined" fullWidth onClick={handleSignUp}>
              CREATE A NEW SIGNS ACCOUNT
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default LoginModal;
