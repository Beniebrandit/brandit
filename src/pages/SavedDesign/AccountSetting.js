import React, { useState } from "react";
import { Box, TextField, InputAdornment, Typography, Grid, AppBar, Tabs, Tab, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function AccountSetting() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ margin: { xs: "20px 0px", md: "50px 0px" }, padding: "0px !important" }} // responsive margin
      >
        <Grid item xs={12} md={4} sx={{ padding: "0px" }}>
          <Box sx={{ padding: { xs: "20px 0px", md: "30px 0px" } }}>
            <AppBar
              position="static"
              color="transparent"
              elevation={0}
              sx={{ width: "100%", padding: "0px" }} // Ensure the AppBar is responsive
            >
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="account tabs"
                textColor="primary"
                variant="scrollable" // Makes the Tabs scrollable on smaller screens
                scrollButtons="auto"
                sx={{
                  borderBottom: "1px solid #CFD4D9",
                  padding: "0px !important",
                  "& .MuiTabs-indicator": { display: "none" },
                  "& .MuiTabs-flexContainer": { display: "block" },
                }}
              >
                {[
                  "Personal Information",
                  "Change Password",
                  "Address Book",
                  "Save Payment Methods",
                  "Tax Exempt Status",
                  "Email Preferences",
                  "Text Notifications",
                ].map((label, index) => (
                  <Tab
                    key={label}
                    label={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        {label}{" "}
                        <p>
                          <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
                        </p>
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
                      display: "block",
                      // padding: "16px !important",
                      color: "#333",
                      borderRadius: 0,
                      fontWeight: 400,
                      "&.Mui-selected": {
                        backgroundColor: "#f3f3f3",
                        color: "#333",
                      },
                    }}
                  />
                ))}
              </Tabs>
            </AppBar>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ p: 4, border: "1px solid #e0e0e0", borderRadius: 2, maxWidth: 600, margin: "0 auto" }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="First Name" defaultValue="Test" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Last Name" defaultValue="Rao" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Company Name" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    defaultValue="quelaurexouja-1926@yopmail.com"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Phone" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Ext." variant="outlined" size="small" />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3, px: 5, backgroundColor: "#cccccc", color: "#666666" }}
                disabled
              >
                Update
              </Button>
            </Box>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Typography variant="body1">No Ready Quotes.</Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Typography variant="body1">No On Hold Quotes.</Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <Typography variant="body1">No Ordered Quotes.</Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={4}>
            <Typography variant="body1">No Ordered Quotes.</Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={5}>
            <Typography variant="body1">No Ordered Quotes.</Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={6}>
            <Typography variant="body1">No Ordered Quotes.</Typography>
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
}
