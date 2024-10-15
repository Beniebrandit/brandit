import React, { useState } from "react";
import { Box, TextField, InputAdornment, Typography, Grid, AppBar, Tabs, Tab } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
export default function OrderPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid container rowSpacing={1} sx={{ margin: "50px 0px" }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid size={4}>
        <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <TextField
            variant="outlined"
            placeholder="Order No. or Project Name"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "#3FA9F5" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "300px",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "block",
            padding: "30px 0px",
          }}
        >
          <AppBar
            position="static"
            color="transparent"
            elevation={0}
            sx={{ display: "block", width: "auto !important" }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="account tabs"
              textColor="primary"
              sx={{
                // flexGrow: 1,
                minWidth: 0,
                "& .MuiTabs-indicator": { display: "none" },
                " & .MuiTabs-flexContainer": { display: "block" },
              }} // ensure it shrinks properly
            >
              <Tab
                label={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    {" "}
                    Orders On Hold <strong>0</strong>
                  </div>
                }
                sx={{
                  fontSize: { xs: "14px", md: "16px" }, // responsive font size
                  border: "1px solid #CFD4D9",
                  textTransform: "capitalize",
                  width: "100%",
                  borderBottom: "none",
                  margin: "0 !important",
                  overflow: "hidden",
                  padding: "16px !important",
                  color: "#333",
                  fontSize: "16px",
                  borderRadius: 0,
                  fontWeight: 400,
                  "&.Mui-selected": {
                    backgroundColor: "#f3f3f3",
                    color: "#333",
                  },
                }}
              />
              <Tab
                label={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    Open Orders<strong>0</strong>
                  </div>
                }
                sx={{
                  fontSize: { xs: "14px", md: "16px" }, // responsive font size
                  border: "1px solid #CFD4D9",
                  textTransform: "capitalize",
                  width: "100%",
                  borderBottom: "none",
                  margin: "0 !important",
                  overflow: "hidden",
                  padding: "16px !important",
                  color: "#333",
                  display: "block",
                  fontSize: "16px",
                  borderRadius: 0,
                  fontWeight: 400,
                  "&.Mui-selected": {
                    backgroundColor: "#f3f3f3",
                    color: "#333",
                  },
                }}
              />
              <Tab
                label={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    All Orders <strong>0</strong>
                  </div>
                }
                sx={{
                  fontSize: { xs: "14px", md: "16px" }, // responsive font size
                  border: "1px solid #CFD4D9",
                  backgroundColor: "#fff !important",
                  textTransform: "capitalize",
                  width: "100%",
                  margin: "0 !important",
                  overflow: "hidden",
                  padding: "16px !important",
                  color: "#333",
                  fontSize: "16px",
                  borderRadius: 0,
                  display: "block",
                  fontWeight: 400,
                  "&.Mui-selected": {
                    backgroundColor: "#f3f3f3",
                    color: "#333",
                  },
                }}
              />
            </Tabs>
          </AppBar>
        </Box>
      </Grid>
      <Grid size={8}>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="body1">No saved designs available.</Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography variant="body1">No saved designs.</Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Typography variant="body1">No quotes found.</Typography>
        </TabPanel>
      </Grid>
    </Grid>
  );
}
