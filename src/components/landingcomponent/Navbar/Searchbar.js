import React, { useEffect, useRef, useState } from "react";
import { TextField, List, ListItem, ListItemText, Paper, Box, Grid } from "@mui/material";
import { debounce } from "lodash";
import algoliasearch from "algoliasearch/lite";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { ProductService } from "../../../services/Product.service";
import { useNavigate, useParams } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const searchRef = useRef(null); // Ref for the search bar container
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]); // To store recent products
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchClient = algoliasearch("2GHMAK1N6Y", "9bf2a62bc24c1fd0159cde3b9c7136e2");
  const index = searchClient.initIndex("test");

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setSearchHistory(savedHistory);
  }, []);

  // Save search history to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Detect clicks outside of the search container to hide suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      submitSearch(value);
    }
  };

  const handleSelect = (id) => {
    const selectedProduct = filteredData.find((product) => product.id === id);

    if (selectedProduct) {
      if (!searchHistory.some((item) => item.id === selectedProduct.id)) {
        setSearchHistory((prev) => [selectedProduct, ...prev].slice(0, 5)); // Limit to 5 recent products
      }
    }

    setSearchTerm("");
    setShowSuggestions(false);
    navigate(`/product/${id}`);
  };

  const submitSearch = debounce(async (value) => {
    try {
      const response = await index.search(value, {
        hitsPerPage: 10,
        query: value,
        typoTolerance: true,
      });

      const params = { with: ["images", "productCategory"] };
      const res = await ProductService.ProductList(params);
      const filteredProducts = res?.data?.filter(
        (product) =>
          product?.name?.toLowerCase().includes(value.toLowerCase()) ||
          product?.productCategory?.name.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredData(filteredProducts || []);
      setSearchResults(response.hits);
      // console.log("response", response);

    } catch (error) {
      console.error("Search Error:", error);
    }
    setShowSuggestions(true);
  }, 300);

  const handleHistorySelect = (id) => {
    //setSearchTerm(product.name);
    setShowSuggestions(true);
    navigate(`/product/${id}`);
  };

  const searchCancel = () => {
    setSearchTerm("");
    setShowSuggestions(false);
    setFilteredData([]);
  };

  const addImage = (imageLink) => {
    localStorage.setItem('selectedImage', imageLink);

    navigate(`/design/${id}`);
  };

  return (
    <Box sx={{ position: "relative", width: "300px" }} ref={searchRef}>
      <TextField
        placeholder="Search for Products or Templates"
        sx={{
          backgroundColor: "white",
          width: "100%",
          borderRadius: 1,

          "& .MuiInputBase-input": {
            autoComplete: "off !important",
          },
          "& .MuiInputBase-root": {
            height: "100%",
          },
        }}
        value={searchTerm}
        onChange={handleSearch}
        onFocus={() => setShowSuggestions(true)} // Show suggestions on focus
      />
      {searchTerm && <CancelOutlinedIcon sx={{ color: "#3F5163" }} className="cust-cancel" onClick={searchCancel} />}

      {showSuggestions && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: "whitesmoke",
            flexGrow: 1,
            overflow: "hidden",
            // scrollbarWidth: "thin",
            scrollbarGutter: "stable",
            // padding: "0px !important",
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
        >
          <Box sx={{ maxHeight: "25rem", width: "100%" }}>
            {searchTerm ? (
              <List>
                {filteredData.length > 0 || searchResults.length > 0 ? (
                  <>
                    {filteredData.map((item) => (
                      <ListItem button key={item.id} onClick={() => handleSelect(item.id)}>
                        <img
                          width="70px"
                          height="60px"
                          src={`${process.env.REACT_APP_API_BASE_URL}/${item?.images?.[0]?.path || "default-image-path.jpg"}`}
                          alt={item?.name || "Category Image"}
                        />
                        <ListItemText primary={item.name} />
                      </ListItem>
                    ))}
                    <Grid container spacing={2} sx={{ padding: "1rem 0rem", width: "100%!important", marginLeft: "0px !important" }}>
                      {searchResults.map((e, index) => (
                        <Grid item xs={4} sm={3} md={3} key={index} sx={{ paddingLeft: "0px !important", paddingTop: "0px !important" }}>
                          <Box onClick={() => addImage(e.Template_Image)} sx={{ height: "80px", width: "auto", padding: "16px", backgroundColor: "#F3F3F3" }}>
                            <img src={e.Template_Image} alt={e.poster_path} style={{ height: "100%", width: "100%" }} />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                ) : (
                  <ListItem>
                    <ListItemText primary="No results found" />
                  </ListItem>
                )}
              </List>
            ) : (
              <>
                {searchHistory.length > 0 && (
                  searchHistory.map((item) => (
                    <ListItem button key={item.id} onClick={() => handleHistorySelect(item.id)}>
                      <img
                        width="50px"
                        height="50px"
                        src={`${process.env.REACT_APP_API_BASE_URL}/${item.images?.[0]?.path || "default-image-path.jpg"
                          }`}
                        alt={item?.name || "Recent Product"}
                      />
                      <ListItemText
                        sx={{ marginLeft: "10px", "& span": { fontSize: "16px !important" } }}
                        primary={item.name}
                      />
                    </ListItem>
                  ))
                )}
              </>
            )}
          </Box>
        </Paper>
      )
      }
    </Box >
  );
};

export default SearchBar;
