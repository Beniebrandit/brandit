import { Box, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

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

const Sidebar = ({handleImageChange}) => {
  const [value, setValue] = React.useState(1);

  const [isTabOpen, setIsTabOpen] = useState(false);
  const tabRef = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setIsTabOpen(true); // Open the tab
  };

  const handleClickOutside = (event) => {
    if (tabRef.current && !tabRef.current.contains(event.target)) {
      setIsTabOpen(false); // Close the tab if clicked outside
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
        className="custom-scrollbar"
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
        <Box sx={{ position: "relative", backgroundColor: "whitesmoke" }}>
          {isTabOpen && (
            <>
              <TabPanel value={value} index={0}>
                Item One
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
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
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
                  JPG, JPEG, PNG, GIF, TIFF, BMP, AI, EPS, SVG, PDF, HEIC,
                  JFIF, PJPEG, WEBP
                  <br />
                  Max file size: 200 MB
                </Typography>
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
    </>
  );
};

export default Sidebar;
