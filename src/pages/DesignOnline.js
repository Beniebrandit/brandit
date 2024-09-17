import React, { useRef, useState } from "react";
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
import {
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultImageOrienter,
  setPlugins,
  plugin_crop,
  locale_en_gb,
  plugin_crop_locale_en_gb,
  getEditorDefaults,
  plugin_annotate,
  plugin_finetune,
} from "@pqina/pintura";

setPlugins(plugin_crop, plugin_finetune, plugin_annotate);

const editorDefaults = {
  imageReader: createDefaultImageReader(),
  imageWriter: {
    postprocessImageData: (imageData) =>
      new Promise((resolve) => {
        // create a canvas element to handle the imageData
        const canvas = document.createElement("canvas");
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        const ctx = canvas.getContext("2d");
        ctx.putImageData(imageData, 0, 0);

        // only draw image where we render our circular mask
        ctx.globalCompositeOperation = "destination-in";

        // draw our circular mask
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(
          imageData.width * 0.5,
          imageData.height * 0.5,
          imageData.width * 0.5,
          0,
          2 * Math.PI
        );
        ctx.fill();

        // returns the modified imageData
        resolve(ctx.getImageData(0, 0, canvas.width, canvas.height));
      }),
    targetSize: {
      width: 512,
      height: 512,
      fit: "contain",
    },
    preprocessImageState: (imageState) => {
      // Create new annotation array
      imageState.annotation = imageState.annotation.map((shape) => {
        // This is not a text shape so skip
        if (!shape.text) return shape;

        // Replace placeholders in text properties
        shape.text = shape.text.replace(/{name}/g, "John Connor");

        return shape;
      });

      // Return updated image state
      return imageState;
    },
  },
  imageOrienter: createDefaultImageOrienter(),
  locale: {
    ...locale_en_gb,
    ...plugin_crop_locale_en_gb,
  },
};

const DesignOnline = () => {
  const [File, setFile] = React.useState("");

  const handleChange = (event) => {
    setFile(event.target.value);
  };

  const [selectedFile, setSelectedFile] = useState([]);
  const [addimage, AddImage] = useState([]);
  const [textStyle, setTextStyle] = useState({
    fontWeight: "normal",
    fontStyle: "normal",
  });
  const [editorResult, setEditorResult] = useState(undefined);
  const editorRef = useRef(null);  // Reference to store the editor instance


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setSelectedFile((prevFiles) => [...prevFiles, newImageUrl]);

      // Automatically set the first uploaded image as active if none exists
      if (addimage === null) {
        AddImage(0);
      }
    }
  };

  const handleDeleteImage = (index) => {
    setSelectedFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
    console.log(index, "index");
  };

  const selectImage = (index) => {
    AddImage(selectedFile[index]);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleStyleChange = (newStyle) => {
    setTextStyle((prevStyle) => ({
      ...prevStyle,
      ...newStyle,
    }));
  };

  const handleEditorProcess = (imageState) => {
    setEditorResult(URL.createObjectURL(imageState.dest));
};

const handleButtonClick = () => {
  // we merge our new circle shape with the existing list of shapes
  // it's added at the end of the list, so it will be drawn on top
  const updatedAnnotationList = [
      ...editorRef.current.editor.imageAnnotation,
      {
          id: 'rectangle',
          x: 64,
          y: 64,
          rx: 128,
          ry: 128,
          backgroundColor: [0, 1, 0],
      },
  ];

  editorRef.current.editor.imageAnnotation = updatedAnnotationList;
};

const willRenderUtilTabs = (tabs, env, redraw) => {
  return [
    [
      'div',
      'tab-group',
      {
        style:
          'display:flex; flex-direction:' +
          (env.orientation === 'landscape' ? 'row' : 'column'),
      },
      tabs.map((tab) => [
        'button',
        tab.id,
        {
          label: tab.label + (tab.selected ? ' *' : ''),
          onclick: () => {
            if (editorRef.current) {
              // Call showTextInput with the desired options
              editorRef.current.showTextInput(
                (text) => {
                  console.log('Text confirmed:', text);
                  // Handle the confirmed text here
                },
                (err) => {
                  console.error('Text input error:', err);
                  // Handle any errors here
                },
                {
                  align: 'top',
                  justify: 'center',
                  text: 'Current text',
                  placeholder: 'Type something',
                  buttonConfirm: {
                    label: 'Generate',
                  },
                  buttonCancel: {
                    hideLabel: true,
                    label: 'Cancel',
                    icon: `<g stroke="currentColor" stroke-width="2">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                      </g>`,
                  },
                }
              );
            }
          },
        },
      ]),
    ],
  ];
};

console.log("addimage",addimage)

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
                  <MenuItem
                    value={10}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Undo</Typography>
                    <Typography>Crtl+Z</Typography>
                  </MenuItem>
                  <MenuItem
                    value={20}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Redo</Typography>
                    <Typography>Crtl+Y</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem value={30}>Save</MenuItem>
                  <MenuItem value={30}>Save as copy</MenuItem>
                  <MenuItem value={30}>Load previous design</MenuItem>
                  <Divider />
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
          onStyleChange={handleStyleChange}
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
            zIndex: "1", // Ensure zIndex is properly set
          }}
        >
          <h1>Your Content Here</h1>
          <p>This is your main content area.</p>
          {addimage.length > 0 ? (
            <div
              style={{ height: "600px", position: "relative", zIndex: "10" }}
            >
               {/* {editorResult && <img alt="" src={editorResult} />} */}
              <PinturaEditor
                {...editorDefaults}
                ref={editorRef}  // Store editor instance here
                src={addimage}
                imageAnnotation={[
                  {
                    x: 128,
                    y: 128,
                    fontSize: 40,
                    fontWeight: textStyle.fontWeight, // Apply the dynamic styles here
                    fontStyle: textStyle.fontStyle, // Apply dynamic font style here
                    text: "Hello {name}",
                  },
                ]}
                enableText={true}
                onProcess={handleEditorProcess}
                willRenderUtilTabs={willRenderUtilTabs}
                // enableSelectToolToAddShape={enableSelectToolToAddShape}
            // onInit={(editor) => { editorRef.current = editor; }}  // Capture editor instance when initialized
              />
              <button type="button" onClick={handleButtonClick}>
                Add green circle
            </button>
            </div>
          ) : (
            <Typography>No image selected</Typography>
          )}
          <Toolbar />
        </Box>

        <BannerSideSection />
      </Box>
    </>
  );
};

export default DesignOnline;
