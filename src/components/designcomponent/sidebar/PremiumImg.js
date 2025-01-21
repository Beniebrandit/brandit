import { Box, Typography, Tabs, Tab, Button } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import HelpIcon from "@mui/icons-material/Help";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import axios from "axios";
import { PopularSearches } from "../../common/Constant";
import { InfinitySpin, ThreeCircles } from "react-loader-spinner";

const PremiumImg = ({
  setPremiumimg,
  handleExpand,
  selectImage,
  handleOpentoAdd,
  selectedimg,
}) => {
  const [selectedImages, setSelectedImages] = useState({
    premium: "",
    vector: "",
  });
  const [imageName, setImageName] = useState({ premium: "", vector: "" });
  const [valuePremium, setValuePremium] = useState(0);
  const [mediaData, setMediaData] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [searchVector, setSearchVector] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [photosData, setPhotosData] = useState([]);
  const [vectorData, setVectorData] = useState([]);
  const [showpopularData, setShowpopularData] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const source = "premium";
  const API_URL = "https://stock.adobe.io/Rest/Media/1/Search/Files";
  const API_HEADERS = {
    "x-api-key": "0ca35b55dd684868acacd3a0c4e5264b", // Replace with your actual API key
    "X-Product": "DRIStock/1.0",
    "Content-Type": "application/json",
  };

  const handleViewMore = () => {
    setShowAll(true);
  };
  const handleChangeTab = (event, newValue) => {
    setValuePremium(newValue); // Set the new value for `valuePremium`

    if (newValue === 0 && photosData?.length > 0) {
      setShowpopularData(false);
    } else if (newValue === 1 && vectorData?.length > 0) {
      setShowpopularData(false);
    } else {
      setShowpopularData(true);
    }
  };

  const fetchMedia = useCallback(
    async (searchQuery, offsetValue) => {
      if (loading || !hasMore) return;
      setLoading(true);

      try {
        if (searchQuery) {
          const response = await axios.get(API_URL, {
            params: {
              "search_parameters[words]": `${searchQuery} ${valuePremium === 0 ? "" : searchQuery ? "svg" : ""}`,
              "search_parameters[limit]": 10,
              "search_parameters[offset]": offsetValue,
              "search_parameters[thumbnail_size]": 240,
              "search_parameters[filters][premium]": false,
              "search_parameters[filters][content_type:photo]": valuePremium === 0 ? 1 : 0,
              "search_parameters[filters][content_type:illustration]": valuePremium === 0 ? 1 : 0,
              "search_parameters[filters][content_type:vector]": valuePremium === 0 ? 0 : 1,
              "search_parameters[filters][content_type:video]": 0,
              "search_parameters[filters][content_type:template]": 0,
              "search_parameters[filters][content_type:3d]": 0,
            },
            headers: API_HEADERS,
          });

          const newMedia = response.data.files;
          if (valuePremium === 0) {
            setPhotosData((prevData) => [...prevData, ...newMedia]);
            setShowpopularData(false);
          } else {
            setVectorData((prevData) => [...prevData, ...newMedia]);
            setShowpopularData(false);
          }

          setOffset(offsetValue + 10);
          setHasMore(newMedia.length > 0); // Check if more data is available
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, valuePremium] // Make sure valuePremium is included in the dependencies
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPhotosData([]);
    setOffset(0);
    setHasMore(true);
    fetchMedia(value, 0);
  };

  const handleSearchVector = (e) => {
    const value = e.target.value;
    setSearchVector(value);
    setVectorData([]);
    setOffset(0);
    setHasMore(true);
    fetchMedia(value, 0);
  };

  const handleCancelSearch = () => {
    setSearchTerm("");
    setPhotosData([]);
    setOffset(0);
    setHasMore(true);
    setShowpopularData(true);
  };
  const handleCancelSearchVector = () => {
    setSearchVector("");
    setVectorData([]);
    setOffset(0);
    setHasMore(true);
    setShowpopularData(true);
  };

  const handleScroll = useCallback(
    (e) => {
      const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;

      // Check if we're at the bottom and if the loading flag is false
      if (bottom && !loading && hasMore) {
        // Perform API call
        fetchMedia(valuePremium === 0 ? searchTerm : searchVector, offset);
      }
    },
    [loading, hasMore, valuePremium, searchTerm, searchVector, offset, fetchMedia]
  );

  const handleCategoryClick = (imageUrl, title, type, index) => {
    setSelectedImages((prev) => ({ ...prev, [type]: imageUrl }));
    setImageName((prev) => ({ ...prev, [type]: title }));
    setPremiumimg(imageUrl);
    selectImage(index, source);
    // console.log("imageUrl", imageUrl);
  };

  const OpentoSearch = (value) => {
    setShowpopularData(false);
    if (valuePremium === 0) {
      setSearchTerm(value);
      setPhotosData([]);
      setOffset(0);
      setHasMore(true);
      fetchMedia(value, 0);
    }
    if (valuePremium === 1) {
      setSearchVector(value);
      setVectorData([]);
      setOffset(0);
      setHasMore(true);
      fetchMedia(value, 0);
    }
  };

  return (
    <Box
      sx={{
        maxHeight: "675px",
        overflowY: "hidden",
        overflowX: "hidden",
        scrollbarWidth: "thin",
        scrollbarGutter: "stable",
        padding: "0px !important",
        "&:hover": {
          overflowY: "auto",
        },
        "&::-webkit-scrollbar": {
          width: "3px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555",
        },
      }}
      onScroll={handleScroll}
    >
      <Box sx={{}}>
        <Typography variant="body2" color="#3F5163" fontWeight="bold" mb={2}>
          Recently used images
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
            gap: "5px",
            alignItems: "center",
          }}
        >
          {(showAll ? selectedimg : selectedimg.slice(0, 3)).map((item, index) => (
            <Box
              className="hovimg"
              key={index}
              onClick={() => handleCategoryClick(item.thumbnail_url, item.title, "premium")}
              style={{
                cursor: "pointer",
                padding: "5px",
                borderRadius: "10px",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              <img
                src={item.thumbnail_url}
                alt={item.title}
                style={{
                  position: "relative",
                  width: "75px",
                  height: "70px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />

              <Box
                className="cut-hov"
                sx={{
                  position: "absolute",
                  top: "0",
                  marginTop: "5px",
                  left: "21%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "60px",
                  opacity: 0,
                  transition: "opacity 0.3s ease", // Smooth transition for opacity
                  "&:hover": {
                    opacity: 1, // Show buttons on hover
                  },
                }}
              >
                <Button
                  onClick={() => {
                    handleExpand(index, source, item.thumbnail_url);
                    handleOpentoAdd(item);
                  }}
                >
                  <OpenInFullOutlinedIcon
                    sx={{
                      backgroundColor: "whitesmoke",
                      padding: "3px",
                      borderRadius: "5px",
                    }}
                  />
                </Button>
              </Box>
            </Box>
          ))}

          {!showAll && selectedimg.length > 3 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: "10px",
                color: "#3F5163",
                fontSize: "12px",
                height: "70px",
                width: "80px",
                padding: "16px",
                justifyContent: "center",
                border: "1px solid lightgray",
              }}
              onClick={handleViewMore}
            >
              View all
            </Box>
          )}
        </Box>
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "14px" }} mb={2}>
          Explore Premium Images <HelpIcon />
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={1} sx={{ fontSize: "11px" }}>
          Enhance your designs with exclusive, licensed images. Image licenses are just a flat fee of $5.99.
        </Typography>

        <Tabs value={valuePremium} onChange={handleChangeTab} sx={{ mb: 1, "& .MuiTabs-flexContainer": { display: "flex", justifyContent: "space-between" } }}>
          <Tab
            label="Photos"
            sx={{
              fontWeight: valuePremium === 0 ? "bold" : "normal",
              color: valuePremium === 0 && "#3F5163 !important",
              width: "50%"
            }}
          />
          <Tab
            label="Vectors"
            sx={{
              fontWeight: valuePremium === 1 ? "bold" : "normal",
              color: valuePremium === 1 && "#3F5163 !important",
              width: "50%"
            }}
          />
        </Tabs>

        <Box display="flex" alignItems="center" sx={{ marginBottom: "15px" }} position="relative">
          {valuePremium === 0 ? (
            <>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search..."
                style={{
                  width: "100%",
                  padding: "8px 40px 8px 20px",
                  borderRadius: "20px",
                  border: "1px solid #ccc",
                  outline: "none",
                }}
              />
              {searchTerm && (
                <CancelIcon
                  onClick={handleCancelSearch}
                  style={{
                    position: "absolute",
                    right: "60px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#aaa",
                    height: "18px",
                    width: "18px",
                  }}
                />
              )}
            </>
          ) : (
            <>
              <input
                type="text"
                value={searchVector}
                onChange={handleSearchVector}
                placeholder="Search..."
                style={{
                  width: "100%",
                  padding: "8px 40px 8px 20px",
                  borderRadius: "20px",
                  border: "1px solid #ccc",
                  outline: "none",
                }}
              />
              {searchVector && (
                <CancelIcon
                  onClick={handleCancelSearchVector}
                  style={{
                    position: "absolute",
                    right: "60px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#aaa",
                    height: "18px",
                    width: "18px",
                  }}
                />
              )}
            </>
          )}

          <Box
            sx={{
              backgroundColor: "#3F5163",
              height: "33px",
              borderRadius: "20px",
              ml: -3,
              width: "60px",
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <SearchIcon style={{ color: "#fff" }} />
          </Box>
        </Box>
        {!showpopularData ? (
          ""
        ) : (
          <>
            <Typography sx={{ fontSize: "13px", marginBottom: "10px", fontWeight: "600" }}>PopularSearches</Typography>
            <ul
              style={{
                overflow: "auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(125px, 1fr))",
                gap: "9px",
                lineHeight: "1.4",
                fontSize: "12px"
              }}
            >

              {PopularSearches?.map((value, index) => (
                <Typography
                  key={index}
                  variant="span"
                  fontSize="small"
                  sx={{ cursor: "pointer", paddingLeft: "6px" }}
                  onClick={() => OpentoSearch(value)}
                >
                  {value}
                </Typography>
              ))}
            </ul>
          </>
        )}
        <Box
        // style={{ maxHeight: "24rem", overflowY: "scroll", overflowX: "hidden" }}
        // onScroll={handleScroll}
        // className="custom-scrollbar"
        >
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(95px, 1fr))",
              gap: "16px",
            }}
          >
            {valuePremium === 0 && (
              <>
                {photosData?.map((item, index) => (
                  <>
                    <Box
                      className="hovimg"
                      key={index}
                      onClick={() => {
                        handleCategoryClick(item.thumbnail_url, item.title, "premium", index);
                      }}
                      style={{
                        cursor: "pointer",
                        padding: "5px",
                        borderRadius: "10px",
                        transition: "transform 0.3s",
                      }}
                      onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                    >
                      <img
                        src={item.thumbnail_url}
                        alt={item.title}
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100px",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      />

                      <Box
                        className="cut-hov"
                        sx={{
                          position: "absolute",
                          top: "0",
                          marginTop: "5px",
                          left: "21%",
                          transform: "translateX(-50%)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "70px",
                          opacity: 0,
                          transition: "opacity 0.3s ease", // Smooth transition for opacity
                          "&:hover": {
                            opacity: 1, // Show buttons on hover
                          },
                        }}
                      >
                        <Button
                          onClick={() => {
                            handleExpand(index, source, item.thumbnail_url);
                            handleOpentoAdd(item);
                          }}
                        >
                          <OpenInFullOutlinedIcon
                            sx={{
                              backgroundColor: "whitesmoke",
                              padding: "3px",
                              borderRadius: "5px",
                            }}
                          />
                        </Button>
                      </Box>
                    </Box>
                  </>
                ))}
              </>
            )}
            {valuePremium === 1 &&
              vectorData?.map((item, index) => (
                <>
                  <Box
                    className="hovimg"
                    key={index}
                    onClick={() => {
                      handleCategoryClick(item.thumbnail_url, item.title, "premium", index);
                    }}

                    style={{
                      cursor: "pointer",
                      padding: "5px",
                      borderRadius: "10px",
                      transition: "transform 0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                  >
                    <img
                      src={item.thumbnail_url}
                      alt={item.title}
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "125px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />

                    <Box
                      className="cut-hov"
                      sx={{
                        position: "absolute",
                        top: "0",
                        marginTop: "5px",
                        left: "21%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "70px",
                        opacity: 0,
                        transition: "opacity 0.3s ease", // Smooth transition for opacity
                        "&:hover": {
                          opacity: 1, // Show buttons on hover
                        },
                      }}
                    >
                      <Button
                        onClick={() => {
                          handleExpand(index, source, item.thumbnail_url);
                          handleOpentoAdd(item);
                        }}
                      >
                        <OpenInFullOutlinedIcon
                          sx={{
                            backgroundColor: "whitesmoke",
                            padding: "3px",
                            borderRadius: "5px",
                          }}
                        />
                      </Button>
                    </Box>
                  </Box>
                </>
              ))}
          </ul>
          {loading && <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto", height: "auto", width: "7rem" }}><InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          /></Typography>}
          {!hasMore && <Typography textAlign="center">No more images available.</Typography>}
        </Box>
      </Box>
    </Box >
  );
};

export default PremiumImg;
