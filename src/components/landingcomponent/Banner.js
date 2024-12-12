import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  ListSubheader,
} from "@mui/material";
import banner1 from "../../asset/images/banner1.jpg";
import MaskGroup from "../../asset/images/Mask Group.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useEffect, useMemo, useRef, useState } from "react";
import PopUp from "./Pop_Up";
import Navbar from "./Navbar/Navbar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ProductService } from "../../services/Product.service";
import { ProductCategoryService } from "../../services/ProductCategory.service";
import SearchIcon from "@mui/icons-material/Search";
import { Card, Grid } from "@mui/material";

const allOptions = ["Option One", "Option Two", "Option Three", "Option Four"];

const optionsData = [
  {
    title: "Printed Sides",
    key: "printedSides",
    defaultValue: "Single Sided",
    options: ["Single Sided", "Double Sided", "Double Sided1", "Double Sided2"],
  },
  {
    title: "Grommets",
    key: "grommets",
    defaultValue: "Every 2-3 ft",
    options: ["Every 2-3 ft", "Every 4-5 ft"],
  },
  {
    title: "Accessories",
    key: "accessories",
    defaultValue: "None",
    options: ["None", "Ropes"],
  },
  {
    title: "Edge Finish",
    key: "edgeFinish",
    defaultValue: "Welded Hem",
    options: ["Welded Hem", "Stitched Hem"],
  },
  {
    title: "Pole Pockets",
    key: "polePockets",
    defaultValue: "None",
    options: ["None", "With Pockets"],
  },
];

const Banner = ({ handleClickOpenLogin, handleClickOpenSignUp, setPricePerProduct, pricePerProduct }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [count, setCount] = useState(1);
  const [value, setValue] = useState(0);
  const [alldata, setAllData] = useState();
  const [selectedCard, setSelectedCard] = useState({});

  const [selectedWidth, setSelectedWidth] = useState("");
  const [selectedHeight, setSelectedHeight] = useState("");
  const [selectedSubCatId, setSelectedSubCatId] = useState([]);
  const [price, setPrice] = useState();
  const [rating, setRating] = useState();
  const [allcategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [searchText, setSearchText] = useState("");
  const [productSize, setProductSize] = useState();
  const [productDetails, setProductDetails] = useState([]);
  const [productId, setProductId] = useState();
  const [isPayloadReady, setIsPayloadReady] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const [activeOptionKey, setActiveOptionKey] = useState(null);
  const [selectedValues, setSelectedValues] = useState(
    optionsData.reduce((acc, option) => {
      acc[option.key] = option.defaultValue;
      return acc;
    }, {})
  );

  const toggleOptions = () => setShowOptions(!showOptions);

  const handleCardClick = (categoryId, subCat) => {
    setSelectedCard((prevSelectedCards) => {
      const updatedCards = { ...prevSelectedCards, [categoryId]: subCat.id };
      const subCatIdsArray = Object.values(updatedCards).filter((value) => value !== undefined);
      setSelectedSubCatId(subCatIdsArray);
      console.log("selectedSubCatId", selectedSubCatId);
      return updatedCards;
    });
  };

  const handleopenCard = (key) => {
    setActiveOptionKey((prevKey) => (prevKey === key ? null : key));
  };

  const filteredCategories = useMemo(() => {
    return allcategories.filter((option) => option?.name.toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText, allcategories]);

  useEffect(() => {
    if (filteredCategories?.length > 0) {
      getProductDetails(filteredCategories[0]?.id);
      setSelectedCategory(filteredCategories[0]?.name);
    }
  }, [filteredCategories]);

  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
    setSearchText(""); // Clear search text after selection
  };

  const [payload, setPayload] = useState({
    productId: null, // Assuming `id` is the unique identifier for the product
    width: "",
    height: "",
    subCatId: [],
  });

  const widthSizes = productDetails
    ?.filter((val) => val.size_type === "W")
    ?.map((val) => ({ size: val.size, id: val.id }));

  const heightSizes = productDetails
    ?.filter((val) => val.size_type === "H")
    ?.map((val) => ({ size: val.size, id: val.id }));

  const [state, setState] = useState({
    size: "",
  });

  const combinedSizes = widthSizes?.map((width, index) => ({
    size: `${width.size} x ${heightSizes?.[index]?.size || ""}`,
    id: width.id,
  }));

  useEffect(() => {
    if (productDetails) {
      const firstSize = `${widthSizes?.[0]?.size || ""} x ${heightSizes?.[0]?.size || ""}`;

      setState({ size: firstSize });
    }
  }, [productDetails]);

  const handleChange = async (e) => {
    const { value } = e.target;

    setState({ size: value });

    const [width, height] = value.split(" x ").map(Number); // Extract width and height from the size string

    // Check if the width and height are valid
    if (width && height && productId && count) {
      setSelectedWidth(width);
      setSelectedHeight(height);

      // Prepare the payload
      const newPayload = {
        width: width,
        height: height,
        subCatId: selectedSubCatId,
        ProductId: productId,
        quantity: count,
      };
      setPayload(newPayload);
    }
  };

  const quantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setCount(isNaN(value) || value <= 0 ? 1 : value);
  };

  const handleselectedCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    getApi1();
  }, []);

  const getApi1 = async () => {
    ProductService.ProductList().then((res) => {
      const response = res.data;

      const productCat = response?.filter((product) => product.parent_id !== null);
      setAllCategories(productCat);
    });
  };

  const getProductDetails = async (id) => {
    const initialSelection = {};
    const initialSubCatIds = [];
    try {
      const res = await ProductCategoryService.ProductDetail(id);
      const response = res.data;
      setProductDetails(response?.productSizes);
      //console.log("alldata", alldata);
      setAllData(response);
      setProductId(id);
      handleSetPayload(id, state);

      response?.categories?.forEach((category) => {
        if (category?.subCategories?.length > 0) {
          // Set the first subcategory as the default selected card
          const firstSubCat = category.subCategories[0];
          initialSelection[category.id] = firstSubCat.id;

          // Add the initially selected subcategory ID to the array
          initialSubCatIds.push(firstSubCat.id);
        }
      });
      setSelectedCard(initialSelection); // Update the state with initial selections
      setSelectedSubCatId(initialSubCatIds);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleSetPayload = async (id, state) => {
    const [width, height] = state?.size?.split(" x ").map(Number);

    if (width && height && id) {
      setSelectedHeight(height);
      setSelectedWidth(width);
    }
  };

  useEffect(() => {
    handleSetPayload(productId, state);

    if (productId && selectedWidth && selectedHeight && selectedSubCatId && count !== "") {
      const jsonString = JSON.stringify(selectedSubCatId);

      const payloadData = {
        width: selectedWidth,
        height: selectedHeight,
        subCatId: jsonString,
        ProductId: productId,
        quantity: count,
      };
      setPayload(payloadData);
      setIsPayloadReady(true);
    }
  }, [productId, selectedWidth, selectedHeight, state, count, selectedSubCatId]);

  useEffect(() => {
    if (isPayloadReady && payload) {
      getPrice(payload);
      setIsPayloadReady(false); // Reset the ready state after the call
    }
  }, [isPayloadReady, payload]);

  const getPrice = (payload) => {
    ProductService.Dataprice(payload).then((res) => {
      setPrice(res.data.totalPrice);
      setPricePerProduct(res.data.totalPrice / count);
    });
  };

  const handleClick = (id) => {
    getProductDetails(id);
  };

  //console.log("allcategories", allcategories);
  return (
    <>
      <PopUp
        open={open}
        handleClose={handleClose}
        payload0={payload}
        price={price}
        selectedCategory={selectedCategory}
        productId={productId}
      />

      <Box>
        <Navbar handleClickOpenSignUp={handleClickOpenSignUp} handleClickOpenLogin={handleClickOpenLogin} />

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src={banner1}
              width="100%"
              height="100%"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </div>

          <Box
            sx={{
              position: "relative",
              zIndex: 99,
              padding: "70px 0px 130px",
              marginTop: "1rem",
            }}
          >
            <Container
              sx={{
                width: {
                  lg: "1200px",
                  md: "40rem",
                  sm: "35rem",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "40px",
                    sm: "35px",
                  },
                  color: " white",
                  fontWeight: "600",
                  lineHeight: "52.8px",
                  margin: 0,
                }}
              >
                CREATE <br />
                SIGN IN MINUTES!
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", paddingTop: "5px" }}>
                <CheckCircleIcon sx={{ fontSize: { xs: "18px", sm: "24px" }, color: "white" }} />
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "400",
                    //margin: "16px 0 0 0",
                    fontSize: { xl: "20px", sm: "16px" },
                    lineHeight: "30px",
                  }}
                  // sx={{ fontSize: { xs: "13px", sm: "16px" } }}
                >
                  High-quality materials and printing
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", paddingTop: "5px" }}>
                <CheckCircleIcon sx={{ fontSize: { xs: "18px", sm: "24px" }, color: "white" }} />

                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "400",

                    fontSize: { xl: "20px", sm: "16px" },
                    lineHeight: "30px",
                  }}
                >
                  Fast and easy online customization
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", paddingTop: "5px" }}>
                <CheckCircleIcon sx={{ fontSize: { xs: "18px", sm: "24px" }, color: "white" }} />

                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "400",
                    fontSize: { xl: "20px", sm: "16px" },
                    lineHeight: "30px",
                  }}
                >
                  Perfect for events, promotions, and branding
                </Typography>
              </Box>
            </Container>
          </Box>
        </div>
      </Box>
      <Box sx={{ margin: "auto", marginTop: "-3rem", position: "relative" }}>
        <Container
          sx={{
            width: {
              lg: "1200px",
              md: "40rem",
              sm: "35rem",
            },
          }}
        >
          <Box
            sx={{
              boxShadow: "10px 10px 35px -15px",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "white",
              borderRadius: "1rem !important",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xl: "3fr 2fr 1fr 1fr 1.5fr",
                  lg: "3fr 2fr 1fr 1fr 1.5fr",
                  md: "repeat(3, 1fr)",
                  sm: "repeat(2 ,1fr)",
                  xs: "repeat(1 ,1fr)",
                },
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "1rem",
              }}
            >
              {/* Material Field */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Typography sx={{ fontSize: "20px", color: "#3F5163", fontWeight: 400 }}>Material</Typography>
                <FormControl sx={{ minWidth: 120, color: "#3F5163" }} size="small" fullWidth>
                  <Select
                    sx={{
                      color: "gray",
                      height: "60px",
                      padding: "0px 10px",
                      ".MuiSelect-icon": {
                        display: "none",
                      },
                    }}
                    displayEmpty
                    MenuProps={{
                      autoFocus: false,
                      PaperProps: {
                        sx: {
                          maxWidth: "200px !important",
                          overflow: "scroll ",
                          maxHeight: "500px !important",
                        },
                      },
                    }}
                    labelId="Stickers and Decals"
                    id="size-select"
                    name="Material"
                    value={selectedCategory}
                    onChange={handleSelectChange}
                    onClose={() => setSearchText("")}
                    renderValue={() => selectedCategory || "Select a category"}
                  >
                    <ListSubheader>
                      <TextField
                        size="small"
                        autoFocus
                        placeholder="Type to search..."
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key !== "Escape") {
                            e.stopPropagation();
                          }
                        }}
                      />
                    </ListSubheader>
                    {filteredCategories.map((option) => (
                      <MenuItem
                        onClick={() => handleClick(option?.id)}
                        key={option.id}
                        value={option?.name}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          padding: "10px",
                        }}
                      >
                        {/* Image */}
                        <Box>
                          {option.images && (
                            <img
                              src={`${process.env.REACT_APP_API_BASE_URL}/${option?.images[0]?.path}`}
                              alt={option.name}
                              style={{
                                width: 88,
                                height: 64,
                                borderRadius: "4px",
                              }}
                            />
                          )}
                        </Box>

                        {/* Text Content */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                            flex: 1,
                          }}
                        >
                          {/* Title */}
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "16px",
                              color: "#333",
                            }}
                          >
                            {option.name}
                          </Typography>

                          {/* Description */}
                          <Typography sx={{ fontSize: "14px", color: "#666" }}>
                            {option.description || "No description available No."}
                          </Typography>

                          {/* Learn More Link */}
                          <Typography
                            component="a"
                            href={`/product/${option?.id}`}
                            rel="noopener noreferrer"
                            sx={{
                              fontSize: "14px",
                              color: "#007bff",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            Learn More
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}

                    {/* {filteredCategories.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.image && (
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL}/${option?.image?.path}`}
                          alt={option.name}
                          style={{ width: 30, height: 30, marginRight: 10 }}
                        />
                      )}
                      {option.name}
                    </MenuItem>
                  ))} */}
                  </Select>
                </FormControl>
              </Box>

              {/* Size Field */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Typography sx={{ fontSize: "20px", color: "#3F5163", fontWeight: 400 }}>Size</Typography>
                <FormControl sx={{ minWidth: 120, color: "#3F5163" }} size="small" fullWidth>
                  <Select
                    labelId="size-select-label"
                    id="size-select"
                    name="size"
                    value={state.size}
                    onChange={handleChange}
                    displayEmpty
                    sx={{ color: "gray", height: "60px", padding: "0px 10px" }}
                    IconComponent={(props) => <ExpandMoreIcon />}
                  >
                    {combinedSizes?.map((size) => (
                      <MenuItem key={size.id} value={size.size}>
                        {size.size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Quantity Field */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Typography sx={{ fontSize: "20px", color: "#3F5163", fontWeight: 400 }}>Qty</Typography>
                <TextField
                  value={count}
                  onChange={quantityChange}
                  type="number"
                  variant="outlined"
                  size="small"
                  inputProps={{
                    min: 1, // Minimum value
                    step: 1, // Increment/Decrement step
                  }}
                  InputProps={{
                    sx: {
                      height: "60px", // Adjust this value as needed
                      textAlign: "center",
                    },
                  }}
                />
              </Box>

              {/* Price Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "10px",
                }}
              >
                <Typography sx={{ fontSize: "28px", color: "#3F5163", fontWeight: 700 }}>${price}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      color: "#E0CE8F",
                      textDecoration: "line-through",
                    }}
                  >
                    {pricePerProduct}
                  </Typography>
                  <Typography sx={{ fontSize: "28px", color: "#3F5163", fontWeight: 500 }}>each</Typography>
                </Box>
              </Box>

              {/* Design Now Button */}
              <Button
                onClick={handleOpen}
                sx={{
                  margin: "25px 0px 0px 0px",
                  //width: "7rem",
                  height: "60px",
                  //margin: "auto",
                  backgroundColor: "#3F5163",
                  color: "white",
                  fontWeight: 500,
                  borderRadius: "8px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#2E4053",
                  },
                }}
              >
                Design Now
              </Button>
            </Box>
            <Box
              sx={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "1rem !important",
              }}
            >
              {/* Show/Hide Button */}
              <Button
                variant="text"
                onClick={toggleOptions}
                sx={{
                  textTransform: "capitalize",
                  color: "#3F5163",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  border: "none !important",
                  boxShadow: "none  !important",
                }}
              >
                {showOptions ? "Hide Options" : "Show Options"}
                <ExpandMoreIcon sx={{ rotate: `${showOptions ? "180deg" : ""}` }} />
              </Button>

              {/* Options Section */}
              {showOptions && (
                <Box>
                  {/* Dropdowns */}
                  <Grid container spacing={2} sx={{ marginBottom: "1rem", width: "100%" }}>
                    {alldata?.categories?.map((category) => {
                      //console.log("category", category);
                      return (
                        <Grid item xs={12} sm={6} lg={3} key={category.id}>
                          <Button
                            variant="text"
                            onClick={() => handleopenCard(category.id)}
                            sx={{
                              textTransform: "capitalize",
                              color: "gray",
                              fontWeight: "bold",
                              fontSize: "16px",
                              marginBottom: "1rem",
                              border: "none !important",
                              boxShadow: "none !important",
                              display: "flex",
                              justifyContent: "space-between",
                              width: { xs: "100%", sm: "15rem", md: "18rem" },
                            }}
                          >
                            <Box sx={{ fontSize: "15px" }}>
                              {category?.name}&nbsp;:&nbsp;
                              {selectedCard[category.id] && (
                                <span sx={{ marginLeft: "10px" }}>
                                  {
                                    alldata.categories
                                      .find((cat) => cat.id === category.id)
                                      ?.subCategories.find((sub) => sub.id === selectedCard[category.id])?.subCatName
                                  }
                                </span>
                              )}
                            </Box>
                            <ExpandMoreIcon
                              sx={{
                                rotate: `${activeOptionKey === category.id ? "180deg" : ""}`,
                              }}
                            />
                          </Button>
                        </Grid>
                      );
                    })}
                  </Grid>

                  {/* Cards Section */}
                  {alldata?.categories?.map((category) =>
                    activeOptionKey === category.id ? (
                      <Grid container spacing={2} sx={{ justifyContent: "center" }} key={category.id}>
                        {category?.subCategories?.map((subCat) => (
                          <Grid item xs={6} sm={4} md={3} lg={2} key={subCat.id}>
                            <Card
                              sx={{
                                padding: "1rem",
                                border: "1px solid",
                                borderColor: selectedCard[category.id] === subCat.id ? "#3F5163" : "#ccc",
                                textAlign: "center",
                                width: "100%",
                                cursor: "pointer",
                                transition: "all 0.2s",
                                "&:hover": { borderColor: "#3F5163" },
                              }}
                              onClick={() => handleCardClick(category.id, subCat)}
                            >
                              <Typography variant="subtitle2" sx={{ fontSize: "14px" }}>
                                {subCat.subCatName}
                              </Typography>
                              <img
                                src={`${process.env.REACT_APP_API_BASE_URL}${subCat.image}`}
                                alt={subCat.subCatName}
                                style={{ width: "100%", height: "10rem", marginTop: "10px" }}
                              />
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    ) : null
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Banner;
