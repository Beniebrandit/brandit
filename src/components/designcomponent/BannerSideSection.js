import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactComponent as Sidebarsetting } from "../../asset/images/sidebar_setting.svg";
import { ReactComponent as Eye } from "../../asset/images/Eye.svg";
import { Circles } from "react-loader-spinner";
import { RingLoader } from "react-spinners";
import { ProductService } from "../../services/Product.service";

const BannerSideSection = ({
  onToggleAccordion,
  productDetails,
  alldata,
  setShowSection,
  setValue,
  setIsTabOpen,
  storedPayload,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [finalProductData, setFinalProductData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [displayedPrice, setDisplayedPrice] = useState(null);
  const [isInitialPriceSet, setIsInitialPriceSet] = useState(false);

  const theme = useTheme();

  // Toggle Accordion
  const handleAccordionChange = () => {
    setIsAccordionOpen((prevState) => !prevState);
    onToggleAccordion(!isAccordionOpen);
  };

  // Open Config Tab
  const OpenConfig = () => {
    setValue(0);
    setIsTabOpen(true);
  };

  // Set initial product data based on storedPayload
  useEffect(() => {
    if (!storedPayload) {
      console.log("No storedPayload found. Initializing default data.");

      const newWidth = alldata?.productSizes?.[0]?.size || "";
      const newHeight = alldata?.productSizes?.[0]?.size || "";

      const initialSubCatIds = [];

      alldata?.categories?.forEach((category) => {
        if (category?.subCategories?.length > 0) {
          const firstSubCat = category.subCategories[0];
          initialSubCatIds.push(firstSubCat.id);
        }
      });
      // setSelectedSubCatId(initialSubCatIds);

      setFinalProductData({
        width: newWidth,
        height: newHeight,
        quantity: 1,
        price: 0,
        ProductId: alldata?.id || null,
        subCatId: JSON.stringify(initialSubCatIds), // Store subCatId
      });
    } else {
      setFinalProductData({
        width: storedPayload.width || "",
        height: storedPayload.height || "",
        quantity: storedPayload.quantity || 1,
        price: storedPayload.price || null,
        ProductId: alldata?.id || null,
        subCatId: storedPayload.subCatId || "", // Ensure subCatId is included from storedPayload
      });
    }
  }, [storedPayload, alldata]);

  useEffect(() => {
    if (!isInitialPriceSet && finalProductData?.price && finalProductData?.quantity > 0) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setDisplayedPrice((finalProductData.price / finalProductData.quantity).toFixed(2));
        setIsInitialPriceSet(true);
      }, 3000);

      return () => clearTimeout(timeout);
    } else if (isInitialPriceSet && productDetails?.price && productDetails?.quantity > 0) {
      const updateTimeout = setTimeout(() => {
        setDisplayedPrice((productDetails.price / productDetails.quantity).toFixed(2));
      }, 1700);

      return () => clearTimeout(updateTimeout);
    }
  }, [finalProductData, productDetails, isInitialPriceSet]);

  useEffect(() => {
    const fetchPrice = async () => {
      if (
        finalProductData.width &&
        finalProductData.height &&
        finalProductData.quantity > 0 &&
        finalProductData.subCatId
      ) {
        setIsLoading(true);

        try {
          const payload = {
            width: finalProductData.width,
            height: finalProductData.height,
            ProductId: finalProductData.ProductId,
            quantity: finalProductData.quantity,
            subCatId: finalProductData.subCatId, // Include subCatId in the payload
          };

          const res = await ProductService.Dataprice(payload);
          const totalPrice = res.data?.totalPrice || 50;
          setDisplayedPrice((totalPrice / finalProductData.quantity).toFixed(2)); // Calculate price per item
        } catch (error) {
          console.error("Error fetching price:", error);
          setDisplayedPrice("Error");
        } finally {
          setIsLoading(false);
        }
      }
    };

    // Using a debounce to prevent rapid fetch calls during quick state changes
    const debounceFetch = setTimeout(fetchPrice, 500);

    return () => clearTimeout(debounceFetch);
  }, [
    finalProductData.width,
    finalProductData.height,
    finalProductData.quantity,
    finalProductData.subCatId, // Track only relevant fields
  ]);


  useEffect(() => {
    if (productDetails) {
      setFinalProductData((prevData) => ({
        ...prevData,
        width: productDetails.width || prevData.width,
        height: productDetails.height || prevData.height,
        quantity: productDetails.quantity || prevData.quantity,
        price: productDetails.price || prevData.price,
        subCatId: productDetails.subCatId || prevData.subCatId,
      }));
    }
  }, [productDetails]);


  console.log("finalProductData", finalProductData);
  //console.log("productDetails", productDetails);

  return (
    <Box
      sx={{
        height: isAccordionOpen ? "78vh" : "auto",
        width: { sm: "300px" },
        marginTop: "20px",
        boxShadow: "0px 5px 30px -15px",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #868686",
        alignItems: "end",
        position: "fixed",
        background: "#fff",
        right: "0.5rem",
        top: "5.5rem",
        color: isAccordionOpen
          ? {
            xs: "transparent",
            sm: "transparent",
            md: "#3F5163",
            lg: "#3F5163",
          }
          : "transparent", // fully transparent when accordion is closed
        borderRadius: "6px",
        zIndex: "1000",
      }}
    >
      <Accordion
        expanded={isAccordionOpen}
        onChange={handleAccordionChange}
        sx={{ width: "100%", boxShadow: "none", background: "#fff", position: "relative", zIndex: "1" }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
          <Typography sx={{ color: "#3F5163", fontWeight: "bold", fontSize: "20px" }}>Banner</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                height: "35rem",
                width: "100%",
              }}
            >
              <RingLoader color="#3F5163" loading size={70} speedMultiplier={1} />
            </Box>
          ) : (
            <Box sx={{ margin: "auto", marginTop: "1rem", position: "relative" }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "1rem",
                  backgroundColor: "white",
                  borderRadius: "1rem",
                }}
              >
                {/* Material Section */}
                <Box sx={{ display: "grid", gap: "6px" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                      <Typography sx={{ color: "#3F5163", fontSize: "16px", fontWeight: 500 }}>Material</Typography>
                      <Typography sx={{ fontSize: "16px", color: "#868686" }}>{alldata?.name}</Typography>
                    </Box>
                    <Box sx={{ display: "grid", paddingLeft: "2px" }} onClick={OpenConfig}>
                      <Sidebarsetting style={{ paddingLeft: "8px", height: "23px" }} />
                      <Typography sx={{ fontSize: "16px", color: "#3F5163", fontWeight: 400 }}>Config</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Size Section */}
                <Box>
                  <Typography sx={{ color: "#3F5163", fontSize: "16px", fontWeight: 500 }}>Size</Typography>
                  <Typography sx={{ fontSize: "16px", color: "#868686" }}>
                    {productDetails?.width == "" ? finalProductData?.width : productDetails?.width || "N/A"}" W X{" "}
                    {productDetails?.height == "" ? finalProductData?.height : productDetails?.height || "N/A"}" H
                  </Typography>
                </Box>

                {/* Quantity Section */}
                <Box>
                  <Typography sx={{ color: "#3F5163", fontSize: "16px", fontWeight: 500 }}>Quantity</Typography>
                  <Typography sx={{ fontSize: "16px", color: "#868686" }}>
                    {productDetails?.quantity == "" ? finalProductData?.quantity : productDetails?.quantity || 1} qty
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: "#3F5163", fontSize: "16px", fontWeight: 500 }}>Price</Typography>
                  <Typography sx={{ fontSize: "16px", color: "#868686" }}>
                    <span style={{ color: "#E0CE8F" }}>
                      ${displayedPrice || "N/A"}
                    </span>{" "}
                    each
                  </Typography>
                </Box>

                {/* View Proof */}
                <Box sx={{ display: "flex" }}>
                  <Eye style={{ width: "25px", height: "auto" }} />
                  &nbsp;
                  <Typography
                    onClick={() => setShowSection(false)}
                    sx={{ color: "#3F5163", fontWeight: "bold", fontSize: "20px", cursor: "pointer" }}
                  >
                    View Proof
                  </Typography>
                </Box>

                <Divider />

                {/* Save & Continue */}
                <Button
                  sx={{
                    borderRadius: "10px",
                    height: "50px",
                    color: "white",
                    backgroundColor: "#3F5163",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#3F5163",
                    },
                  }}
                >
                  Save & Continue
                </Button>
              </Box>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default BannerSideSection;
