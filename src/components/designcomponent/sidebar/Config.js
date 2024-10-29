import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState, useRef, useEffect } from "react";
import { ProductService } from "../../../services/Product.service";
import FormControl from "@mui/material/FormControl";

const Config = ({ allproduct, alldata }) => {
  const [count, setCount] = useState(1);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  // New state to store selected width, height, and subCat ids
  const [selectedWidth, setSelectedWidth] = useState("");
  const [selectedHeight, setSelectedHeight] = useState("");
  const [selectedSubCatId, setSelectedSubCatId] = useState([]);
  const [price, setPrice] = useState();

  const [payload, setPayload] = useState({
    productId: null, // Assuming `id` is the unique identifier for the product
    width: "",
    height: "",
    subCatId: [],
  });

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // Use effect to set initial selected subcategory and capture their IDs
  useEffect(() => {
    if (alldata?.categories?.length > 0) {
      const initialSelection = {};
      const initialSubCatIds = [];

      alldata?.categories?.forEach((category) => {
        if (category?.subCategories?.length > 0) {
          // Set the first subcategory as the default selected card
          const firstSubCat = category.subCategories[0];
          initialSelection[category.id] = firstSubCat.id;

          // Add the initially selected subcategory ID to the array
          initialSubCatIds.push(firstSubCat.id);
        }
      });

      setSelectedCard(initialSelection); // Update the state with initial selections
      setSelectedSubCatId(initialSubCatIds); // Set the initially selected subcategory IDs
    }
  }, [alldata]);

  const widthSizes = alldata?.productSizes
    ?.filter((val) => val.size_type === "W")
    ?.map((val) => ({ size: val.size, id: val.id }));

  const heightSizes = alldata?.productSizes
    ?.filter((val) => val.size_type === "H")
    ?.map((val) => ({ size: val.size, id: val.id }));

  const [state, setState] = useState({
    width: "",
    height: "",
  });

  useEffect(() => {
    if (alldata) {
      const firstWidth = widthSizes?.[0]?.size || "";
      const firstHeight = heightSizes?.[0]?.size || "";
      const firstproduct = allproduct[0]?.name || "";
      setState({
        width: firstWidth,
        height: firstHeight,
      });
      setSelectedProduct(firstproduct);
      setSelectedWidth(firstWidth);
      setSelectedHeight(firstHeight);
    }
  }, [alldata, allproduct]);

  // console.log(widthSizes?.[0]?.size,"qqqqqqq");
  useEffect(() => {
    if (alldata?.categories?.length > 0) {
      const initialSelection = {};
      const initialSubCatIds = [];
      alldata?.categories?.forEach((category) => {
        if (category?.subCategories?.length > 0) {
          const firstSubCat = category.subCategories[0];
          initialSelection[category.id] = firstSubCat.id; // Store the subCat ID
          initialSubCatIds.push(firstSubCat.id); // Push the initial subCat ID
        }
      });
      setSelectedCard(initialSelection);
      setSelectedSubCatId(initialSubCatIds);
    }
  }, [alldata]);

  useEffect(() => {
    const jsonString = JSON.stringify(selectedSubCatId);
    setPayload({
      width: selectedWidth,
      height: selectedHeight,
      subCatId: jsonString,
      ProductId: 10,
      quantity: count,
      //ProductId: alldata?.id || null,
    });
  }, [selectedWidth, selectedHeight, selectedSubCatId, alldata, count]);

  const handleCardClick = (categoryId, subCat) => {
    setSelectedCard((prevSelectedCards) => {
      const updatedCards = { ...prevSelectedCards, [categoryId]: subCat.id };
      const subCatIdsArray = Object.values(updatedCards).filter((value) => value !== undefined);
      setSelectedSubCatId(subCatIdsArray);
      return updatedCards;
    });
  };

  const swiperRef = useRef(null);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "width") {
      const selectedWidth = widthSizes.find((size) => size.size === value);
      setSelectedWidth(selectedWidth?.size);
    } else if (name === "height") {
      const selectedHeight = heightSizes.find((size) => size.size === value);
      setSelectedHeight(selectedHeight?.size);
    }
  };

//  const getApi = async () => {
//    ProductService.product().then((res) => {
//      const response = res.data;
//      setAllData(response);
//    });
//  };
//  const Allproducts = async () => {
//    ProductService.Allproduct().then((res) => {
//      const response = res.data;
//      setAllProduct(response);
//    });
//  };
//
//  useEffect(() => {
//    getApi();
//    Allproducts();
//  }, []);

  useEffect(() => {
    if (!selectedWidth || !selectedHeight || selectedSubCatId.length === 0) {
      console.error("Payload is incomplete. Ensure width, height, and subcategory are selected.");
      //setError("Please select all required options before proceeding.");
    } else {
      const payload = {
        width: selectedWidth,
        height: selectedHeight,
        subCatId: JSON.stringify(selectedSubCatId),
        ProductId: 10,
        quantity: count,
      };

      ProductService.Dataprice(payload)
        .then((res) => {
          if (res.data && res.data.totalPrice) {
            setPrice(res.data.totalPrice);
          } else {
            setPrice(55);
            //setError("Failed to fetch pricing information.");
          }
        })
        .catch((error) => {
          console.error("API call failed:", error);
          //setError("Unable to fetch pricing. Please try again later.");
        });
    }
  }, [payload]);

  return (
    <>
      <Box>
        <Box className="custom-scrollbar custom-scrollbar-container">
          <Box sx={{ height: "38rem" }}>
            <Typography>Select product :</Typography>
            <Select
              fullWidth
              value={selectedProduct}
              onChange={handleProductChange} // Add onChange to update the state
            >
              {allproduct?.map((product) => (
                <MenuItem key={product.id} value={product.name}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
            <Divider sx={{ marginTop: "1rem", marginBottom: "0.5rem" }} />
            <Typography>Size (in Inches)</Typography>
            <div className="size-form">
              {/* Width Field */}
              <div className="size-field">
                <div className="left">
                  <p className="weight_para">W</p>
                </div>
                <div className="right">
                  <FormControl sx={{ minWidth: 70 }}>
                    <Select
                      value={state?.width}
                      name="width"
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        boxShadow: "none",
                        ".MuiOutlinedInput-notchedOutline": {
                          border: 0,
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: 0,
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 },
                      }}
                    >
                      {widthSizes?.map((size) => (
                        <MenuItem key={size.id} value={size.size}>
                          {size.size}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>

              {/* Height Field */}
              <div className="size-field">
                <div className="left">
                  <p className="height_para">H</p>
                </div>
                <div className="right">
                  <FormControl sx={{ minWidth: 70 }}>
                    <Select
                      value={state?.height}
                      name="height"
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        boxShadow: "none",
                        ".MuiOutlinedInput-notchedOutline": {
                          border: 0,
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: 0,
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 },
                      }}
                    >
                      {heightSizes?.map((size) => (
                        <MenuItem key={size.id} value={size.size}>
                          <em>{size.size}</em>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <Divider sx={{ marginTop: "1rem", marginBottom: "0.5rem" }} />

            <Typography>Quantity</Typography>

            <Box
              sx={{
                border: "1px solid #868686",
                width: "45%",
                marginTop: "20px",
                height: "auto",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Typography onClick={decrement} disabled={count === 1} sx={{ color: "#868686", cursor: "pointer" }}>
                -
              </Typography>
              <span
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#868686",
                }}
              >
                {count}
              </span>
              <Typography onClick={() => setCount(count + 1)} sx={{ color: "#868686", cursor: "pointer" }}>
                +
              </Typography>
            </Box>

            <Box
              sx={{
                position: "relative",
                mt: 1,
                "&:hover .hover-content": {
                  display: "inline",
                },
              }}
            >
              <Typography variant="body1" color="primary" sx={{ display: "inline-block" }}>
                Buy More, Save More!
              </Typography>
              <Box
                className="hover-content"
                sx={{
                  display: "none",
                  position: "relative",
                  left: 0,
                  right: 0,
                  mt: 1,
                  // backgroundColor: "#fff",
                  // padding: "10px",
                  // boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  // zIndex: 1,
                  width: "100%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  2 for $139.78 ea.{" "}
                  <a href="#" style={{ color: "#0066cc" }}>
                    Save 7%
                  </a>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  3 for $138.75 ea.{" "}
                  <a href="#" style={{ color: "#0066cc" }}>
                    Save 8%
                  </a>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  4 for $137.71 ea.{" "}
                  <a href="#" style={{ color: "#0066cc" }}>
                    Save 8%
                  </a>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  5 for $136.68 ea.{" "}
                  <a href="#" style={{ color: "#0066cc" }}>
                    Save 9%
                  </a>
                </Typography>
              </Box>
            </Box>
            <Box sx={{ marginTop: "1rem" }}>
              {alldata?.categories?.map((category) => {
                return (
                  <>
                    <Accordion
                      //   defaultExpanded
                      key={category.id}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${category.id}-content`}
                        id={`panel${category.id}-header`}
                        sx={{
                          "& .MuiAccordionSummary-content": {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          },
                        }}
                      >
                        {category?.name}
                        {/* Display the selected subcategory's name */}
                        {selectedCard[category.id] && (
                          <Typography
                            sx={{
                              marginLeft: "10px",
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "center",
                              fontSize: "12px",
                            }}
                          >
                            {
                              alldata.categories
                                .find((cat) => cat.id === category.id)
                                ?.subCategories.find((sub) => sub.id === selectedCard[category.id])?.subCatName
                            }
                          </Typography>
                        )}
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          {category?.subCategories?.map((subCat) => {
                            //console.log("iddddd", selectedCard[category.id]?.id);
                            return (
                              <Grid item xs={6} key={subCat.id}>
                                <Paper
                                  elevation={3}
                                  sx={{
                                    padding: 1,
                                    textAlign: "center",
                                    border: selectedCard[category.id] === subCat.id ? "2px solid #ff9900" : "none",
                                    cursor: "pointer",
                                    fontSize: "10px",
                                  }}
                                  onClick={() => handleCardClick(category.id, subCat)}
                                >
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      fontWeight: "bold",
                                      fontSize: "10px",
                                    }}
                                  >
                                    {subCat.subCatName}
                                  </Typography>
                                  <img
                                    src={`${process.env.REACT_APP_API_BASE_URL}${subCat.image}`}
                                    alt={subCat.subCatName}
                                    style={{ width: "100%", marginTop: "10px" }}
                                  />
                                </Paper>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </>
                );
              })}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 2,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Typography variant="h6" sx={{ color: "#1976d2" }}>
            ${price} <br />
            each
          </Typography>
          <Typography variant="body2">
            Subtotal:
            <br /> $150.33
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Config;
