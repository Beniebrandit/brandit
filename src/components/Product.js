import React, { useState, useRef } from "react";
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
} from "@mui/material";
import "swiper/css";
// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

const Product = (props) => {
  const [count, setCount] = useState(0);
  const [value, setValue] = React.useState(2);
  const swiperRef = useRef(null);
  const swiperThumbRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const customPagination = (index, className) => {
    return `
    <div style="margin:0 10px;">
      <span class="${className}" style="background-image: url(${TestimonialsCarouselData9[index].thumbimg});"></span>
    </div>
    `;
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
                  pagination={{
                    clickable: true,
                    renderBullet: customPagination,
                  }}
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
                  <button
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
                  </button>
                </Swiper>
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
                Plastic Sign
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
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
              <Divider style={{ width: "100%", marginTop: "40px" }} />
              <Box style={{ marginTop: "30px" }}>
                <Grid container spacing={4} justifyContent="space-between">
                  <Grid item md={6}>
                    <Typography
                      style={{
                        fontSize: "22px",
                        lineHeight: "32px",
                        fontWeight: "bold",
                      }}
                    >
                      Size (in Inches)
                    </Typography>
                    <Box style={{ marginTop: "20px" }}>
                      <TextField
                        style={{
                          border: "none",
                          width: "40%",
                          marginRight: "20px",
                        }}
                      />
                      <TextField style={{ border: "none", width: "40%" }} />
                    </Box>
                  </Grid>
                  <Grid item md={6}>
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
                        border: "1px solid #3F5163",
                        width: "55%",
                        marginTop: "20px",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        onClick={() => setCount(count - 1)}
                        style={{ marginRight: "10px" }}
                      >
                        -
                      </Button>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {count}
                      </span>
                      <Button
                        onClick={() => setCount(count + 1)}
                        style={{ marginLeft: "10px" }}
                      >
                        +
                      </Button>
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
                  expandIcon={<ExpandMoreIcon />}
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
                  expandIcon={<ExpandMoreIcon />}
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
                  expandIcon={<ExpandMoreIcon />}
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
              <Button
                style={{
                  backgroundColor: "#3F5163",
                  width: "100%",
                  marginTop: "10px",
                  color: "#FFFFFF",
                  fontSize: "18px",
                  lineHeight: "18px",
                  fontWeight: "500",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                Add to Cart
              </Button>

              <Typography
                style={{
                  color: "#868686",
                  fontSize: "18px",
                  lineHeight: "18px",
                  marginTop: "20px",
                }}
              >
                Category
                <span
                  style={{
                    color: "#3F5163 !important",
                    fontSize: "18px",
                    lineHeight: "18px",
                    fontWeight: "600",
                  }}
                >
                   Rigid Signs
                </span>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Product;
