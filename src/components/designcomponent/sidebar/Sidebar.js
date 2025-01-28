import {
  Box,
  Button,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactComponent as Sidebarsetting } from "../../../asset/images/sidebar_setting.svg";
import { ReactComponent as Sidebarupload } from "../../../asset/images/sidebar_upload.svg";
import { ReactComponent as Sidebartext } from "../../../asset/images/sidebar_text.svg";
import { ReactComponent as Sidebarshapes } from "../../../asset/images/sidebar_shapes.svg";
import { ReactComponent as Sidebarbackground } from "../../../asset/images/sidebar_background.svg";
import { ReactComponent as SidebarQRcode } from "../../../asset/images/sidebar_QRcode.svg";
import Qrcode from "./Qrcode";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Config from "./Config";
import MyUpload from "./MyUpload";
import Text from "./Text";
import PremiumImg from "./PremiumImg";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Sidebar = ({
  setProductDetails,
  productDetails,
  handleImageChange,
  selectedFile,
  onDeleteImage,
  selectImage,
  images,
  vectorimage,
  setImage,
  setPremiumimg,
  allproduct,
  alldata,
  handleDeleteDropboxFile,
  handleSuccess,
  dropdata,
  combinedImages,
  setCombinedImages,
  value,
  setValue,
  isTabOpen,
  setIsTabOpen,
  setgetId,
  storedPayload,
  premiumimg,
}) => {
  const [open, setOpen] = React.useState(false);
  const [delopen, setDelOpen] = React.useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [expandimage, setExpandImage] = useState();
  const [expandedImageIndex, setExpandedImageIndex] = useState(null);
  const tabRef = useRef(null);
  const dialogRef = useRef(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedSourceToDelete, setSelectedSourceToDelete] = useState(null);
  const [selectedimg, setSelectedimg] = useState([]);
  const [pendingImages, setPendingImages] = useState([]);
  const source = "premium";
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVector, setSearchVector] = useState("");
  const [valuePremium, setValuePremium] = useState(0);
  const [photosData, setPhotosData] = useState([]);
  const [vectorData, setVectorData] = useState([]);
  const [showpopularData, setShowpopularData] = useState(true);
  const API_URL = "https://stock.adobe.io/Rest/Media/1/Search/Files";
  const API_HEADERS = {
    "x-api-key": "0ca35b55dd684868acacd3a0c4e5264b", // Replace with your actual API key
    "X-Product": "DRIStock/1.0",
    "Content-Type": "application/json",
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setExpandedImageIndex(null); // Reset the index when the dialog is closed
  };

  const handledelOpen = () => {
    setDelOpen(true);
  };

  const handledelClose = () => {
    setDelOpen(false);
    setImageToDelete(null); // Reset the index when the dialog is closed
  };

  const handleDeleteClick = (index, source) => {
    setImageToDelete(index); // Set the correct image index
    setSelectedSourceToDelete(source); // Set the source for the image to delete
    setDelOpen(true); // Open the delete confirmation dialog
  };

  const handleExpand = (index, source, url) => {
    let image;

    setSelectedSource(source);

    if (source === "upload") {
      image = selectedFile[index];
    } else if (source == "premium") {
      // console.log("indexSorce", source);
      image = url;
      // image = `${process.env.REACT_APP_API_BASE_URL}/${vectorimage[index]}`;
    } else if (source === "dropdata") {
      image = combinedImages[index].url;
    }
    setExpandImage(image);
    setExpandedImageIndex(index);
    // console.log("Expanded image index:", index, "Source:", source);
    handleClickOpen();
  };

  const handleSelectImage = () => {
    if (expandedImageIndex !== null && selectedSource) {
      selectImage(expandedImageIndex, selectedSource); // Perform your custom action

      // Add pending images to selectedimg
      const updatedSelectedImages = [...selectedimg, ...pendingImages];

      // Update state and local storage
      setSelectedimg(updatedSelectedImages);
      localStorage.setItem("recentImage", JSON.stringify(updatedSelectedImages));

      // Clear pending images after they are processed
      setPendingImages([]);
    }
  };

  const handleDeleteConfirm = () => {
    // console.log("imageToDelete", imageToDelete);
    if (imageToDelete !== null) {
      onDeleteImage(imageToDelete, selectedSourceToDelete); // Pass the source to the delete function
      setDelOpen(false);
      setImageToDelete(null); // Reset the index after deletion
      setSelectedSourceToDelete(null); // Reset the source after deletion
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setIsTabOpen(true);
  };

  const handleClickOutside = (event) => {
    // If the click is outside the tabRef and not in dialogRef
    if (
      tabRef.current &&
      !tabRef.current.contains(event.target) &&
      (!dialogRef.current || !dialogRef.current.contains(event.target)) // Ensure clicks inside dialog don't close TabPanel
    ) {
      setIsTabOpen(false);
    }
  };

  const handleOpentoAdd = (item) => {
    const selectedImage = {
      id: item.id,
      title: item?.title,
      thumbnail_url: item?.thumbnail_url,
      type: source, // Use 'premium' or other identifier for media type
    };

    // Store the received image in the pending state
    setPendingImages((prevPending) => [...prevPending, selectedImage]);
  };

  // Load data from local storage on component mount
  useEffect(() => {
    const savedImages = localStorage.getItem("recentImage");
    if (savedImages) {
      setSelectedimg(JSON.parse(savedImages));
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickAway = () => {
    // Only close the tab if neither dialog is open
    if (open || delopen) return;
    setIsTabOpen(false);
  };
  const fetchMedia = useCallback(
    async (searchQuery, offsetValue) => {
      if (loading || !hasMore) return;
      setLoading(true);

      try {
        if (searchQuery) {
          const response = await axios.get(API_URL, {
            params: {
              "search_parameters[words]": `${searchQuery} ${valuePremium === 0 ? "" : searchQuery ? "svg" : ""}`,
              "search_parameters[limit]": 10,
              "search_parameters[offset]": offsetValue,
              "search_parameters[thumbnail_size]": 240,
              "search_parameters[filters][premium]": false,
              "search_parameters[filters][content_type:photo]": valuePremium === 0 ? 1 : 0,
              "search_parameters[filters][content_type:illustration]": valuePremium === 0 ? 1 : 0,
              "search_parameters[filters][content_type:vector]": valuePremium === 0 ? 0 : 1,
              "search_parameters[filters][content_type:video]": 0,
              "search_parameters[filters][content_type:template]": 0,
              "search_parameters[filters][content_type:3d]": 0,
            },
            headers: API_HEADERS,
          });

          const newMedia = response.data.files;
          if (valuePremium === 0) {
            setPhotosData((prevData) => [...prevData, ...newMedia]);
            setShowpopularData(false);
          } else {
            setVectorData((prevData) => [...prevData, ...newMedia]);
            setShowpopularData(false);
          }

          setOffset(offsetValue + 10);
          setHasMore(newMedia.length > 0); // Check if more data is available
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, valuePremium] // Make sure valuePremium is included in the dependencies
  );

  const handleScroll = useCallback(
    (e) => {
      const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;

      // Check if we're at the bottom and if the loading flag is false
      if (bottom && !loading && hasMore) {
        // Perform API call
        fetchMedia(valuePremium === 0 ? searchTerm : searchVector, offset);
      }
    },
    [loading, hasMore, valuePremium, searchTerm, searchVector, offset, fetchMedia]
  );


  return (
    <>
      <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClickAway}>
        <Box
          sx={{
            marginTop: "20px",
            flexGrow: 1,
            display: "flex",
            height: "78vh",
            boxShadow: "0px 5px 30px -15px",
            position: "fixed",
            left: "0.5rem",
            top: "5.5rem",
            color: "#3F5163",
            borderRadius: "6px",
            background: "#fff",
            zIndex: "3",
          }}
        //ref={tabRef} // Reference to the entire box that holds the tabs and panel
        >
          <Tabs
            orientation="vertical"
            value={isTabOpen ? value : false}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              height: "80vh",
              "& .MuiTabs-indicator": {
                display: "none !important",
              },
            }}
          >
            <Tab
              icon={<Sidebarsetting style={{ width: "20px", height: "auto" }} />}
              label={<span style={{ color: "#3F5163", textTransform: "capitalize" }}>Config</span>}
              sx={{
                margin: "10px 15px 10px 15px",
                "&.Mui-selected": {
                  borderBottom: "1px solid gray !important",
                },
              }}
              {...a11yProps(0)}
            />
            <Tab
              sx={{
                margin: "0px 15px 10px 15px",
                "&.Mui-selected": {
                  borderBottom: "1px solid gray !important",
                },
              }}
              icon={<Sidebarupload sx={{ width: "20px", height: "auto" }} />}
              label={<span style={{ color: "#3F5163", textTransform: "capitalize" }}>My uploads</span>}
              {...a11yProps(1)}
            />
            <Tab
              sx={{
                margin: "0px 15px 10px 15px",
                "&.Mui-selected": {
                  borderBottom: "1px solid gray !important",
                },
              }}
              icon={<Sidebarsetting style={{ width: "20px", height: "auto" }} />}
              label={<span style={{ color: "#3F5163", textTransform: "capitalize" }}>Premium images</span>}
              {...a11yProps(2)}
            />
            {/*<Tab
              sx={{
                margin: "0px 15px 10px 15px",
                "&.Mui-selected": {
                  borderBottom: "1px solid gray !important",
                },
              }}
              icon={<Sidebartext style={{ width: "20px", height: "auto" }} />}
              label={<span style={{ color: "#3F5163", textTransform: "capitalize" }}>Text</span>}
              {...a11yProps(3)}
            />
            <Tab
              sx={{
                margin: "0px 15px 10px 15px",
                "&.Mui-selected": {
                  borderBottom: "1px solid gray !important",
                },
              }}
              icon={<Sidebarshapes style={{ width: "20px", height: "auto" }} />}
              label={<span style={{ color: "#3F5163", textTransform: "capitalize" }}>Shapes</span>}
              {...a11yProps(4)}
            />
            <Tab
              sx={{
                margin: "0px 15px 10px 15px",
                "&.Mui-selected": {
                  borderBottom: "1px solid gray !important",
                },
              }}
              icon={<Sidebarbackground style={{ width: "20px", height: "auto" }} />}
              label={<span style={{ color: "#3F5163", textTransform: "capitalize" }}>background</span>}
              {...a11yProps(5)}
            />*/}
            <Tab
              sx={{
                margin: "0px 15px 10px 15px",
                "&.Mui-selected": {
                  borderBottom: "1px solid gray !important",
                },
              }}
              icon={<SidebarQRcode style={{ width: "20px", height: "auto" }} />}
              label={<span style={{ color: "#3F5163", textTransform: "capitalize" }}>QR Code</span>}
              {...a11yProps(3)}
            />
          </Tabs>
          <Box
            sx={{
              position: "relative",
              backgroundColor: "whitesmoke",
              flexGrow: 1,
              overflow: "hidden",
              // scrollbarWidth: "thin",
              // scrollbarGutter: "stable",
              // padding: "0px !important",
              "&:hover": {
                overflowY: "auto",
              },
              "&::-webkit-scrollbar": {
                width: "3px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555",
              },
            }}
            onScroll={handleScroll}
          >
            {isTabOpen && (
              <>
                <TabPanel value={value} index={0} style={{ width: "22rem" }}>
                  <Config
                    allproduct={allproduct}
                    alldata={alldata}
                    setProductDetails={setProductDetails}
                    productDetails={productDetails}
                    setgetId={setgetId}
                    storedPayload={storedPayload}
                  />
                </TabPanel>
                <TabPanel value={value} index={1} style={{ width: "auto", maxWidth: "20rem" }}>
                  <MyUpload
                    combinedImages={combinedImages}
                    setCombinedImages={setCombinedImages}
                    handleImageChange={handleImageChange}
                    selectedFile={selectedFile}
                    handleDeleteClick={handleDeleteClick}
                    selectImage={selectImage}
                    handleExpand={handleExpand}
                    handleDeleteDropboxFile={handleDeleteDropboxFile}
                    handleSuccess={handleSuccess}
                    dropdata={dropdata}
                  />
                </TabPanel>
                <TabPanel value={value} index={2} style={{ maxWidth: "21rem", padding: "0px" }}>
                  <PremiumImg
                    handleExpand={handleExpand}
                    selectImage={selectImage}
                    setPremiumimg={setPremiumimg}
                    handleOpentoAdd={handleOpentoAdd}
                    selectedimg={selectedimg}
                    loading={loading}
                    setLoading={setLoading}
                    hasMore={hasMore}
                    setHasMore={setHasMore}
                    setOffset={setOffset}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    searchVector={searchVector}
                    setSearchVector={setSearchVector}
                    valuePremium={valuePremium}
                    setValuePremium={setValuePremium}
                    setPhotosData={setPhotosData}
                    photosData={photosData}
                    vectorData={vectorData}
                    showpopularData={showpopularData}
                    setVectorData={setVectorData}
                    setShowpopularData={setShowpopularData}
                    fetchMedia={fetchMedia}
                  />
                </TabPanel>
                <TabPanel value={value} index={3} style={{ height: "15rem" }}>
                  <Qrcode setImage={setImage} />
                </TabPanel>
              </>
            )}
          </Box>
        </Box>
      </ClickAwayListener>

      {/* Single Expand Image Dialog */}
      <Dialog
        PaperProps={{
          ref: dialogRef, // Assign ref to the dialog for outside click detection
        }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open && expandedImageIndex !== null}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            position: "relative",
            margin: 0,
            borderRadius: "12px",
            overflow: "hidden",
            maxWidth: 1170,
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle sx={{ p: 0, position: "relative" }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, backgroundColor: "#f1f8ff" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              padding: "24px",
              backgroundColor: "#f1f8ff",
            }}
          >
            <img
              src={expandimage}
              alt="Display"
              style={{
                maxWidth: "100%",
                maxHeight: "400px",
                borderRadius: "12px",
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              if (expandedImageIndex !== null) {
                // Check if value is 1 for "upload" or a different condition for "dropdata"
                if (value === 1) {
                  selectImage(expandedImageIndex, "upload");
                } else if (value === 1 && dropdata[expandedImageIndex]) {
                  selectImage(expandedImageIndex, "dropdata");
                } else {
                  selectImage(expandedImageIndex, "premium");
                }
                handleSelectImage();
                handleClose();
              }
            }}
          >
            Add Image
          </Button>
        </DialogActions>
      </Dialog>

      {/* Single Delete Confirmation Dialog */}
      <Dialog
        PaperProps={{
          ref: dialogRef, // Assign ref to the dialog for outside click detection
        }}
        onClose={(event, reason) => {
          // Only handle the dialog close, do not affect the tab
          if (reason !== "backdropClick") {
            handledelClose(event); // This will only close the dialog
          }
        }}
        aria-labelledby="customized-dialog-title"
        open={delopen}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            position: "relative",
            margin: 0,
            borderRadius: "12px",
            overflow: "hidden",
            maxWidth: 600,
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle sx={{ p: 0, position: "relative" }}>
          <Typography sx={{ textAlign: "center", padding: "1rem" }}>Are you sure you want to delete this?</Typography>
          {/* Close icon */}
          <IconButton onClick={handledelClose} sx={{ position: "absolute", top: 8, right: 8 }}>
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>

        <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleDeleteConfirm(); // Confirm action logic
              // Keep the tab open, only close the dialog
            }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handledelClose} // This only closes the dialog, not the tab
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;
