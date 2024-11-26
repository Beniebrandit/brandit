import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import categories_icon1 from "../../asset/images/categories_icon1.svg";
import categories_icon2 from "../../asset/images/categories_icon2.svg";
import categories_icon3 from "../../asset/images/categories_icon3.svg";
import categories_icon4 from "../../asset/images/categories_icon4.svg";
import categories_icon5 from "../../asset/images/categories_icon5.svg";
import categories_icon6 from "../../asset/images/categories_icon6.svg";
import ArrowIcon from "../../asset/images/Icon_t.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../common/CustomPagination";
import { ProductCategoryService } from "../../services/ProductCategory.service";

const tabData = [
  { icon: categories_icon1, alt: "categories_icon1", label: "All" },
  { icon: categories_icon2, alt: "categories_icon2", label: "Large Format" },
  { icon: categories_icon3, alt: "categories_icon3", label: "Small Format" },
  { icon: categories_icon4, alt: "categories_icon4", label: "Stickers and Decals" },
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
    const response = await ProductCategoryService.ProductCategory();
    const data = response.data;

    setCategoriesData({
      all: data.filter((product) => product.parent_id !== null),
      largeFormat: data.filter((product) => product.parent_name === "Large Format"),
      smallFormat: data.filter((product) => product.parent_name === "Small Format"),
      decals: data.filter((product) => product.parent_name === "Decals"),
      flags: data.filter((product) => product.parent_name === "Flags"),
      signs: data.filter((product) => product.parent_name === "Signs"),
    });
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
    <Box sx={{ margin: "auto", marginTop: "10rem", width: "75%", padding: "1rem" }}>
      <Container>
        <h1 style={{ marginBottom: "1rem" }}>Categories</h1>
        <Tabs
          value={value}
          onChange={handleTabChange}
          sx={{
            "& .MuiTabs-flexContainer": {
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: { xs: "left", sm: "space-between" },
              alignItems: "center",
            },
            width: "1050px",
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
              sx={{ height: "7rem" }}
            />
          ))}
        </Tabs>

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
        sm: "repeat(1, 1fr)",
      },
      gap: "1.5rem",
      justifyContent: "center",
    }}
  >
    {items.map((val, index) => (
      <Box key={index} onClick={() => onItemClick(val.id)} sx={{ padding: "24px 0px !important" }}>
        <Box className="product-image">
          <img src={`${process.env.REACT_APP_API_BASE_URL}/${val.image.path}`} className="category-img" alt="" />
          <img src={ArrowIcon} className="cust_arrow" />
        </Box>
        <Typography sx={{ paddingTop: "1rem" }}>{val.name}</Typography>
        <Typography sx={{ fontSize: "20px", color: "#3F5163" }}>{val.description || "null"}</Typography>
      </Box>
    ))}
  </Box>
);
