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
import React, { useState, useRef, useEffect, useMemo } from "react";
import { ProductService } from "../../../services/Product.service";
import FormControl from "@mui/material/FormControl";

const Config = ({ allproduct, alldata, setProductDetails, productDetails, setgetId ,payload0}) => {
  const [count, setCount] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedSubCatId, setSelectedSubCatId] = useState([]);
  const [isPayloadInitialized, setIsPayloadInitialized] = useState(false);
  const [isProductChanged, setIsProductChanged] = useState(false); // Track product change
  console.log("alldata", alldata);
  console.log("payload0", payload0);
  console.log("productDetails", productDetails);

  const [payload, setPayload] = useState({
    productId: null,
    width: "",
    height: "",
    subCatId: [],
    quantity: 1,
  });

  const decrement = () => {
    if (productDetails.quantity > 1) {
      setProductDetails({
        ...productDetails,
        quantity: productDetails.quantity - 1,
      });
      // setCount(count - 1);
    }
  };

  const widthSizes = useMemo(
    () => alldata?.productSizes?.filter((val) => val.size_type === "W")?.map((val) => ({ size: val.size, id: val.id })),
    [alldata]
  );

  const heightSizes = useMemo(
    () => alldata?.productSizes?.filter((val) => val.size_type === "H")?.map((val) => ({ size: val.size, id: val.id })),
    [alldata]
  );

  useEffect(() => {
    if (allproduct) {
      setSelectedProduct(alldata?.name);
      setPayload((prev) => ({
        ...prev,
        productId: allproduct[0].id,
      }));
      //setgetId(allproduct[0].id);
    }
  }, [allproduct]);

useEffect(() => {
  // Initialize data from `payload0` only once on the initial render
  if (payload0 && !isPayloadInitialized) {
    console.log("Initializing from payload0");
    setProductDetails((prev) => ({
      ...prev,
      width: payload0.width || prev.width,
      height: payload0.height || prev.height,
      quantity: payload0.quantity || prev.quantity,
    }));

    const initialSelection = {};
    const initialSubCatIds = [];

    // Convert subCatId from payload0 to an array and filter for the corresponding subcategory selections
    const initialSubCatArray = JSON.parse(payload0.subCatId); // Assuming subCatId is in stringified array format

    alldata?.categories?.forEach((category) => {
      if (category?.subCategories?.length > 0) {
        // If subCategory id from payload0 matches the category's subCategories, update the selection
        const matchingSubCats = category.subCategories.filter((subCat) => initialSubCatArray.includes(subCat.id));

        if (matchingSubCats.length > 0) {
          // Store the first matching subCategory id or set the selected state accordingly
          initialSelection[category.id] = matchingSubCats[0].id;
          initialSubCatIds.push(matchingSubCats[0].id);
        }
      }
    });

    // Update state with initial subcategory selections
    setSelectedCard(initialSelection);
    setSelectedSubCatId(initialSubCatIds);
  }
}, [payload0, isPayloadInitialized, setProductDetails]);

  useEffect(() => {
    // Handle `alldata` initialization only on product change
    if (isProductChanged && alldata) {
      setProductDetails((prev) => ({
        ...prev,
        width: widthSizes?.[0]?.size || prev.width,
        height: heightSizes?.[0]?.size || prev.height,
        quantity: 1, // Reset quantity
      }));
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
  }, [isProductChanged, alldata, widthSizes, heightSizes, setProductDetails]);

  useEffect(() => {
    const jsonString = JSON.stringify(selectedSubCatId);
    setPayload({
      ...payload,
      width: productDetails.width,
      height: productDetails.height,
      subCatId: jsonString,
      quantity: productDetails.quantity,
    });
  }, [productDetails, selectedSubCatId]);

  const handleCardClick = (categoryId, subCat) => {
    setSelectedCard((prevSelectedCards) => {
      const updatedCards = { ...prevSelectedCards, [categoryId]: subCat.id };
      const subCatIdsArray = Object.values(updatedCards).filter((value) => value !== undefined);
      setSelectedSubCatId(subCatIdsArray);
      return updatedCards;
    });
  };

  const handleProductChange = (event) => {
    const selectedProductName = event.target.value;
    const selectedProduct = allproduct.find((product) => product.name === selectedProductName);
console.log("selectedProduct", selectedProduct);
    if (selectedProduct) {
      setSelectedProduct(selectedProductName);
      setgetId(selectedProduct.id);
      setIsProductChanged(true); // Mark that the product has changed

      // Update width, height, and subcategories based on the new product
      setProductDetails((prev) => ({
        ...prev,
        width: widthSizes?.[0]?.size || prev.width,
        height: heightSizes?.[0]?.size || prev.height,
        quantity: 1, // Reset quantity to default
      }));

      const initialSubCatIds = alldata.categories?.flatMap((cat) =>
        cat.subCategories?.[0]?.id ? [cat.subCategories[0].id] : []
      );
      setSelectedSubCatId(initialSubCatIds || []);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Handle width change logic
    if (name === "width") {
      const selectedWidth = widthSizes.find((size) => size.size === value);
      setProductDetails({
        ...productDetails,
        width: selectedWidth?.size || "prev.width",
      });
    } else if (name === "height") {
      const selectedHeight = heightSizes.find((size) => size.size === value);
      setProductDetails({
        ...productDetails,
        height: selectedHeight?.size || "prev.height",
      });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (productDetails.width && productDetails.height && selectedSubCatId.length > 0) {
        const payload = {
          width: productDetails.width,
          height: productDetails.height,
          subCatId: JSON.stringify(selectedSubCatId),
          ProductId: alldata?.id,
          quantity: productDetails.quantity,
        };
        ProductService.Dataprice(payload)
          .then((res) => {
            setProductDetails((prev) => ({
              ...prev,
              price: res.data?.totalPrice || 50,
            }));
          })
          .catch((error) => {
            console.error("Error fetching price:", error);
          });
      }
    }, 300);

    return () => clearTimeout(timeout); // Cleanup debounce
  }, [productDetails.width, productDetails.height, productDetails.quantity, selectedSubCatId]);

  return (
    <>
      <Box>
        <Box className="custom-scrollbar custom-scrollbar-container">
          <Box sx={{ height: "38rem" }}>
            <Typography>Select product :</Typography>
            <Select fullWidth value={selectedProduct} onChange={handleProductChange}>
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
                      value={productDetails.width}
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
                      value={productDetails.height}
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
                          {size.size}
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
              <Typography
                onClick={decrement}
                disabled={productDetails.quantity === 1}
                sx={{ color: "#868686", cursor: "pointer" }}
              >
                -
              </Typography>
              <span
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#868686",
                }}
              >
                {productDetails.quantity}
              </span>
              <Typography
                onClick={() =>
                  setProductDetails({
                    ...productDetails,
                    quantity: productDetails.quantity + 1,
                  })
                }
                sx={{ color: "#868686", cursor: "pointer" }}
              >
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
            ${productDetails?.price} <br />
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
