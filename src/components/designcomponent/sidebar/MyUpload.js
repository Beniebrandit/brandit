/* global google gapi */
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

const CLIENT_ID = "1062247369631-2i266asc9rltsjaknplpc6pl079ji3r1.apps.googleusercontent.com"; // OAuth 2.0 Client ID
const API_KEY = "AIzaSyDyHd1C_t-voUaaMejrVvL9eMnKa9QfNtc"; // API Key
const SCOPES = "https://www.googleapis.com/auth/drive.readonly";
const APP_ID = "1062247369631";

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
  const [pickerInited, setPickerInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  let [thumbnail, setThbumnail] = React.useState("");
  const APP_KEY = "3astslwrlzfkcvc";

  useEffect(() => {
    // Load Google APIs and Picker
    const loadScripts = async () => {
      loadGapi();
      loadGis();
    };

    const loadGapi = () => {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = () => gapi.load("client:picker", initializePicker);
      document.body.appendChild(script);
    };

    const loadGis = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = initializeGis;
      document.body.appendChild(script);
    };

    const initializePicker = async () => {
      await gapi.client.load("https://www.googleapis.com/discovery/v1/apis/drive/v3/rest");
      setPickerInited(true);
    };

    const initializeGis = () => {
      const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (response) => {
          if (response.error) {
            console.error("Error during authorization", response);
          } else {
            setAccessToken(response.access_token);
          }
        },
      });

      setGisInited(true);

      // Attach token client to window for later use
      window.tokenClient = tokenClient;
    };

    loadScripts();
  }, []);

  const openDrivePicker = () => {
    if (!gisInited) return;

    // If access token exists, create the picker immediately
    if (accessToken) {
      createPicker();
    } else {
      // If no token, authorize the user and open the picker afterward
      window.tokenClient.requestAccessToken({ prompt: "" });
    }
  };

  const createPicker = () => {
    if (!pickerInited) {
      console.error("Picker is not initialized.");
      return;
    }

    if (!accessToken) {
      console.error("Access token is missing. Requesting a new token...");
      window.tokenClient.requestAccessToken({ prompt: "" });
      return;
    }

    const view = new google.picker.View(google.picker.ViewId.DOCS);
    view.setMimeTypes("image/png,image/jpeg,image/jpg");

    const picker = new google.picker.PickerBuilder()
      .enableFeature(google.picker.Feature.NAV_HIDDEN)
      .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
      .setDeveloperKey(API_KEY)
      .setAppId(APP_ID)
      .setOAuthToken(accessToken)
      .addView(view)
      .addView(new google.picker.DocsUploadView())
      .setCallback(pickerCallback)
      .build();

    picker.setVisible(true);
  };

  const pickerCallback = async (data) => {
    if (data.action === google.picker.Action.PICKED) {
      const files = await Promise.all(
        data[google.picker.Response.DOCUMENTS].map(async (doc) => {
          const fileMetadata = await gapi.client.drive.files.get({
            fileId: doc[google.picker.Document.ID],
            fields: "id, name, mimeType, webContentLink, webViewLink",
          });

          // Use webContentLink for direct access or webViewLink as fallback
          const isEmbeddable = fileMetadata.result.mimeType.startsWith("image/");
          return {
            id: fileMetadata.result.id,
            name: fileMetadata.result.name,
            mimeType: fileMetadata.result.mimeType,
            embedUrl: isEmbeddable ? fileMetadata.result.webContentLink : null,
            viewUrl: fileMetadata.result.webViewLink,
          };
        })
      );

      setSelectedFiles(files);
      console.log("Selected Files:", files);
    }
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
            disabled={!gisInited}
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
      <ul>
        {selectedFiles.map((file) => (
          <li key={file.id}>
            {file.embedUrl ? (
              <img
                src={file.embedUrl}
                alt={file.name}
                style={{ maxWidth: "100%", maxHeight: "400px", border: "1px solid #ddd", marginBottom: "10px" }}
              />
            ) : (
              <p>
                <strong>{file.name}</strong>:{" "}
                <a href={file.viewUrl} target="_blank" rel="noopener noreferrer">
                  View File
                </a>
              </p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MyUpload;
