import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import WbCloudyOutlinedIcon from "@mui/icons-material/WbCloudyOutlined";
import { ReactComponent as Microsoft } from "../asset/images/microsoft.svg";
import { ReactComponent as Googledrive } from "../asset/images/googledrive.svg";
import { ReactComponent as Dropbox } from "../asset/images/dropbox.svg";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import useDrivePicker from "react-google-drive-picker";

const MyUpload = ({
  handleImageChange,
  selectedFile,
  handleDeleteClick,
  selectImage,
  handleExpand,
}) => {
  const [loading, setLoading] = useState([]);
  // const [openPicker,data, authResponse] = useDrivePicker();

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

  // const handleOpenPicker = () => {
  //   openPicker({
  //     clientId:
  //       "1062247369631-cvrso0qqo4s11pp75ciel1ces9e4al33.apps.googleusercontent.com",
  //     developerKey: "AIzaSyBemgDiT5TbKCNMjPvs69GN9go6yrnYKYs",
  //     viewId: "DOCS_IMAGES",
  //     token:
  //       "ya29.a0AcM612yj3FVgRS2wqfoU0NwofPYJ_OAJ0XEADCsft46hmG96xR7EMUfAlGBcq2inwywuYtK-DX94FpCL1tHAgMhxdmUcqctJ2AJqy1JpEbTUmtWfQszlBcFgwfkY3mtkDQD42byXDxullM07GdVpCB-gw32lf8wdNqV2rA0taCgYKAesSARISFQHGX2MiO5veFzb_OOfoeWdGgc28iA0175", // pass oauth token in case you already have one
  //     showUploadView: true,
  //     showUploadFolders: true,
  //     supportDrives: true,
  //     multiselect: true,
  //     // customViews: customViewsArray, // custom view
      
  //   });
  // };
  // useEffect((data) => {
  //   if (data) {
  //     data.docs.map((i) => console.log(i,"i"))
  //   }
  //   console.log(data,"data")
  // },[data])

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
          <Dropbox
            style={{ width: "40px", height: "100%", pointerEvents: "none" }}
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
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "40px",
              height: "100%",
              opacity: 0, // Hide the input but make it clickable
              cursor: "pointer",
            }}
            // onClick={() => handleOpenPicker()}
          ></Box>
          <Googledrive
            style={{ width: "40px", height: "100%", pointerEvents: "none" }}
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
          <Microsoft
            style={{ width: "40px", height: "100%", pointerEvents: "none" }}
          />
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
    </>
  );
};

export default MyUpload;
