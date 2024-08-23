import React, { useState } from "react";
import { Box, Container, Tabs, Tab, Typography } from "@mui/material";
import "./Product.css"
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
              display: "none",
            },
          }}
        >
          {[
            "Description",
            "Lorem Ipsum 1",
            "Lorem Ipsum 2",
            "Lorem Ipsum 3",
          ].map((label, index) => (
            <Tab
              key={index}
              label={label}
              sx={{
                border: "1px solid #DCDCDC",
                borderRadius: "35px",
                fontSize: {lg:"18px",md:"18px"},
                lineHeight: "18px",
                fontWeight: "500",
                marginRight: "10px",
                backgroundColor: value === index ? "#3F5163" : "#F5F5F5",
                "&.Mui-selected": {
                  color: value === index ? "#FFFFFF" : "#868686",
                },
              }}
            />
          ))}
        </Tabs>
        <TabPanel value={value} index={0}>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#8C8E8F",
              lineHeight: "28px",
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
