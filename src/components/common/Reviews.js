import {
  Box,
  Container,
  Typography,
  Grid,
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
  Divider,
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
import { ProductService } from "../../services/Product.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const Reviews = ({ productId, hidereviewbtn }) => {
  const [value, setValue] = useState(5);
  const [open, setOpen] = useState(false);
  const [opengallery, setOpenGallery] = useState(false);
  const [emailNotification, setEmailNotification] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(0);
  const [userId, setUserId] = useState();
  const [allreviews, setAllReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const itemsPerPage = 6;
  const paginatedReviews = allreviews?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const [payload, setPayload] = useState({
    user_id: "",
    product_id: "",
    stars: "",
    review: "",
    file: {},
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState([]);
  // const [allreviews, setAllReviews] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleGalleryOpen = () => {
    setOpenGallery(true);
  };

  const handleGalleryClose = () => {
    setOpenGallery(false);
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
      setUserId(data.id);
      // console.log("userId", data.id);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      fetchUserData(token);
    }
  }, []);

  useEffect(() => {
    const imageObject = selectedFiles.reduce((obj, image, index) => {
      obj[`${index}`] = image; // Assign a unique key for each image
      return obj;
    }, {});

    setPayload({
      user_id: userId,
      product_id: productId,
      stars: rating,
      review: question,
      file: imageObject[0] // Convert array to object
    });
  }, [rating, question, selectedFiles]);
  // console.log("payload", payload);
  // console.log("selectedFiles", selectedFiles);

  const getallReview = async () => {
    try {
      const res = await ReviewService.Reviews();
      const allreviewss = res.data;
      const allImages = allreviewss.filter((img) => img.images !== null);
      setAllImages(allImages)

      const totalStars = allreviewss.reduce((acc, review) => acc + review.stars, 0);
      const averageRating = allreviewss.length > 0 ? (totalStars / allreviewss.length).toFixed(1) : "0.0";
      setValue(averageRating);

      setAllReviews(allreviewss);
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  const getAllProducts = async () => {
    try {
      const res = await ProductService.Allproduct();
      setAllProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getallReview();
    getAllProducts();
  }, []);

  const getProductName = (productId) => {
    const product = allProducts.find((product) => product.id === productId);
    return product ? product.name : "Unknown Product";
  };

  const convertBlobToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    // Show loading state for new images
    setLoading((prev) => [...prev, ...Array(files.length).fill(true)]);

    // Convert images to base64
    const newBase64Images = await Promise.all(files.map(file => convertBlobToBase64(file)));

    setSelectedFiles((prevFiles) => [...prevFiles, ...newBase64Images]);

    // Simulate a loading delay
    files.forEach((_, index) => {
      setTimeout(() => {
        setLoading((prev) => {
          const newState = [...prev];
          newState[selectedFiles.length + index] = false;
          return newState;
        });
      }, 2000);
    });
  };
  const handleRemoveImage = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setLoading((prev) => prev.filter((_, i) => i !== index));
  };

  function handleClick() {
    if (userId) {
      ReviewService.Postreview(payload)
        .then((res) => {
          toast.success("Thank you for your review!");
          getallReview(); // Fetch updated reviews
        })
        .catch((error) => {
          toast.error("Failed to submit the review. Please try again.");
        });
      setPayload({
        user_id: "",
        product_id: "",
        stars: "",
        review: "",
        file: "",
      });
    } else {
      toast.warning("Please login first");
    }
  }

  // const fetchReviewData = async (item) => {
  //   console.log("id222", item)
  //   try {
  //     const response = await ReviewService.GetReviewById(item); // Replace with actual API call
  //     setLikesCount(response.data.likes_count);
  //     setDislikesCount(response.data.dislikes_count);
  //     setUserReaction(response.data.user_reaction); // If backend tracks user reaction
  //   } catch (error) {
  //     console.error("Error fetching review data:", error);
  //   }
  // };

  const handleLikeDislike = async (review_id, type) => {
    // console.log("review_id", review_id);

    if (!userId) {
      toast.warning("Please login to react to reviews.");
      return;
    }
    const user_id = userId;
    const payload = { user_id, review_id, type };

    try {
      await ReviewService.LikeDislike(payload);

      // Fetch the updated review data
      const response = await ReviewService.GetReviewById(review_id);
      const updatedReview = response.data;
      getallReview();

      // Update the specific review in allreviews
      setAllReviews(prevReviews =>
        prevReviews.map(review =>
          review.id === review_id ? { ...review, ...updatedReview } : review
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  // // Fetch updated review data on mount
  // useEffect(() => {
  //   fetchReviewData();
  // }, []);


  return (
    <>
      <Box id="customerreviews" sx={{ marginTop: "130px" }}>
        <Container>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { md: "60px", xs: "32px" },
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
                  {value}
                </Typography>
                <Rating
                  style={{ color: "#FCB20F !important" }}
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  readOnly
                />
              </Box>
              <Typography sx={{ color: "#868686", fontSize: "15px" }}>Based on {allreviews?.length} reviews</Typography>
              <Divider orientation="vertical" flexItem />
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {Array.from({ length: 5 }, (_, index) => {
                  const starValue = 5 - index; // Generate star ratings in descending order
                  const filteredReviews = allreviews?.filter((review) => review.stars === starValue); // Filter reviews for this star value
                  const percentage = (filteredReviews.length / allreviews?.length) * 100; // Calculate percentage
                  return (
                    <Box
                      key={starValue}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 1,
                      }}
                    >
                      {/* Display star icons dynamically */}
                      <Typography sx={{ display: "flex" }}>
                        {Array.from({ length: starValue }, (_, i) => (
                          <StarIcon key={i} sx={{ color: "#FCB20F" }} />
                        ))}
                        {Array.from({ length: 5 - starValue }, (_, i) => (
                          <StarIcon key={i + starValue} sx={{ color: "#868686" }} />
                        ))}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center", // Align items in the center vertically
                          flexGrow: 1,
                          marginLeft: 2,
                        }}
                      >
                        {/* Linear Progress Bar */}
                        <Box sx={{ flexGrow: 1, marginRight: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={percentage}
                            sx={{
                              height: 10,
                              borderRadius: 5, // Add rounded edges
                              backgroundColor: "#e0e0e0", // Background color for the track
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "#FCB20F", // Color of the progress bar
                              },
                            }}
                          />
                        </Box>
                        {/* Display the count */}
                        <Typography variant="body2" sx={{ color: "#868686" }}>
                          {filteredReviews?.length}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Grid>

            <Grid item md={3} sm={12} xs={12}>
              <Grid container sx={{ height: "100%" }}>
                {allImages.slice(0, 5).map((img, index) => (
                  <Grid item md={4} sx={{ margin: "auto" }} key={index}>
                    <img
                      src={process.env.REACT_APP_API_BASE_URL + img.images.path}
                      width="70px"
                      height="70px"
                      alt={`img-${index}`}
                    />
                  </Grid>
                ))}

                {allImages.length > 5 && (
                  <Grid item md={4} sx={{ margin: "auto" }}>
                    <Button sx={{ width: "70px", height: "70px", textTransform: "capitalize", color: "#868686", }} onClick={handleGalleryOpen}>
                      View All
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>

            {/* Dialog for viewing all images */}
            <Dialog open={opengallery} onClose={handleGalleryClose} fullWidth maxWidth="md">
              <DialogContent>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    color: "#3F5163",
                  }}
                >
                  Review Images
                </Typography>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)", // 1 column on extra small screens
                      sm: "repeat(2, 1fr)", // 2 columns on small screens
                      md: "repeat(3, 1fr)", // 3 columns on medium screens
                    },
                    gap: "16px", // Spacing between images
                  }}
                >
                  {allImages.map((img, index) => (
                    <Grid
                      item
                      key={index}
                      sx={{
                        position: "relative",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        paddingLeft: "0px !important",
                        paddingTop: "0px !important",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                    >
                      <img
                        src={process.env.REACT_APP_API_BASE_URL + img.images.path}
                        alt={`img-${index}`}
                        style={{
                          width: "100%",
                          height: "200px", // Fixed height for uniformity
                          objectFit: "cover", // Ensure images cover the area
                        }}
                      />
                      {/* Optional: Add a hover overlay with details */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          "&:hover": {
                            opacity: 1,
                          },
                        }}
                      >
                        <Typography variant="body2" sx={{ textAlign: "center" }}>
                          Review by: {img.user_name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleGalleryClose}
                  sx={{
                    backgroundColor: "#3F5163",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#2C3A4B",
                    },
                  }}
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
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
              {hidereviewbtn ? null : (
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
              )}
              <Button
                sx={{
                  background: "white",
                  border: "1px solid grey",
                  color: "#868686",
                  fontSize: "12px",
                  width: hidereviewbtn ? "100%" : "auto",
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
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "50px", // Adjust size as needed
                            height: "50px", // Adjust size as needed
                            borderRadius: "50%", // This makes it a circle
                            border: "1px solid black",
                            backgroundColor: "white", // Black background
                            color: "black", // White text color
                            fontWeight: "bold", // Optional: Make the letter bold
                            fontSize: "20px", // Adjust the font size of the letter inside the circle
                            fontFamily: "cerebri-font",
                          }}
                        >
                          {item.user_name ? item.user_name[0].toUpperCase() : ""}
                        </div>
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
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Box>
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
                          {getProductName(item.product_id)}
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
                          <Button sx={{ color: "black" }} onClick={() => handleLikeDislike(item.id, "like")}>
                            <ThumbUpIcon sx={{ color: item.likes_count >= 1 ? "#f2d388" : "black" }} />
                            &nbsp;{item.likes_count}
                          </Button>
                          <Button sx={{ color: "black" }} onClick={() => handleLikeDislike(item.id, "dislike")}>
                            <ThumbDownAltIcon sx={{ color: item.dislikes_count >= 1 ? "#f2d388" : "black" }} />
                            &nbsp;{item.dislikes_count}
                          </Button>
                        </Box>
                      </Box>
                      {item?.images?.path && <img style={{ height: "120px", width: "120px" }} src={process.env.REACT_APP_API_BASE_URL + item?.images?.path} />}
                    </Box>
                  </Box>
                </Grid>
              ))
              : "No reviews available"}
          </Grid>

          {/* Pagination Controls */}
          <CustomPagination
            totalItems={allreviews?.length}
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
          <Box sx={{ width: "100%", margin: "10px 0px", textAlign: "center" }}>
            {/* Upload Button */}
            <Button
              sx={{
                display: "flex",
                margin: "auto",
                justifyContent: "center",
                alignItems: "center",
                width: "70%",
                border: "2px solid lightgray",
                borderRadius: "25px",
              }}
              component="label"
            >
              <AddAPhotoIcon />
              <span style={{ marginLeft: "10px", paddingTop: "3px" }}>Add Photos</span>
              <input type="file" accept="image/*" onChange={handleFileChange} hidden />
            </Button>

            {/* Display Selected Images */}
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "15px" }}>
              {selectedFiles.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    margin: "10px",
                    width: "100px",
                    height: "100px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                  }}
                >
                  <img
                    src={image}
                    alt={`Selected ${index}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {/* Remove Button */}
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "rgba(255,255,255,0.7)",
                      "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                    }}
                    size="small"
                  >
                    <CloseIcon fontSize="small" color="error" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
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
              if (userId) {
                handleClose();
              }
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
      <ToastContainer />
    </>
  );
};

export default Reviews;
