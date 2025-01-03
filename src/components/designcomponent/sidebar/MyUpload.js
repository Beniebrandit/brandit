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
import { gapi } from 'gapi-script';

const CLIENT_ID = "1062247369631-2i266asc9rltsjaknplpc6pl079ji3r1.apps.googleusercontent.com";
const API_KEY = "AIzaSyDyHd1C_t-voUaaMejrVvL9eMnKa9QfNtc";
const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

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
  const [errorMessage, setErrorMessage] = useState(null);

  let [thumbnail, setThbumnail] = React.useState("");
  const APP_KEY = "3astslwrlzfkcvc";

  useEffect(() => {
    const loadScripts = async () => {
      try {
        const pickerScript = document.createElement("script");
        pickerScript.src = "https://apis.google.com/js/api.js";
        pickerScript.onload = () => gapi.load("client:auth2", initClient);
        pickerScript.onerror = () => setErrorMessage("Error loading Google API scripts.");
        document.body.appendChild(pickerScript);
      } catch (error) {
        setErrorMessage("Failed to load scripts.");
      }
    };

    const initClient = async () => {
      try {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
          scope: SCOPES,
        });
      } catch (error) {
        setErrorMessage("Failed to initialize Google API.");
      }
    };

    loadScripts();
  }, []);

  const openDrivePicker = () => {
    gapi.auth.authorize(
      { client_id: CLIENT_ID, scope: SCOPES },
      (response) => {
        if (response.error) {
          setErrorMessage("Error getting auth token.");
        } else {
          gapi.load("picker", () => {
            const picker = new window.google.picker.PickerBuilder()
              .setOAuthToken(response.access_token)
              .setDeveloperKey(API_KEY)
              .addView(new window.google.picker.DocsView().setIncludeFolders(true).setSelectFolderEnabled(false))
              .setCallback((data) => {
                if (data.action === window.google.picker.Action.PICKED) {
                  const fileId = data.docs[0].id;
                  const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
                  setDriveData((prev) => [...prev, { source: "drive", url: fileUrl }]);
                }
              })
              .build();
            picker.setVisible(true);
          });
        }
      }
    );
  };

  useEffect(() => {
    // Extract image URLs from each data source and combine them
    const selectedFiles = selectedFile?.map((file) => ({
      source: "upload", // Indicates this image is from the selectedFile
      url: file,
    }));

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
    setCombinedImages(combined);  // Update the state with the combined array
  }, [selectedFile, drivedata, dropdata]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    const newLoadingState = Array(selectedFile.length).fill(false).concat(Array(files.length).fill(true));
    setLoading(newLoadingState);

    handleImageChange(event);

    files.forEach((file, index) => {
      setTimeout(() => {
        setLoading((prev) => {
          const newState = [...prev];
          newState[selectedFile.length + index] = false;
          return newState;
        });
      }, 2000); // Simulate loading for each new image
    });
  };

  const handleDeleteImage = (index, source) => {
    handleDeleteClick(index, source);
    setLoading((prev) => {
      const updatedLoading = prev.filter((_, i) => i !== index);
      return updatedLoading.map((_, idx) => (idx < selectedFile.length ? false : true)); // Reset loaders
    });
  };

  const handleMicrosoft = () => { };
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
            onClick={() => openDrivePicker()}
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
