import React, { useState } from "react";
import { Box, Button, Divider, Drawer, Grid, IconButton, List, ListItem, TextField, Typography } from "@mui/material";
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
import LoginModal from "./LoginModal";

const HeaderDesign = ({ handleClickOpenLogin }) => {
  const [File, setFile] = React.useState("");
  //const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setFile(event.target.value);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  //const handleClickOpenLogin = () => {
  //  setOpen(true);
  //};

  //const handleClose = () => {
  //  setOpen(false);
  //};
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
                  onChange={handleChange}
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

      {/*<LoginModal handleClose={handleClose} open={open} setOpen={setOpen} />*/}
    </>
  );
};

export default HeaderDesign;
