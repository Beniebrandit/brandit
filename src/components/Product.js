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
} from "@mui/material";
import "swiper/css";
// Libraries
import EastIcon from "@mui/icons-material/East";
import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Product.css";
import { Add } from "@mui/icons-material";
import axios from "axios";
const TestimonialsCarouselData9 = [
  { thumbimg: require("../asset/images/product_1.png") },
  { thumbimg: require("../asset/images/product_1.png") },
  { thumbimg: require("../asset/images/product_1.png") },
  { thumbimg: require("../asset/images/product_1.png") },
  { thumbimg: require("../asset/images/product_1.png") },
  { thumbimg: require("../asset/images/product_1.png") },
  { thumbimg: require("../asset/images/product_1.png") },
  { thumbimg: require("../asset/images/product_1.png") },
];
const ProductData = [
  {
    title: "Plastic Sign",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
];

const url = `https://flagg.devlopix.com/api`;
const token = `6|q8mTawTdGKbRdLazOGLcm1Y0zJe5ks4IPUWRJNIR13495c0c`

const Product = (props) => {
  const [count, setCount] = useState(1);
  const [value, setValue] = useState(2);
  const [alldata, setAllData] = useState();
  const [state, setState] = useState({
    height: "",
    width: "",
  });

  const swiperRef = useRef(null);

  const customPagination = (index, className) => {
    return `
    <div style="margin:0 10px;">
      <span class="${className}" style="background-image: url(${TestimonialsCarouselData9[index].thumbimg});"></span>
    </div>
    `;
  };

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
    console.log(state, "state");
  };

  const data = {
    name: ProductData[0].title,
    description: ProductData[0].description,
  };
  const getApi = async () => {

    const res = await axios.get(`${url}/product/2`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
     const response = res.data
     setAllData(response)
     console.log(alldata,"alldata")
     console.log(response,"response")
  }

  useEffect(() => {
    getApi();
  },[])

  const handleClick = async (e) => {
    let response = await axios(`${url}/product`, {
      method: "POST", //not needed here declare above
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      data: { ...data }
    });
    console.log(response);
  };

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
                  // pagination={{
                  //   clickable: true,
                  //   renderBullet: customPagination,
                  // }}
                  className="product-swiper"
                >
                  {TestimonialsCarouselData9.map((item, index) => (
                    <SwiperSlide
                      key={index}
                      className="product-swiper-slide text-center"
                    >
                      <img
                        src={item.thumbimg}
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
                  {TestimonialsCarouselData9.map((item, index) => (
                    <SwiperSlide key={index}>
                      <img
                        onClick={() => handleThumbClick(index)}
                        src={item.thumbimg}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          cursor: "pointer",
                          borderRadius: "20px",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="swiper-prev">
                  <KeyboardBackspaceIcon />
                </div>
                <div className="swiper-next">
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
                {alldata?.data.name}
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
                {alldata?.data.description}
              </Typography>
              <Divider style={{ width: "100%", marginTop: "40px" }} />
              <Box style={{ marginTop: "30px" }}>
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
                          <input
                            type="number"
                            placeholder=""
                            onChange={(e) => handleChange(e)}
                            name="height"
                            value={state.height}
                            className="weight_input"
                          />
                        </div>
                      </div>

                      <div className="size-field">
                        <div className="left">
                          <p className="height_para">H</p>
                        </div>
                        <div className="right">
                          <input
                            type="number"
                            placeholder=""
                            onChange={(e) => handleChange(e)}
                            name="width"
                            value={state.width}
                            className="weight_input"
                          />
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
              </Box>

              <Divider style={{ width: "100%", marginTop: "40px" }} />

              <Accordion
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
                  aria-controls="panel1-content"
                  id="panel1-header"
                  style={{
                    fontSize: "18px",
                    color: "#3F5163",
                    lineHeight: "18px",
                    fontWeight: "400",
                  }}
                >
                  Lorem Ipsum is simply dummy text
                </AccordionSummary>
                <AccordionDetails>
                  Lorem Ipsum is simply dummy text
                </AccordionDetails>
              </Accordion>
              <Accordion
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
                  aria-controls="panel2-content"
                  id="panel2-header"
                  style={{
                    fontSize: "18px",
                    color: "#3F5163",
                    lineHeight: "18px",
                    fontWeight: "400",
                  }}
                >
                  Lorem Ipsum is simply dummy text
                </AccordionSummary>
                <AccordionDetails>
                  Lorem Ipsum is simply dummy text
                </AccordionDetails>
              </Accordion>
              <Accordion
                style={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  border: "1px solid #DCDCDC",
                  borderRadius: "10px",
                  marginTop: "25px",
                }}
              >
                <AccordionSummary
                  expandIcon={<AddIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                  style={{
                    fontSize: "18px",
                    color: "#3F5163",
                    lineHeight: "18px",
                    fontWeight: "400",
                  }}
                >
                  Lorem Ipsum is simply dummy text
                </AccordionSummary>
                <AccordionDetails>
                  Lorem Ipsum is simply dummy text
                </AccordionDetails>
                <AccordionActions>
                  <Button>Cancel</Button>
                  <Button>Agree</Button>
                </AccordionActions>
              </Accordion>
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
