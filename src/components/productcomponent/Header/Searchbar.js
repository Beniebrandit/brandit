import React, { useState } from "react";
import { TextField, List, ListItem, ListItemText, Paper, Box, Grid } from "@mui/material";
import { debounce } from "lodash";

import algoliasearch from "algoliasearch/lite";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { ProductService } from "../../../services/Product.service";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);
  const searchClient = algoliasearch("2GHMAK1N6Y", "9bf2a62bc24c1fd0159cde3b9c7136e2");
  const index = searchClient.initIndex("test");

  const data = [
    { id: 1, label: "Custom Signs" },
    { id: 2, label: "Banners" },
    { id: 3, label: "Decals" },
    { id: 4, label: "Signages" },
  ];

  const handleSearch = (event, page = 0) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      submitSearch(value);
    }
  };

  const handleSelect = (label, id) => {
    setSearchTerm(label);
    setShowSuggestions(false);
    navigate(`/product/${id}`);
  };

  const submitSearch = debounce(async (value, page = 0) => {
    try {
      // Ensure the page is at least 1 before subtracting 1 for Algolia
      const response = await index.search(value, {
        page: page, // Pass current page to Algolia
        hitsPerPage: 10,
        query: value, // The search term
        typoTolerance: true,
        clickAnalytics: true,
        facets: ["*"], // Retrieve all facets
        facetFilters: {},
        analyticsTags: ["Tracked Search", "Design Template", "Homepage", "Repeat"],
      });

      const withParams = ["images", "productCategory"];
      const params = {
        with: withParams,
      };

      const res = await ProductService.ProductList(params);
      var filteredProducts = "";
      if (res?.data) {
        filteredProducts = res?.data.filter(
          (product) =>
            // Adjust this condition based on your product structure
            product?.name?.toLowerCase().includes(value.toLowerCase()) ||
            product?.productCategory?.name.toLowerCase().includes(value.toLowerCase())
        );
      }
      setFilteredData(filteredProducts);

      setProducts(res?.data);
      // Update the search results and pagination info
      setSearchResults(response.hits);
    } catch (error) {
      console.error("Search Error:", error);
    }
    setShowSuggestions(true);
  }, 300);

  const searchCancel = () => {
    setSearchTerm("");
    setShowSuggestions(false);
    setFilteredData("");
    setProducts("");
  };
  return (
    <Box sx={{ position: "relative", width: "290px", maxWidth: "min(100%, 290px)" }}>
      <TextField
        placeholder="Search for Products or Templates"
        sx={{
          backgroundColor: "white",
          width: "100%",
          borderRadius: 1,
          "& .MuiInputBase-root": {
            height: "100%",
          },
        }}
        // fullWidth
        // variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        onFocus={() => setShowSuggestions(searchTerm.length > 0)}
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
          }}
        >
          <List>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <ListItem button key={item.id} onClick={() => handleSelect(item.name, item.id)}>
                  <img
                    width="70px"
                    height="60px"
                    src={`${process.env.REACT_APP_API_BASE_URL}/${item?.images?.[0]?.path || "default-image-path.jpg"}`}
                    alt={item?.name || "Category Image"}
                  />
                  <ListItemText
                    sx={{ marginLeft: "10px", "& span": { fontSize: "18px !important" } }}
                    primary={item.name}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No results found" />
              </ListItem>
            )}
          </List>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 8, md: 12 }} sx={{ padding: "1rem 2rem" }}>
            {searchResults.length > 0 ? (
              searchResults.map((e, index) => (
                <Grid item xs={4} sm={3} md={3} key={index} sx={{ paddingBottom: "0rem" }}>
                  <Box
                    sx={{
                      height: "80px",
                      width: "80px",
                      padding: "16px",
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "#F3F3F3",
                    }}
                  >
                    <img
                      id={e.objectID}
                      src={e.Template_Image}
                      alt={e.poster_path}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </Box>
                </Grid>
              ))
            ) : (
              <p>No results found</p>
            )}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;
