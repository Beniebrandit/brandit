import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  Rating,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import "swiper/css";
import EastIcon from "@mui/icons-material/East";
import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "./Product.css";
import { Add } from "@mui/icons-material";
import axios from "axios";
import { ProductService } from "../../services/Product.service";
import { ReviewService } from "../../services/Review.service";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ProductCategoryService } from "../../services/ProductCategory.service";
import { authHeader } from "../../library/authHeader";
import { Circles } from "react-loader-spinner";
 import BreadcrumbSection from "../common/BreadcrumbSection";

// const url = `https://flagg.devlopix.com/api`;
// const token = `6|q8mTawTdGKbRdLazOGLcm1Y0zJe5ks4IPUWRJNIR13495c0c`

const Product = ({
  productname,
  setLongDescription,
  setProductId,
  setPricePerProduct,
  payload,
  setPayload,
  setPrice,
  price,
  ...props
}) => {
  const [count, setCount] = useState(1);
  const [value, setValue] = useState(0);
  const [alldata, setAllData] = useState();

  const [selectedCard, setSelectedCard] = useState({});

  const [selectedWidth, setSelectedWidth] = useState("");
  const [selectedHeight, setSelectedHeight] = useState("");
  const [selectedSubCatId, setSelectedSubCatId] = useState([]);
  const [rating, setRating] = useState();
  const [loadingPrice, setLoadingPrice] = useState(true);

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  useEffect(() => {
    if (alldata?.categories?.length > 0) {
      const initialSelection = {};
      const initialSubCatIds = [];

      alldata?.categories?.forEach((category) => {
        if (category?.subCategories?.length > 0) {
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
      setState({
        width: firstWidth,
        height: firstHeight,
      });
      setSelectedWidth(firstWidth);
      setSelectedHeight(firstHeight);
    }
  }, [alldata]);

  useEffect(() => {
    const jsonString = JSON.stringify(selectedSubCatId);
    setPayload({
      width: selectedWidth,
      height: selectedHeight,
      subCatId: jsonString,
      ProductId: productname,
      quantity: count,
    });
  }, [selectedWidth, selectedHeight, selectedSubCatId, alldata, count, productname]);

  const handleCardClick = (categoryId, subCat) => {
    setSelectedCard((prevSelectedCards) => {
      const updatedCards = { ...prevSelectedCards, [categoryId]: subCat.id };
      const subCatIdsArray = Object.values(updatedCards).filter((value) => value !== undefined);
      setSelectedSubCatId(subCatIdsArray);
      return updatedCards;
    });
  };

  const swiperRef = useRef(null);

  const handleThumbClick = (index) => {
    swiperRef.current.swiper.slideTo(index + 1);
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

  const getApi = async (id) => {
    try {
      const res = await ProductCategoryService.ProductDetail(id);
      const response = res.data;
      setAllData(response);
      setLongDescription(response?.long_description);
      setProductId(id);
      // Handle response as needed
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    getApi(productname);
  }, [productname]);

  const getReview = async (id) => {
    try {
      const res = await ReviewService.ProductReview(id);
      const reviews = res.data;

      // Calculate the average rating
      const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
      const averageRating = reviews.length > 0 ? (totalStars / reviews.length).toFixed(1) : "0.0";

      // Set the average rating and number of reviews
      setValue(averageRating); // Assuming `setValue` is used to store the average rating
      setRating(reviews.length); // Sets the number of reviews
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  useEffect(() => {
    getReview(productname);
  }, [productname]);

  const handleClick = async () => {
    //ProductService.Dataprice(payload).then((res) => {
    //    console.log(res.data.totalPrice, "totalPrice");
    //    setPrice(res.data.totalPrice)
    //});
  };

  useEffect(() => {
    if (!selectedWidth || !selectedHeight || selectedSubCatId.length === 0) {
      console.error("Payload is incomplete. Ensure width, height, and subcategory are selected.");
    } else {
      const payload = {
        width: selectedWidth,
        height: selectedHeight,
        subCatId: JSON.stringify(selectedSubCatId),
        ProductId: productname,
        quantity: count,
      };
      setLoadingPrice(true);
      ProductService.Dataprice(payload)
        .then((res) => {
          if (res.data && res.data.totalPrice) {
            setPrice(res.data.totalPrice);
            setPricePerProduct(res.data.totalPrice / count);
          } else {
            setPrice(55);
          }
        })
        .catch((error) => {
          console.error("API call failed:", error);
        })
        .finally(() => {
          setLoadingPrice(false);
        });
    }
  }, [payload]);

  const scrollToReviews = (event) => {
    event.preventDefault();
    document.getElementById("customerreviews")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <Box className="product_box">
      <Container>
        <BreadcrumbSection productName={alldata?.name} />
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box p={2}>
              <div className={props.className}>
                <Swiper
                  {...props.carouselOption}
                  ref={swiperRef}
                  modules={[Navigation, Pagination]}
                  navigation={false}
                  loop={true}
                  // pagination={{
                  //   clickable: true,
                  //   renderBullet: customPagination,
                  // }}
                  className="product-swiper"
                >
                  {alldata?.images?.map((item, index) => (
                    <SwiperSlide key={index} className="product-swiper-slide text-center">
                      <img
                        src={process.env.REACT_APP_API_BASE_URL + item?.path}
                        alt=""
                        style={{
                          width: "100%",
                          height: { md: "643px", xs: "auto" },
                          maxHeight: "643px",
                          borderRadius: "30px",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                  {/* <button
                    onClick={() => swiperRef.current.swiper.slidePrev()}
                    className="swiper-button-next-nav"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => swiperRef.current.swiper.slideNext()}
                    className="swiper-button-next-nav"
                  >
                    Next
                  </button> */}
                </Swiper>
              </div>
              <div className="swiper-container">
                <Swiper
                  navigation={{
                    prevEl: ".swiper-prev",
                    nextEl: ".swiper-next",
                  }}
                  modules={[Navigation]}
                  loop={true}
                  spaceBetween={20}
                  slidesPerView="4"
                  freeMode
                >
                  {alldata?.images?.map((item, index) => {
                    // console.log(
                    //   process.env.REACT_APP_API_BASE_URL + item?.path,
                    //   "alldata"
                    // );
                    return (
                      <>
                        <SwiperSlide key={index}>
                          <img
                            key={index}
                            onClick={() => handleThumbClick(index)}
                            src={process.env.REACT_APP_API_BASE_URL + item?.path}
                            alt=""
                            style={{
                              width: "100%",
                              height: "119px",
                              cursor: "pointer",
                              borderRadius: "20px",
                            }}
                          />
                        </SwiperSlide>
                      </>
                    );
                  })}
                </Swiper>
                <div
                  // className="swiper-prev"
                  onClick={() => swiperRef.current.swiper.slidePrev()}
                  className="swiper-button-next-nav swiper-prev"
                >
                  <KeyboardBackspaceIcon />
                </div>
                <div
                  // className="swiper-next"
                  onClick={() => swiperRef.current.swiper.slideNext()}
                  className="swiper-button-next-nav swiper-next"
                >
                  <EastIcon />
                </div>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box p={2}>
              <Typography
                sx={{
                  color: "#3F5163",
                  fontSize: { xs: "40px",xl: "60px"  },
                  lineHeight: "auto",
                  fontWeight: "bold",
                  fontFamily: "Avenir LT Std",
                }}
              >
                {alldata?.name}
              </Typography>
              <a
                href="#customerreviews"
                style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "left" }}
                onClick={scrollToReviews}
              >
                <Rating style={{ color: "#F6AA03" }} name="simple-controlled" value={value} readOnly />
                &nbsp;&nbsp;&nbsp;
                <Typography sx={{ color: "#3F5163", display: "inline-block", paddingTop: "2px" }}>{`(${
                  rating || " "
                })`}</Typography>
              </a>
              <Typography
                style={{
                  fontSize: "30px",
                  lineHeight: "34px",
                  fontWeight: "500",
                  color: "#3F5163",
                  marginTop: "20px",
                }}
              >
                USD $39.02 sq/ft
              </Typography>
              <Typography
                style={{
                  color: "#8C8E8F",
                  fontSize: "18px",
                  lineHeight: "28px",
                  fontWeight: "400",
                  marginTop: "20px",
                }}
              >
                {alldata?.description}
              </Typography>
              <Divider style={{ marginTop: "30px", width: "100%" }} />
              <Box sx={{ marginTop: "30px" }}>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    width: "100%",
                    margin: 0,
                    "& .MuiGrid-item": { padding: "0px !important" },
                    "& .MuiGrid-container": { paddingLeft: "0px !important" },
                  }}
                >
                  {/* Size (in Inches) Section */}
                  <Grid
                    item
                    sx={{
                      width: { xs: "100%", sm: "60%" },
                      padding: "0px !important",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "18px", sm: "20px", md: "22px" },
                        lineHeight: "32px",
                        fontWeight: "bold",
                      }}
                    >
                      Size (in Inches)
                    </Typography>
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
                                  {size.size}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                  </Grid>

                  {/* Quantity Section */}
                  <Grid
                    item
                    sx={{
                      width: "40%",
                      padding: "0px !important",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "18px", sm: "20px", md: "22px" },
                        paddingTop: { xs: "10px !important", sm: "0px !important" },
                        lineHeight: "32px",
                        fontWeight: "bold",
                        width: { md: "7rem", xs: "100%", sm: "10.2rem", lg: "8.2rem", xl: "8.2rem" },
                      }}
                    >
                      Quantity:
                    </Typography>

                    <Box
                      sx={{
                        border: "1px solid #868686",
                        width: { xs: "100%", sm: "60%" },
                        marginTop: "20px",
                        height: "60px",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Typography
                        onClick={decrement}
                        disabled={count === 1}
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
                        {count}
                      </span>
                      <Typography onClick={() => setCount(count + 1)} sx={{ color: "#868686", cursor: "pointer" }}>
                        +
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider style={{ width: "100%", marginTop: "40px" }} />
              {alldata?.categories?.map((category) => (
                <>
                  <Accordion
                    key={category.id}
                    className="MuiPaper"
                    sx={{
                      marginBottom: "10px",
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      border: "1px solid #DCDCDC",
                      borderRadius: "10px",
                      marginTop: "25px",
                      position: "static !important",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<AddIcon />}
                      aria-controls={`panel${category.id}-content`}
                      id={`panel${category.id}-header`}
                      style={{
                        fontSize: "18px",
                        color: "#3F5163",
                        lineHeight: "18px",
                        fontWeight: "400",
                      }}
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
                        <Typography sx={{ marginLeft: "10px" }}>
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
                                }}
                                onClick={() => handleCardClick(category.id, subCat)}
                              >
                                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                  {subCat.subCatName}
                                </Typography>
                                <img
                                  src={`${process.env.REACT_APP_API_BASE_URL}${subCat.image}`}
                                  alt={subCat.subCatName}
                                  style={{ width: "100%", height: "10rem", marginTop: "10px" }}
                                />
                              </Paper>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </>
              ))}
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {loadingPrice ? (
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
                  <Box sx={{ paddingTop: "13px" }}>
                    <Typography>
                      <b>Price:</b>
                    </Typography>
                    <Typography sx={{ fontSize: "22px", color: "rgb(63, 81, 99)" }}>${price}</Typography>
                  </Box>
                )}
                <Button
                  variant="contained"
                  onClick={handleClick}
                  sx={{
                    backgroundColor: "#3F5163",
                    color: "#FFFFFF",
                    fontSize: "18px",
                    lineHeight: "18px",
                    fontWeight: "400",
                    padding: "21px",
                    marginTop: "10px",
                    borderRadius: "10px",
                    width: "80%",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#3F5163 !important",
                    },
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
              <Typography sx={{ color: "#868686", fontSize: "18px", marginTop: "30px" }}>
                Category <span className="rigidsign">Rigid Signs</span>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Product;
