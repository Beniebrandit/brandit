import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import banner1 from "../../asset/images/banner1.jpg";
import MaskGroup from "../../asset/images/Mask Group.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useEffect, useRef, useState } from "react";
import PopUp from "./Pop_Up";
import Navbar from "./Navbar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ProductService } from "../../services/Product.service";

const Banner = ({ handleClickOpenLogin, handleClickOpenSignUp }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const [count, setCount] = useState(1);
    const [value, setValue] = useState(0);
    const [alldata, setAllData] = useState();

    const [selectedCard, setSelectedCard] = useState({});

    // New state to store selected width, height, and subCat ids
    const [selectedWidth, setSelectedWidth] = useState("");
    const [selectedHeight, setSelectedHeight] = useState("");
    const [selectedSubCatId, setSelectedSubCatId] = useState([]);
    const [price, setPrice] = useState();
    const [rating, setRating] = useState();

    const [payload, setPayload] = useState({
      productId: null, // Assuming `id` is the unique identifier for the product
      width: "",
      height: "",
      subCatId: [],
    });

    const sizes = [
      { id: 1, value: "6x24", label: '6" x 24"' },
      { id: 2, value: "12x24", label: '12" x 24"' },
      { id: 3, value: "18x24", label: '18" x 24"' },
    ];


    const decrement = () => {
      if (count > 1) {
        setCount(count - 1);
      }
    };
    // Use effect to set initial selected subcategory and capture their IDs
//    useEffect(() => {
//      if (alldata?.categories?.length > 0) {
//        const initialSelection = {};
//        const initialSubCatIds = [];
//
//        alldata?.categories?.forEach((category) => {
//          if (category?.subCategories?.length > 0) {
//            // Set the first subcategory as the default selected card
//            const firstSubCat = category.subCategories[0];
//            initialSelection[category.id] = firstSubCat.id;
//
//            // Add the initially selected subcategory ID to the array
//            initialSubCatIds.push(firstSubCat.id);
//          }
//        });
//
//        setSelectedCard(initialSelection); // Update the state with initial selections
//        setSelectedSubCatId(initialSubCatIds); // Set the initially selected subcategory IDs
//      }
//    }, [alldata]);

    const widthSizes = alldata?.productSizes
      ?.filter((val) => val.size_type === "W")
      ?.map((val) => ({ size: val.size, id: val.id }));

    const heightSizes = alldata?.productSizes
      ?.filter((val) => val.size_type === "H")
      ?.map((val) => ({ size: val.size, id: val.id }));

const [state, setState] = useState({
  size: "",
});
const combinedSizes = widthSizes?.map((width, index) => ({
  size: `${width.size} x ${heightSizes?.[index]?.size || ""}`,
  id: width.id,
}));

useEffect(() => {
  if (alldata) {
    const firstSize = `${widthSizes?.[0]?.size || ""} x ${heightSizes?.[0]?.size || ""}`;
    setState({ size: firstSize });
    setSelectedWidth(widthSizes?.[0]?.size || "");
    setSelectedHeight(heightSizes?.[0]?.size || "");
  }
}, [alldata]);

const handleChange = (e) => {
  const { value } = e.target;
  const [width, height] = value.split(" x ");
  setState({ size: value });
  setSelectedWidth(width);
  setSelectedHeight(height);
};

    // console.log(widthSizes?.[0]?.size,"qqqqqqq");
    //useEffect(() => {
    //  if (alldata?.categories?.length > 0) {
    //    const initialSelection = {};
    //    const initialSubCatIds = [];
    //    alldata?.categories?.forEach((category) => {
    //      if (category?.subCategories?.length > 0) {
    //        const firstSubCat = category.subCategories[0];
    //        initialSelection[category.id] = firstSubCat.id; // Store the subCat ID
    //        initialSubCatIds.push(firstSubCat.id); // Push the initial subCat ID
    //      }
    //    });
    //    setSelectedCard(initialSelection);
    //    setSelectedSubCatId(initialSubCatIds);
    //  }
    //}, [alldata]);

    //useEffect(() => {
    //  const jsonString = JSON.stringify(selectedSubCatId);
    //  setPayload({
    //    width: selectedWidth,
    //    height: selectedHeight,
    //    subCatId: jsonString,
    //    ProductId: 10,
    //    quantity: count,
    //    //ProductId: alldata?.id || null,
    //  });
    //}, [selectedWidth, selectedHeight, selectedSubCatId, alldata, count]);

    //const handleCardClick = (categoryId, subCat) => {
    //  setSelectedCard((prevSelectedCards) => {
    //    const updatedCards = { ...prevSelectedCards, [categoryId]: subCat.id };
    //    const subCatIdsArray = Object.values(updatedCards).filter((value) => value !== undefined);
    //    setSelectedSubCatId(subCatIdsArray);
    //    return updatedCards;
    //  });
    //};

      const quantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setCount(isNaN(value) || value <= 0 ? 1 : value); // Ensure value is at least 1
      };



  const getApi = async () => {
    ProductService.product().then((res) => {
      const response = res.data;
      setAllData(response);
      //console.log(response, "response");
    });
  };

  useEffect(() => {
    getApi();
  }, []);


//    useEffect(() => {
//      if (!selectedWidth || !selectedHeight || selectedSubCatId.length === 0) {
//        console.error("Payload is incomplete. Ensure width, height, and subcategory are selected.");
//        //setError("Please select all required options before proceeding.");
//      } else {
//        const payload = {
//          width: selectedWidth,
//          height: selectedHeight,
//          subCatId: JSON.stringify(selectedSubCatId),
//          ProductId: 10,
//          quantity: count,
//        };
//
//        ProductService.Dataprice(payload)
//          .then((res) => {
//            if (res.data && res.data.totalPrice) {
//              setPrice(res.data.totalPrice);
//            } else {
//              setPrice(55);
//              //setError("Failed to fetch pricing information.");
//            }
//          })
//          .catch((error) => {
//            console.error("API call failed:", error);
//            //setError("Unable to fetch pricing. Please try again later.");
//          });
//      }
//    }, [payload]);

  return (
    <>
      <PopUp open={open} handleClose={handleClose} />

      <Box>
        <Navbar handleClickOpenSignUp={handleClickOpenSignUp} handleClickOpenLogin={handleClickOpenLogin} />

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src={banner1}
              width="100%"
              height="100%"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </div>

          <Box
            sx={{
              position: "relative",
              zIndex: 99,
              padding: "70px 50px 130px",
              marginLeft: {
                lg: "10rem",
                md: "8rem",
              },
              marginTop: "1rem",
            }}
          >
            {/*<Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={star} alt="star" />
            <Typography sx={{ fontSize: { xs: "13px", sm: "16px" }, padding: "1rem" }}>
              Rated By Hundreds Of Satisfied Customers
            </Typography>
          </Box>*/}
            <Typography
              sx={{
                fontSize: {
                  xs: "40px",
                  sm: "35px",
                  color: " white",
                  fontWeight: "600",
                  lineHeight: "52.8px",
                  margin: 0,
                  //fontSize: "40px",
                },
              }}
            >
              CREATE <br />
              SIGN IN MINUTES!
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", paddingTop: "5px" }}>
              <CheckCircleIcon sx={{ fontSize: { xs: "18px", sm: "24px" }, color: "white" }} />
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "400",
                  //margin: "16px 0 0 0",
                  fontSize: { xl: "20px", sm: "16px" },
                  lineHeight: "30px",
                }}
                // sx={{ fontSize: { xs: "13px", sm: "16px" } }}
              >
                High-quality materials and printing
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", paddingTop: "5px" }}>
              <CheckCircleIcon sx={{ fontSize: { xs: "18px", sm: "24px" }, color: "white" }} />

              <Typography
                sx={{
                  color: "white",
                  fontWeight: "400",

                  fontSize: { xl: "20px", sm: "16px" },
                  lineHeight: "30px",
                }}
              >
                Fast and easy online customization
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", paddingTop: "5px" }}>
              <CheckCircleIcon sx={{ fontSize: { xs: "18px", sm: "24px" }, color: "white" }} />

              <Typography
                sx={{
                  color: "white",
                  fontWeight: "400",
                  fontSize: { xl: "20px", sm: "16px" },
                  lineHeight: "30px",
                }}
              >
                Perfect for events, promotions, and branding
              </Typography>
            </Box>
          </Box>
        </div>
        {/*<Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              marginLeft: {
                lg: "10rem",
                md: "8rem",
              },
              padding: "2rem",
            }}
            className="demophoto"
          >
            <Box>
              <img src={MaskGroup} alt="MaskGroup" height={90} style={{ display: "block", margin: "auto" }} />
            </Box>
            <Box sx={{ padding: { sx: "2rem", sm: "1rem" } }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", sm: "flex-start" },
                  alignItems: "center",
                }}
              >
                <img src={star} alt="star" style={{ display: "block" }} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", sm: "flex-start" },
                  alignItems: "center",
                }}
              >
                <Typography sx={{ textAlign: { sx: "center", sm: "left" } }}>John Doe</Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    width: { sx: "200px", sm: "300px" },
                    // textAlign: { sx: "center", sm: "left" }, not working in inline
                  }}
                  className="protext"
                >
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>*/}
      </Box>
      <Box sx={{ margin: "auto", marginTop: "-3rem", position: "relative" }}>
        <Container
          sx={{
            width: {
              lg: "1200px",
              md: "40rem",
              sm: "35rem",
            },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xl: "3fr 2fr 1fr 1fr 1.5fr",
                lg: "3fr 2fr 1fr 1fr 1.5fr",
                md: "repeat(3, 1fr)",
                sm: "repeat(2 ,1fr)",
                xs: "repeat(1 ,1fr)",
              },
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "1rem",
              boxShadow: "10px 10px 35px -15px",
            }}
          >
            {/* Material Field */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Typography sx={{ fontSize: "20px", color: "#3F5163", fontWeight: 400 }}>Material</Typography>
              {/*<TextField
                placeholder="Stickers and Decals"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  sx: {
                    height: "60px", // Adjust this value as needed
                  },
                }}
              />*/}
              <FormControl sx={{ minWidth: 120, color: "#3F5163" }} size="small" fullWidth>
                <Select
                  labelId="Stickers and Decals"
                  id="size-select"
                  name="Material"
                  value="Stickers and Decals"
                  //onChange={handleChange}
                  displayEmpty
                  sx={{
                    color: "gray",
                    height: "60px",
                    padding: "0px 10px",
                    // Hide the dropdown icon
                    ".MuiSelect-icon": {
                      display: "none",
                    },
                  }}
                  //IconComponent={(props) => <ExpandMoreIcon />}
                >
                  <MenuItem value="Stickers and Decals">Stickers and Decals</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Size Field */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Typography sx={{ fontSize: "20px", color: "#3F5163", fontWeight: 400 }}>Size</Typography>
              <FormControl sx={{ minWidth: 120, color: "#3F5163" }} size="small" fullWidth>
                <Select
                  labelId="size-select-label"
                  id="size-select"
                  name="size"
                  value={state.size}
                  onChange={handleChange}
                  displayEmpty
                  sx={{ color: "gray", height: "60px", padding: "0px 10px" }}
                  IconComponent={(props) => <ExpandMoreIcon />}
                >
                  {combinedSizes?.map((size) => (
                    <MenuItem key={size.id} value={size.size}>
                      {size.size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Quantity Field */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Typography sx={{ fontSize: "20px", color: "#3F5163", fontWeight: 400 }}>Qty</Typography>
              <TextField
                value={count}
                onChange={quantityChange}
                type="number"
                variant="outlined"
                size="small"
                inputProps={{
                  min: 1, // Minimum value
                  step: 1, // Increment/Decrement step
                }}
                InputProps={{
                  sx: {
                    height: "60px", // Adjust this value as needed
                    textAlign: "center",
                  },
                }}
              />
            </Box>

            {/* Price Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "10px",
              }}
            >
              <Typography sx={{ fontSize: "28px", color: "#3F5163", fontWeight: 700 }}>$10.65</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    color: "#E0CE8F",
                    textDecoration: "line-through",
                  }}
                >
                  $13.31
                </Typography>
                <Typography sx={{ fontSize: "28px", color: "#3F5163", fontWeight: 500 }}>each</Typography>
              </Box>
            </Box>

            {/* Design Now Button */}
            <Button
              onClick={handleOpen}
              sx={{
                margin: "25px 0px 0px 0px",
                //width: "7rem",
                height: "60px",
                //margin: "auto",
                backgroundColor: "#3F5163",
                color: "white",
                fontWeight: 500,
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#2E4053",
                },
              }}
            >
              Design Now
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Banner;
