import { Box, Button } from "@mui/material";
import React from "react";
import { ReactComponent as Sidebarsetting } from "../asset/images/sidebar_setting.svg";
import { ReactComponent as Sidebarupload } from "../asset/images/sidebar_upload.svg";
import { ReactComponent as Sidebartext } from "../asset/images/sidebar_text.svg";
import { ReactComponent as Sidebarshapes } from "../asset/images/sidebar_shapes.svg";
import { ReactComponent as Sidebarbackground } from "../asset/images/sidebar_background.svg";
import { ReactComponent as SidebarQRcode } from "../asset/images/sidebar_QRcode.svg";

const Sidebar = () => {
  return (
    <Box
      style={{
        height: "82vh", // Full height of the viewport
        width: "200px", // Width of the sidebar
        backgroundColor: "whitesmoke", // Background color of the sidebar
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Align items to the start of the flex container
        padding: "20px 0", // Padding at the top and bottom
        position: "fixed", // Fixes the sidebar to the left
        left: "0",
        top: "5rem",
        color: "#3F5163", // Text color
        borderRadius: "6px",
      }}
    >
      <Button
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginX: "auto",
          marginBottom: "1rem",
          width: "100%",
        }}
      >
        <Sidebarsetting style={{ width: "20px", height: "auto" }} />
        &nbsp;
        <span style={{color:"#3F5163"}}>Config</span>
      </Button>
      <Button
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginX: "auto",
          marginBottom: "1rem",
          width: "100%",
        }}
      >
        <Sidebarupload sx={{ width: "20px", height: "auto" }} />
        &nbsp;
        <span style={{color:"#3F5163"}}>My uploads</span>
      </Button>
      <Button
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginX: "auto",
          marginBottom: "1rem",
          width: "100%",
        }}
      >
        <Sidebarsetting style={{ width: "20px", height: "auto" }} />
        &nbsp;
        <span style={{color:"#3F5163"}}>Premium images</span>
      </Button>
      <Button
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginX: "auto",
          marginBottom: "1rem",
          width: "100%",
        }}
      >
        <Sidebartext style={{ width: "20px", height: "auto" }} />
        &nbsp;
        <span style={{color:"#3F5163"}}>Text</span>
      </Button>
      <Button
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginX: "auto",
          marginBottom: "1rem",
          width: "100%",
        }}
      >
        <Sidebarshapes style={{ width: "20px", height: "auto" }} />
        &nbsp;
        <span style={{color:"#3F5163"}}>Shapes</span>
      </Button>
      <Button
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginX: "auto",
          marginBottom: "1rem",
          width: "100%",
        }}
      >
        <Sidebarbackground style={{ width: "20px", height: "auto" }} />
        &nbsp;
        <span style={{color:"#3F5163"}}>background</span>
      </Button>
      <Button
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginX: "auto",
          marginBottom: "1rem",
          width: "100%",
        }}
      >
        <SidebarQRcode style={{ width: "20px", height: "auto" }} />
        &nbsp;
        <span  style={{color:"#3F5163"}}>QR Code</span>
      </Button>
    </Box>
  );
};

export default Sidebar;
