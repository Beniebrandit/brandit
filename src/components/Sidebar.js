import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  styled,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactComponent as Sidebarsetting } from "../asset/images/sidebar_setting.svg";
import { ReactComponent as Sidebarupload } from "../asset/images/sidebar_upload.svg";
import { ReactComponent as Sidebartext } from "../asset/images/sidebar_text.svg";
import { ReactComponent as Sidebarshapes } from "../asset/images/sidebar_shapes.svg";
import { ReactComponent as Sidebarbackground } from "../asset/images/sidebar_background.svg";
import { ReactComponent as SidebarQRcode } from "../asset/images/sidebar_QRcode.svg";
import WbCloudyOutlinedIcon from "@mui/icons-material/WbCloudyOutlined";
import AddToDriveOutlinedIcon from "@mui/icons-material/AddToDriveOutlined";
import RecyclingOutlinedIcon from "@mui/icons-material/RecyclingOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

const data = [
  {header:"Printed Sides:",title1:"Single Sided",title2:"Double Sided"},
  {header:"Poles:",title1:"Pole Set",title2:"None"},
  {header:"Base:",title1:"Ground Stake",title2:"Square Base",title3:"Cross Base",title4:"Cross Base & Water Bag"},
  {header:"Accessories:",title1:"No Carry Bag",title2:"Carring Case"},
]
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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
  handleImageChange,
  selectedFile,
  onDeleteImage,
  selectImage,
}) => {
  const [value, setValue] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [delopen, setDelOpen] = React.useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [expandimage, setExpandImage] = useState();
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [expandedImageIndex, setExpandedImageIndex] = useState(null); // New state for tracking expanded image

  const tabRef = useRef(null);
  const modalRef = useRef(null); // Create a ref for the modal

  console.log(selectImage, "selectImage");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setExpandedImageIndex(null); // Reset the index when the dialog is closed
  };

  // Remove handleAddImage with useCallback
  // const handleAddImage = useCallback((index) => {
  //   return () => {
  //     selectImage(index);
  //     console.log(index, "adding");
  //   };
  // }, []);

  const handledelOpen = () => {
    setDelOpen(true);
  };

  const handledelClose = () => {
    setDelOpen(false);
    setImageToDelete(null); // Reset the index when the dialog is closed
  };

  const handleDeleteClick = (index) => {
    setImageToDelete(index); // Set the correct image index
    setDelOpen(true); // Open the delete confirmation dialog
  };

  const handleExpand = (index) => {
    const Expand = selectedFile[index];
    setExpandImage(Expand);
    setExpandedImageIndex(index); // Set the currently expanded image index
    handleClickOpen(); // Open the dialog
    console.log(Expand, "Expand");
  };

  const handleDeleteConfirm = () => {
    if (imageToDelete !== null) {
      onDeleteImage(imageToDelete); // Delete the image using the passed prop function
      setDelOpen(false);
      setImageToDelete(null); // Reset the index after deletion
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setIsTabOpen(true); // Open the tab
  };

  const handleClickOutside = (event) => {
    if (
      tabRef.current &&
      !tabRef.current.contains(event.target) &&
      modalRef.current &&
      !modalRef.current.contains(event.target) // Check if the click is outside the modal as well
    ) {
      setIsTabOpen(false); // Close the tab if clicked outside both tab and modal
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Box
        // className="custom-scrollbar custom-scrollbar-container"
        sx={{
          flexGrow: 1,
          display: "flex",
          height: "82vh", // Full height of the viewport
          boxShadow: "0px 5px 30px -15px", // Background color of the sidebar
          // padding: "20px 0", // Padding at the top and bottom
          position: "fixed", // Fixes the sidebar to the left
          left: "0.5rem",
          top: "5rem",
          color: "#3F5163", // Text color
          borderRadius: "6px",
          zIndex: "2",
        }}
        ref={tabRef} // Reference to the entire box that holds the tabs and panel
      >
        <Tabs
          orientation="vertical"
          value={isTabOpen ? value : false} // Close tab panel by setting value to false
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", height: "80vh" }}
        >
          <Tab
            icon={<Sidebarsetting style={{ width: "20px", height: "auto" }} />}
            label={<span style={{ color: "#3F5163" }}>Config</span>}
            sx={{ paddingX: "4rem" }}
            {...a11yProps(0)}
          />
          <Tab
            icon={<Sidebarupload sx={{ width: "20px", height: "auto" }} />}
            label={<span style={{ color: "#3F5163" }}>My uploads</span>}
            {...a11yProps(1)}
          />
          <Tab
            icon={<Sidebarsetting style={{ width: "20px", height: "auto" }} />}
            label={<span style={{ color: "#3F5163" }}>Premium images</span>}
            {...a11yProps(2)}
          />
          <Tab
            icon={<Sidebartext style={{ width: "20px", height: "auto" }} />}
            label={<span style={{ color: "#3F5163" }}>Text</span>}
            {...a11yProps(3)}
          />
          <Tab
            icon={<Sidebarshapes style={{ width: "20px", height: "auto" }} />}
            label={<span style={{ color: "#3F5163" }}>Shapes</span>}
            {...a11yProps(4)}
          />
          <Tab
            icon={
              <Sidebarbackground style={{ width: "20px", height: "auto" }} />
            }
            label={<span style={{ color: "#3F5163" }}>background</span>}
            {...a11yProps(5)}
          />
          <Tab
            icon={<SidebarQRcode style={{ width: "20px", height: "auto" }} />}
            label={<span style={{ color: "#3F5163" }}>QR Code</span>}
            {...a11yProps(6)}
          />
        </Tabs>
        <Box
          sx={{
            position: "relative",
            backgroundColor: "whitesmoke",
            flexGrow: 1,
          }}
        >
          {isTabOpen && (
            <>
              <TabPanel value={value} index={0}>
                  <Box>
                <Box className="custom-scrollbar custom-scrollbar-container">

                  <Box sx={{height:"30rem"}}>
                    <Typography>Select product :</Typography>
                    <Select fullWidth defaultValue="Feather Flag Banner">
                      <MenuItem value="Feather Flag Banner">
                        Feather Flag Banner
                      </MenuItem>
                      <MenuItem value="3 Sided table Cover">
                        3 Sided table Cover
                      </MenuItem>
                      <MenuItem value="A-Frame Sign">A-Frame Sign</MenuItem>
                      <MenuItem value="Acrylic Photo print">
                        Acrylic Photo print
                      </MenuItem>
                      {/* Add more products as needed */}
                    </Select>
                    <Divider
                      sx={{ marginTop: "1rem", marginBottom: "0.5rem" }}
                    />
                    <Typography>Size (in Inches)</Typography>
                    <Select fullWidth defaultValue="Small">
                      <MenuItem value="Small">Small (24.25"x79.5")</MenuItem>
                      <MenuItem value="Medium">Medium (24.25"x79.5")</MenuItem>
                      <MenuItem value="Large">Large (24.25"x79.5")</MenuItem>
                      <MenuItem value="X-Large">
                        X-Large (24.25"x79.5")
                      </MenuItem>
                      {/* Add more sizes as needed */}
                    </Select>
                    <Divider
                      sx={{ marginTop: "1rem", marginBottom: "0.5rem" }}
                    />

                    <Typography>Quantity</Typography>

                    <TextField fullWidth type="number" defaultValue={1} />

                    <Box
                      sx={{
                        position: "relative",
                        mt: 1,
                        "&:hover .hover-content": {
                          display: "block",
                        },
                      }}
                    >
                      <Typography variant="body1" color="primary">
                        Buy More, Save More!
                      </Typography>
                      <Box
                        className="hover-content"
                        sx={{
                          display: "none",
                          position: "relative",
                          left: 0,
                          right:0,
                          mt: 1,
                          // backgroundColor: "#fff",
                          // padding: "10px",
                          // boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                          // zIndex: 1,
                          width: "100%",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          2 for $139.78 ea.{" "}
                          <a href="#" style={{ color: "#0066cc" }}>
                            Save 7%
                          </a>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          3 for $138.75 ea.{" "}
                          <a href="#" style={{ color: "#0066cc" }}>
                            Save 8%
                          </a>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          4 for $137.71 ea.{" "}
                          <a href="#" style={{ color: "#0066cc" }}>
                            Save 8%
                          </a>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          5 for $136.68 ea.{" "}
                          <a href="#" style={{ color: "#0066cc" }}>
                            Save 9%
                          </a>
                        </Typography>
                      </Box>
                    </Box>
                   {data?.map((val) => {
                    return <>
                   <Accordion defaultExpanded>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{val.header}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Paper
                              elevation={3}
                              sx={{
                                padding: 1,
                                textAlign: "center",
                                border: "2px solid",
                                borderColor: "#0066cc",
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold" }}
                              >
                                {val.title1}
                              </Typography>
                              <img
                                src="single-sided-image-url"
                                alt="Single Sided"
                                style={{ width: "100%", marginTop: "10px" }}
                              />
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper
                              elevation={1}
                              sx={{
                                padding: 1,
                                textAlign: "center",
                                border: "1px solid #e0e0e0",
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold" }}
                              >
                                 {val.title2}
                              </Typography>
                              <img
                                src="double-sided-image-url"
                                alt="Double Sided"
                                style={{ width: "100%", marginTop: "10px" }}
                              />
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper
                              elevation={1}
                              sx={{
                                padding: 1,
                                textAlign: "center",
                                border: "1px solid #e0e0e0",
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold" }}
                              >
                                 {val.title3}
                              </Typography>
                              <img
                                src="double-sided-image-url"
                                alt="Double Sided"
                                style={{ width: "100%", marginTop: "10px" }}
                              />
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper
                              elevation={1}
                              sx={{
                                padding: 1,
                                textAlign: "center",
                                border: "1px solid #e0e0e0",
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold" }}
                              >
                                 {val.title4}
                              </Typography>
                              <img
                                src="double-sided-image-url"
                                alt="Double Sided"
                                style={{ width: "100%", marginTop: "10px" }}
                              />
                            </Paper>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                    </>
                    
                   })}
                  </Box>
                  </Box>
                  <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Typography variant="h6">$150.33 each</Typography>
                    <Typography variant="body2">Subtotal: $150.33</Typography>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
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
                        onChange={handleImageChange}
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
                    <CloudUploadOutlinedIcon
                      style={{ width: "40px", height: "auto" }}
                    />
                    <Typography variant="caption">Upload</Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <WbCloudyOutlinedIcon
                      style={{ width: "40px", height: "auto" }}
                    />
                    <Typography variant="caption">Google Drive</Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <AddToDriveOutlinedIcon
                      style={{ width: "40px", height: "auto" }}
                    />
                    <Typography variant="caption">Dropbox</Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <RecyclingOutlinedIcon
                      style={{ width: "40px", height: "auto" }}
                    />
                    <Typography variant="caption">OneDrive</Typography>
                  </Box>
                </Box>
                <Typography
                  variant="caption"
                  display="block"
                  textAlign="center"
                >
                  JPG, JPEG, PNG, GIF, TIFF, BMP, AI, EPS, SVG, PDF, HEIC, JFIF,
                  PJPEG, WEBP
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
                            console.log(index, "selectImage");
                          }}
                        />
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
                            transition:
                              "top 0.3s ease-in-out, opacity 0.3s ease-in-out", // Smooth transition
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
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={3}>
                Item Four
              </TabPanel>
              <TabPanel value={value} index={4}>
                Item Five
              </TabPanel>
            </>
          )}
        </Box>
      </Box>

      {/* Single Expand Image Dialog */}
      <Dialog
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
                selectImage(expandedImageIndex);
                console.log(expandedImageIndex, "adding");
                handleClose(); // Optionally close the dialog after adding
              }
            }}
          >
            Add Image
          </Button>
        </DialogActions>
      </Dialog>

      {/* Single Delete Confirmation Dialog */}
      <Dialog
        onClose={handledelClose}
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
          <Typography sx={{ textAlign: "center", padding: "1rem" }}>
            Are you sure you want to delete this?
          </Typography>
        </DialogTitle>

        <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleDeleteConfirm}
          >
            Yes
          </Button>
          <Button variant="contained" color="success" onClick={handledelClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;
