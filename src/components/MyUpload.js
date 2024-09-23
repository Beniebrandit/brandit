// MyUpload.js
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { ReactComponent as Microsoft } from "../asset/images/microsoft.svg";
import { ReactComponent as Googledrive } from "../asset/images/googledrive.svg";
import { ReactComponent as Dropbox } from "../asset/images/dropbox.svg";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import useGooglePicker from "./useGooglePicker"; // Adjust the path as needed

const MyUpload = ({ handleImageChange, selectedFile, handleDeleteClick, selectImage, handleExpand }) => {
  const [loading, setLoading] = useState([]);
  const [driveData, setDriveData] = useState();

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const developerKey = process.env.REACT_APP_GOOGLE_DEVELOPER_KEY;
  const scope = ["https://www.googleapis.com/auth/drive.file"];

  const { gapiLoaded, pickerLoaded } = useGooglePicker(clientId, developerKey, scope);

  // Function to create and show the picker
  const createPicker = () => {
    if (window.google && window.google.picker && window.gapi.auth2) {
      const isSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();
      if (!isSignedIn) {
        console.error("User is not signed in.");
        return;
      }

      const oauthToken = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
      const picker = new window.google.picker.PickerBuilder()
        .addView(window.google.picker.ViewId.DOCS_IMAGES)
        .setOAuthToken(oauthToken)
        .setDeveloperKey(developerKey)
        .setCallback(pickerCallback)
        .setOrigin(window.location.protocol + "//" + window.location.host)
        .build();
      picker.setVisible(true);
    } else {
      console.error("Google Picker or gapi not loaded.");
    }
  };

  // Callback after selecting files
  const pickerCallback = (data) => {
    if (data.action === window.google.picker.Action.PICKED) {
      const files = data.docs;
      console.log("Selected files:", files);
      setDriveData(files);
    } else if (data.action === window.google.picker.Action.CANCEL) {
      console.log("User canceled the picker.");
    }
  };

  // Function to handle opening the picker
  const handleOpenPicker = () => {
    try {
      if (gapiLoaded && pickerLoaded) {
        const isSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();
        if (isSignedIn) {
          createPicker();
        } else {
          window.gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(() => {
              createPicker();
            })
            .catch((error) => {
              console.error("Error during sign-in:", error);
              alert("Failed to sign in. Please try again.");
            });
        }
      } else {
        console.error("GAPI or Picker API not loaded.");
        alert("Google APIs are not loaded yet. Please try again later.");
      }
    } catch (error) {
      console.error("Error opening picker:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (driveData) {
      console.log("Drive Data:", driveData);
      // You can process the selected files here (e.g., display them or upload to your server)
    }
  }, [driveData]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newLoadingState = files.map(() => true); // Set loader true for each file
    setLoading([...loading, ...newLoadingState]);

    handleImageChange(event); // Call parent function to handle file input

    files.forEach((file, index) => {
      // Simulate the loading process
      setTimeout(() => {
        setLoading((prev) => {
          const newState = [...prev];
          newState[selectedFile.length + index] = false; // Disable loader for specific image
          console.log(newState, "newState");
          return newState;
        });
      }, 2000); // Simulate 2-second loading for each image
    });
  };

  const handleDeleteImage = (index) => {
    // Remove the image from the parent component's selectedFile state
    handleDeleteClick(index);

    // Update the loading state to remove the corresponding loader entry
    setLoading((prev) => prev.filter((_, i) => i !== index));
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
        <Box
          sx={{
            textAlign: "center",
            border: "0.5px solid #cfd4d9",
            borderRadius: "4px",
            height: "50px",
            width: "50px",
            position: "relative", // Ensure proper placement of elements
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange} // Use handleFileChange to trigger the loader
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0, // Hide the input but make it clickable
              cursor: "pointer",
            }}
          />
          <CloudUploadOutlinedIcon
            sx={{
              width: "40px",
              height: "100%",
              pointerEvents: "none", // Make the icon unclickable
            }}
          />
        </Box>

        <Box
          sx={{
            textAlign: "center",
            border: "1px solid #cfd4d9",
            borderRadius: "4px",
            height: "50px",
            width: "50px",
          }}
        >
          <Dropbox style={{ width: "40px", height: "100%", pointerEvents: "none" }} />
        </Box>
        <Box
          sx={{
            textAlign: "center",
            border: "1px solid #cfd4d9",
            borderRadius: "4px",
            height: "50px",
            width: "50px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "50px",
              height: "50px",
              opacity: 0, // Hide the input but make it clickable
              cursor: "pointer",
              zIndex: "3",
            }}
            onClick={() => handleOpenPicker()}
          ></Box>
          <Googledrive style={{ width: "40px", height: "100%", pointerEvents: "none" }} />
        </Box>
        <Box
          sx={{
            textAlign: "center",
            border: "1px solid #cfd4d9",
            borderRadius: "4px",
            height: "50px",
            width: "50px",
          }}
        >
          <Microsoft style={{ width: "40px", height: "100%", pointerEvents: "none" }} />
        </Box>
      </Box>
      <Typography variant="caption" display="block" textAlign="center">
        JPG, JPEG, PNG, GIF, TIFF, BMP, AI, EPS, SVG, PDF, HEIC, JFIF, PJPEG, WEBP
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
                  opacity: loading[index] ? 0.5 : 1,
                }}
                alt="img"
                onClick={() => {
                  selectImage(index);
                }}
              />
              {loading[index] && (
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
                <Button onClick={() => handleDeleteImage(index)}>
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
      {/* Display images from Google Drive */}
      <Box>
        {driveData?.map((val, index) => {
          console.log(val.url, "val");
          return (
            <img
              key={index}
              src={val.url}
              style={{
                height: "100px",
                width: "100px",
                display: "block",
              }}
              alt="img"
            />
          );
        })}
      </Box>
    </>
  );
};

export default MyUpload;
