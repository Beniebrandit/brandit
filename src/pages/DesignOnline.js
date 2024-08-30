import React, { useState } from "react";
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
import Toolbar from "../components/Toolbar";

const DesignOnline = () => {
  const [File, setFile] = React.useState("");

  const handleChange = (event) => {
    setFile(event.target.value);
  };

  const [selectedFile, setSelectedFile] = useState([]);

  const handleImageChange = (e) => {
    const newImage = URL.createObjectURL(e.target.files[0]);
    setSelectedFile((prevFiles) => [...prevFiles, newImage]);
    console.log(selectedFile,"selectedFile");
  };

  const handleDelete = (indexToDelete) => {
    setSelectedFile((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToDelete)
    );
  };
  return (
    <>
      <Box className="inner_header" sx={{ width: "100%" ,position:"sticky"}}>
        <Box
          // maxWidth="lg"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginX: "10rem",
          }}
        >
          <Box className="header_box" sx={{paddingLeft:"5rem"}}>
            <img
              alt="main_logo"
              src={main_logo}
              style={{ width: "50px", height: "auto" }}
            />
          </Box>

          <Box
            sx={{
              // display: "grid",
              // gridTemplateColumns:"0.3fr 1.7fr 1fr",
              // width:"40rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // margin: "auto",
            }}
          >
            <Box sx={{ minWidth: 80 }}>
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
            {/* <Typography
              sx={{ color: "black", fontWeight: "600", fontSize: "20px" }}
            >
              Subscribe
            </Typography> */}
            <Box>
              <TextField
                variant="outlined"
                placeholder="Name this Design"
                sx={{
                  backgroundColor: "transparent",
                  "& fieldset": { border: "none" },
                  boxShadow: "0px 5px 30px -15px",
                  height:"36.2px"
                }}
              />
              <Button
                sx={{
                  backgroundColor: "#3F5163",
                  color: "white",
                  padding: "6px",
                  paddingX: "1.4rem",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#3F5163",
                  },
                }}
              >
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
                paddingRight: "1.5rem",
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
        <Sidebar handleImageChange={handleImageChange} selectedFile={selectedFile} handleDelete={handleDelete}/>
        <Box
          style={{
            height: "100%", // Full height of the viewport
            width: "100%",
            marginLeft: "210px", // Adjust margin based on sidebar width
            marginRight: "265px", // Adjust margin based on sidebar width
            padding: "20px",
            position: "relative",
            boxShadow: "0px 5px 30px -15px", // Background color of the sidebar
            alignItems: "flex-start", // Align items to the start of the flex container
            top: "0.8rem",
            color: "#3F5163", // Text color
            borderRadius: "6px",
            zIndex:"-1"
          }}
        >
          <h1>Your Content Here</h1>
          <p>This is your main content area.</p>
          {selectedFile && 
           selectedFile?.map((image) => (

             <img src={image} style={{height:"100%" ,width:"100%"}} alt="img"/>
           ))
          }
          <Toolbar/>
        </Box>
        <BannerSideSection />
      </Box>
    </>
  );
};

export default DesignOnline;
