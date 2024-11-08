import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import whyBranditSignage from "../../asset/images/whyBranditSignage.png";
import Brandit_icon1 from "../../asset/images/Brandit_icon1.svg";
import Brandit_icon2 from "../../asset/images/Brandit_icon2.svg";

const WhyBranditSignage = () => {
  return (
    <Box sx={{ marginTop: "10rem", padding: { xs: "1rem", md: "3rem" } }}>
      <Container>
        <Stack direction="row" sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
          <Box sx={{}} style={{ width: "calc(50% - 30px)" }}>
            {" "}
            <img
              src={whyBranditSignage}
              alt="Why Brandit Signage"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: { xs: "100%", md: "500px" }, // Ensure image scales properly
              }}
            />
          </Box>
          <Box sx={{ p: "20px" }} style={{ width: "calc(50% - 30px)" }}>
            <Typography
              variant="h4"
              sx={{
                color: "#3F5163",
                fontWeight: "bold",
                marginBottom: "1rem",
                fontSize: { xs: "1.5rem", md: "2rem", xl: "56px" }, // Responsive font size
              }}
            >
              Why Brandit Signage
            </Typography>
            <Typography
              sx={{
                marginBottom: "1rem",
                fontSize: { xs: "0.875rem", md: "1rem", color: "#8C8E8F" }, // Responsive font size
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s.
            </Typography>
            <Typography
              sx={{
                marginBottom: "1rem",
                fontSize: { xs: "0.875rem", md: "1rem", color: "#8C8E8F" }, // Responsive font size
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Stack icons vertically on small screens, horizontally on larger screens
                gap: 2,
                justifyContent: { xs: "center", sm: "flex-start" },
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  padding: { xs: "0.5rem", sm: "1rem" },
                }}
              >
                <img
                  src={Brandit_icon1}
                  alt="Brandit Icon 1"
                  style={{ maxWidth: "100px", height: "auto", padding: "10px 0px" }}
                />
                <Typography
                  sx={{ fontSize: { xs: "0.875rem", md: "1rem", xl: "36px" }, color: "#3F5163", fontWeight: "bold" }}
                >
                  Lorem Ipsum
                </Typography>
                <Typography sx={{ fontSize: { xs: "0.75rem", md: "0.875rem", xl: "16px" }, color: "#8C8E8F" }}>
                  Lorem Ipsum is simply dummy text
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  padding: { xs: "0.5rem", sm: "1rem" },
                }}
              >
                <img
                  src={Brandit_icon2}
                  alt="Brandit Icon 2"
                  style={{ maxWidth: "100px", height: "auto", padding: "10px 0px" }}
                />
                <Typography
                  sx={{ fontSize: { xs: "0.875rem", md: "1rem", xl: "36px" }, color: "#3F5163", fontWeight: "bold" }}
                >
                  Lorem Ipsum
                </Typography>
                <Typography sx={{ fontSize: { xs: "0.75rem", md: "0.875rem", xl: "16px" }, color: "#8C8E8F" }}>
                  Lorem Ipsum is simply dummy text
                </Typography>
              </Box>
            </Box>
            <Button variant="contained"   sx={{ marginTop: "1rem",backgroundColor: "#3F5163",color:'#fff' ,borderRadius:'8px',height:'60px'}}>
              Discover More
            </Button>
          </Box>
        </Stack>
        {/*<Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: { xs: "auto", md: "500px" }, // Adjust height based on screen size
            }}
          >
            <img
              src={whyBranditSignage}
              alt="Why Brandit Signage"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: { xs: "100%", md: "500px" }, // Ensure image scales properly
              }}
            />
          </Box>*/}
        {/*<Box 
            sx={{ 
              flex: 1,
              textAlign: { xs: "center", md: "left" }, // Center text on small screens
              padding: { xs: "1rem", md: "2rem" }
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                color: "#3F5163", 
                marginBottom: "1rem",
                fontSize: { xs: "1.5rem", md: "2rem" } // Responsive font size
              }}
            >
              Why Brandit Signage
            </Typography>
            <Typography 
              sx={{ 
                marginBottom: "1rem",
                fontSize: { xs: "0.875rem", md: "1rem" } // Responsive font size
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s.
            </Typography>
            <Typography 
              sx={{ 
                marginBottom: "1rem",
                fontSize: { xs: "0.875rem", md: "1rem" } // Responsive font size
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s.
            </Typography>
            <Box 
              sx={{ 
                display: "flex", 
                flexDirection: { xs: "column", sm: "row" }, // Stack icons vertically on small screens, horizontally on larger screens
                gap: 2, 
                justifyContent: { xs: "center", sm: "flex-start" },
                alignItems: "center"
              }}
            >
              <Box 
                sx={{ 
                  textAlign: "center", 
                  flex: 1, 
                  padding: { xs: "0.5rem", sm: "1rem" }
                }}
              >
                <img 
                  src={Brandit_icon1} 
                  alt="Brandit Icon 1"
                  style={{ maxWidth: "100px", height: "auto" }}
                />
                <Typography 
                  sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }} 
                >
                  Lorem Ipsum
                </Typography>
                <Typography 
                  sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }} 
                >
                  Lorem Ipsum is simply dummy text
                </Typography>
              </Box>
              <Box 
                sx={{ 
                  textAlign: "center", 
                  flex: 1,
                  padding: { xs: "0.5rem", sm: "1rem" }
                }}
              >
                <img 
                  src={Brandit_icon2} 
                  alt="Brandit Icon 2"
                  style={{ maxWidth: "100px", height: "auto" }}
                />
                <Typography 
                  sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }} 
                >
                  Lorem Ipsum
                </Typography>
                <Typography 
                  sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }} 
                >
                  Lorem Ipsum is simply dummy text
                </Typography>
              </Box>
            </Box>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ marginTop: "1rem" }}
            >
              Discover More
            </Button>
          </Box>*/}
      </Container>
    </Box>
  );
};

export default WhyBranditSignage;
