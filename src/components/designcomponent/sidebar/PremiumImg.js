import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import HelpIcon from "@mui/icons-material/Help";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const PremiumImg = ({ selectImage, images, vectorimage, setPremiumimg, handlePremiumImage }) => {
  const [selectedImages, setSelectedImages] = useState({
    premium: "",
    vector: "",
  });
  const [imageName, setImageName] = useState({
    premium: "",
    vector: "",
  });
  const [valuePremium, setValuePremium] = useState(0);

  const handleChangePremium = (event, newValue) => {
    setValuePremium(newValue);
    // Clear the selection when switching tabs
    setSelectedImages({ premium: "", vector: "" });
    setImageName({ premium: "", vector: "" });
  };

  const handleCancelSearch = () => {
    setSelectedImages("");
    setImageName({ premium: "", vector: "" });
  };

  const handleCategoryClick = (images, name, type) => {
    setSelectedImages((prevState) => ({
      ...prevState,
      [type]: images,
    }));
    setImageName((prevState) => ({
      ...prevState,
      [type]: name,
    }));
    setPremiumimg(images);
  };

  return (
    <>
      <Box sx={{ padding: "0px !important", margin: "0px" }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Explore premium images <HelpIcon sx={{ justifyContent: "center" }} />
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={3}>
          Enhance your designs with exclusive, licensed images. Image licenses are just a flat fee of $5.99.
        </Typography>

        <Tabs
          value={valuePremium}
          onChange={handleChangePremium}
          aria-label="basic tabs"
          sx={{ mb: 2 }}
          classes={{ flexContainer: "flex-container-custom" }}
        >
          <Tab label="Photos" sx={{ fontWeight: valuePremium === 0 ? "bold" : "normal" }} />
          <Tab label="Vectors" sx={{ fontWeight: valuePremium === 1 ? "bold" : "normal" }} />
        </Tabs>

        <Box sx={{ display: "flex", alignItems: "center", mb: 4, position: "relative", width: "100%" }}>
          <input
            type="text"
            value={imageName[valuePremium === 0 ? "premium" : "vector"]}
            onChange={(e) =>
              setImageName((prevState) => ({
                ...prevState,
                [valuePremium === 0 ? "premium" : "vector"]: e.target.value,
              }))
            }
            placeholder="Search..."
            style={{
              width: "100%",
              padding: "10px 40px 10px 20px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
          {imageName[valuePremium === 0 ? "premium" : "vector"] && (
            <CancelIcon
              onClick={handleCancelSearch}
              style={{
                position: "absolute",
                right: "80px",
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
              backgroundColor: "#0066cc",
              borderRadius: "20px",
              marginLeft: "-30px",
              width: "80px",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => console.log("Search triggered")}
          >
            <SearchIcon style={{ color: "#fff" }} />
          </Box>
        </Box>

        {/* Display images based on the selected tab */}
        {valuePremium === 0 && (
          <Box>
            {selectedImages.premium ? (
              ""
            ) : (
              <Typography variant="subtitle1" mb={2} style={{ textAlign: "center" }}>
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
                }}
              >
                {selectedImages.premium
                  ? selectedImages.premium.map((image, index) => (
                      <Box key={index} style={{ display: "flex", justifyContent: "center" }}>
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL}/${image.path}`}
                          alt={`Image ${image.id}`}
                          onClick={() => handlePremiumImage(index, image.path)}
                          style={{ margin: "2px", height: "130px", width: "130px", borderRadius: "8px" }}
                        />
                      </Box>
                    ))
                  : images.map((image, index) => (
                      <Box
                        key={index}
                        style={{ padding: "4px", justifyContent: "center", display: "flex", marginBottom: "7px" }}
                        onClick={() => handleCategoryClick(image.images, image.name, "premium")}
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
            {selectedImages.vector ? (
              ""
            ) : (
              <Typography variant="subtitle1" mb={2} style={{ textAlign: "center" }}>
                Popular searches for Vectors
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
                }}
              >
                {selectedImages.vector
                  ? selectedImages.vector.map((image, index) => (
                      <Box key={index} style={{ display: "flex", justifyContent: "center" }}>
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL}/${image.path}`}
                          alt={`Image ${image.id}`}
                          onClick={() => handlePremiumImage(index, image.path)}
                          style={{ margin: "2px", height: "130px", width: "130px", borderRadius: "8px" }}
                        />
                      </Box>
                    ))
                  : vectorimage.map((image, index) => (
                      <Box
                        key={index}
                        style={{ padding: "4px", justifyContent: "center", display: "flex", marginBottom: "7px" }}
                        onClick={() => handleCategoryClick(image.images, image.name, "vector")}
                      >
                        <li style={{ textAlign: "left", width: "5rem" }}>{image.name}</li>
                      </Box>
                    ))}
              </ul>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default PremiumImg;
