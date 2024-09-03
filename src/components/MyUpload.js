import React, { useState } from "react";
import { Box, Typography, Button ,CircularProgress } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import WbCloudyOutlinedIcon from "@mui/icons-material/WbCloudyOutlined";
import AddToDriveOutlinedIcon from "@mui/icons-material/AddToDriveOutlined";
import RecyclingOutlinedIcon from "@mui/icons-material/RecyclingOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";

const MyUpload = ({
  handleImageChange,
  selectedFile,
  handleDeleteClick,
  selectImage,
  handleExpand,
}) => {
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
      setLoading(true);
      handleImageChange(event);
  
      // Simulate the loading process by using a timeout
      setTimeout(() => {
        setLoading(false); // Hide loader after 2 seconds
      }, 2000);
    };
  return (
    <>
      <Box
        sx={{
          border: "2px dashed #bfbfbf",
          borderRadius: "8px",
          padding: "16px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="body1" gutterBottom>
          Drag or drop here to upload or
        </Typography>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label
            className="custom-file-upload"
            style={{
              backgroundColor: "#44c767",
              color: "white",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            BROWSE YOUR FILES
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange} // Use handleFileChange to trigger the loader
              style={{
                display: "none", // Hide the file input
              }}
            />
          </label>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          paddingBottom: "16px",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CloudUploadOutlinedIcon style={{ width: "40px", height: "auto" }} />
          <Typography variant="caption">Upload</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <WbCloudyOutlinedIcon style={{ width: "40px", height: "auto" }} />
          <Typography variant="caption">Google Drive</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <AddToDriveOutlinedIcon style={{ width: "40px", height: "auto" }} />
          <Typography variant="caption">Dropbox</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <RecyclingOutlinedIcon style={{ width: "40px", height: "auto" }} />
          <Typography variant="caption">OneDrive</Typography>
        </Box>
      </Box>
      <Typography variant="caption" display="block" textAlign="center">
        JPG, JPEG, PNG, GIF, TIFF, BMP, AI, EPS, SVG, PDF, HEIC, JFIF, PJPEG,
        WEBP
        <br />
        Max file size: 200 MB
      </Typography>
      {selectedFile && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 2,
          }}
        >
          {selectedFile?.map((image, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: "100px",
                height: "100px",
                margin: "auto",
                "&:hover .icon-box": {
                  top: "0", // Move icons into view on hover
                  opacity: 1, // Make icons visible on hover
                },
              }}
            >
              <img
                src={image}
                style={{
                  height: "100px",
                  width: "100px",
                  display: "block",
                }}
                alt="img"
                onClick={() => {
                  selectImage(index);
                }}
              />
              {loading && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent overlay
                  }}
                >
                  <CircularProgress size={24} />
                </Box>
              )}
              <Box
                sx={{
                  position: "absolute",
                  top: "0", // Position it over the image
                  marginTop: "5px",
                  left: "21%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "70px",
                  opacity: 0, // Initially hide icons
                  transition: "top 0.3s ease-in-out, opacity 0.3s ease-in-out", // Smooth transition
                }}
                className="icon-box"
              >
                <Button onClick={() => handleDeleteClick(index)}>
                  <DeleteOutlinedIcon
                    sx={{
                      backgroundColor: "whitesmoke",
                      padding: "3px",
                      borderRadius: "5px",
                    }}
                  />
                </Button>
                <Button onClick={() => handleExpand(index)}>
                  <OpenInFullOutlinedIcon
                    sx={{
                      backgroundColor: "whitesmoke",
                      padding: "3px",
                      borderRadius: "5px",
                    }}
                  />
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default MyUpload;
