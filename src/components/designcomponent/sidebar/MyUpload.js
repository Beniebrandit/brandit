import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { ReactComponent as Microsoft } from "../../../asset/images/microsoft.svg";
import { ReactComponent as Googledrive } from "../../../asset/images/googledrive.svg";
import { ReactComponent as Dropbox } from "../../../asset/images/dropbox.svg";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import useDrivePicker from "react-google-drive-picker";
import DropboxChooser from "react-dropbox-chooser";
const MyUpload = ({
  handleImageChange,
  selectedFile,
  handleDeleteClick,
  selectImage,
  handleExpand,
  handleDeleteDropboxFile,
  handleSuccess,
  dropdata,
  combinedImages,
  setCombinedImages,
}) => {
  const [loading, setLoading] = useState([]);
  const [openPicker, data, authResponse] = useDrivePicker();
  const [accessToken, setAccessToken] = useState(null);
  const [drivedata, setDriveData] = useState([]);
  let [thumbnail, setThbumnail] = React.useState("");
  const APP_KEY = "3astslwrlzfkcvc";
  const refreshAccessToken = async () => {
    const refreshToken =
      "1//04UzctwiZsGc-CgYIARAAGAQSNwF-L9IrUqH-vptZxFZKC66P-yHu45GKRaTwQs7DSlLP08ajzINJzGiZ-TLMNoWs-96EM3_Kt8k"; // Update with your actual refresh token
    const clientId = "1062247369631-2i266asc9rltsjaknplpc6pl079ji3r1.apps.googleusercontent.com"; // Update with your actual client ID
    const clientSecret = "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"; // Update with your actual client secret

    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refreshToken",
          refresh_token: refreshToken,
          client_id: clientId,
          client_secret: clientSecret,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Error: ${errorData.error}, Description: ${errorData.error_description}`
        );
      }

      const data = await response.json();
      setAccessToken(data.access_token);
    } catch (error) {
      console.error("Failed to refresh access token:", error.message);
    }
  };

  const handleOpenPicker = async () => {
    await refreshAccessToken();

    openPicker({
      clientId: "YOUR_CLIENT_ID",
      developerKey: "YOUR_DEVELOPER_KEY",
      viewId: "DOCS_IMAGES",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        if (data.action === "cancel") return;

        // Only set drive data if docs is an array
        if (Array.isArray(data?.docs) && data?.docs?.length > 0) {
          const driveFiles = data.docs.map((file) => ({
            name: file.name,
            embedUrl: file.embedUrl,
            id: file.id,
          }));
          setDriveData((prevDriveData) => [...prevDriveData, ...driveFiles]);
        } else {
          console.error("No valid files found in the picker response");
        }
      },
    });
  };

  useEffect(() => {
    // Extract image URLs from each data source and combine them
    const selectedFiles = selectedFile?.map((file) => ({
      source: "upload", // Indicates this image is from the selectedFile
      url: file,
    }));
    console.log("drivedata", drivedata);

    const driveFiles = drivedata?.map((file) => ({
      source: "drive", // Indicates this image is from Google Drive
      url: file?.embedUrl, // Assuming embedUrl is the image link
    }));

    const dropboxFiles = dropdata?.map((file) => ({
      source: "dropdata", // Indicates this image is from Dropbox
      url: file?.link, // Assuming link is the image URL
    }));

    // Combine all three arrays
    const combined = [...selectedFiles, ...driveFiles, ...dropboxFiles];

    setCombinedImages(combined); // Update the state with the combined array
  }, [selectedFile, drivedata, dropdata]);

  useEffect(() => {
    if (data) {
      data?.docs?.map((i) => console.log(i, "i"));
      console.log(data.docs, "data.docs");
      console.log(data, "data");
    }
  }, [data]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Create a loading state array: existing files are false, new files are true
    const newLoadingState = Array(selectedFile.length).fill(false).concat(Array(files.length).fill(true));
    setLoading(newLoadingState);

    handleImageChange(event); // Call parent function to handle file input

    files.forEach((file, index) => {
      setTimeout(() => {
        setLoading((prev) => {
          const newState = [...prev];
          newState[selectedFile.length + index] = false; // Set loading to false for each new image
          return newState;
        });
      }, 2000); // Simulate 2-second loading for each image
    });
  };

  const handleDeleteImage = (index, source) => {
    handleDeleteClick(index, source); // Call parent function to delete image
    setLoading((prev) => {
      const updatedLoading = prev.filter((_, i) => i !== index);
      return updatedLoading.map((_, idx) => (idx < selectedFile.length ? false : true)); // Reset loaders
    });
  };
  //const handleDeleteDropboxFile = (index) => {
  //  setDropData(dropdata.filter((_, i) => i !== index));
  //};

  const handleMicrosoft = () => {};
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
            cursor: "pointer",
          }}
        >
          <DropboxChooser
            appKey={APP_KEY}
            success={handleSuccess}
            cancel={() => console.log("closed")}
            multiselect={true}
          >
            <Dropbox style={{ width: "40px", height: "100%", pointerEvents: "none" }} />
          </DropboxChooser>
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
              // top: 0,
              // left: 0,
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
          onClick={() => handleMicrosoft()}
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
        JPG, JPEG, PNG, GIF, TIFF, BMP, AI, EPS, SVG, PDF, HEIC, JFIF, PJPEG , WEBP
        <br />
        Max file size: 200 MB
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex" }}>
          {combinedImages?.length > 0 && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 2,
              }}
            >
              {combinedImages.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                    margin: "auto",
                  }}
                >
                  <img
                    src={image.url}
                    style={{
                      height: "100px",
                      width: "100px",
                      display: "block",
                      opacity: loading[index] ? 0.5 : 1,
                    }}
                    alt={image.source}
                    onClick={() => {
                      selectImage(index, image.source);
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
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      <CircularProgress size={24} />
                    </Box>
                  )}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "0",
                      marginTop: "5px",
                      left: "21%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "70px",
                      opacity: 0,
                      transition: "opacity 0.3s ease", // Smooth transition for opacity
                      "&:hover": {
                        opacity: 1, // Show buttons on hover
                      },
                    }}
                  >
                    <Button onClick={() => handleDeleteImage(index, image.source)}>
                      <DeleteOutlinedIcon
                        sx={{
                          backgroundColor: "whitesmoke",
                          padding: "3px",
                          borderRadius: "5px",
                        }}
                      />
                    </Button>
                    <Button onClick={() => handleExpand(index, image.source)}>
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
        </Box>
      </Box>
    </>
  );
};

export default MyUpload;
