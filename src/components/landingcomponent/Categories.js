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
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { ProductService } from "../../services/Product.service";
import { ProductCategoryService } from "../../services/ProductCategory.service";
import { useNavigate } from "react-router-dom";

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

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Categories = () => {
  const [value, setValue] = React.useState(0);
  const [allcategories, setAllCategories] = useState([]);
  const [flagCategories, setFlagCategories] = useState([]);
  const [signCategories, setSignCategories] = useState([]);
  const [decalsCategories, setDecalsCategories] = useState([]);

  const navigate = useNavigate();

  const getApi = async () => {
    ProductCategoryService.ProductCategory().then((res) => {
      const response = res.data;
      const productCat = response?.filter((product) => product.parent_id !== null);
      setAllCategories(productCat);

      const flagProductCategories = response?.filter((product) => product.parent_name === "Flags");
      setFlagCategories(flagProductCategories);

      const signProductCategories = response?.filter((product) => product.parent_name === "Signs");
      setSignCategories(signProductCategories);

      const decalsProductCategories = response?.filter((product) => product.parent_name === "Decals");
      setDecalsCategories(decalsProductCategories);
    });
  };

  useEffect(() => {
    getApi();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function productClick(id) {
    navigate(`/product/${id}`);
  }

  return (
    <>
      <Box
        sx={{
          margin: "auto",
          marginTop: "10rem",
          position: "relative",
          // display: "flex",
          // justifyContent: "space-around",
          // alignItems:"center",
          width: "75%",
          padding: "1rem",
        }}
      >
        <Container>
          <h1 style={{ marginBottom: "1rem" }}>Categories</h1>
          {/* <Box sx={{ marginTop: "1.5rem" }}> */}
          <Box className="custom-scrollbar custom-scrollbar-container">
            <Tabs
              value={value}
              onChange={handleChange}
              className="basic_tabs_example"
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
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xl: "repeat(3, 1fr)", // For large screens, create 3 equal columns
                  lg: "repeat(3, 1fr)", // For large screens, create 3 equal columns
                  md: "repeat(2, 1fr)", // For large screens, create 3 equal columns
                  sm: "repeat(1)", // For large screens, create 3 equal columns
                },
                gap: "1.5rem",
                justifyContent: "center",
              }}
            >
              {allcategories?.map((val) => {
                return (
                  <Box onClick={() => productClick(val.name)} sx={{ padding: "24px 0px !important" }}>
                    <Box className="product-image">
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}/${val.image.path}`}
                        className="category-img"
                        alt=""
                      />

                      <img src={ArrowIcon} className="cust_arrow" />
                    </Box>
                    <Typography sx={{ paddingTop: "1rem" }}>{val?.name}</Typography>
                    <Typography sx={{ fontSize: "20px", color: "#3F5163" }}>
                      {val?.description ? val?.description : "null"}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Large Format
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Small Format
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xl: "repeat(3, 1fr)", // For large screens, create 3 equal columns
                  lg: "repeat(3, 1fr)", // For large screens, create 3 equal columns
                  md: "repeat(2, 1fr)", // For large screens, create 3 equal columns
                  sm: "repeat(1)", // For large screens, create 3 equal columns
                },
                gap: "1.5rem",
                justifyContent: "center",
              }}
            >
              {decalsCategories?.map((val) => {
                return (
                  <Box onClick={() => productClick(val.name)} sx={{ padding: "24px 0px !important" }}>
                    <Box className="product-image">
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}/${val.image.path}`}
                        className="category-img"
                        alt=""
                      />

                      <img src={ArrowIcon} className="cust_arrow" />
                    </Box>
                    <Typography sx={{ paddingTop: "1rem" }}>{val?.name}</Typography>
                    <Typography sx={{ fontSize: "20px", color: "#3F5163" }}>
                      {val?.description ? val?.description : "null"}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xl: "repeat(3, 1fr)", // For large screens, create 3 equal columns
                  lg: "repeat(3, 1fr)", // For large screens, create 3 equal columns
                  md: "repeat(2, 1fr)", // For large screens, create 3 equal columns
                  sm: "repeat(1)", // For large screens, create 3 equal columns
                },
                gap: "1.5rem",
                justifyContent: "center",
              }}
            >
              {flagCategories?.map((val) => {
                return (
                  <Box onClick={() => productClick(val.name)} sx={{ padding: "24px 0px !important" }}>
                    <Box className="product-image">
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}/${val.image.path}`}
                        className="category-img"
                        alt=""
                      />

                      <img src={ArrowIcon} className="cust_arrow" />
                    </Box>
                    <Typography sx={{ paddingTop: "1rem" }}>{val?.name}</Typography>
                    <Typography sx={{ fontSize: "20px", color: "#3F5163" }}>
                      {val?.description ? val?.description : "null"}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xl: "repeat(3, 1fr)", // For large screens, create 3 equal columns
                  lg: "repeat(3, 1fr)", // For large screens, create 3 equal columns
                  md: "repeat(2, 1fr)", // For large screens, create 3 equal columns
                  sm: "repeat(1)", // For large screens, create 3 equal columns
                },
                gap: "1.5rem",
                justifyContent: "center",
              }}
            >
              {signCategories?.map((val) => {
                return (
                  <Box onClick={() => productClick(val.name)} sx={{ padding: "24px 0px !important" }}>
                    <Box className="product-image">
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}/${val.image.path}`}
                        className="category-img"
                        alt=""
                      />

                      <img src={ArrowIcon} className="cust_arrow" />
                    </Box>
                    <Typography sx={{ paddingTop: "1rem" }}>{val?.name}</Typography>
                    <Typography sx={{ fontSize: "20px", color: "#3F5163" }}>
                      {val?.description ? val?.description : "null"}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </CustomTabPanel>
          {/* </Box> */}
        </Container>
      </Box>
    </>
  );
};

export default Categories;
