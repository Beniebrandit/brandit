import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import HelpIcon from "@mui/icons-material/Help";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const PremiumImg = ({ selectImage, images, setPremiumimg, handlePremiumImage }) => {
  const [selectedImages, setSelectedImages] = useState(null);
  const [imageName, setImageName] = useState("");
  const [valuePremium, setValuePremium] = useState(0);

  //  console.log("selexted imgage", selectImage);

  const handleChangePremium = (event, newValue) => {
    setValuePremium(newValue);
  };

  const handleCancelSearch = () => {
    setSelectedImages("");
    setImageName("");
  };

  // console.log(selectImage, "selectImage");
  const handleCategoryClick = (images, name) => {
    setSelectedImages(images);
    setPremiumimg(images);

    console.log(images, "images");

    setImageName(name);
  };
  return (
    <>
      <Box sx={{ padding: "0px !important", margin: "0px" }}>
        {/* Title */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Explore premium images <HelpIcon sx={{ justifyContent: "center" }} />
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={3}>
          Enhance your designs with exclusive, licensed images. Image licenses are just a flat fee of $5.99.
        </Typography>

        {/* Tabs for Photos and Vectors */}
        <Tabs
          value={valuePremium}
          onChange={handleChangePremium}
          aria-label="basic tabs"
          sx={{ mb: 2 }}
          classes={{ flexContainer: "flex-container-custom" }}
        >
          <Tab
            label="Photos"
            sx={{
              fontWeight: valuePremium === 0 ? "bold" : "normal",
            }}
          />
          <Tab
            label="Vectors"
            sx={{
              fontWeight: valuePremium === 1 ? "bold" : "normal",
            }}
          />
        </Tabs>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4, position: "relative", width: "100%" }}>
          <input
            type="text"
            value={imageName ? imageName : ""}
            onChange={(e) => setImageName(e.target.value)}
            placeholder="Search..."
            style={{
              width: "100%",
              padding: "10px 40px 10px 20px", // Space for close icon and search button
              borderRadius: "20px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
          {imageName && (
            <CancelIcon
              onClick={handleCancelSearch}
              style={{
                position: "absolute",
                right: "80px", // Adjust the position relative to the search button
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#aaa",
                height: "20px",
                width: "20px",
              }}
            />
          )}
          <Box
            sx={{
              backgroundColor: "#0066cc", // Blue color similar to the image
              borderRadius: "20px",
              marginLeft: "-30px",
              width: "80px",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative", // So that the search button sits next to the input
            }}
            onClick={() => console.log("Search triggered")} // Replace with your search logic
          >
            <SearchIcon style={{ color: "#fff" }} />
          </Box>
        </Box>
        {valuePremium === 0 && (
          <Box>
            {selectedImages ? (
              ""
            ) : (
              <Typography variant="subtitle1" mb={2} style={{textAlign:"center"}}>
                Popular searches
              </Typography>
            )}
            <Box
              className="custom-scrollbar custom-scrollbar-container"
              style={{ maxHeight: "29rem", overflowY: "auto" }}
            >
              <ul
                style={{
                  margin: 0,
                  paddingBottom: "16px",
                  paddingLeft: 0,
                  display: "grid",
                  rowGap: 4,
                  gridTemplateColumns: "1fr 1fr",
                  listStyleType: "none",
                  textAlign: "left",
                  lineHeight: "125%",
                  fontSize: "14px",
                  letterSpacing: ".25px",
                  listStylePosition: "inside",
                }}
              >
                {selectedImages
                  ? selectedImages.map((image, index) => {
                      //console.log("indexxxx",index);
                      //console.log("image00", image);
                      return (
                        <>
                          {" "}
                          <Box key={index} style={{ display: "flex", justifyContent: "center" }}>
                            <img
                              src={`${process.env.REACT_APP_API_BASE_URL}/${image.path}`}
                              alt={`Image ${image.id}`}
                              onClick={() => handlePremiumImage(index, image.path)}
                              style={{
                                margin: "2px",
                                height: "130px",
                                width: "130px",
                                borderRadius: "8px",
                              }}
                            />
                          </Box>
                          {/*<Box
                                  sx={{
                                    position: "absolute",
                                    top: "0", // Position it over the image
                                    marginTop: "5px",
                                    left: "21%",
                                    transform: "translateX(-50%)",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "70px",
                                    opacity: 0, // Initially hide icons
                                    transition: "top 0.3s ease-in-out, opacity 0.3s ease-in-out", // Smooth transition
                                  }}
                                  className="icon-box"
                                >
                                  <Button>
                                    <DeleteOutlinedIcon
                                      sx={{
                                        backgroundColor: "whitesmoke",
                                        padding: "3px",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  </Button>
                                  <Button onClick={() => handleExpand(index, image.id)}>
                                    <OpenInFullOutlinedIcon
                                      sx={{
                                        backgroundColor: "whitesmoke",
                                        padding: "3px",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  </Button>
                                </Box>*/}
                        </>
                      );
                    })
                  : images.map((image, index) => (
                      <Box
                        key={index}
                        style={{ padding: "4px", justifyContent: "center", display: "flex", marginBottom: "7px" }}
                        onClick={() => handleCategoryClick(image.images, image.name)}
                      >
                        <li style={{ textAlign: "left", width: "5rem" }}>{image.name}</li>
                      </Box>
                    ))}
              </ul>
            </Box>
          </Box>
        )}

        {valuePremium === 1 && (
          <Box>
            <Typography variant="subtitle1" mb={2}>
              Popular searches for Vectors
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px",
              }}
            >
              <Box sx={popularSearchStyle}>Vector Image 1</Box>
              <Box sx={popularSearchStyle}>Abstract Vector</Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default PremiumImg;
const popularSearchStyle = {
  padding: "12px 20px",
  textAlign: "center",
  backgroundColor: "#f0f0f0",
  cursor: "pointer",
  borderRadius: "8px",
  fontSize: "16px",
  color: "#333",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
};
