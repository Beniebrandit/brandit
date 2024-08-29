import { Box, Button } from "@mui/material";
import React from "react";
import { ReactComponent as Menudesign } from "../asset/images/menu_design.svg";
import { ReactComponent as Imogidesign } from "../asset/images/imogi_design.svg";
import { ReactComponent as Redesign } from "../asset/images/re_design.svg";
const Toolbar = () => {
  const toolbarStyle = {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 16px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    border: "1px solid #e0e0e0",
  };

  const buttonStyle = {
    border: "none",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    padding: "8px 12px",
    marginRight: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  const zoomControlStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const iconStyle = {
    fontSize: "18px",
    margin: "0 4px",
    cursor: "pointer",
  };

  return (
    <div style={toolbarStyle}>
      <Button style={buttonStyle}>
        <Menudesign/>
      </Button>
      <Button style={buttonStyle}>
        <Imogidesign/>
      </Button>
      <button style={buttonStyle}>Front</button>
      <Box style={zoomControlStyle}>
        <span style={iconStyle}>⤺</span>
        <span style={iconStyle}>⤻</span>
        <button style={{ ...buttonStyle, marginRight: "0" }}>- 150% +</button>
      </Box>
      <Button style={buttonStyle}>
      <Redesign/>
      </Button>
    </div>
  );
};

export default Toolbar;
