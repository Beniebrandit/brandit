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
import { Circles } from "react-loader-spinner";

const Config = ({ allproduct, alldata, setProductDetails, productDetails, setgetId, storedPayload }) => {
  const [loader, setLoader] = useState();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedSubCatId, setSelectedSubCatId] = useState([]);
  const [isProductChanged, setIsProductChanged] = useState(false);
  const [eachProductPrice, setEachProductPrice] = useState("");

  //console.log("alldata", alldata);
  //console.log("storedPayload", storedPayload);
  //console.log("productDetails", productDetails);

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

  const handleProductChange = (event) => {
    const selectedProductName = event.target.value;
    const selectedProduct = allproduct.find((product) => product.name === selectedProductName);

    if (selectedProduct) {
      setSelectedProduct(selectedProductName);
      setgetId(selectedProduct.id);
      setIsProductChanged(true); // Mark product change

      const newWidth = widthSizes?.[0]?.size || "";
      const newHeight = heightSizes?.[0]?.size || "";
      const initialSubCatIds = alldata.categories?.flatMap((cat) =>
        cat.subCategories?.[0]?.id ? [cat.subCategories[0].id] : []
      );

      const updatedProductDetails = {
        width: newWidth,
        height: newHeight,
        quantity: 1,
      };

      setProductDetails(updatedProductDetails);
      setSelectedSubCatId(initialSubCatIds || []);

      // Update localStorage immediately
      console.log("selectedProduct.id", selectedProduct.id);
      localStorage.setItem(
        "productDetails",
        JSON.stringify({
          ...updatedProductDetails,
          subCatId: JSON.stringify(initialSubCatIds || []),
          ProductId: selectedProduct.id,
        })
      );
    }
  };

  useEffect(() => {
    const savedProductDetails = localStorage.getItem("productDetails");
    const savedSelectedCard = localStorage.getItem("selectedCard");

    if (!savedProductDetails && storedPayload) {
      console.log("Initializing from storedPayload on page reload");

      const initialProductDetails = {
        width: storedPayload.width || "",
        height: storedPayload.height || "",
        quantity: storedPayload.quantity || 1,
        ProductId: alldata?.id || null,
      };

      setProductDetails(initialProductDetails);

      const initialSubCatArray = JSON.parse(storedPayload.subCatId || "[]");
      const initialSelection = {};
      const initialSubCatIds = [];

      alldata?.categories?.forEach((category) => {
        if (category?.subCategories?.length > 0) {
          const matchingSubCats = category.subCategories.filter((subCat) => initialSubCatArray.includes(subCat.id));

          if (matchingSubCats.length > 0) {
            initialSelection[category.id] = matchingSubCats[0].id;
            initialSubCatIds.push(matchingSubCats[0].id);
          }
        }
      });

      setSelectedCard(initialSelection);
      localStorage.setItem("selectedCard", JSON.stringify(initialSelection));

      setSelectedSubCatId(initialSubCatIds);

      localStorage.setItem(
        "productDetails",
        JSON.stringify({
          ...initialProductDetails,
          subCatId: JSON.stringify(initialSubCatIds),
        })
      );
    } else if (!savedProductDetails && !storedPayload && alldata) {
      console.log("Initializing with default product data");

      const newWidth = widthSizes?.[0]?.size || "";
      const newHeight = heightSizes?.[0]?.size || "";
      const initialSelection = {};
      const initialSubCatIds = [];

      alldata?.categories?.forEach((category) => {
        if (category?.subCategories?.length > 0) {
          const firstSubCat = category.subCategories[0];
          initialSelection[category.id] = firstSubCat.id;
          initialSubCatIds.push(firstSubCat.id);
        }
      });

      setProductDetails({
        width: newWidth,
        height: newHeight,
        quantity: 1,
      });

      setSelectedCard(initialSelection);
      localStorage.setItem("selectedCard", JSON.stringify(initialSelection));
      setSelectedSubCatId(initialSubCatIds);

      localStorage.setItem(
        "productDetails",
        JSON.stringify({
          width: newWidth,
          height: newHeight,
          quantity: 1,
          subCatId: JSON.stringify(initialSubCatIds),
          ProductId: alldata?.id,
        })
      );
    } else if (savedProductDetails) {
      const parsedDetails = JSON.parse(savedProductDetails);
      setProductDetails({
        width: parsedDetails.width || "",
        height: parsedDetails.height || "",
        quantity: parsedDetails.quantity || 1,
        ProductId: parsedDetails.ProductId || null,
      });

      // Restore selectedCard from localStorage if available
      if (savedSelectedCard) {
        const parsedSelectedCard = JSON.parse(savedSelectedCard);
        setSelectedCard(parsedSelectedCard);
        setSelectedSubCatId(Object.values(parsedSelectedCard).filter(Boolean));
      }
    }
  }, [storedPayload, alldata, widthSizes, heightSizes]);



  useEffect(() => {
    if (isProductChanged && alldata) {
      const newWidth = widthSizes?.[0]?.size || productDetails.width;
      const newHeight = heightSizes?.[0]?.size || productDetails.height;

      const initialSelection = {};
      const initialSubCatIds = [];

      alldata?.categories?.forEach((category) => {
        if (category?.subCategories?.length > 0) {
          const firstSubCat = category.subCategories[0];
          initialSelection[category.id] = firstSubCat.id;
          initialSubCatIds.push(firstSubCat.id);
        }
      });

      setProductDetails({
        width: newWidth,
        height: newHeight,
        quantity: 1,
      });
      setSelectedCard(initialSelection);
      localStorage.setItem("selectedCard", JSON.stringify(initialSelection));
      setSelectedSubCatId(initialSubCatIds);

      localStorage.setItem(
        "productDetails",
        JSON.stringify({
          width: newWidth,
          height: newHeight,
          quantity: 1,
          subCatId: JSON.stringify(initialSubCatIds),
          ProductId: alldata?.id,
        })
      );
      console.log("alldata?.id", alldata?.id);
    }
  }, [isProductChanged, alldata, widthSizes, heightSizes]);
  // Update localStorage with productDetails whenever it changes
  useEffect(() => {
    if (productDetails.width && productDetails.height && selectedSubCatId.length > 0) {
      const updatedPayload = {
        width: productDetails.width,
        height: productDetails.height,
        quantity: productDetails.quantity,
        subCatId: JSON.stringify(selectedSubCatId),
        ProductId: alldata?.id || "",
      };

      console.log("Saving to localStorage:", updatedPayload);

      localStorage.setItem("productDetails", JSON.stringify(updatedPayload));
    }
  }, [productDetails, selectedSubCatId]);

  const handleCardClick = (categoryId, subCat) => {
    setSelectedCard((prevSelectedCards) => {
      const updatedCards = { ...prevSelectedCards, [categoryId]: subCat.id };
      const subCatIdsArray = Object.values(updatedCards).filter(Boolean); // Ensuring no undefined values

      setSelectedSubCatId(subCatIdsArray);

      // Update localStorage with updated card and subcategory info
      localStorage.setItem("selectedCard", JSON.stringify(updatedCards));

      return updatedCards;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "width") {
      const selectedWidth = widthSizes.find((size) => size.size === value);
      setProductDetails({
        ...productDetails,
        width: selectedWidth?.size || productDetails.width,
      });
    } else if (name === "height") {
      const selectedHeight = heightSizes.find((size) => size.size === value);
      setProductDetails({
        ...productDetails,
        height: selectedHeight?.size || productDetails.height,
      });
    }
  };

  useEffect(() => {
    let isCancelled = false;

    // Show loader
    setLoader(true);

    const fetchPrice = async () => {
      if (productDetails.width && productDetails.height && selectedSubCatId.length > 0) {
        try {
          const payload = {
            width: productDetails.width,
            height: productDetails.height,
            subCatId: JSON.stringify(selectedSubCatId),
            ProductId: alldata?.id,
            quantity: productDetails.quantity,
          };

          const res = await ProductService.Dataprice(payload);

          if (!isCancelled) {
            const totalPrice = res.data?.totalPrice || 50; // Default price fallback
            setProductDetails((prev) => ({
              ...prev,
              price: totalPrice,
            }));
            setEachProductPrice((totalPrice / productDetails.quantity).toFixed(2));
          }
        } catch (error) {
          console.error("Error fetching price:", error);
          if (!isCancelled) {
            setEachProductPrice("Error");
          }
        } finally {
          if (!isCancelled) {
            setLoader(false); // Hide loader after completion
          }
        }
      } else {
        setLoader(false); // Hide loader if no valid input
      }
    };

    const timeout = setTimeout(fetchPrice, 300);

    return () => {
      isCancelled = true;
      clearTimeout(timeout); // Cleanup debounce
    };
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
                            console.log("iddddd", selectedCard[category.id] === subCat.id);
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
          {loader ? (
            <Circles
              height="40"
              width="40"
              color="#f2d388"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <>
              <Typography variant="h6" sx={{ color: "#1976d2" }}>
                ${eachProductPrice || ""} <br />
                each
              </Typography>
              <Typography variant="body2">
                Subtotal:
                <br /> ${productDetails?.price}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Config;
