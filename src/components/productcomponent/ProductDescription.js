import React, { useEffect, useState } from "react";
import { Box, Container, Tabs, Tab, Typography } from "@mui/material";
import { styled } from "@mui/system";
import "./Product.css";
import { ProductService } from "../../services/Product.service";

// Styled TabPanel component
const TabPanel = styled(({ children, value, index, ...other }) => (
  <div role="tabpanel" hidden={value !== index} {...other}>
    {value === index && <Box sx={{ p: { xs: 2, sm: 3 }, width: "100%" }}>{children}</Box>}
  </div>
))``;

const ProductDescription = ({ longdescription }) => {
  const [value, setValue] = useState(0);
  const [alldata, setAllData] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //  const getApi = async () => {
  //    ProductService.product().then((res) => {
  //      const response = res.data;
  //      setAllData(response);
  //      console.log(alldata, "alldata1");
  //    });
  //
  //  };
  //
  //  useEffect(() => {
  //    getApi();
  //  }, []);

  return (
    <Container>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "10px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          height: "100%",
          marginTop: { xs: "50px", sm: "100px" },
          padding: { xs: "20px", sm: "30px" },
          maxWidth: "100%",
        }}
      >
        <Box
        //className="custom-scrollbar custom-scrollbar-container"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              "& .MuiTabs-indicator": {
                display: "none",
              },
              mb: { xs: 2, sm: 3 },
              width: "70rem",
            }}
          >
            {["Description", "Lorem Ipsum 1", "Lorem Ipsum 2", "Lorem Ipsum 3"].map((label, index) => (
              <Tab
                key={index}
                label={label}
                sx={{
                  border: "1px solid #DCDCDC",
                  borderRadius: "35px",
                  fontSize: { xs: "14px", sm: "18px" },
                  lineHeight: "18px",
                  fontWeight: "500",
                  marginRight: { xs: "5px", sm: "10px" },
                  backgroundColor: value === index ? "#3F5163" : "#F5F5F5",
                  "&.Mui-selected": {
                    color: "#FFFFFF",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
        <TabPanel
          value={value}
          index={0}
          sx={{
            "& .MuiBox-root": {
              padding: "0px !important",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "14px", sm: "18px" },
              color: "#8C8E8F",
              lineHeight: "28px",
              fontWeight: "500",
              padding: "0px",
            }}
          >
            {longdescription}
          </Typography>
          {/*<Typography
            sx={{
              fontSize: { xs: "14px", sm: "18px" },
              color: "#8C8E8F",
              lineHeight: "28px",
              fontWeight: "500",
              mt: 2,
            }}
          >
            Pellentesque iaculis nulla sollicitudin purus lobortis, varius tempor diam iaculis. Cras nec mauris commodo,
            suscipit arcu sed, dapibus ligula. Vestibulum fringilla lorem mi, nec aliquam dui blandit et. Sed ornare
            porta suscipit. Aliquam maximus, ex id sodales pulvinar.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "14px", sm: "18px" },
              color: "#8C8E8F",
              lineHeight: "28px",
              fontWeight: "400",
              mt: 2,
            }}
          >
            Pellentesque iaculis nulla sollicitudin purus lobortis, varius tempor diam iaculis. Cras nec mauris commodo,
            suscipit arcu sed, dapibus ligula. Vestibulum fringilla lorem mi, nec aliquam dui blandit et. Sed ornare
            porta suscipit. Aliquam maximus, ex id sodales pulvinar.
          </Typography>*/}
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
