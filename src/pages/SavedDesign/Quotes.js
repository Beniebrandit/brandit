import React, { useState } from "react";
import { Box, TextField, InputAdornment, Typography, Grid, AppBar, Tabs, Tab } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function Quotes() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Stack sx={{ width: "100%" }} spacing={2} style={{ borderColor: "#3FA9F5", background: "#FBFBFA" }}>
        <Alert
          icon={<HelpIcon style={{ color: "#006DB6" }} />}
          variant="outlined"
          severity="info"
          style={{ color: "#006DB6", fontSize: "16px", fontWeight: 600 }}
        >
          Alert info
          <p style={{ fontSize: "14px", fontWeight: 400, marginTop: "8px", color: "#006DB" }}>
            To request a custom quote, please contact us or give us a call at <strong> 1-888-222-4929</strong>
          </p>
        </Alert>
      </Stack>
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
                {["All Quotes", "Ready", "On Hold", "Ordered"].map((label, index) => (
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
                        {label} <p>0 Quotes</p>
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
            <Typography variant="body1">No Quotes.</Typography>
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
        </Grid>
      </Grid>
    </>
  );
}
