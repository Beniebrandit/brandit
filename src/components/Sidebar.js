import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactComponent as Sidebarsetting } from "../asset/images/sidebar_setting.svg";
import { ReactComponent as Sidebarupload } from "../asset/images/sidebar_upload.svg";
import { ReactComponent as Sidebartext } from "../asset/images/sidebar_text.svg";
import { ReactComponent as Sidebarshapes } from "../asset/images/sidebar_shapes.svg";
import { ReactComponent as Sidebarbackground } from "../asset/images/sidebar_background.svg";
import { ReactComponent as SidebarQRcode } from "../asset/images/sidebar_QRcode.svg";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Config from "./Config";
import MyUpload from "./MyUpload";
import Text from "./Text";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

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
  const dialogRef = useRef(null); // Create a ref for the modal

  // console.log(selectImage, "selectImage");

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
    // If the click is outside the tabRef and not in dialogRef
    if (
      tabRef.current &&
      !tabRef.current.contains(event.target) &&
      (!dialogRef.current || !dialogRef.current.contains(event.target)) // Ensure clicks inside dialog don't close TabPanel
    ) {
      setIsTabOpen(false); // Close the TabPanel if clicked outside
    }
  };
  
  useEffect(() => {
    // Add the event listener when the component is mounted
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove the event listener when the component is unmounted
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
            // width:"24rem"
          }}
        >
          {isTabOpen && (
            <>
              <TabPanel value={value} index={0} style={{ width: "22rem" }}>
                <Config />
              </TabPanel>
              <TabPanel value={value} index={1} style={{ width: "24rem" }}>
                <MyUpload
                  handleImageChange={handleImageChange}
                  selectedFile={selectedFile}
                  handleDeleteClick={handleDeleteClick}
                  selectImage={selectImage}
                  handleExpand={handleExpand}
                />
              </TabPanel>
              <TabPanel value={value} index={2}>
                Premium images
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Text />
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
        PaperProps={{
          ref: dialogRef, // Assign ref to the dialog for outside click detection
        }}
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
