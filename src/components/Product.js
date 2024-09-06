import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  Rating,
  Divider,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  hexToRgb,
  FormHelperText,
  InputLabel,
  Paper,
} from "@mui/material";
import "swiper/css";
// Libraries
import EastIcon from "@mui/icons-material/East";
import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "./Product.css";
import { Add } from "@mui/icons-material";
import axios from "axios";
import { ProductService } from "../services/Product.service";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// const url = `https://flagg.devlopix.com/api`;
// const token = `6|q8mTawTdGKbRdLazOGLcm1Y0zJe5ks4IPUWRJNIR13495c0c`

const Product = (props) => {
  const [count, setCount] = useState(1);
  const [value, setValue] = useState(2);
  const [alldata, setAllData] = useState();

  const [selectedCard, setSelectedCard] = useState({});

  // Use effect to set the initial selected card after the data is available
  useEffect(() => {
    if (alldata?.categories?.length > 0) {
      const initialSelection = {};
      alldata?.categories?.forEach((category) => {
        if (category?.subCategories?.length > 0) {
          // Set the first subcategory as the default selected card
          initialSelection[category.id] = category.subCategories[0];
        }
      });
      setSelectedCard(initialSelection); // Update the state with initial selections
    }
  }, [alldata]);

  const widthSizes = alldata?.productSizes
    ?.filter((val) => val.size_type === "W") // Filter for size_type that equals "W"
    ?.map((val) => val.size); // Map to get the size values

  const heightSizes = alldata?.productSizes
    ?.filter((val) => val.size_type === "H") // Filter for size_type that equals "H"
    ?.map((val) => val.size); // Map to get the size values

  // console.log(widthSizes); // Output: [5, 10, 25]
  // console.log(heightSizes); // Output: [5, 10, 25]
  const [state, setState] = useState({
    width: widthSizes?.[0] || "", // Default to the first width size
    height: heightSizes?.[0] || "", // Default to the first height size
  });

  useEffect(() => {
    // Ensure the state is set with the first item from the arrays initially
    if (widthSizes?.length > 0 && !state.width) {
      setState((prevState) => ({
        ...prevState,
        width: widthSizes[0],
      }));
    }
    if (heightSizes?.length > 0 && !state.height) {
      setState((prevState) => ({
        ...prevState,
        height: heightSizes[0],
      }));
    }
  }, [widthSizes, heightSizes]);

  const handleCardClick = (categoryId, subCat) => {
    // Update the selected card for the specific category
    setSelectedCard((prevSelectedCards) => ({
      ...prevSelectedCards,
      [categoryId]: subCat, // Store the selected subcategory object
    }));
  };

  const swiperRef = useRef(null);

  // Function to handle thumbnail click
  const handleThumbClick = (index) => {
    swiperRef.current.swiper.slideTo(index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log(state, "state");
  };

  // const data = {
  //   name: ProductData[0].title,
  //   description: ProductData[0].description,
  // };
  const getApi = async () => {
    ProductService.product().then((res) => {
      const response = res.data;
      setAllData(response);
      console.log(alldata, "alldata");
      console.log(response, "response");
    });

    // const res = await axios.get(`${url}/product/2`, {
    //   headers: {
    //     "Authorization": `Bearer ${token}`
    //   }
    // });
  };

  useEffect(() => {
    getApi();
  }, []);

  const handleClick = async (e) => {
    // let response = await axios(`${url}/product`, {
    //   method: "POST", //not needed here declare above
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${token}`
    //   },
    //   data: { ...data }
    // });
    // console.log(response);
  };

  // const [age, setAge] = React.useState("");

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  return (
    <Box className="product_box">
      <Container>
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
                    <SwiperSlide
                      key={index}
                      className="product-swiper-slide text-center"
                    >
                      <img
                        src={process.env.REACT_APP_API_BASE_URL + item?.path}
                        alt=""
                        style={{ width: "100%", height: "100%" }}
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
                            src={
                              process.env.REACT_APP_API_BASE_URL + item?.path
                            }
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
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
                style={{
                  color: "#3F5163",
                  fontSize: "60px",
                  lineHeight: "auto",
                  fontWeight: "bold",
                  fontFamily: "Avenir LT Std",
                }}
              >
                {alldata?.name}
              </Typography>
              <Rating
                style={{ color: "#F6AA03 !important" }}
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
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
              <Divider style={{ width: "100%", marginTop: "40px" }} />
              {/* <Box style={{ marginTop: "30px" }}>
                <Grid container spacing={4}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Typography
                      style={{
                        fontSize: "22px",
                        lineHeight: "32px",
                        fontWeight: "bold",
                      }}
                    >
                      Size (in Inches)
                    </Typography>
                    <div className="size-form">
                      <div className="size-field">
                        <div className="left">
                          <p className="weight_para">W</p>
                        </div>
                        <div className="right">
                          <FormControl sx={{ m: 0, minWidth: 70 }}>
                            <Select
                              value={state?.width}
                              name="width"
                              onChange={(e) => handleChange(e)}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                              sx={{
                                boxShadow: "none",
                                ".MuiOutlinedInput-notchedOutline": {
                                  border: 0,
                                },
                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: 0,
                                  },
                                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: 0,
                                  },
                              }}
                            >
                              <MenuItem value="">
                                <em>
                                  {widthSizes && widthSizes.length > 0
                                    ? widthSizes[0]
                                    : null}
                                </em>
                              </MenuItem>
                              {widthSizes && widthSizes.length > 1 && (
                                <MenuItem value={widthSizes[1]}>
                                  {widthSizes[1]}
                                </MenuItem>
                              )}
                              {widthSizes && widthSizes.length > 2 && (
                                <MenuItem value={widthSizes[2]}>
                                  {widthSizes[2]}
                                </MenuItem>
                              )}
                            </Select>
                          </FormControl>
                        </div>
                      </div>

                      <div className="size-field">
                        <div className="left">
                          <p className="height_para">H</p>
                        </div>
                        <div className="right">
                          <FormControl sx={{ m: 0, minWidth: 70 }}>
                            <Select
                              value={state?.height}
                              name="height"
                              onChange={(e) => handleChange(e)}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                              sx={{
                                boxShadow: "none",
                                ".MuiOutlinedInput-notchedOutline": {
                                  border: 0,
                                },
                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: 0,
                                  },
                                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: 0,
                                  },
                              }}
                            >
                              <MenuItem value="">
                                <em>
                                  {heightSizes && heightSizes.length > 0
                                    ? heightSizes[0]
                                    : null}
                                </em>
                              </MenuItem>
                              {heightSizes && heightSizes.length > 1 && (
                                <MenuItem value={heightSizes[1]}>
                                  {heightSizes[1]}
                                </MenuItem>
                              )}
                              {heightSizes && heightSizes.length > 2 && (
                                <MenuItem value={heightSizes[2]}>
                                  {heightSizes[2]}
                                </MenuItem>
                              )}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Typography
                      style={{
                        fontSize: "22px",
                        lineHeight: "32px",
                        fontWeight: "bold",
                      }}
                    >
                      Quantity :
                    </Typography>

                    <Box
                      style={{
                        border: "1px solid #868686",
                        width: "50%",
                        marginTop: "20px",
                        height: "53%",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Typography
                        onClick={() => setCount(count - 1)}
                        style={{
                          marginRight: "10px",
                          color: "#868686",
                          cursor: "pointer",
                        }}
                      >
                        -
                      </Typography>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#868686",
                        }}
                      >
                        {count}
                      </span>
                      <Typography
                        onClick={() => setCount(count + 1)}
                        style={{
                          marginLeft: "10px",
                          color: "#868686",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box> */}
              <Box sx={{ marginTop: "30px" }}>
                <Grid container spacing={4}>
                  {/* Size (in Inches) Section */}
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Typography
                      sx={{
                        fontSize: "22px",
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
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  { border: 0 },
                              }}
                            >
                              {widthSizes?.map((size, index) => (
                                <MenuItem key={index} value={size}>
                                  <em>{size}</em>
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
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  { border: 0 },
                              }}
                            >
                              {heightSizes?.map((size, index) => (
                                <MenuItem key={index} value={size}>
                                  <em>{size}</em>
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                  </Grid>

                  {/* Quantity Section */}
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Typography
                      sx={{
                        fontSize: "22px",
                        lineHeight: "32px",
                        fontWeight: "bold",
                      }}
                    >
                      Quantity:
                    </Typography>

                    <Box
                      sx={{
                        border: "1px solid #868686",
                        width: "50%",
                        marginTop: "20px",
                        height: "53%",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Typography
                        onClick={() => setCount(count - 1)}
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
                      <Typography
                        onClick={() => setCount(count + 1)}
                        sx={{ color: "#868686", cursor: "pointer" }}
                      >
                        +
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider style={{ width: "100%", marginTop: "40px" }} />
              {alldata?.categories?.map((category) => (
                <Accordion
                  key={category.id}
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    border: "1px solid #DCDCDC",
                    borderRadius: "10px",
                    marginTop: "25px",
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
                        {selectedCard[category.id].subCatName}
                      </Typography>
                    )}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {category?.subCategories?.map((subCat) => (
                        <Grid item xs={6} key={subCat.id}>
                          <Paper
                            elevation={3}
                            sx={{
                              padding: 1,
                              textAlign: "center",
                              border:
                                selectedCard[category.id]?.id === subCat.id
                                  ? "2px solid"
                                  : "none",
                              borderColor:
                                selectedCard[category.id]?.id === subCat.id
                                  ? "#ff9900"
                                  : "none",
                              cursor: "pointer",
                            }}
                            onClick={() => handleCardClick(category.id, subCat)}
                          >
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold" }}
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
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
              <Divider />
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
                  width: "100%",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#3F5163 !important",
                  },
                }}
              >
                Add to Cart
              </Button>
              <Typography
                sx={{ color: "#868686", fontSize: "18px", marginTop: "30px" }}
              >
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
