import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
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
import MenuIcon from "@mui/icons-material/Menu";
import "@pqina/pintura/pintura.css";
import { PinturaEditor } from "@pqina/react-pintura";
import { getEditorDefaults } from "@pqina/pintura";

const editorDefaults = getEditorDefaults();
const DesignOnline = () => {
  const [File, setFile] = React.useState("");

  const handleChange = (event) => {
    setFile(event.target.value);
  };

  const [selectedFile, setSelectedFile] = useState([]);
  const [addimage, AddImage] = useState([]);

  const handleImageChange = (e) => {
    const newImage = URL.createObjectURL(e.target.files[0]);
    setSelectedFile((prevFiles) => [...prevFiles, newImage]);
    console.log(selectedFile, "selectedFile");
  };

  const handleDeleteImage = (index) => {
    setSelectedFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
    console.log(index, "index");
  };
  // const selectImage = (index) => {
  //   const Image = selectedFile.filter((_, i) => i == index);
  //   // const storedImage = [...Image]
  //   AddImage((prevFiles) => [...prevFiles, Image]);
  //   console.log(Image, "storedImage");
  // };
  const selectImage = (index) => {
    console.log(index, "inside selectImage");
    const Image = selectedFile[index];
    AddImage((prevFiles) => [...prevFiles, Image]);
    console.log(Image, "storedImage");
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <Box className="inner_header" sx={{ width: "100%", position: "fixed" }}>
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
          <Box
            className="header_box"
            sx={{ paddingLeft: { xs: "1rem", sm: "5rem" } }}
          >
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
                  <MenuItem value={10} sx={{display:"flex" ,justifyContent:"space-between"}}>
                  <Typography>Undo</Typography>
                  <Typography>Crtl+Z</Typography>                 
                  </MenuItem>
                  <MenuItem value={20} sx={{display:"flex" ,justifyContent:"space-between"}}>
                  <Typography>Redo</Typography>
                  <Typography>Crtl+Y</Typography>  
                  </MenuItem>
                  <Divider/>
                  <MenuItem value={30}>Save</MenuItem>
                  <MenuItem value={30}>Save as copy</MenuItem>
                  <MenuItem value={30}>Load previous design</MenuItem>
                  <Divider/>
                  <MenuItem value={30}>Show ruler</MenuItem>
                  <MenuItem value={30}>Show grid</MenuItem>
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
                  "& .MuiInputBase-input-MuiOutlinedInput-input": {
                    border: "none",
                  },
                  boxShadow: "0px 5px 30px -15px",
                  // height: "36.2px",
                  // fontSize:"10px"
                }}
                inputProps={{
                  style: {
                    padding: "7px",
                  },
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
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: { xs: "0.5rem", sm: "1rem" },
            }}
            sm="auto"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Help sx={{ width: "20px", height: "auto" }} />
              <Typography variant="body2">Get Design Help</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Share sx={{ width: "20px", height: "auto" }} />
              <Typography variant="body2">Share</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Save sx={{ width: "20px", height: "auto" }} />
              <Typography variant="body2">Save</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                paddingRight: "1.5rem",
              }}
            >
              <Cart0
                sx={{
                  width: "20px",
                  height: "auto",
                  backgroundColor: "#3F5163",
                  padding: "8px",
                  borderRadius: "5px",
                }}
              />
            </Box>
            {/* </Box> */}
          </Box>
          <Grid item xs={12} sm="auto" sx={{ display: { md: "none" } }}>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <List>
                <ListItem>
                  <Typography variant="body2">Large Format</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body2">Stickers and Labels</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body2">Fabrics</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body2">Accessories</Typography>
                </ListItem>
              </List>
            </Drawer>
          </Grid>
        </Box>
      </Box>

      <Box style={{ display: "flex" }}>
        <Sidebar
          handleImageChange={handleImageChange}
          selectedFile={selectedFile}
          onDeleteImage={handleDeleteImage}
          selectImage={selectImage}
          // AddingImage={selectImage}
        />
        <Box
          style={{
            height: "100%",
            width: "100%",
            marginLeft: "210px",
            marginRight: "265px",
            padding: "20px",
            position: "relative",
            boxShadow: "0px 5px 30px -15px",
            alignItems: "flex-start",
            top: "5rem",
            color: "#3F5163",
            borderRadius: "6px",
            zIndex: "1", // Make sure zIndex is positive to be above other elements
          }}
        >
          <h1>Your Content Here</h1>
          <p>This is your main content area.</p>
          {addimage &&
          <div style={{ height: "600px", position: "relative", zIndex: "10" }}>

            {addimage?.map((image) => (
              <PinturaEditor
              {...editorDefaults}
              src={image}
              imageCropAspectRatio={16 / 9}
              cropSelectPresetOptions={[
                [undefined, "Custom"],
                [1, "Square"],
                [16 / 9, "16:9"],
                [4 / 3, "4:3"],
              ]}
            />
            ))}
          </div>
            }
          <Toolbar />
        </Box>

        <BannerSideSection />
      </Box>
    </>
  );
};

export default DesignOnline;
