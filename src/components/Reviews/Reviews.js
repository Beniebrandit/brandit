import { Box, Container, Typography, Grid } from "@mui/material";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
const Reviews = (props) => {
  // console.log(props);

  // console.log(data);

  return (
    <>
      <Box sx={{ marginTop: "100px" }}>
        <Container>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "60px",
              color: "#3F5163",
              fontWeight: "600",
            }}
          >
            Customer Reviews
          </Typography>
          <Grid container spacing={2}>
            {props?.carddata?.length > 0
              ? props.carddata.map((item, index) => {
                  console.log(item);

                  return (
                    <>
                      <Grid item md={6} sm={12} xs={12} key={index}>
                        <Box
                          sx={{ backgroundColor: "#F5F5F5", padding: "15px" }}
                        >
                          <Typography
                            sx={{
                              textAlign: "end",
                              color: "#000000",
                              fontWeight: "400",
                              fontSize: "12px",
                              lineHeight: "12px",
                            }}
                          >
                            {item.date}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#868686",
                              fontSize: "16px",
                              lineHeight: "25px",
                              fontWeight: "500",
                              marginTop: "10px",
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
                              marginTop: "20px",
                            }}
                          >
                            ITEM TYPE:{item.itemtype}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#868686",
                              fontSize: "16px",
                              lineHeight: "25px",
                              fontWeight: "500",
                              marginTop: "20px",
                            }}
                          >
                            Lorem Ipsum is simply dummy text{" "}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography
                              sx={{
                                color: "#000000",
                                marginTop: "10px",
                                fontSize: "15px",
                                fontWeight: "400",
                              }}
                            >
                              Was this helpful?
                            </Typography>
                            <ThumbUpIcon />0
                            <ThumbDownAltIcon />
                          </Box>
                        </Box>
                      </Grid>
                    </>
                  );
                })
              : ""}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Reviews;
