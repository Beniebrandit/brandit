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
    setState({
      width: firstWidth,
      height: firstHeight,
    });
    setSelectedWidth(firstWidth);
    setSelectedHeight(firstHeight);
  }
}, [alldata]);


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

  // const data = {
  //   name: ProductData[0].title,
  //   description: ProductData[0].description,
  // };
  
  const getApi = async () => {
    ProductService.product().then((res) => {
      const response = res.data;
      setAllData(response);
      //console.log(response, "response");
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

  const handleClick = async () => {
        //ProductService.Dataprice(payload).then((res) => {
        //    console.log(res.data.totalPrice, "totalPrice");
        //    setPrice(res.data.totalPrice)
        //});
  };

//  useEffect(() => {
//console.log(payload, "payload");
//  }, [payload]);

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
                    <SwiperSlide key={index} className="product-swiper-slide text-center">
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
                            src={process.env.REACT_APP_API_BASE_URL + item?.path}
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
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 },
                              }}
                            >
                              {widthSizes?.map((size) => (
                                <MenuItem key={size.id} value={size.size}>
                                  <em>{size.size}</em>
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
              ))}
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography>
                    <b>Price:</b>
                  </Typography>
                  <Typography sx={{ fontSize: "22px", color: "rgb(63, 81, 99)" }}>${price}</Typography>
                </Box>
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
