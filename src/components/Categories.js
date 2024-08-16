import React from "react";
import { Box, Container, Typography } from "@mui/material";
import categories_icon1 from "../asset/images/categories_icon1.svg";
import categories_icon2 from "../asset/images/categories_icon2.svg";
import categories_icon3 from "../asset/images/categories_icon3.svg";
import categories_icon4 from "../asset/images/categories_icon4.svg";
import categories_icon5 from "../asset/images/categories_icon5.svg";
import categories_icon6 from "../asset/images/categories_icon6.svg";
import category_image1 from "../asset/images/category_image1.png";
import category_image2 from "../asset/images/category_image2.png";
import category_image3 from "../asset/images/category_image3.png";
import category_image4 from "../asset/images/category_image4.png";
import category_image5 from "../asset/images/category_image5.png";
import category_image6 from "../asset/images/category_image6.png";
import category_image7 from "../asset/images/category_image7.png";
import category_image8 from "../asset/images/category_image8.png";
import category_image9 from "../asset/images/category_image9.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab"
import PropTypes from "prop-types";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

const data = [
  { image: category_image1, title: " Lorem Ipsum", description: "Lorem Ipsum" },
  { image: category_image2, title: " Lorem Ipsum", description: "Lorem Ipsum" },
  { image: category_image3, title: " Lorem Ipsum", description: "Lorem Ipsum" },
  { image: category_image4, title: " Lorem Ipsum", description: "Lorem Ipsum" },
  { image: category_image5, title: " Lorem Ipsum", description: "Lorem Ipsum" },
  { image: category_image6, title: " Lorem Ipsum", description: "Lorem Ipsum" },
  { image: category_image7, title: " Lorem Ipsum", description: "Lorem Ipsum" },
  { image: category_image8, title: " Lorem Ipsum", description: "Lorem Ipsum" },
  { image: category_image9, title: " Lorem Ipsum", description: "Lorem Ipsum" },
];

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          margin: "auto",
          marginTop: "10rem",
          position:"relative",
          // display: "flex",
          // justifyContent: "space-around",
          // alignItems:"center",
          width: "75%",
          padding: "1rem",
        }}
       
      >
        <Container >
          <h1>Categories</h1>
          {/* <Box sx={{ marginTop: "1.5rem" }}> */}
            <Box  className="custom-scrollbar custom-scrollbar-container" sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                className="basic tabs example"
                sx={{
                  display: "grid",
                  // gridTemplateColumns: {
                  //   xl: "repeat(1, 1fr)",
                  //   lg: "repeat(1, 1fr)",
                  //   md: "repeat(2, 1fr)",
                  //   sm: "repeat(3, 1fr)",
                  //   xs: "repeat(6, 1fr)",
                  // },
                  gap: "1rem",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "800px"
                }}
              >
                {tabData.map((tab, index) => (
                  <Tab
                    key={index}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "7rem",
                        }}
                      >
                        <img
                          src={tab.icon}
                          alt={tab.alt}
                          style={{ height: "46px", width: "43px" }}
                        />
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
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                {data?.map((val) => {
                  return (
                    <Box>
                      <img
                        src={val.image}
                        style={{ height: "18rem", width: "18rem" }}
                        alt=""
                      />
                      <ArrowCircleRightOutlinedIcon
                        sx={{
                          fontSize: "35px",
                          marginLeft: "-40px",
                          marginBottom: "-20px",
                        }}
                      />
                      <Typography>{val.title}</Typography>
                      <Typography sx={{ fontSize: "20px" }}>
                        {val.description}
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
              Stickers and Decals
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              Flags
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
              Sign Holders
            </CustomTabPanel>
          {/* </Box> */}
        </Container>
      </Box>
    </>
  );
};

export default Categories;
