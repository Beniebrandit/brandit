import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const Text = ({ onStyleChange }) => {
  const handleHeadingClick = () => {
    onStyleChange({ fontWeight: 'bold' });
  };

  const handleItalicClick = () => {
    onStyleChange({ fontStyle: 'italic' });
  };
  return (
    <Box
      sx={{
        width: "300px",
        margin: "0 auto",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Heading */}
      <Button
        fullWidth
        // variant="outlined"
        // defaultValue="Add Heading"
        onClick={handleHeadingClick}
        InputProps={{ style: { fontWeight: "bold" } }}
        sx={{
          marginBottom: "12px",
          backgroundColor: "#fff",
          color: "black",
          border: "1px solid gray",
          textTransform: "none", // Apply to the component itself
        }}
        disableElevation
      >
        Add Heading
      </Button>

      {/* Subheading */}
      <Button
        fullWidth
        // variant="outlined"
        // defaultValue="Add subheading"
        onClick={handleItalicClick}
        sx={{
          marginBottom: "12px",
          backgroundColor: "#fff",
          color: "black",
          border: "1px solid gray",
          textTransform: "none", // Apply to the component itself
        }}
        disableElevation
      >
        Add subheading
      </Button>

      {/* Body Text */}
      <Button
        fullWidth
        //  variant="contained"
        // defaultValue="Add body text"
        sx={{
          marginBottom: "12px",
          backgroundColor: "#fff",
          color: "black",
          border: "1px solid gray",
          textTransform: "none", // Apply to the component itself
        }}
        disableElevation
      >
        Add body text
      </Button>

      {/* Curved Text */}
      <Button
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80px",
          backgroundColor: "#e3f2fd",
          borderRadius: "8px",
          textTransform: "none"
        }}
      >
        <svg width="100%" height="auto">
          {/* Define the path for the text to follow */}
          <path id="textPath" d="M100 60 Q 160 -10 230 60" fill="transparent" />

          {/* Add curved text */}
          <text fill="#1976d2" fontSize="16" fontWeight="bold">
            <textPath href="#textPath" startOffset="50%" textAnchor="middle">
              Add curved text
            </textPath>
          </text>
        </svg>
      </Button>
    </Box>
  );
};

export default Text;
