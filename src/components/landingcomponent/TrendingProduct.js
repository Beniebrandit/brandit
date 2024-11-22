import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import trending_icon1 from "../../asset/images/trending_icon1.svg";
import trending_icon2 from "../../asset/images/trending_icon2.svg";
import trending_icon3 from "../../asset/images/trending_icon3.svg";
import trending_icon4 from "../../asset/images/trending_icon4.svg";
import trending_icon5 from "../../asset/images/trending_icon5.svg";
import trending_image1 from "../../asset/images/trending_image1.png";
import trending_image2 from "../../asset/images/trending_image2.png";
import trending_image3 from "../../asset/images/trending_image3.png";
import trending_image4 from "../../asset/images/trending_image4.png";
import treadingArrow from "../../asset/images/treadingArrow.svg";
import PropTypes from "prop-types";

const data = [
  { image: trending_image1, title: " Lorem Ipsum", description: "Lorem Ipsum" },
  { image: trending_image2, title: " Lorem Ipsum", description: "Lorem Ipsum" },
  { image: trending_image3, title: " Lorem Ipsum", description: "Lorem Ipsum" },
  { image: trending_image4, title: " Lorem Ipsum", description: "Lorem Ipsum" },
];

const tabData = [
  { icon: trending_icon1, alt: "trending_icon1", label: "Yard Signs" },
  { icon: trending_icon2, alt: "trending_icon2", label: "Custom T-shirts" },
  { icon: trending_icon3, alt: "trending_icon3", label: "Business Banners" },
  {
    icon: trending_icon4,
    alt: "trending_icon4",
    label: "Birthday Banners",
  },
  { icon: trending_icon5, alt: "trending_icon5", label: "Event Banners" },
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

const TrendingProducts = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box className="background1" sx={{ position: "absolute", zIndex: "-1" }}></Box>
      <Box sx={{ padding: { sx: "1rem", sm: "8rem" } }}>
        <Typography
          sx={{
            fontSize: { xs: "30px", sm: "50px" },
            paddingLeft: { xs: "1rem", sm: "0rem" },
            marginTop: { xs: "5rem", sm: "0rem" },
            color: "white",
            fontFamily: "Avenir LT Std",
          }}
        >
          Trending products
        </Typography>
        <Box
          className="custom-scrollbar custom-scrollbar-container"
          sx={{ borderBottom: 1, borderColor: "divider", marginTop: "1rem" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            className="tabs-cust"
            sx={{
              "& .MuiTabs-flexContainer": {
                display: "flex",
                flexWrap: "wrap",
                justifyContent: { xs: "left", sm: "space-between" },
                alignItems: "center",
              },
              width: "1450px",
            }}
          >
            {tabData?.map((tab, index) => (
              <Tab
                key={index}
                sx={{ height: "185px" }}
                {...a11yProps(index)}
                label={
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={tab.icon} alt={tab.alt} style={{ height: "113px", width: "113px" }} />
                    <Box display="flex" alignItems="baseline" width="12rem" sx={{justifyContent:"center", columnGap: 1}}>
                      <Typography
                        variant="body2"
                        sx={{
                          marginTop: "1rem",
                          fontSize: "20px",
                          fontWeight: 400,
                          textTransform: "capitalize",
                          //paddingRight: "1rem",
                        }}
                      >
                        {tab.label}
                      </Typography>
                      {value === index && (
                        <img
                          src={treadingArrow}
                          alt="Arrow Icon"
                          style={{ marginLeft: "5px",marginTop:"5px", height: "15px",width:"auto" }} // Adjust size as needed
                        />
                      )}
                    </Box>
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Box>
        <CustomTabPanel
          sx={{
            "& .19kzrtu": {
              padding: "0px",
            },
          }}
          value={value}
          index={0}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "3rem",
            }}
          >
            {data?.map((val) => {
              return (
                <Box
                  sx={{
                    margin: { xs: "auto", sm: "auto", md: "0px" },
                    backgroundColor: "white",
                    padding: { xs: "0.5rem", sm: "1rem" },
                    borderRadius: "7px",
                    marginBottom: { xs: "5px", sm: "10px", md: "2rem" },
                    width: { xs: "100%", sm: "auto" },
                  }}
                  py={10}
                >
                  <img src={val.image} style={{ height: "18rem", width: "18rem" }} alt="" />

                  <Typography>{val.title}</Typography>
                  <Typography sx={{ fontSize: "20px" }}>{val.description}</Typography>
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
      </Box>
    </>
  );
};

export default TrendingProducts;
