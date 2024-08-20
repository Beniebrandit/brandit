import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import whyBranditSignage from "../asset/images/whyBranditSignage.png";
import Brandit_icon1 from "../asset/images/Brandit_icon1.svg";
import Brandit_icon2 from "../asset/images/Brandit_icon2.svg";

const WhyBranditSignage = () => {
  return (
    <>
      <Box sx={{ marginTop: "10rem",position:"relative" }}>
        <Container>
          <Box sx={{ display: "flex",height:"500px" }}>
            <img src={whyBranditSignage} alt="" style={{width:"100%" , height:"100%"}} />
            <Box>
              <h1 style={{padding:"1rem",color:"3F5163"}}>Why Brandit Signage</h1>

              <Typography style={{padding:"1rem"}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s. 
              </Typography>
              <Typography style={{padding:"1rem"}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s. 
              </Typography>
              <Box sx={{display:"flex",padding:"1rem"}}>
                <Box>
                    <img src={Brandit_icon1} alt=""/>
                    <Typography>Lorem Ipsum</Typography>
                    <Typography>Lorem Ipsum is simply dummy text</Typography>
                </Box>
                <Box>
                    <img src={Brandit_icon2} alt=""/>
                    <Typography>Lorem Ipsum</Typography>
                    <Typography>Lorem Ipsum is simply dummy text</Typography>
                </Box>
              </Box>
              <Button> Discover More</Button>
            </Box>
          </Box>
        </Container>
      </Box>

    
    </>
  );
};

export default WhyBranditSignage;
