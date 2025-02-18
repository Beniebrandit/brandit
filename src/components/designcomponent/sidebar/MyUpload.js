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
import { MyUploadService } from "../../../services/MyUpload.service";
import { ProductService } from "../../../services/Product.service";
import { v4 as uuidv4 } from 'uuid';

const CLIENT_ID = "1062247369631-2i266asc9rltsjaknplpc6pl079ji3r1.apps.googleusercontent.com"; // OAuth 2.0 Client ID
const API_KEY = "AIzaSyDyHd1C_t-voUaaMejrVvL9eMnKa9QfNtc"; // API Key
const SCOPES = "https://www.googleapis.com/auth/drive.readonly";
const APP_ID = "1062247369631";

const MyUpload = ({
  selectedFile,
  handleDeleteClick,
  selectImage,
  handleExpand,
  dropdata,
  combinedImages,
  setCombinedImages,
}) => {
  const [loading, setLoading] = useState([]);
  const [openPicker, data, authResponse] = useDrivePicker();
  const [accessToken, setAccessToken] = useState(null);
  const [drivedata, setDriveData] = useState([]);
  const [pickerInited, setPickerInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loadingImages, setLoadingImages] = useState({});
  const [myUploadsData, setMyUploadsData] = useState([]);
  const [userId, setUserId] = useState();
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const APP_KEY = "3astslwrlzfkcvc";

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) fetchUserData(token);
  }, []);

  const fetchUserData = async (token) => {
    const response = await fetch("https://flagg.devlopix.com/api/user", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUserId((await response.json()).id);
  };

  // Initialize Google APIs
  useEffect(() => {
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
      window.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (response) => response.error ? console.error(response) : setAccessToken(response.access_token)
      });
      setGisInited(true);
    };

    loadGapi();
    loadGis();
  }, []);

  // Handle Google Drive picker
  const openDrivePicker = () => {
    if (!gisInited) return;
    accessToken ? createPicker() : window.tokenClient.requestAccessToken({ prompt: "" });
  };

  const createPicker = () => {
    if (!pickerInited || !accessToken) return;

    const view = new google.picker.View(google.picker.ViewId.DOCS)
      .setMimeTypes("image/png,image/jpeg,image/jpg");

    new google.picker.PickerBuilder()
      .enableFeature(google.picker.Feature.NAV_HIDDEN)
      .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
      .setDeveloperKey(API_KEY)
      .setAppId(APP_ID)
      .setOAuthToken(accessToken)
      .addView(view)
      .setCallback(pickerCallback)
      .build()
      .setVisible(true);
  };

  const pickerCallback = async (data) => {
    if (data.action === google.picker.Action.PICKED) {
      const files = await Promise.all(
        data[google.picker.Response.DOCUMENTS].map(async (doc) => {
          const fileId = doc[google.picker.Document.ID];
          try {
            // Get file metadata
            const metadata = await gapi.client.drive.files.get({
              fileId,
              fields: "mimeType,name",
            });

            // Get file content
            const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
              headers: { Authorization: `Bearer ${accessToken}` }
            });
            const blob = await response.blob();

            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve({
                source: "drive",
                url: reader.result,
                name: metadata.result.name,
                mimeType: metadata.result.mimeType,
                data_id: uuidv4(),
              });
              reader.readAsDataURL(blob);
            });
          } catch (error) {
            console.error("Error processing Drive file:", error);
            return null;
          }
        })
      );

      const validFiles = files.filter(file => file !== null);
      handleNewImages(validFiles);
    }
  };

  useEffect(() => {
    // Extract image URLs from each data source and combine them
    const selectedFiles = selectedFile?.map((file) => ({
      source: "upload", // Indicates this image is from the selectedFile
      url: file,
    }));
    // console.log("drivedata", drivedata);

    const driveFiles = drivedata?.map((file) => ({
      source: "drive", // Indicates this image is from Google Drive
      url: file?.embedUrl, // Assuming embedUrl is the image link
    }));

    const newDropImages = dropdata.map((file) => ({
      source: "dropbox", // Indicates this image is from Dropbox
      url: file?.link, // Assuming link is the image URL
    }));

    // Combine all three arrays
    setCombinedImages((prev) => [...new Set([...prev, ...selectedFiles, ...driveFiles, ...newDropImages])]);

  }, [selectedFile, drivedata, dropdata]);

  const fetchUploadedImages = async () => {
    try {
      const res = await MyUploadService.Getmyupload();
      setMyUploadsData(res.data || []);
      setCombinedImages(res.data || [])
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };
  useEffect(() => {
    fetchUploadedImages();
  }, []);

  const fetchImageAsBase64 = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      // Infer MIME type from the file extension in the URL
      const extension = url.split('.').pop().toLowerCase();
      let mimeType = "application/binary"; // Default fallback

      switch (extension) {
        case "png":
          mimeType = "image/png";
          break;
        case "jpg":
        case "jpeg":
          mimeType = "image/jpeg";
          break;
        case "gif":
          mimeType = "image/gif";
          break;
        case "webp":
          mimeType = "image/webp";
          break;
        case "bmp":
          mimeType = "image/bmp";
          break;
        case "svg":
          mimeType = "image/svg+xml";
          break;
        // Add more cases as needed
        default:
          console.warn(`Unsupported file extension: ${extension}. Using default MIME type.`);
      }

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Replace the MIME type in the base64 string
          const base64 = reader.result.replace(/^data:.*;base64,/, `data:${mimeType};base64,`);
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const handleDropboxFiles = async (files) => {
    const processedFiles = files.map(file => ({
      source: "dropbox",
      url: file.link.replace("&dl=0", "&dl=1"),
      data_id: uuidv4(),
    }));
    handleNewImages(processedFiles);
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const processedFiles = await Promise.all(
      files.map(file => new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve({
          source: "upload",
          url: reader.result,
          data_id: uuidv4(),
        });
        reader.readAsDataURL(file);
      }))
    );
    handleNewImages(processedFiles);
  };

  const handleNewImages = async (newImages) => {
    if (!userId || !newImages.length) return;

    // Add to uploading files with loading state
    setUploadingFiles(prev => [...prev, ...newImages]);
    setLoadingImages(prev => ({
      ...prev,
      ...Object.fromEntries(newImages.map(img => [img.data_id, true]))
    }));

    try {
      const formattedImages = newImages.map(img => {
        const Dropsource = img.source === "dropbox";

        return {
          data_id: img.data_id,
          user_id: userId,
          source: img.source,
          ...(Dropsource ? { url: img.url } : { image: img.url }) // Include only `url` or `image`
        };
      });


      const response = await MyUploadService.Postmyupload({ myUploadsData: formattedImages });
      // Assuming server returns saved images with data_id
      setMyUploadsData(prev => [...prev, ...formattedImages]);
      fetchUploadedImages();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      // Remove from uploading files and clear loading
      setUploadingFiles(prev => prev.filter(file =>
        !newImages.some(newImg => newImg.data_id === file.data_id)
      ));
      setLoadingImages(prev => {
        const updated = { ...prev };
        newImages.forEach(img => delete updated[img.data_id]);
        return updated;
      });
    }
  };

  const handleDeleteImage = async (dataId) => {
    try {
      await MyUploadService.Myuploaddel(dataId);
      setMyUploadsData(prev => prev.filter(img => img.id !== dataId));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    if (dropdata && dropdata.length > 0) {
      const newDropImages = dropdata.map((data) => ({
        source: "dropbox",
        url: data.link.replace("&dl=0", "&dl=1"), // Convert to a direct download URL
      }));

      // Filter out duplicates based on URLs
      const filteredImages = newDropImages.filter(
        (newImage) => !combinedImages.some((image) => image.url === newImage.url)
      );

      if (filteredImages.length > 0) {
        // Add new Dropbox images to the combined images list
        setCombinedImages((prev) => [...prev, ...filteredImages]);

        // Set loading state specifically for the newly added Dropbox images
        setLoading((prev) => {
          const newLoadingState = [...prev];
          // Add new loaders (true) for each of the new Dropbox images
          newLoadingState.push(...filteredImages.map(() => true));
          return newLoadingState;
        });

        // Simulate image loading delay and reset loading state
        setTimeout(() => {
          setLoading((prev) => {
            // Reset loading state for the newly added Dropbox images
            const newState = [...prev];
            newState.splice(-filteredImages.length, filteredImages.length, ...filteredImages.map(() => false));
            return newState;
          });
        }, 2000); // Adjust this timeout as needed
      }
    }
  }, [dropdata, combinedImages]);



  // console.log("myUploadsData", myUploadsData)
  // const handleMicrosoft = () => { };

  const ImageComponent = ({ image, source, index }) => {
    const imageUrl = image.url || (image.image?.path ? `${process.env.REACT_APP_API_BASE_URL}${image.image.path}` : '');
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(imageUrl);

    return isImage ? (
      <img
        src={imageUrl}
        style={{ width: "100%", height: "100%", borderRadius: "10px" }}
        alt={source}
        onClick={() => selectImage(index, image.source)}
      />
    ) : (
      <img
        src={imageUrl}
        style={{ width: "100%", height: "100%", borderRadius: "10px" }}
        alt={source}
        onClick={() => selectImage(index, image.source)}
      />
    );
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
              multiple
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
            multiple
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
            success={handleDropboxFiles}
            multiselect
          >
            <Dropbox style={{ width: 40, height: "100%", pointerEvents: "none" }} />
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
        {/* <Box
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
        </Box> */}
      </Box>
      <Typography variant="caption" display="block" textAlign="center">
        JPG, JPEG, PNG, GIF, TIFF, BMP, AI, EPS, SVG, PDF, HEIC, JFIF, PJPEG , WEBP
        <br />
        Max file size: 200 MB
      </Typography>
      {uploadingFiles.length > 0 && (
        <Typography variant="caption" display="block" textAlign="start" sx={{ padding: "5px 0px 13px" }}>
          Uploading...
        </Typography>
      )}
      <Box sx={{ display: "flex" }}>
        {uploadingFiles.length > 0 && (
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
            {uploadingFiles.map((image, index) => (
              <Box key={image.data_id} sx={{ position: "relative", width: 85, height: 75, mx: "auto" }}>
                {loadingImages[image.data_id] && (
                  <Box sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                  }}>
                    <CircularProgress size={24} />
                  </Box>
                )}
                <ImageComponent image={image} index={index} source={image.source} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
      {myUploadsData?.length > 0 && <Typography variant="caption" display="block" textAlign="start" sx={{ padding: "5px 0px 13px" }}>
        Your uploaded images
      </Typography>}
      <Box sx={{ display: "flex" }}>
        {myUploadsData?.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 2,
            }}
          >
            {myUploadsData.map((image, index) => (
              <Box key={index} sx={{
                position: "relative", width: 85, height: 75, mx: "auto", "&:hover .hover-container": {
                  opacity: 1,
                },
              }}>
                {/* {loadingImages[image.data_id] && (
                  <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress size={24} />
                  </Box>
                )} */}
                <ImageComponent
                  image={image}
                  index={index}
                  loadingImages={loadingImages}
                  selectImage={selectImage}
                />

                {/* {loadingImages[image.url] && (
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
                )} */}

                <Box
                  sx={{
                    position: "absolute",
                    top: "0",
                    marginTop: "7px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "70px",
                    opacity: 0,
                    transition: "opacity 0.3s ease", // Smooth transition for opacity
                  }}
                  className="hover-container"
                >
                  <Button onClick={() => handleDeleteImage(image.id)} sx={{ padding: "0px 0px !important", minWidth: "auto" }}>
                    <DeleteOutlinedIcon
                      sx={{
                        backgroundColor: "whitesmoke",
                        padding: "3px",
                        borderRadius: "5px",
                      }}
                    />
                  </Button>
                  <Button onClick={() => handleExpand(index, image.source)} sx={{ padding: "0px 0px !important", minWidth: "auto" }}>
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
      {/* <ul>
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
      </ul> */}
    </>
  );
};

export default MyUpload;


