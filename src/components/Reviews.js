import {
  Box,
  Container,
  Typography,
  Grid,
  Pagination,
  Button,
  LinearProgress,
} from "@mui/material";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import StarIcon from "@mui/icons-material/Star";
import facebook1 from "../asset/images/facebook1.png";
import facebook2 from "../asset/images/facebook2.png";
import facebook3 from "../asset/images/facebook3.png";
import facebook4 from "../asset/images/facebook4.png";
import facebook5 from "../asset/images/facebook5.png";
import facebook6 from "../asset/images/facebook6.png";
const Reviews = (props) => {
  return (
    <>
      <Box sx={{ marginTop: "50px" }}>
        <Container>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "40px",
              color: "#3F5163",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            Customer Reviews
          </Typography>

          <Grid container sx={{ marginTop: "40px", marginBottom: "40px" }} spacing={2}>
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
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon key={i} sx={{ color: "#FCB20F" }} />
                  ))}
              </Box>
              <Typography sx={{ color: "#868686", fontSize: "15px" }}>
                Based on 695 reviews
              </Typography>
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
                          sx={{ height: 10,  "& .MuiLinearProgress-bar": {
                            backgroundColor: "#FCB20F", 
                          }, }}
                        />
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
              <Grid container>
                <Grid item md={4}>
                  <img
                    alt="facebook1"
                    src={facebook1}
                    width="70%"
                    height="70%"
                  />
                </Grid>
                <Grid item md={4}>
                  {" "}
                  <img
                    alt="facebook2"
                    src={facebook2}
                    width="70%"
                    height="70%"
                  />
                </Grid>
                <Grid item md={4}>
                  <img
                    alt="facebook3"
                    src={facebook3}
                    width="70%"
                    height="70%"
                  />
                </Grid>
                <Grid item md={4}>
                  <img
                    alt="facebook4"
                    src={facebook4}
                    width="70%"
                    height="70%"
                  />
                </Grid>
                <Grid item md={4}>
                  <img
                    alt="facebook5"
                    src={facebook5}
                    width="70%"
                    height="70%"
                  />
                </Grid>
                <Grid item md={4}>
                  <img
                    alt="facebook6"
                    src={facebook6}
                    width="70%"
                    height="70%"
                  />
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
                            justifyContent: "space-between",
                            marginBottom: "10px",
                          }}
                        >
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "5px",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  fontWeight: "500",
                                  color: "#000",
                                  marginRight: "10px",
                                }}
                              >
                                John Doe
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  lineHeight: "14px",
                                  color: "#D4BA46",
                                  marginLeft: "90px",
                                }}
                              >
                                Verified Buyer
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              {Array(5)
                                .fill("")
                                .map((_, i) => (
                                  <StarIcon key={i} sx={{ color: "black" }} />
                                ))}
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
                          ITEM TYPE: {item.itemtype}
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
                          <ThumbUpIcon sx={{ color: "black" }} /> 0
                          <ThumbDownAltIcon
                            sx={{ marginLeft: "10px", color: "black" }}
                          />
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
