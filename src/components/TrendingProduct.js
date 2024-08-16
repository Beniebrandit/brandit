import { Box, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import trending_icon1 from "../asset/images/trending_icon1.svg";
import trending_icon2 from "../asset/images/trending_icon2.svg";
import trending_icon3 from "../asset/images/trending_icon3.svg";
import trending_icon4 from "../asset/images/trending_icon4.svg";
import trending_icon5 from "../asset/images/trending_icon5.svg";
import trending_image1 from "../asset/images/trending_image1.png";
import trending_image2 from "../asset/images/trending_image2.png";
import trending_image3 from "../asset/images/trending_image3.png";
import trending_image4 from "../asset/images/trending_image4.png";
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
  console.log(tabData.icon,"icon")
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
    <Box className="background1">
     <Typography sx={{position:"relative",zIndex:"3",fontSize:"50px",paddingTop:"4rem",paddingLeft:"8rem"}}>Trending products</Typography>
     
     <Box sx={{ marginTop: "1rem" ,position:"relative" , zIndex:"1" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
                }}
              >
                {tabData?.map((tab, index) => (
                  <Tab
                    key={index}
                    label={tab.label}
                    sx={{ height: "7rem" }}
                    {...a11yProps(index)}
                  >
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
                  </Tab>
                ))}
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xl: "repeat(4, 1fr)", // For large screens, create 3 equal columns
                    lg: "repeat(4, 1fr)", // For large screens, create 3 equal columns
                    md: "repeat(2, 1fr)", // For large screens, create 3 equal columns
                    sm: "repeat(1)", // For large screens, create 3 equal columns
                  },
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                {data?.map((val) => {
                  return (
                    <Box sx={{margin:"auto",backgroundColor:"white",padding:"1rem",borderRadius:"7px"}}>
                      <img
                        src={val.image}
                        style={{ height: "18rem", width: "18rem" }}
                        alt=""
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
          </Box>
    </Box>
    </>
  )
}

export default TrendingProducts