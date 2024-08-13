import React, { useState } from "react";
import { Box, Container, Tabs, Tab, Typography } from "@mui/material";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const ProductDescription = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "10px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          height: "100%",

          marginTop: "100px",
          padding: "30px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            "& .MuiTabs-indicator": {
              display: "none", // Hide the indicator
            },
          }}
        >
          <Tab
            label="Description"
            sx={{
              border: "1px solid #3F5163",
              color: "#FFFFFF",
              borderRadius: "35px",
              backgroundColor: "#3F5163",
              fontSize: "18px",
              lineHeight: "18px",
              fontFamily: "Cerebri Sans",
              fontWeight: "400",
              marginRight: "10px",
              "&.Mui-selected": {
                color: "#FFFFFF",
                backgroundColor: "#3F5163",
              },
            }}
          />
          <Tab
            label="Lorem Ipsum"
            sx={{
              border: "1px solid #DCDCDC",
              color: "#868686",
              borderRadius: "35px",
              fontSize: "18px",
              lineHeight: "18px",
              fontFamily: "Cerebri Sans",
              fontWeight: "500",
              marginRight: "10px",
              "&.Mui-selected": {
                color: "#3F5163",
              },
            }}
          />
          <Tab
            label="Lorem Ipsum"
            sx={{
              border: "1px solid #DCDCDC",
              color: "#868686",
              borderRadius: "35px",
              fontSize: "18px",
              lineHeight: "18px",
              fontFamily: "Cerebri Sans",
              fontWeight: "500",
              marginRight: "10px",
              "&.Mui-selected": {
                color: "#3F5163", // Ensure selected tab color
              },
            }}
          />
          <Tab
            label="Lorem Ipsum"
            sx={{
              border: "1px solid #DCDCDC",
              color: "#868686",
              borderRadius: "35px",
              fontSize: "18px",
              lineHeight: "18px",
              fontFamily: "Cerebri Sans",
              fontWeight: "500",
              "&.Mui-selected": {
                color: "#3F5163", // Ensure selected tab color
              },
            }}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#8C8E8F",
              lineHeight: "28px",
              fontFamily: "Cerebri Sans",
              fontWeight: "500",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at nisi
            tincidunt, iaculis velit ac, suscipit elit. Vestibulum tincidunt vel
            metus sit amet condimentum. Integer tincidunt fermentum est, sed
            lacinia leo tempor ut. Proin blandit suscipit justo, ac laoreet mi
            ornare quis. In a sem lobortis lacus consectetur varius id lacinia
            lorem.
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#8C8E8F",
              lineHeight: "28px",
              fontFamily: "Cerebri Sans",
              fontWeight: "500",
            }}
          >
            Pellentesque iaculis nulla sollicitudin purus lobortis, varius
            tempor diam iaculis. Cras nec mauris commodo, suscipit arcu sed,
            dapibus ligula. Vestibulum fringilla lorem mi, nec aliquam dui
            blandit et. Sed ornare porta suscipit. Aliquam maximus, ex id
            sodales pulvinar.
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#8C8E8F",
              lineHeight: "28px",
              fontFamily: "Cerebri Sans",
              fontWeight: "400",
            }}
          >
            Pellentesque iaculis nulla sollicitudin purus lobortis, varius
            tempor diam iaculis. Cras nec mauris commodo, suscipit arcu sed,
            dapibus ligula. Vestibulum fringilla lorem mi, nec aliquam dui
            blandit et. Sed ornare porta suscipit. Aliquam maximus, ex id
            sodales pulvinar.
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Content for Tab 2
        </TabPanel>
        <TabPanel value={value} index={2}>
          Content for Tab 3
        </TabPanel>
        <TabPanel value={value} index={3}>
          Content for Tab 4
        </TabPanel>
      </Box>
    </Container>
  );
};

export default ProductDescription;
