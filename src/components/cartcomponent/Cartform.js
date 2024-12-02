import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Collapse,
  TableContainer,
} from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DifferenceOutlinedIcon from "@mui/icons-material/DifferenceOutlined";
import ArrowDropDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDropUpIcon from "@mui/icons-material/KeyboardArrowUp";

const initialCartItems = [
  {
    id: 1,
    title: "Plastic Sign",
    image: "https://picsum.photos/200/300",
    projectName: "Untitled Project",
    quantity: 1,
    price: 39.02,
    details: {
      size: '24" x 18"',
      description: [
        "Thickness: 13 oz Vinyl",
        "Printed Sides: Single Sided",
        "Edge Finish: Welded Hem",
        "Grommets: Every 2-3 ft",
        "Pole Pockets: None",
        "Accessories: None",
      ],
      tieredPricing: [
        { quantity: 2, pricePerItem: 36.28, discount: 7 },
        { quantity: 3, pricePerItem: 34.87, discount: 11 },
        { quantity: 4, pricePerItem: 33.45, discount: 14 },
      ],
    },
  },
  {
    id: 2,
    title: "Banner",
    image: "https://picsum.photos/200/300",
    projectName: "Untitled Project",
    quantity: 1,
    price: 58.03,
    details: {
      size: '72" x 36"',
      description: [
        "Thickness: 13 oz Vinyl",
        "Printed Sides: Single Sided",
        "Edge Finish: Welded Hem",
        "Grommets: Every 2-3 ft",
        "Pole Pockets: None",
        "Accessories: None",
      ],
      tieredPricing: [
        { quantity: 2, pricePerItem: 55.39, discount: 5 },
        { quantity: 3, pricePerItem: 53.75, discount: 7 },
        { quantity: 4, pricePerItem: 52.12, discount: 10 },
      ],
    },
  },
];

const products = [
  {
    title: "Yard Sign",
  },
  {
    title: "Aluminum Sign",
  },
  {
    title: "Plastic Sign",
  },
  {
    title: "Acrylic Sign",
  },
];

const ProductCard = ({ title }) => (
  <Box sx={{ textAlign: "center", width: "100%", height: "100%" }}>
    <Card
      sx={{
        width: "100%",
        maxWidth: "192px",
        height: "162px",
        boxShadow: "0 3px 6px #cfd4d9",
        position: "relative",
        padding: "20px",
      }}
    >
      <img
        src="https://images.unsplash.com/1/type-away-numero-dos.jpg?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="dummy"
        width="100%"
        height="100%"
        sx={{ maxWidth: "100%" }}
      />
    </Card>
    <Typography variant="body2" sx={{ mt: 2 }}>
      {title}
    </Typography>
  </Box>
);

const Cartform = () => {
  const [openDetails, setOpenDetails] = useState(true);
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleToggleDetails = (id) => {
    setOpenDetails((prevOpenDetails) => ({
      ...prevOpenDetails,
      [id]: !prevOpenDetails[id],
    }));
  };

  const handleQuantityChange = (id, event) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: event.target.value } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((itemId) => itemId !== id) : [...prevSelected, id]
    );
  };

  const handleRemoveItems = () => {
    const updatedCartItems = cartItems.filter((item) => !selectedItems.includes(item.id));
    setCartItems(updatedCartItems);
    setSelectedItems([]);
  };
  return (
    <>
      <Box container sx={{ margin: { sm: "60px", xs: "30px 15px" } }}>
        <Grid container>
          <Grid item lg={8} md={6} sm={12} xs={12}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                textAlign: "center",
                paddingLeft: "25px",
                gap: "30px",
                justifyContent: `${selectedItems.length > 0 ? "start" : "space-aroun"}`,
                //justifyContent:'space-around',
                display: "flex",
                fontSize: { xs: "24px", sm: "32px", lg: "40px" },
              }}
            >
              {selectedItems.length > 0 && (
                <Button
                  onClick={handleRemoveItems}
                  variant="contained"
                  sx={{
                    backgroundColor: "#3f5163",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#3f5163",
                      color: "white",
                    },

                    borderRadius: "10px",

                    padding: "6px 40px",
                  }}
                >
                  Remove Items
                </Button>
              )}
              Shopping Cart (1 Item)
            </Typography>
            <TableContainer
              sx={{
                maxWidth: "100%",
                overflowX: "auto", // Horizontal scroll for smaller screens
                "&::-webkit-scrollbar": {
                  height: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#555",
                },
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography>
                        {" "}
                        <Checkbox checked={selectedItems.length === cartItems.length} onChange={handleSelectAll} />
                        Item
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Details</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Quantity</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Price</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <React.Fragment key={item.id}>
                      <TableRow style={{ verticalAlign: "baseline" }}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", color: "gray" }}>
                            <Checkbox
                              checked={selectedItems.includes(item.id)}
                              onChange={() => handleSelectItem(item.id)}
                            />
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                              #{item.id}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              background: "#FBFBFA",
                              textAlign: "center",
                              width: "192px",
                              minHeight: "120px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                              padding: "16px 20px",
                              marginTop: "10px",
                              maxWidth: "100%",
                            }}
                          >
                            <img src={item.image} alt={item.title} style={{ maxWidth: "100%", maxHeight: "120px" }} />
                          </Box>

                          <Box sx={{ mt: 1 }}>
                            <Grid container spacing={1}>
                              <Grid item sx={{ display: "grid" }}>
                                <IconButton>
                                  <RemoveRedEyeOutlinedIcon fontSize="small" />
                                </IconButton>
                                <Typography variant="caption">View Proof</Typography>
                              </Grid>
                              <Grid item sx={{ display: "grid" }}>
                                <IconButton>
                                  <EditOutlinedIcon fontSize="small" />
                                </IconButton>
                                <Typography variant="caption">Edit Design</Typography>
                              </Grid>
                              <Grid item sx={{ display: "grid" }}>
                                <IconButton>
                                  <DifferenceOutlinedIcon fontSize="small" />
                                </IconButton>
                                <Typography variant="caption">Duplicate</Typography>
                              </Grid>
                              <Grid item sx={{ display: "grid" }}>
                                <IconButton>
                                  <DeleteForeverOutlinedIcon fontSize="small" />
                                </IconButton>
                                <Typography variant="caption">Remove</Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </TableCell>
                        <TableCell style={{ minWidth: "180px" }}>
                          <TextField value={item.projectName} variant="outlined" size="small" sx={{ mt: 1 }} />
                          <Typography>{item.title}</Typography>
                          <Typography>Size: {item.details.size}</Typography>
                          <Typography
                            onClick={() => handleToggleDetails(item.id)}
                            sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                          >
                            {openDetails[item.id] ? "Hide Details" : "Show Details"}
                            {openDetails[item.id] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                          </Typography>
                          <Collapse in={openDetails[item.id]}>
                            {item.details.description &&
                              item.details.description.map((desc, idx) => (
                                <Typography key={idx} variant="caption" display="block">
                                  {desc}
                                </Typography>
                              ))}
                          </Collapse>
                        </TableCell>
                        <TableCell style={{ minWidth: "200px" }}>
                          <TextField
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e)}
                            size="small"
                            sx={{ width: "50%" }}
                          />
                          <Box sx={{ mt: 1 }}>
                            {item.details.tieredPricing.map((tier, idx) => (
                              <Typography key={idx} variant="a" sx={{ color: "green", display: "block" }}>
                                {tier.quantity} for ${tier.pricePerItem} ea. Save {tier.discount}%
                              </Typography>
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ fontWeight: "600" }}>${item.price * item.quantity}</Typography>
                        </TableCell>
                      </TableRow>
                      {/*<TableCell colSpan={4}>
                          <Divider />
                        </TableCell>*/}
                      {/*<TableRow></TableRow>*/}
                    </React.Fragment>
                  ))}
                </TableBody>
                {/*<TableBody>
                  <TableRow sx={{ verticalAlign: "text-top" }}>
                    <TableCell>
                      <Typography>
                        {" "}
                        <Checkbox />
                        #1
                      </Typography>

                      <Box
                        sx={{
                          background: "#FBFBFA",
                          textAlign: "center",
                          width: "70%",
                          height: "100%",
                          padding: "16px 20px",
                          marginTop: "10px",
                        }}
                      >
                        <img src="https://picsum.photos/200/300" alt="dummy" width={60} height={100} />
                      </Box>
                      <Grid container spacing={1} sx={{ marginTop: "10px" }}>
                        <Grid item lg={3} md={3}>
                          <RemoveRedEyeOutlinedIcon sx={{ fontSize: "20px" }} />
                          <Typography sx={{ fontSize: "12px", color: "gray" }}>View Proof</Typography>
                        </Grid>
                        <Grid item lg={3} md={3}>
                          <EditOutlinedIcon sx={{ fontSize: "20px" }} />
                          <Typography sx={{ fontSize: "12px", color: "gray" }}>Edit Design</Typography>
                        </Grid>
                        <Grid item lg={3} md={3}>
                          <DifferenceOutlinedIcon sx={{ fontSize: "20px" }} />
                          <Typography sx={{ fontSize: "12px", color: "gray" }}>Duplicate Items</Typography>
                        </Grid>
                        <Grid item lg={3} md={3}>
                          <DeleteForeverOutlinedIcon sx={{ fontSize: "20px" }} />
                          <Typography sx={{ fontSize: "12px", color: "gray" }}>Remove</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <TextField />
                      <Box sx={{ marginTop: "10px" }}>
                        <Typography sx={{ color: "#333", fontWeight: "600" }}>Feather Flag Banner</Typography>
                        <Typography sx={{ marginTop: "10px" }}>Size: Small (24.25"x79.5")</Typography>

                        <Typography
                          sx={{
                            cursor: "pointer",
                            marginTop: 1,
                            color: "#333",
                            fontWeight: "600",
                          }}
                          onClick={handleToggleDetails}
                        >
                          {openDetails ? "Hide Details:" : "Show Details:"}
                        </Typography>

                        <Collapse in={openDetails}>
                          <Box sx={{ marginTop: 1 }}>
                            <Typography>Printed Sides: Single Sided</Typography>
                            <Typography>Poles: Pole Set</Typography>
                            <Typography>Base: Ground Stake</Typography>
                            <Typography>Accessories: No Carry Bag</Typography>
                            <Typography sx={{ marginTop: 2 }}>Ready to Ship: 1 Business Day</Typography>
                          </Box>
                        </Collapse>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <TextField sx={{ width: "50%" }} />
                      <Box sx={{ marginTop: "10px" }}>
                        <Typography sx={{ color: "#333", fontWeight: "600" }}>Buy More, Save More!</Typography>
                        <Typography
                          sx={{
                            marginTop: "10px",
                            "&:hover": {
                              textDecoration: "underline",
                              cursor: "pointer",
                            },
                          }}
                        >
                          3 for $138.75 ea. <span style={{ color: "#3f5163", fontWeight: "600" }}>Save 1%</span>
                        </Typography>
                        <Typography
                          sx={{
                            "&:hover": {
                              textDecoration: "underline",
                              cursor: "pointer",
                            },
                          }}
                        >
                          3 for $138.75 ea. <span style={{ color: "#3f5163", fontWeight: "600" }}>Save 1%</span>
                        </Typography>
                        <Typography
                          sx={{
                            "&:hover": {
                              textDecoration: "underline",
                              cursor: "pointer",
                            },
                          }}
                        >
                          3 for $138.75 ea. <span style={{ color: "#3f5163", fontWeight: "600" }}>Save 1%</span>
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: "#333", fontWeight: "600" }}>$100</TableCell>
                  </TableRow>
                </TableBody>*/}
              </Table>
            </TableContainer>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "20px",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <Typography>Design Another Sign</Typography>
              <Typography>View My Saved Designs</Typography>
              <Typography>View My Previous Orders</Typography>
            </Box>

            <Box sx={{ mt: 4, mb: 4, paddingX: "15px" }}>
              <Typography variant="h5" align="center" gutterBottom>
                Other Products You May Like
              </Typography>
              <Grid container spacing={2} justifyContent="center" sx={{ marginTop: "30px" }}>
                {products.map((product, index) => (
                  <Grid item xs={6} sm={6} md={3} key={index}>
                    <ProductCard title={product.title} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          <Grid item lg={4} md={6} sm={12} xs={12} sx={{ paddingX: "15px" }}>
            <Box sx={{ position: "sticky", top: "20px", zIndex: 10 }}>
              <Card
                sx={{
                  border: "1px solid #CFD4D9",
                  borderRadius: "15px",
                  padding: "24px",
                  height: "auto",
                }}
              >
                <Typography sx={{ color: "black", fontWeight: "500", fontSize: "2rem" }}>Your Cart Summary</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "30px",
                  }}
                >
                  <Typography>Product</Typography>
                  <Typography>Quantity</Typography>
                  <Typography>Price</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #e0e0e0",
                    borderTop: "1px solid #e0e0e0",
                    padding: "10px 0px 10px 0px",
                  }}
                >
                  <Typography>Feather Flag Ban...</Typography>
                  <Typography>1</Typography>
                  <Typography sx={{ color: "black", fontWeight: "600" }}>$150.33</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>Subtotal</Typography>
                  <Typography
                    sx={{
                      color: "#3f5163",
                      fontWeight: "600",
                      fontSize: "30px",
                    }}
                  >
                    $150.33
                  </Typography>
                </Box>
                <Typography>Your order qualifies for</Typography>
                <Typography sx={{ color: "#3FA9F5", fontWeight: "600" }}>Free Ground Shipping!</Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#3f5163",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#3f5163",
                      color: "white",
                    },
                    width: "100%",
                    borderRadius: "10px",
                    marginTop: "25px",
                    padding: "12px 40px",
                  }}
                >
                  Proceed To Checkout
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    color: "#3f5163",
                    border: "1.5px solid #3f5163",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "#3f5163",
                      border: "1px solid #3f5163",
                    },
                    width: "100%",
                    borderRadius: "10px",
                    marginTop: "15px",
                    padding: "6.5px 40px",
                  }}
                >
                  Continue Shopping
                </Button>
              </Card>
              <Box sx={{ marginTop: "20px", padding: "20px" }}>
                <Grid container>
                  <Grid item lg={9} md={6}>
                    <Typography sx={{ color: "gray", fontSize: "14px" }}>
                      "Your site is outstanding. So easy to navigate, personalize templates, and even download the
                      finished graphic to use as a .pdf. Thank you!"
                    </Typography>
                    <Typography sx={{ textAlign: "right", color: "gray" }}>-SARAN</Typography>
                  </Grid>
                  <Grid item lg={3} md={6}>
                    <img src="https://customer-review-api.signs.com/img/SA/badge.svg" alt="hello" />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Cartform;
