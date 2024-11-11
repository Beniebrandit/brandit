import {
  Box,
  Container,
  Typography,
  Grid,
  Pagination,
  Button,
  LinearProgress,
  Rating,
} from "@mui/material";
import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import StarIcon from "@mui/icons-material/Star";
import facebook1 from "../../asset/images/facebook1.png";
import facebook2 from "../../asset/images/facebook2.png";
import facebook3 from "../../asset/images/facebook3.png";
import facebook4 from "../../asset/images/facebook4.png";
import facebook5 from "../../asset/images/facebook5.png";
import facebook6 from "../../asset/images/facebook6.png";
import { ReactComponent as Customerreviewicon } from "../../asset/images/customerreviewicon.svg";
const Reviews = (props) => {
  const [value, setValue] = useState(5);
  return (
    <>
      <Box id="customerreviews" sx={{ marginTop: "130px" }}>
        <Container>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "60px",
              color: "#3F5163",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            Customer Reviews
          </Typography>

          <Grid
            container
            sx={{ marginTop: "40px", marginBottom: "40px", gridTemplateColumns: "1.5fr 2fr 3fr 3fr" }}
            spacing={2}
          >
            <Grid item md={3} sm={12} xs={12}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    color: "#3F5163",
                    fontSize: "37px",
                    fontWeight: "bold",
                  }}
                >
                  4.8
                </Typography>
                <Rating
                  style={{ color: "#FCB20F !important" }}
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>
              <Typography sx={{ color: "#868686", fontSize: "15px" }}>Based on 695 reviews</Typography>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {Array(4)
                  .fill("")
                  .map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 1,
                      }}
                    >
                      <Typography sx={{ display: "flex" }}>
                        {Array(5)
                          .fill("")
                          .map((_, i) => (
                            <StarIcon key={i} sx={{ color: "#FCB20F" }} />
                          ))}
                      </Typography>
                      <Box sx={{ flexGrow: 1, marginLeft: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={Math.random() * 100}
                          sx={{
                            height: 10,
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#FCB20F",
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
              <Grid container>
                <Grid item md={4}>
                  <img alt="facebook1" src={facebook1} width="70%" height="70%" />
                </Grid>
                <Grid item md={4}>
                  {" "}
                  <img alt="facebook2" src={facebook2} width="70%" height="70%" />
                </Grid>
                <Grid item md={4}>
                  <img alt="facebook3" src={facebook3} width="70%" height="70%" />
                </Grid>
                <Grid item md={4}>
                  <img alt="facebook4" src={facebook4} width="70%" height="70%" />
                </Grid>
                <Grid item md={4}>
                  <img alt="facebook5" src={facebook5} width="70%" height="70%" />
                </Grid>
                <Grid item md={4}>
                  <img alt="facebook6" src={facebook6} width="70%" height="70%" />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              md={3}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                paddingBottom: "20px",
              }}
            >
              <Button
                sx={{
                  background: "white",
                  border: "1px solid grey",
                  color: "#868686",
                  fontSize: "12px",
                }}
              >
                Write a Review
              </Button>
              <Button
                sx={{
                  background: "white",
                  border: "1px solid grey",
                  color: "#868686",
                  fontSize: "12px",
                }}
              >
                Most Helpful
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {props?.carddata?.length > 0
              ? props.carddata.map((item, index) => {
                  return (
                    <Grid item md={6} sm={12} xs={12} key={index}>
                      <Box
                        sx={{
                          backgroundColor: "#F5F5F5",
                          padding: "15px",
                          borderRadius: "8px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginBottom: "10px",
                            }}
                          >
                            <Customerreviewicon />
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                flexDirection: "column",
                                paddingLeft: "10px",
                                marginBottom: "5px",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  flexDirection: "row",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    color: "#000",
                                    // marginRight: "10px",
                                  }}
                                >
                                  John Doe
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    lineHeight: "14px",
                                    color: "#D4BA46",
                                    marginLeft: "50px",
                                  }}
                                >
                                  Verified Buyer
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  // margin: "auto",
                                  display: "flex",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                  {Array(5)
                                    .fill("")
                                    .map((_, i) => (
                                      <StarIcon key={i} sx={{ color: "black" }} />
                                    ))}
                                </Box>
                              </Box>
                            </Box>
                          </Box>

                          <Typography
                            sx={{
                              textAlign: "end",
                              color: "#000000",
                              fontWeight: "400",
                              fontSize: "12px",
                            }}
                          >
                            {item.date}
                          </Typography>
                        </Box>

                        <Typography
                          sx={{
                            color: "#868686",
                            fontSize: "16px",
                            lineHeight: "25px",
                            fontWeight: "500",
                          }}
                        >
                          {item.description}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#4D4D4D",
                            fontSize: "12px",
                            lineHeight: "20px",
                            fontWeight: "500",
                            marginTop: "10px",
                          }}
                        >
                          <b>ITEM TYPE: {item.itemtype}</b>
                        </Typography>
                        <Typography
                          sx={{
                            color: "#4D4D4D",
                            fontSize: "16px",
                            lineHeight: "20px",
                            fontWeight: "500",
                            marginTop: "10px",
                          }}
                        >
                          Lorem Ipsum is simply dummy text
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "15px",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#000000",
                              fontSize: "15px",
                              fontWeight: "400",
                              marginRight: "10px",
                            }}
                          >
                            Was this helpful?
                          </Typography>
                          <ThumbUpIcon sx={{ color: "black" }} />
                          &nbsp; 0
                          <ThumbDownAltIcon sx={{ marginLeft: "10px", color: "black" }} />
                          &nbsp;0
                        </Box>
                      </Box>
                    </Grid>
                  );
                })
              : "No reviews available"}
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Pagination count={10} page={1} shape="rounded" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Reviews;
