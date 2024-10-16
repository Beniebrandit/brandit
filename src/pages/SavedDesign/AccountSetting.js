import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Button,
  Card,
  CardContent,
  IconButton,
  Input,
  Pagination,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function AccountSetting() {
  const addressList = [
    {
      name: "John Doe",
      address: "1234 Elm St, Springfield, IL 62704",
      country: "United States",
      phone: "(555) 555-5555",
    },
    {
      name: "Jane Smith",
      address: "5678 Oak St, Springfield, IL 62704",
      country: "United States",
      phone: "(555) 555-5556",
    },
    {
      name: "Alex Brown",
      address: "7890 Maple St, Springfield, IL 62704",
      country: "United States",
      phone: "(555) 555-5557",
    },
  ];

  const [page, setPage] = useState(1);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const addressesPerPage = 2;
  const totalPages = Math.ceil(addressList.length / addressesPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedAddresses = addressList.slice((page - 1) * addressesPerPage, page * addressesPerPage);

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
                  "Reset Password",
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
            <Box sx={{ p: 4, border: "1px solid #e0e0e0", borderRadius: 2, maxWidth: 600, margin: "0 auto" }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Reset Password
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Current Password" type="password" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="New Password" type="password" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Confirm New Password" type="password" variant="outlined" size="small" />
                </Grid>
              </Grid>
              <Button variant="contained" sx={{ mt: 3, px: 5 }} color="primary">
                Update
              </Button>
            </Box>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ p: 2 }}>
              <Button variant="contained" sx={{ mb: 2, backgroundColor: "#4CAF50", color: "#fff" }}>
                Add New Address
              </Button>
              {paginatedAddresses.map((address, index) => (
                <Card key={index} sx={{ mb: 2, border: "1px solid #e0e0e0" }}>
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {address.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {address.address}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {address.country}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Phone: {address.phone}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                      <Button variant="contained" color="primary" sx={{ backgroundColor: "#4CAF50" }}>
                        Edit
                      </Button>
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}

              {/* Pagination Controls */}
              <Grid container justifyContent="center">
                <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" sx={{ mt: 2 }} />
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <Box sx={{ p: 4, border: "1px solid #e0e0e0", borderRadius: 2, maxWidth: 600, margin: "0 auto" }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Save Payment Methods
              </Typography>
              <Typography variant="h8">Add New Payment Methods at Checkout.</Typography>
            </Box>
          </TabPanel>
          <TabPanel value={tabValue} index={4}>
            <Box sx={{ p: 4, border: "1px solid #e0e0e0", borderRadius: 2, maxWidth: 600, margin: "0 auto" }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Tax Exempt Status
              </Typography>
              <Typography variant="h8">Tax Exemption Requests Status</Typography>
              <br></br>
              <Button variant="contained" sx={{ mt: 3, px: 5 }} color="primary">
                Request Tax Exemption
              </Button>
            </Box>
          </TabPanel>
          <TabPanel value={tabValue} index={5}>
            <Box sx={{ p: 4, border: "1px solid #e0e0e0", borderRadius: 2, maxWidth: 600, margin: "0 auto" }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Email Preferences
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Input type="checkbox" />
                &nbsp;&nbsp;
                <Typography>Receive special offers & promos from Signs</Typography>
              </Box>
              <br></br>
            </Box>
          </TabPanel>
          <TabPanel value={tabValue} index={6}>
            <Box sx={{ p: 4, border: "1px solid #e0e0e0", borderRadius: 2, maxWidth: 600, margin: "0 auto" }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Text Notifications
              </Typography>
              <Typography>
                You are not signed up to receive text notifications about the status of your orders.
              </Typography>
              <Typography>You will have the opportunity to sign up when you place your next order.</Typography>
            </Box>
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
}
