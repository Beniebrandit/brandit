import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";

const data = [
  {
    header: "Printed Sides:",
    title1: "Single Sided",
    title2: "Double Sided",
    accordionId: "accordion1",
  },
  {
    header: "Poles:",
    title1: "Pole Set",
    title2: "None",
    accordionId: "accordion2",
  },
  {
    header: "Base:",
    title1: "Ground Stake",
    title2: "Square Base",
    title3: "Cross Base",
    title4: "Cross Base & Water Bag",
    accordionId: "accordion3",
  },
  {
    header: "Accessories:",
    title1: "No Carry Bag",
    title2: "Carring Case",
    accordionId: "accordion4",
  },
];

const Config = () => {
  const [selectedCard, setSelectedCard] = useState(() => {
    const initialSelection = {};
    data.map((val) => {
      initialSelection[val.accordionId] = val.title1;
    });
    return initialSelection;
  });
  console.log(selectedCard[0], "selectedCard");

  const handleCardClick = (accordionId, title) => {
    setSelectedCard((prevSelectedCards) => ({
      ...prevSelectedCards,
      [accordionId]: title,
    }));
    console.log(selectedCard, "selectedCard");
  };
  return (
    <>
      <Box>
        <Box className="custom-scrollbar custom-scrollbar-container">
          <Box sx={{ height: "34rem" }}>
            <Typography>Select product :</Typography>
            <Select fullWidth defaultValue="Feather Flag Banner">
              <MenuItem value="Feather Flag Banner">
                Feather Flag Banner
              </MenuItem>
              <MenuItem value="3 Sided table Cover">
                3 Sided table Cover
              </MenuItem>
              <MenuItem value="A-Frame Sign">A-Frame Sign</MenuItem>
              <MenuItem value="Acrylic Photo print">
                Acrylic Photo print
              </MenuItem>
              {/* Add more products as needed */}
            </Select>
            <Divider sx={{ marginTop: "1rem", marginBottom: "0.5rem" }} />
            <Typography>Size (in Inches)</Typography>
            <Select fullWidth defaultValue="Small">
              <MenuItem value="Small">Small (24.25"x79.5")</MenuItem>
              <MenuItem value="Medium">Medium (24.25"x79.5")</MenuItem>
              <MenuItem value="Large">Large (24.25"x79.5")</MenuItem>
              <MenuItem value="X-Large">X-Large (24.25"x79.5")</MenuItem>
              {/* Add more sizes as needed */}
            </Select>
            <Divider sx={{ marginTop: "1rem", marginBottom: "0.5rem" }} />

            <Typography>Quantity</Typography>

            <TextField fullWidth type="number" defaultValue={1} />

            <Box
              sx={{
                position: "relative",
                mt: 1,
                "&:hover .hover-content": {
                  display: "inline",
                },
              }}
            >
              <Typography
                variant="body1"
                color="primary"
                sx={{ display: "inline-block" }}
              >
                Buy More, Save More!
              </Typography>
              <Box
                className="hover-content"
                sx={{
                  display: "none",
                  position: "relative",
                  left: 0,
                  right: 0,
                  mt: 1,
                  // backgroundColor: "#fff",
                  // padding: "10px",
                  // boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  // zIndex: 1,
                  width: "100%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  2 for $139.78 ea.{" "}
                  <a href="#" style={{ color: "#0066cc" }}>
                    Save 7%
                  </a>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  3 for $138.75 ea.{" "}
                  <a href="#" style={{ color: "#0066cc" }}>
                    Save 8%
                  </a>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  4 for $137.71 ea.{" "}
                  <a href="#" style={{ color: "#0066cc" }}>
                    Save 8%
                  </a>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  5 for $136.68 ea.{" "}
                  <a href="#" style={{ color: "#0066cc" }}>
                    Save 9%
                  </a>
                </Typography>
              </Box>
            </Box>
            <Box sx={{ marginTop: "1rem" }}>
              {data?.map((val, index) => {
                return (
                  <>
                    <Accordion
                      //   defaultExpanded
                      key={index}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                          "& .MuiAccordionSummary-content": {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          },
                        }}
                      >
                        <Typography>{val.header}</Typography>

                        {selectedCard[val.accordionId] && (
                          <Typography>
                            {selectedCard[val.accordionId]}
                          </Typography>
                        )}
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Paper
                              elevation={3}
                              sx={{
                                padding: 1,
                                textAlign: "center",
                                border:
                                  selectedCard[val.accordionId] === val.title1
                                    ? "2px solid"
                                    : "none",
                                borderColor:
                                  selectedCard[val.accordionId] ===
                                    val.title1 && "#ff9900",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleCardClick(val.accordionId, val.title1)
                              }
                            >
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold" }}
                              >
                                {val.title1}
                              </Typography>
                              <img
                                src="single-sided-image-url"
                                alt="Single Sided"
                                style={{ width: "100%", marginTop: "10px" }}
                              />
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper
                              //   elevation={1}
                              sx={{
                                padding: 1,
                                textAlign: "center",
                                border:
                                  selectedCard[val.accordionId] === val.title2
                                    ? "2px solid"
                                    : "none",
                                borderColor:
                                  selectedCard[val.accordionId] ===
                                    val.title2 && "#ff9900",

                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleCardClick(val.accordionId, val.title2)
                              }
                            >
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold" }}
                              >
                                {val.title2}
                              </Typography>
                              <img
                                src="double-sided-image-url"
                                alt="Double Sided"
                                style={{ width: "100%", marginTop: "10px" }}
                              />
                            </Paper>
                          </Grid>
                          {val.title3 && (
                            <>
                              <Grid item xs={6}>
                                <Paper
                                  elevation={1}
                                  sx={{
                                    padding: 1,
                                    textAlign: "center",
                                    border:
                                      selectedCard[val.accordionId] ===
                                      val.title3
                                        ? "2px solid"
                                        : "none",
                                    borderColor:
                                      selectedCard[val.accordionId] ===
                                        val.title3 && "#ff9900",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    handleCardClick(val.accordionId, val.title3)
                                  }
                                >
                                  <Typography
                                    variant="body1"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    {val.title3}
                                  </Typography>
                                  <img
                                    src="double-sided-image-url"
                                    alt="Double Sided"
                                    style={{ width: "100%", marginTop: "10px" }}
                                  />
                                </Paper>
                              </Grid>
                            </>
                          )}
                          {val.title4 && (
                            <>
                              <Grid item xs={6}>
                                <Paper
                                  elevation={1}
                                  sx={{
                                    padding: 1,
                                    textAlign: "center",
                                    border:
                                      selectedCard[val.accordionId] ===
                                      val.title4
                                        ? "2px solid"
                                        : "none",
                                    borderColor:
                                      selectedCard[val.accordionId] ===
                                        val.title4 && "#ff9900",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    handleCardClick(val.accordionId, val.title4)
                                  }
                                >
                                  <Typography
                                    variant="body1"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    {val.title4}
                                  </Typography>
                                  <img
                                    src="double-sided-image-url"
                                    alt="Double Sided"
                                    style={{ width: "100%", marginTop: "10px" }}
                                  />
                                </Paper>
                              </Grid>
                            </>
                          )}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </>
                );
              })}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 2,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Typography variant="h6" sx={{ color: "#1976d2" }}>
            $150.33 <br />
            each
          </Typography>
          <Typography variant="body2">
            Subtotal:
            <br /> $150.33
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Config;
