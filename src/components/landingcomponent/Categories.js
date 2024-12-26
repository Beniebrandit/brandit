import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import categories_icon1 from "../../asset/images/categories_icon1.svg";
import categories_icon2 from "../../asset/images/categories_icon2.svg";
import categories_icon3 from "../../asset/images/categories_icon3.svg";
import categories_icon4 from "../../asset/images/categories_icon4.svg";
import categories_icon5 from "../../asset/images/categories_icon5.svg";
import categories_icon6 from "../../asset/images/categories_icon6.svg";
// import ArrowIcon from "../../asset/images/Icon_t.png";
import ArrowIcon2 from "../../asset/images/Next_paginate_icon.svg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../common/CustomPagination";
import { ProductCategoryService } from "../../services/ProductCategory.service";
import { ProductService } from "../../services/Product.service";
import { unset } from "lodash";

const tabData = [
  { icon: categories_icon1, alt: "categories_icon1", label: "All" },
  { icon: categories_icon2, alt: "categories_icon2", label: "Large Format" },
  { icon: categories_icon3, alt: "categories_icon3", label: "Small Format" },
  {
    icon: categories_icon4,
    alt: "categories_icon4",
    label: "Stickers and Decals",
  },
  { icon: categories_icon5, alt: "categories_icon5", label: "Flags" },
  { icon: categories_icon6, alt: "categories_icon6", label: "Sign Holders" },
];

const itemsPerPage = 9;

const Categories = () => {
  const [value, setValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesData, setCategoriesData] = useState({
    all: [],
    largeFormat: [],
    smallFormat: [],
    decals: [],
    flags: [],
    signs: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset page when switching tabs
  }, [value]);

  const getApi = async () => {
    try {
      const productCategory = ["Small Format Category"]; // Filter based on "Small Format Category"
      const withParams = ["images", "productCategory"]; // Define the "with" parameters

      const params = {
        with: withParams,
      };

      if (productCategory.length > 0) {
        params.productCategory = productCategory;
      }

      const res = await ProductService.ProductList(params);
      const data = res.data;
      // console.log("Fetched Data:", data);

      // Verify the filtered results directly
      const filteredCategories = {
        all: data.filter((product) => product.productCategory?.parent_id !== null),
        largeFormat: data.filter((product) => product.productCategory?.parent_name === "Large Format"),
        smallFormat: data.filter((product) => product.productCategory?.parent_name === "Small Format"),
        decals: data.filter((product) => product.productCategory?.parent_name === "Decals"),
        flags: data.filter((product) => product.productCategory?.parent_name === "Flags"),
        signs: data.filter((product) => product.productCategory?.parent_name === "Signs"),
      };

      // console.log("Filtered Categories:", filteredCategories);

      // Update the state with the filtered data
      setCategoriesData(filteredCategories);
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const paginatedItems = () => {
    const data =
      value === 0
        ? categoriesData.all
        : value === 1
        ? categoriesData.largeFormat
        : value === 2
        ? categoriesData.smallFormat
        : value === 3
        ? categoriesData.decals
        : value === 4
        ? categoriesData.flags
        : categoriesData.signs;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const totalItems = () => {
    return value === 0
      ? categoriesData.all.length
      : value === 1
      ? categoriesData.largeFormat.length
      : value === 2
      ? categoriesData.smallFormat.length
      : value === 3
      ? categoriesData.decals.length
      : value === 4
      ? categoriesData.flags.length
      : categoriesData.signs.length;
  };

  const productClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Box
      sx={{
        margin: "auto",
        marginTop: "10rem",
        width: { md: "75%", xs: "100%" },
        padding: "1rem",
      }}
    >
      <Container>
        <h1 style={{ marginBottom: "1rem" }}>Categories</h1>

        <Box className="custom-scrollbar custom-scrollbar-container">
          <Tabs
            value={value}
            onChange={handleTabChange}
            sx={{
              "& .MuiTabs-scroller": {
                overflow: "auto !important",
              },
              "& .MuiTabs-flexContainer": {
                display: "flex",
                flexWrap: "noWrap",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              },
              width: "100%",
              maxWidth: "1150px",
            }}
          >
            {tabData.map((tab, index) => (
              <Tab
                key={index}
                label={
                  <Box>
                    <img src={tab.icon} alt={tab.alt} style={{ height: "46px", width: "43px" }} />
                    <Typography variant="body2" sx={{ marginTop: "1rem" }}>
                      {tab.label}
                    </Typography>
                  </Box>
                }
                sx={{
                  width: {
                    xl: "calc(100% / 6)",
                    lg: "calc(100% / 6)",
                    md: "calc(100% / 6)",
                    sm: "calc(100% / 4)",
                    xs: "100%",
                  },
                  minWidth: "unset",
                  maxWidth: "unset",
                }}
              />
            ))}
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={value}>
          <CategoryGrid items={paginatedItems()} onItemClick={productClick} />
          <CustomPagination
            totalItems={totalItems()}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </CustomTabPanel>
      </Container>
    </Box>
  );
};

export default Categories;

const CustomTabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const CategoryGrid = ({ items, onItemClick }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xl: "repeat(3, 1fr)",
        lg: "repeat(3, 1fr)",
        md: "repeat(2, 1fr)",
        sm: "repeat(2, 1fr)",
        xs: "repeat(1, 1fr)",
      },
      gap: "1.5rem",
      justifyContent: "center",
    }}
  >
    {/* <div className="container"> */}

    {items?.map((val, index) => (
      <Box
        key={index}
        onClick={() => onItemClick(val.id)}
        className="wsk-cp-product"
        // sx={{ m: "24px 0 !important" }}
        // className="cust_bx_shadow"
      >
        <Box className="product-image">
          <div className="wsk-cp-img">
            <img
              src={`${process.env.REACT_APP_API_BASE_URL}/${val?.images?.[0]?.path || "default-image-path.jpg"}`}
              className="img-responsive"
              alt={val?.name || "Category Image"}
            />
          </div>
          <img src={ArrowIcon2} className="cust_arrow" alt="Arrow Icon" />
        </Box>

        <div className="wsk-cp-text">
          <div className="category">
            <Typography sx={{ paddingTop: "1rem" }}>{val?.name || "Unnamed Category"}</Typography>
          </div>
          <div className="description-prod">
            <Typography sx={{ fontSize: "20px", color: "#3F5163" }}>
              {val?.description ? val.description : "No description available"}
            </Typography>
          </div>
        </div>
      </Box>
    ))}
  </Box>
);
