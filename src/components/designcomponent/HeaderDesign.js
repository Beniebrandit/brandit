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
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import main_logo from "../../asset/images/main_logo.png";
import { ReactComponent as Help } from "../../asset/images/help.svg";
import { ReactComponent as Share } from "../../asset/images/share.svg";
import { ReactComponent as Save } from "../../asset/images/save.svg";
import { ReactComponent as Cart0 } from "../../asset/images/cart.svg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuIcon from "@mui/icons-material/Menu";
import ReCAPTCHA from "react-google-recaptcha";
import CloseIcon from "@mui/icons-material/Close";

const HeaderDesign = ({ handleClickOpenLogin }) => {
  const [File, setFile] = React.useState("");
  const [designhelpdialog, setdesignhelpdialog] = useState(false);
  const [fileUpload, setFileUpload] = useState(null); // State for file upload
  const [printedSides, setPrintedSides] = useState("");
  const [thickness, setThickness] = useState("");
  const [edgeFinish, setEdgeFinish] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  function helpDialogOpen() {
    setdesignhelpdialog(true);
  }
  function helpDialogClose() {
    setdesignhelpdialog(false);
  }

    const handleChangeFile = (event) => {
      setFile(event.target.value);
    };

    const handleFileUpload = (e) => {
      setFileUpload(e.target.files[0]); // Store selected file
    };


  const handleChangePrintedSides = (event) => {
    setPrintedSides(event.target.value);
  };

  const handleChangeThickness = (event) => {
    setThickness(event.target.value);
  };

  const handleChangeEdgeFinish = (event) => {
    setEdgeFinish(event.target.value);
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }

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
          <Box className="header_box" sx={{ paddingLeft: { xs: "1rem", sm: "5rem" } }}>
            <img alt="main_logo" src={main_logo} style={{ width: "50px", height: "auto" }} />
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
                  onChange={handleChangeFile}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                >
                  <MenuItem value={10} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography>Undo</Typography>
                    <Typography>Crtl+Z</Typography>
                  </MenuItem>
                  <MenuItem value={20} sx={{ display: "flex", justifyContent: "space-between" }}>
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
              <Button variant="body2" onClick={helpDialogOpen}>
                Get Design Help
              </Button>
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
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onClick={handleClickOpenLogin}
            >
              <Save sx={{ width: "20px", height: "auto" }} />
              <Typography variant="body2" style={{ textTransform: "none", color: "black" }}>
                Save
              </Typography>
            </Button>
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
          </Box>
          <Grid item xs={12} sm="auto" sx={{ display: { md: "none" } }}>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <List>
                <ListItem>
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
                </ListItem>
                <ListItem>
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
                </ListItem>
                <ListItem>
                  <Button
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginLeft: "-5px",
                    }}
                    onClick={handleClickOpenLogin}
                  >
                    <Save sx={{ width: "20px", height: "auto" }} />
                    <Typography style={{ textTransform: "none", color: "black", paddingLeft: "4px" }} variant="body2">
                      Save
                    </Typography>
                  </Button>
                </ListItem>
              </List>
            </Drawer>
          </Grid>
        </Box>
      </Box>

      <Dialog
        open={designhelpdialog}
        onClose={() => setdesignhelpdialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            padding: 4,
            background: "linear-gradient(135deg, #e0f7fa 30%, #80deea 100%)",
            borderRadius: "20px",
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={() => setdesignhelpdialog(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ padding: 3 }}>
          <Box sx={{ border: "1px solid #cfd4d9", width: "100%" }}>
            <Box
              sx={{
                borderBottom: "1px solid #cfd4d9",
                padding: "8px 16px",
                backgroundColor: "#f3f3f3",
                color: "#333",
                fontWeight: 400,
              }}
            >
              Design request details
            </Box>

            <Grid container sx={{ padding: "21px 32px" }}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Printed Sides</Typography>
                  <FormControl fullWidth required>
                    <Select value={printedSides} onChange={handleChangePrintedSides}>
                      <MenuItem value="single_sided">Single Sided</MenuItem>
                      <MenuItem value="double_sided">Double Sided</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Thickness</Typography>
                  <FormControl fullWidth required>
                    <Select value={thickness} onChange={handleChangeThickness}>
                      <MenuItem value="thin">Thin</MenuItem>
                      <MenuItem value="thick">Thick</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Edge Finish</Typography>
                  <FormControl fullWidth required>
                    <Select value={edgeFinish} onChange={handleChangeEdgeFinish}>
                      <MenuItem value="glossy">Glossy</MenuItem>
                      <MenuItem value="matte">Matte</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12} md={6} sx={{ paddingLeft: "30px" }}>
                <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>File Upload</Typography>
                <Box sx={{ mt: 3 }}>
                  <input type="file" onChange={handleFileUpload} />
                  {fileUpload && <Typography>Uploaded file: {fileUpload.name}</Typography>}
                </Box>

                <Box sx={{ background: "#f4fde8", padding: "20px", mt: 2 }}>
                  <Typography sx={{ color: "#8CC53F", fontSize: "30px", fontWeight: "500" }}>$10.00</Typography>
                  <Typography>Applied as a full credit to your product order.</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <ReCAPTCHA sitekey="Your client site key" onChange={onChange} />
          </Box>

          <Button
            sx={{
              border: "1px solid #8CC53F",
              color: "#fff",
              background: "#8CC53F",
              cursor: "pointer",
              fontWeight: "600",
              mt: 3,
              width: "35%",
              display: "block",
              margin: "0 auto",
            }}
          >
            Continue to Cart
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeaderDesign;
