import React, { useState, useEffect } from "react";
import LoginDialog from "../../components/common/LoginDialog";
import CreateAccountDialog from "../../components/common/CreateAccountDialog";
import Navbar from "../../components/landingcomponent/Navbar/Navbar";
import { DesignServiceFooter } from "../../components/designservice/DesignServiceFooter";
import Brandit_image from "../../asset/images/Brandit.png";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  Grid,
  Checkbox,
  CardContent,
  Button,
  Pagination,
  Card,
  Link,
  Container,
} from "@mui/material";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import OrderPage from "./OrderPage";
import Quotes from "./Quotes";
import AccountSetting from "./AccountSetting";
// Sample data array
const savedDesigns = [
  {
    id: 1,
    image: Brandit_image,
    title: 'Feather Flag Banner Small (24.25"x79.5")',
    sides: "Single Sided",
    poles: "Pole Set",
    base: "Ground Stake",
    accessories: "No Carry Bag",
  },
  {
    id: 2,
    image: Brandit_image,
    title: 'Rectangle Flag Banner (30"x90")',
    sides: "Double Sided",
    poles: "Pole Set",
    base: "Water Base",
    accessories: "Carry Bag Included",
  },
  // Add more design objects here...
];

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

// Pagination button styling
const PaginationButton = styled('button')(({ theme, selected }) => ({
  border: selected ? '1px solid #ccc' : '1px solid #eee',
  backgroundColor: selected ? '#e7eaf3' : '#fff',
  color: '#333',
  cursor: 'pointer',
  padding: '10px 15px',
  // margin: '0 5px',
  minWidth: '40px',
  minHeight: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
  },
}));

// Tab Panel Component
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}


const SavedDesign = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);

  const itemsPerPage = 1; // Example: 5 items per page

  const handleClickOpenLogin = () => {
    setLoginOpen(true);
    setOpenSignUp(false);
  };
  const handleCloseLogin = () => setLoginOpen(false);

  const handleClickOpenSignUp = () => {
    setOpenSignUp(true);
    setLoginOpen(false);
  };

  const handleCloseSignUp = () => setOpenSignUp(false);

  const fetchUserData = async (token) => {
    if (!token) {
      console.warn("Token is null or undefined, skipping fetch.");
      return; // Exit the function if the token is null
    }

    console.log("Fetching user data from: https://flagg.devlopix.com/api/user");

    try {
      const response = await fetch("https://flagg.devlopix.com/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch user data:", response.status);
        return;
      }

      const data = await response.json();
      setCurrentUser(data.name);
      localStorage.setItem("currentUser", data.name);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) {
      setCurrentUser(storedUser);
    } else {
      // Open login dialog if no current user is found
      setLoginOpen(true);
    }

    if (token) {
      fetchUserData(token);
    }
  }, []);

  // Pagination hook
  const { items } = usePagination({
    count: Math.ceil(savedDesigns.length / itemsPerPage),
    page,
    onChange: (event, value) => {
      setPage(value);
    },
  });

  // Sliced data for current page
  const paginatedDesigns = savedDesigns.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  // Handle Tab Change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <Navbar handleClickOpenSignUp={handleClickOpenSignUp} handleClickOpenLogin={handleClickOpenLogin} />
      {currentUser && (
        <>
          <h1 style={{ textAlign: "center" }}>Welcome, {currentUser || "Guest"}</h1>
          <Container>
            <Box>
              {/* Page Title */}
              <Typography variant="h4" align="center" gutterBottom>
                My Account
              </Typography>

              {/* Tabs */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "space-between" }, // center on small screens, space-between on larger
                  alignItems: "center",
                  flexWrap: { xs: "wrap", md: "nowrap" }, // wrap on smaller screens
                  borderBottom: "1px solid lightgray",
                  padding: "0 0px", // add some padding for better responsiveness
                }}
              >
                <AppBar
                  position="static"
                  color="transparent"
                  elevation={0}
                  sx={{ flexGrow: 1, width: "auto !important" }}
                >
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="account tabs"
                    textColor="primary"
                    sx={{
                      flexGrow: 1,
                      minWidth: 0,
                      display: "flex",
                      "& .MuiTabs-indicator": { display: "none" },
                    }} // ensure it shrinks properly
                  >
                    <Tab
                      label="Orders & Design Requests"
                      sx={{
                        fontSize: { xs: "14px", md: "16px" }, // responsive font size
                        color: "#3FA9F5",
                        textTransform: "capitalize",
                        border: "1px solid #CFD4D9",
                        borderRadius: "4px 4px 0px 0px",
                        minWidth: "200px",
                        padding: "10.5px 12px !important",
                        lineHeight: "19px",
                        marginRight: "10px",
                        fontWeight: 600,
                        "&.Mui-selected": {
                          color: "#333",
                        },
                      }}
                    />
                    <Tab
                      label="Saved Designs"
                      sx={{
                        fontSize: { xs: "14px", md: "16px" },
                        color: "#3FA9F5",
                        textTransform: "capitalize",
                        border: "1px solid #CFD4D9",
                        borderRadius: "4px 4px 0px 0px",
                        minWidth: "200px",
                        padding: "10.5px 12px !important",
                        lineHeight: "19px",
                        marginRight: "10px",
                        fontWeight: 600,
                        "&.Mui-selected": {
                          color: "#333",
                        },
                      }}
                    />
                    <Tab
                      label="Quotes"
                      sx={{
                        fontSize: { xs: "14px", md: "16px" },
                        color: "#3FA9F5",
                        textTransform: "capitalize",
                        border: "1px solid #CFD4D9",
                        borderRadius: "4px 4px 0px 0px",
                        minWidth: "200px",
                        padding: "10.5px 12px !important",
                        lineHeight: "19px",
                        marginRight: "10px",
                        fontWeight: 600,
                        "&.Mui-selected": {
                          color: "#333",
                        },
                      }}
                    />
                    <Tab
                      label="Account Settings"
                      sx={{
                        fontSize: { xs: "14px", md: "16px" },
                        color: "#3FA9F5",
                        textTransform: "capitalize",
                        border: "1px solid #CFD4D9",
                        borderRadius: "4px 4px 0px 0px",
                        minWidth: "200px",
                        padding: "10.5px 12px !important",
                        lineHeight: "19px",
                        fontWeight: 600,
                        "&.Mui-selected": {
                          color: "#333",
                        },
                      }}
                    />
                  </Tabs>
                </AppBar>

                {/* Create new design link on the right */}
                <Link
                  href="/design"
                  sx={{
                    color: "#3FA9F5",
                    textDecoration: "none",
                    fontSize: { xs: "14px", md: "16px" }, // responsive font size
                    marginTop: { xs: "10px", md: "0" }, // push it down in smaller screens
                    textAlign: { xs: "center", md: "right" }, // center text on small screens
                    width: { xs: "100%", md: "auto" }, // make it full width on small screens
                  }}
                >
                  + Create a new design
                </Link>
              </Box>

              {/* Tab Content */}
              <TabPanel value={tabValue} index={1}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ textAlign: "right" }}>
                          {" "}
                          <Checkbox />
                        </TableCell>
                        <TableCell style={{ fontSize: "20px", color: "#333", fontWeight: "400" }}>Products</TableCell>
                        <TableCell style={{ fontSize: "20px", color: "#333", fontWeight: "400" }}>
                          Description
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {/* Dynamically Render Table Rows */}
                      {paginatedDesigns?.map((design) => (
                        <TableRow key={design.id}>
                          <TableCell style={{ textAlign: "right" }}>
                            <Box display="flex" flexDirection="column">
                              <Checkbox style={{ display: "flex", justifyContent: "right" }} />
                              <Box mt={1}>
                                <Typography color="#3FA9F5" sx={{ fontWeight: 600 }} component="p">
                                  View Proof
                                </Typography>
                                <Typography color="#3FA9F5" component="p" sx={{ fontWeight: 600 }}>
                                  Remove
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>

                          {/* Product Image Column */}
                          <TableCell style={{ flex: "0 0 320px", marginRight: "24px" }}>
                            <Grid
                              style={{
                                backgroundColor: "#fbfbfa",
                                margin: "0 auto",
                                width: "320px",
                                padding: "16px 20px",
                                textAlign: "center",
                              }}
                            >
                              <img
                                src={design.image}
                                alt="Product Image"
                                style={{
                                  boxShadow: "0 3px 6px #15161733",
                                  maxWidth: "100%",
                                  height: "auto",
                                  width: "auto",
                                  maxHeight: "200px",
                                }} // Set fixed image width
                              />
                            </Grid>
                          </TableCell>

                          {/* Product Description Column */}
                          <TableCell>
                            <CardContent>
                              <Typography variant="h6">{design.title}</Typography>
                              <Typography variant="body2">Printed Sides: {design.sides}</Typography>
                              <Typography variant="body2">Poles: {design.poles}</Typography>
                              <Typography variant="body2">Base: {design.base}</Typography>
                              <Typography variant="body2">Accessories: {design.accessories}</Typography>
                            </CardContent>
                          </TableCell>

                          {/* Product Actions Column */}
                          <TableCell>
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="flex-start"
                              style={{ flex: "1 0 156px" }}
                            >
                              <Button
                                variant="contained"
                                color="success"
                                style={{
                                  lineHeight: "16px",
                                  textTransform: "capitalize",
                                  display: "block",
                                  textAlign: "center",
                                  marginBottom: "16px",
                                  textDecoration: "none",
                                  padding: "13.5px 5px",
                                  borderadRius: "10px",
                                  border: "1px solid #8CC53F",
                                  color: " #fff",
                                  backgroundColor: " #8CC53F",
                                  cursor: "pointer",
                                  minWidth: "150px",
                                  minHeight: "48px",
                                  fontWeight: 600,
                                }}
                                // style={{ marginBottom: "10px" }}
                              >
                                Add to Cart
                              </Button>
                              <Button
                                variant="outlined"
                                style={{
                                  textTransform: "capitalize",
                                  lineHeight: "16px",
                                  display: "block",
                                  textAlign: "center",
                                  marginBottom: "16px",
                                  textDecoration: "none",
                                  padding: "13.5px 5px",
                                  borderadRius: "10px",
                                  border: "1px solid #8CC53F",
                                  color: " #8CC53F",
                                  cursor: "pointer",
                                  minWidth: "150px",
                                  minHeight: "48px",
                                  fontWeight: 600,
                                }}
                              >
                                Edit Design
                              </Button>
                              <Button
                                variant="outlined"
                                style={{
                                  textTransform: "capitalize",
                                  lineHeight: "16px",
                                  display: "block",
                                  textAlign: "center",
                                  marginBottom: "16px",
                                  textDecoration: "none",
                                  padding: "13.5px 2px",
                                  borderadRius: "10px",
                                  border: "1px solid #8CC53F",
                                  color: " #8CC53F",
                                  cursor: "pointer",
                                  minWidth: "150px",
                                  minHeight: "48px",
                                  fontWeight: "600",
                                }}
                              >
                                Duplicate & Modify
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <Box display="flex" justifyContent="center" mt={3}>
                    <nav>
                      <List>
                        {items.map(({ page, type, selected, ...item }, index) => {
                          let children = null;

                          if (type === "start-ellipsis" || type === "end-ellipsis") {
                            children = "…";
                          } else if (type === "page") {
                            children = (
                              <PaginationButton type="button" selected={selected} {...item}>
                                {page}
                              </PaginationButton>
                            );
                          } else {
                            children = (
                              <PaginationButton
                                style={{ borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}
                                type="button"
                                {...item}
                              >
                                {type === "previous" ? "<<" : ">>"}
                              </PaginationButton>
                            );
                          }

                          return <li key={index}>{children}</li>;
                        })}
                      </List>
                    </nav>
                  </Box>
                </TableContainer>
              </TabPanel>

              <TabPanel value={tabValue} index={0}>
                <OrderPage />
                {/* <Typography variant="body1">No saved designs available.</Typography> */}
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <Quotes />
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <AccountSetting />
              </TabPanel>
            </Box>
          </Container>
        </>
      )}
      {/*<button onClick={handleClickOpenLogin}>Login</button>
      <button onClick={handleClickOpenSignUp}>Sign Up</button>*/}

      <LoginDialog
        open={loginOpen}
        handleClose={handleCloseLogin}
        handleOpenSignUp={handleClickOpenSignUp}
        fetchUserData={fetchUserData}
      />
      <CreateAccountDialog
        open={openSignUp}
        handleClose={handleCloseSignUp}
        setCurrentUser={setCurrentUser}
        handleOpenLogin={handleClickOpenLogin}
      />
      <DesignServiceFooter />
    </div>
  );
};

export default SavedDesign;
