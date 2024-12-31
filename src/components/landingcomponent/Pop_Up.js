import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Button, Divider, Grid, IconButton, Paper, styled, TextField, Typography } from "@mui/material";
import { ReactComponent as SearchTemplete } from "../../asset/images/Vector.svg";
import { ReactComponent as DesignOnline } from "../../asset/images/DesignOnline.svg";
import searchIcon from "../../asset/images/search_Icon.svg";
import { ReactComponent as UploadFile } from "../../asset/images/UploadFile.svg";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import { searchClient } from "@algolia/client-search";
import CustomPagination from "../common/CustomPagination";
import { debounce } from "lodash";
import PopUpPagination from "../common/PopUpPagination";
import { useNavigate } from "react-router-dom";
import { Blocks } from "react-loader-spinner";
import CloseIcon from "@mui/icons-material/HighlightOffOutlined";

const Hit = ({ hit }) => (
  <div>
    <h3>{hit.title}</h3>
    <img src={hit.poster_path} alt={hit.original_title} style={{ width: "200px" }} />
  </div>
);
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: "min(1170px, 95%)",
  bgcolor: "background.paper",
  boxShadow: 24,

  input: {
    // width: "95%",
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "#3F5163",
    },
  },
  "@media (max-width: 767px)": {
    top: "40px",
    left: "2.5%",
    margin: "auto",
    transform: "translate(0)",
    maxHeight: "90vh",
    overflowY: "auto",
  },
};
const Pop_Up = ({ open, handleClose, payload0, price, selectedCategory }) => {
  const navigate = useNavigate();
  const searchClient = algoliasearch("2GHMAK1N6Y", "9bf2a62bc24c1fd0159cde3b9c7136e2");
  const index = searchClient.initIndex("test"); // Your Algolia index name
  const [value, setValue] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [finaldata, setFinaldata] = useState([]);

  const handleSearch = (e) => {
    setValue(e.target.value);
  };

  const submitSearch = debounce(async (page = 1) => {
    setSpinner(true);
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

      // Update the search results and pagination info
      setSearchResults(response.hits);
      setCurrentPage(response.page);
      setTotalPages(response.nbPages);
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setSpinner(false); // Hide spinner after completion
    }
    setOpenSearch(true);
  }, 300);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    submitSearch(newPage);
  };
  const handleCloseSearch = () => {
    setValue("");
    setOpenSearch(false);
  };

const data = {

}

  useEffect(() => {
    setSpinner(true);
    if (value) {
      setTimeout(() => {
        submitSearch(); // Start search when value changes
        setSpinner(false);
      }, 2000);
    }
  }, [openSearch]);
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: "#ffffffd6",
            })}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            sx={{ backgroundColor: "#3F5163", padding: { md: "1rem 1rem 1rem 55px", xs: "10px" }, color: "white" }}
          >
            Select one of the Following
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              padding: { sm: "0px 40px", xs: "0" },
              justifyContent: "space-between",
              margin: "0 auto",
              backgroundColor: "#FAF8EE",
            }}
          >
            <Typography
              id="keep-mounted-modal-description"
              sx={{ padding: { sm: "1rem", xs: "10px" }, display: "flex", flexDirection: { xs: "column", sm: "row" } }}
            >
              <span style={{ color: "#868686" }}>Type:</span> &nbsp;
              <b style={{ color: "#3F5163", fontWeight: 600 }}>{selectedCategory}</b>
            </Typography>
            <Typography
              id="keep-mounted-modal-description"
              sx={{ padding: { sm: "1rem", xs: "10px" }, display: "flex", flexDirection: { xs: "column", sm: "row" } }}
            >
              <span style={{ color: "#868686" }}> Size:</span>
              &nbsp;
              <b style={{ color: "#3F5163", fontWeight: 600 }}>
                {payload0?.width}" W x {payload0?.height}" H
              </b>
            </Typography>
            <Typography
              id="keep-mounted-modal-description"
              sx={{ padding: { sm: "1rem", xs: "10px" }, display: "flex", flexDirection: { xs: "column", sm: "row" } }}
            >
              <span style={{ color: "#868686" }}>QTY:</span>
              &nbsp;
              <b style={{ color: "#3F5163", fontWeight: 600 }}>{payload0?.quantity}</b>
            </Typography>
            <Typography
              id="keep-mounted-modal-description"
              sx={{ padding: { sm: "1rem", xs: "10px" }, display: "flex", flexDirection: { xs: "column", sm: "row" } }}
            >
              <span style={{ color: "#868686" }}>Price:</span>
              &nbsp;
              <b style={{ color: "#3F5163", fontWeight: 600 }}> ${price} sq/ft</b>
            </Typography>
          </Box>

          {!openSearch && (
            <Box
              sx={{
                display: "grid",
                gap: "15px",
                gridTemplateColumns: { md: "1fr 1fr 1fr", sm: "1fr 1fr 1fr", xs: "1fr" },
                padding: "1rem",
              }}
            >
              <Button
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "auto",
                  backgroundColor: "#FAF8EE",
                  gap: "2rem",
                  height: "180px",
                  width: "100%",
                }}
                onClick={() => {
                  if (payload0) {
                    const updatedPayload = { ...payload0, price: price };

                    localStorage.setItem("selectedData", JSON.stringify(updatedPayload));
                    navigate(`/design/${payload0?.ProductId}`);
                  } else {
                    console.warn("payload0 is undefined or null");
                  }
                }}
              >
                <DesignOnline />
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "18px",
                    textTransform: "capitalize",
                    color: "#3F5163",
                  }}
                >
                  Upload File
                </Typography>
              </Button>
              <Button
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem",
                  margin: "auto",
                  backgroundColor: "#FAF8EE",
                  gap: "2rem",
                  height: "180px",
                  width: "100%",
                }}
                onClick={() => {
                  if (payload0) {
                    const updatedPayload = { ...payload0, price: price };

                    localStorage.setItem("selectedData", JSON.stringify(updatedPayload));
                    navigate(`/design/${payload0?.ProductId}`);
                  } else {
                    console.warn("payload0 is undefined or null");
                  }
                }}
              >
                <UploadFile />
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "18px",
                    textTransform: "capitalize",
                    color: "#3F5163",
                  }}
                >
                  Design Online
                </Typography>
              </Button>
              <Button
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem",
                  margin: "auto",
                  backgroundColor: "#FAF8EE",
                  gap: "2rem",
                  height: "180px",
                  width: "100%",
                }}
              >
                <Box>
                  <SearchTemplete />
                </Box>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <TextField
                    onChange={(e) => handleSearch(e)}
                    sx={{
                      color: "#3F5163",
                      backgroundColor: "white",
                      width: "100%",
                      input: {
                        height: "12px !important",
                        fontSize: "14px",
                        width: "100%",
                        "&::placeholder": {
                          opacity: 1,
                        },
                      },
                    }}
                    placeholder="Search Template"
                    className="search-dropdown-container"
                  />

                  <img
                    src={searchIcon}
                    alt="search"
                    onClick={submitSearch}
                    style={{
                      paddingTop: "11px",
                      position: "absolute",
                      backgroundColor: "transparent",
                      right: "40px",
                      margin: "auto",
                    }}
                  />
                </Box>
              </Button>
            </Box>
          )}
          {openSearch &&
            (spinner ? (
              <Box sx={{ margin: "auto", padding: "15px", width: "max-content" }}>
                <Blocks
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  visible={true}
                />
              </Box>
            ) : (
              <Box sx={{ padding: "2rem 0rem" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    margin: "0 auto",
                  }}
                >
                  <Button
                    href="#"
                    sx={{
                      color: "#3F5163",
                      marginBottom: "20px",
                      textTransform: "none",
                      width: { xs: "100%", sm: "unset" },
                    }}
                    onClick={handleCloseSearch}
                  >
                    Back to Design Option
                  </Button>

                  <Box sx={{ position: "relative", width: { xs: "100%", sm: "unset" } }}>
                    <TextField
                      value={value}
                      onChange={(e) => handleSearch(e)}
                      sx={{
                        color: "#3F5163",
                        backgroundColor: "white",
                        width: "100%",
                        margin: "0 30px 0 -30px",
                        marginBottom: { xs: "20px", sm: "0" },
                        "& .MuiInputBase-input": { padding: "7.5px 14px !important" },
                      }}
                      placeholder="Search Template"
                      className="search-dropdown-container"
                    />
                    <img
                      onClick={() => submitSearch()}
                      src={searchIcon}
                      alt="search"
                      style={{
                        paddingTop: "7px",
                        position: "absolute",
                        backgroundColor: "transparent",
                        right: "40px",
                        zIndex: "1",
                        margin: "auto",
                      }}
                      sx={{}}
                    />
                  </Box>
                  <Typography>
                    {" "}
                    Page {currentPage} of {totalPages}{" "}
                  </Typography>
                </Box>
                <Box>
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    // { md: "1fr 1fr 1fr", sm: "1fr 1fr 1fr", xs: "1fr" }
                    sx={{
                      padding: "20px",
                      width: "100% !important",
                      ml: "0 !important",
                      justifyContent: "center !important",
                    }}
                  >
                    {searchResults.length > 0 ? (
                      searchResults.map((e, index) => (
                        <Grid item md={2} key={index} sx={{ padding: "1rem !important" }}>
                          <Box
                            sx={{
                              height: "125px",
                              width: "125px",
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
                      <Box sx={{ margin: "auto", padding: "10px 0px 0px 23px", width: "max-content" }}>
                        No Result found
                      </Box>
                    )}
                  </Grid>
                </Box>

                <PopUpPagination
                  totalItems={totalPages * 5}
                  itemsPerPage={5}
                  currentPages={currentPage} // Pass current page
                  onPageChange={handlePageChange} // Handle page change
                />
              </Box>
            ))}
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography sx={{ margin: "0 1rem", whiteSpace: "nowrap", fontSize: "20px" }}>
              <b>OR</b>
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>
          <Box sx={{ padding: "1rem", margin: "auto" }}>
            <Box sx={{ padding: "1rem", margin: "auto", width: { md: "60%", xs: "100%" } }}>
              <Typography sx={{ textAlign: "center" }}>
                <h2>Lorem Ipsum is simply dummy text</h2>
              </Typography>
              <Typography sx={{ textAlign: "center", marginTop: "0.5rem" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s
              </Typography>
              <Box sx={{ textAlign: "center", marginTop: "0.5rem" }}>
                <Button
                  sx={{
                    backgroundColor: "#3F5163",
                    padding: "1rem",
                    color: "white !important",
                    textTransform: "capitalize",
                    fontSize: "13px",
                    "&:hover": {
                      backgroundColor: "#6888a7",
                    },
                  }}
                  href="/design-service"
                >
                  Submit a Design Request
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Pop_Up;
