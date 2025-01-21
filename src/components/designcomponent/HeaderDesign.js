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
  ListItemText,
  ListItemIcon,
  Menu,
} from "@mui/material";
import main_logo from "../../asset/images/main_logo.png";
import { ReactComponent as Help } from "../../asset/images/help.svg";
import { ReactComponent as Share } from "../../asset/images/share.svg";
import { ReactComponent as Save } from "../../asset/images/save.svg";
import { ReactComponent as Cart0 } from "../../asset/images/cart.svg";
import InputLabel from "@mui/material/InputLabel";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuIcon from "@mui/icons-material/Menu";
import ReCAPTCHA from "react-google-recaptcha";
import CloseIcon from "@mui/icons-material/Close";
import cart from '../../asset/images/design_cart.svg'
import { Link } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";

const HeaderDesign = ({ handleClickOpenLogin }) => {
  const [File, setFile] = React.useState("");
  const [designhelpdialog, setdesignhelpdialog] = useState(false);
  const [fileUpload, setFileUpload] = useState(null); // State for file upload
  const [signtype, setSigntype] = useState("Banner");
  const [printedSides, setPrintedSides] = useState("Single Sided");
  const [thickness, setThickness] = useState("Thin");
  const [edgeFinish, setEdgeFinish] = useState("None(Flush Cut)");
  const [grommets, setgrommets] = useState("Every 2-3 ft");
  const [polepockets, setpolepockets] = useState("None");
  const [accessories, setaccessories] = useState("None");
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItems, setSelectedItems] = useState({
    "Show ruler": true,
    "Show grid": true,
  });

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleChangeFile = (event) => {
    setFile(event.target.value);
  };

  function helpDialogOpen() {
    setdesignhelpdialog(true);
  }

  const handleFileUpload = (e) => {
    setFileUpload(e.target.files[0]); // Store selected file
  };

  const handleChangeSignType = (event) => {
    setSigntype(event.target.value);
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

  const handleChangeGrommets = (event) => {
    setgrommets(event.target.value);
  };

  const handleChangePolePockets = (event) => {
    setpolepockets(event.target.value);
  };

  const handleChangeAccessories = (event) => {
    setaccessories(event.target.value);
  };

  const widthChange = (event) => {
    setWidth(event.target.value);
  };
  const heightchange = (event) => {
    setHeight(event.target.value);
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }
  return (
    <>
      <Box
        sx={{
          borderBottom: "1px solid lightgray",
          position: "fixed",
          width: "100%",
          paddingTop: "10px",
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          zIndex: "3",
        }}
      >
        {/* <Box
          // maxWidth="lg"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginX: "10rem",
          }}
        > */}
        <Box className="header_box" sx={{ paddingLeft: { xs: "1rem", sm: "5rem" } }}>
          <Link to="/">
            <img alt="logo" src={main_logo} style={{ width: "50%", height: "auto", maxWidth: "200px" }} />
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            width: { sm: "auto", xl: "50rem" }
          }}
        >
          <Box>
            <Button
              onClick={handleClick}
              endIcon={<ExpandMoreIcon />}
              sx={{
                textTransform: "none",
                color: "black",
                // border: "1px solid #ddd",
                // padding: "6px 12px",
                minWidth: "100px",
              }}
            >
              File
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                sx: { width: 200 },
              }}
            >
              <MenuItem sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Undo</Typography>
                <Typography>Ctrl+Z</Typography>
              </MenuItem>
              <MenuItem sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Redo</Typography>
                <Typography>Ctrl+Y</Typography>
              </MenuItem>
              <Divider />
              <MenuItem>Save</MenuItem>
              <MenuItem>Save as copy</MenuItem>
              <MenuItem>Load previous design</MenuItem>
              <Divider />
              <MenuItem
                onClick={() => handleToggle("Show ruler")}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <ListItemText>Show ruler</ListItemText>
                {selectedItems["Show ruler"] && (
                  <ListItemIcon>
                    <CheckIcon fontSize="small" />
                  </ListItemIcon>
                )}
              </MenuItem>
              <MenuItem
                onClick={() => handleToggle("Show grid")}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <ListItemText>Show grid</ListItemText>
                {selectedItems["Show grid"] && (
                  <ListItemIcon>
                    <CheckIcon fontSize="small" />
                  </ListItemIcon>
                )}
              </MenuItem>
            </Menu>
          </Box>

          <Box className="search" sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              variant="outlined"
              placeholder="Name this Design"
              sx={{
                backgroundColor: "transparent",
                boxShadow: "0px 5px 30px -15px",
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
                borderRadius: "7px",
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
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            onClick={helpDialogOpen}
          >
            <Help sx={{ width: "20px", height: "auto" }} />
            <Typography variant="body2" style={{ textTransform: "none", color: "#3F5163", fontSize: "14px" }}>
              Get Design Help
            </Typography>
          </Button>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Share sx={{ width: "20px", height: "auto" }} />
            <Typography variant="body2" sx={{ color: "#3F5163", fontSize: "14px" }}>
              Share
            </Typography>
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
            <Typography variant="body2" style={{ textTransform: "none", color: "#3F5163", fontSize: "14px" }}>
              Save
            </Typography>
          </Button>
          <Button sx={{ height: "50px", width: "50px" }}>
            <img src={cart} alt="cart" width="100%" height="100%" />
          </Button>
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
        {/* </Box> */}
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
          <Grid container spacing={3}>
            {["First Name", "Last Name", "Email", "Phone Number"].map((label, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Typography>{label}*</Typography>
                <Box sx={{ mt: 2 }}>
                  <TextField fullWidth />
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ border: "1px solid #cfd4d9", width: "100%", mt: 4 }}>
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
                <Box sx={{}}>
                  <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Sign Type</Typography>
                  <FormControl fullWidth required>
                    <Select value={signtype} onChange={handleChangeSignType}>
                      <MenuItem value="Banner">Banner</MenuItem>
                      <MenuItem value="Aluminum sign">Aluminum sign</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Printed Sides</Typography>
                  <FormControl fullWidth required>
                    <Select value={printedSides} onChange={handleChangePrintedSides}>
                      <MenuItem value="Single Sided">Single Sided</MenuItem>
                      <MenuItem value="Double Sided">Double Sided</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Thickness</Typography>
                  <FormControl fullWidth required>
                    <Select value={thickness} onChange={handleChangeThickness}>
                      <MenuItem value="Thin">Thin</MenuItem>
                      <MenuItem value="Thick">Thick</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Edge Finish</Typography>
                  <FormControl fullWidth required>
                    <Select value={edgeFinish} onChange={handleChangeEdgeFinish}>
                      <MenuItem value="Welded Hem">Welded Hem</MenuItem>
                      <MenuItem value="Sewn Hem">Sewn Hem</MenuItem>
                      <MenuItem value="None(Flush Cut)">{"None(Flush Cut)"}</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Grommets</Typography>
                  <FormControl fullWidth required>
                    <Select value={grommets} onChange={handleChangeGrommets}>
                      <MenuItem value="Every 2-3 ft">Every 2-3 ft</MenuItem>
                      <MenuItem value="4 Corners">4 Corners</MenuItem>
                      <MenuItem value="top Corners">top Corners</MenuItem>
                      <MenuItem value="None">None</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Pole Pockets</Typography>
                  <FormControl fullWidth required>
                    <Select value={polepockets} onChange={handleChangePolePockets}>
                      <MenuItem value="None">None</MenuItem>
                      <MenuItem value={`3" Pockets{"(Top & Bottom)"}`}>3" Pockets{"(Top & Bottom)"}</MenuItem>
                      <MenuItem value={`3" Pockets{"(Top Only)"}`}>3" Pockets{"(Top Only)"}</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Accessories</Typography>
                  <FormControl fullWidth required>
                    <Select value={accessories} onChange={handleChangeAccessories}>
                      <MenuItem value="None">None</MenuItem>
                      <MenuItem value={`Bungees(8)`}>{"Bungees(8)"}</MenuItem>
                      <MenuItem value={`Bungees(8)`}>{"Bungees(8)"}</MenuItem>
                      <MenuItem value={`Zip Ties(10)`}>{"Zip Ties(10)"}</MenuItem>
                      <MenuItem value={`10ft Nylone Rope(4)`}>{"10ft Nylone Rope(4)"}</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12} md={6} sx={{ paddingLeft: "30px" }}>
                <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>Size</Typography>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>W</Typography>
                    <FormControl sx={{ minWidth: 70 }}>
                      <Select value={width} onChange={widthChange}>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="20">20</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  &nbsp;&nbsp;&nbsp;
                  <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>H</Typography>
                    <FormControl sx={{ minWidth: 70 }}>
                      <Select value={height} onChange={heightchange}>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="20">20</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>

                {/* Optional Details */}
                <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px", mt: 3 }}>
                  Design Details{"(Optional)"}
                </Typography>
                {["Text", "Color", "Other details for your design"].map((label, index) => (
                  <Box sx={{ mt: 3 }} key={index}>
                    <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>{label}</Typography>
                    <TextField placeholder={`Enter ${label.toLowerCase()}`} multiline rows={4} fullWidth />
                  </Box>
                ))}
                <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>File Upload</Typography>
                <Box sx={{ mt: 3 }}>
                  <input type="file" onChange={handleFileUpload} />
                  {fileUpload && (
                    <Typography sx={{ color: "#333", fontWeight: 700, fontSize: "16px" }}>
                      Uploaded file: {fileUpload.name}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ background: "#f4fde8", padding: "20px", mt: 2 }}>
                  <Typography sx={{ color: "#8CC53F", fontSize: "30px", fontWeight: "500" }}>$10.00</Typography>
                  <Typography>Applied as a full credit to your product order.</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Button sx={{ mt: 2 }}>+ Request another design item</Button>

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
