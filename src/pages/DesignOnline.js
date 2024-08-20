import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import main_logo from "../asset/images/main_logo.png";
import { ReactComponent as Help } from "../asset/images/help.svg";
import { ReactComponent as Share } from "../asset/images/share.svg";
import { ReactComponent as Save } from "../asset/images/save.svg";
import { ReactComponent as Cart0 } from "../asset/images/cart.svg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Sidebar from "../components/Sidebar";
import BannerSideSection from "../components/BannerSideSection";

const DesignOnline = () => {
  const [File, setFile] = React.useState("");

  const handleChange = (event) => {
    setFile(event.target.value);
  };
  return (
    <>
      <Box className="inner_header" sx={{ width: "100%" }}>
        <Box
          maxWidth="lg"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "auto",
          }}
        >
          <Box className="header_box">
            <img
              alt="main_logo"
              src={main_logo}
              style={{ width: "50px", height: "auto" }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">File</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={File}
                  label="File"
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography
              sx={{ color: "#FFFFFF", fontWeight: "600", fontSize: "20px" }}
            >
              Subscribe
            </Typography>
            <Box>
              <TextField
                placeholder="Name this Design"
                sx={{
                  borderRadius: "0px",
                  backgroundColor: "white",
                }}
              />
              <Button sx={{ backgroundColor: "#3F5163", color: "white" }}>
                Save
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                paddingLeft: "1rem",
              }}
            >
              <Help style={{ width: "20px", height: "auto" }} />
              &nbsp;
              <span>Get Design Help</span>
            </Box>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                paddingLeft: "1rem",
              }}
            >
              <Share style={{ width: "20px", height: "auto" }} />
              &nbsp;
              <span>Share</span>
            </Box>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                paddingLeft: "1rem",
              }}
            >
              <Save style={{ width: "20px", height: "auto" }} />
              &nbsp;
              <span>Save</span>
            </Box>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                paddingLeft: "1rem",
              }}
            >
              <Cart0
                style={{
                  width: "20px",
                  height: "auto",
                  backgroundColor: "#3F5163",
                  padding: "8px",
                  borderRadius: "5px",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box style={{ display: "flex" }}>
        <Sidebar />
        <Box
          style={{
            height: "82vh", // Full height of the viewport
            width: "100%",
            marginLeft: "210px", // Adjust margin based on sidebar width
            marginRight: "250px", // Adjust margin based on sidebar width
            padding: "20px",
            backgroundColor: "whitesmoke", // Background color of the sidebar
            alignItems: "flex-start", // Align items to the start of the flex container
            top: "10rem",
            color: "#3F5163", // Text color
            borderRadius: "6px",
          }}
        >
          <h1>Your Content Here</h1>
          <p>This is your main content area.</p>
        </Box>
        <BannerSideSection />
      </Box>
    </>
  );
};

export default DesignOnline;
