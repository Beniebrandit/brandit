import React, { useState } from "react";
import { Dialog, DialogContent, DialogActions, IconButton, Button, TextField, Typography, Link } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const LoginModal = ({ open, setOpen, handleClose }) => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleClose0 = () => {
    setOpen(false);
    setIsForgotPassword(false); // Reset when closing
    setIsSignUp(false); // Reset when closing
    handleClose();
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
              <TextField fullWidth variant="outlined" label="Email Address" margin="normal" />
              <TextField fullWidth variant="outlined" label="Password" type="password" margin="normal" />
              <Link
                href="#"
                variant="body2"
                onClick={handleForgotPassword}
                sx={{ display: "block", textAlign: "right", marginBottom: 2 }}
              >
                Forgot password?
              </Link>
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
              <TextField fullWidth variant="outlined" label="Email Address" margin="normal" />
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
              <TextField fullWidth variant="outlined" label="First Name" margin="normal" />
              <TextField fullWidth variant="outlined" label="Last Name" margin="normal" />
              <TextField fullWidth variant="outlined" label="Email Address" margin="normal" />
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                type="password"
                margin="normal"
                helperText="Minimum of 8 characters long"
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Confirm Password"
                type="password"
                margin="normal"
                helperText="Minimum of 8 characters long"
              />
              <Button fullWidth variant="contained" color="primary" sx={{ backgroundColor: "#007bff", marginTop: 2 }}>
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
