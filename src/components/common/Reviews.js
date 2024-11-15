import {
  Box,
  Container,
  Typography,
  Grid,
  Pagination,
  Button,
  LinearProgress,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Link,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import { ReviewService } from "../../services/Review.service";
import CustomPagination from "./CustomPagination";

const Reviews = (props) => {
  const [value, setValue] = useState(5);
  const [open, setOpen] = useState(false);
  const [emailNotification, setEmailNotification] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(0);
  const [productId, setProductId] = useState();
  const [reviews, setReviews] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const paginatedReviews = reviews?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



  const [payload, setPayload] = useState({
    user_id: "",
    product_id: "",
    stars: "",
    review: "",
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchUserData = async (token) => {
    const response = await fetch("https://flagg.devlopix.com/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data) {
      setProductId(data.id);
      console.log("productId", data.id);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      fetchUserData(token);
    }
  }, []);

  useEffect(() => {
    setPayload({
      user_id: productId,
      product_id: 1,
      stars: rating,
      review: question,
    });
  }, [rating, question]);
  console.log("payload", payload);

  const getReview = async () => {
    try {
      const res = await ReviewService.Reviews();
      const reviewss = res.data;
      setReviews(reviewss);
      console.log(reviewss, "reviewss");
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  function handleClick() {
    ReviewService.Postreview(payload)
      .then((res) => {
        console.log("Postreview", res);
      })
      .catch((error) => {
        console.error("API call failed:", error);
        //setError("Unable to fetch pricing. Please try again later.");
      });
    setPayload({
      user_id: "",
      product_id: "",
      stars: "",
      review: "",
    });
  }

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
                onClick={handleOpen}
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
            {paginatedReviews?.length > 0
              ? paginatedReviews?.map((item, index) => (
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
                                }}
                              >
                                {item.user_name}
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
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              {Array.from({ length: item.stars }).map((_, i) => (
                                <StarIcon key={i} sx={{ color: "black" }} />
                              ))}
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
                        {item.review}
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
                        <b>ITEM TYPE:</b>
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
                      <Box sx={{ display: "flex", alignItems: "center", marginTop: "15px" }}>
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
                ))
              : "No reviews available"}
          </Grid>

          {/* Pagination Controls */}
          <CustomPagination
            totalItems={reviews?.length}
            itemsPerPage={itemsPerPage} // Ensure itemsPerPage is set to a valid number, like 6
            onPageChange={handlePageChange}
          />
        </Container>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Review product
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" gutterBottom>
            Vinyl Banners
          </Typography>
          {/* Rating Field */}
          <Typography variant="body2" gutterBottom>
            Your Rating:
          </Typography>
          <Rating value={rating} onChange={(event, newValue) => setRating(newValue)} />
          <TextField
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            placeholder="Write your review..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            inputProps={{ maxLength: 255 }}
            helperText={`${question.length}/255 characters`}
          />
          <FormControlLabel
            control={<Checkbox checked={emailNotification} onChange={(e) => setEmailNotification(e.target.checked)} />}
            label="You will be able to receive emails in connection with this review (eg if others comment on your review). All emails contain the option to unsubscribe. We can use the text and star rating from your review in other marketing."
          />
          <FormControlLabel
            control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
            label={
              <>
                I accept the{" "}
                <Link href="#" underline="always">
                  Terms & Conditions
                </Link>
              </>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="text" color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Submit action here
              console.log("Submitted");
              handleClose();
              handleClick();
            }}
            variant="contained"
            color="success"
            disabled={!termsAccepted || question.length === 0}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Reviews;
