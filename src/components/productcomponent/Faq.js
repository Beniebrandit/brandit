import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { ReviewService } from "../../services/Review.service";

const Faq = () => {
  const [expanded, setExpanded] = useState(1);
  const [data, setData] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const Faqfetch = async () => {
    const res = await ReviewService.Faq();
    const response = res.data;
    setData(response);
  };

  useEffect(() => {
    Faqfetch();
  }, []);

  return (
    <>
      <Box sx={{ marginTop: "100px" }}>
        <Container>
          <Typography
            sx={{
              textAlign: "center",
              color: "#3F5163",
              fontSize: { md: "60px", xs: "32px" },
              fontWeight: "600",
            }}
          >
            Frequently Asked Questions
          </Typography>
          {data?.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
              sx={{
                marginBottom: "10px",
                backgroundColor: "#FFFFFF !important",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                border: "1px solid #868686",
                borderRadius: "10px",
                marginTop: "25px",
                width: "100%",
                lineHeight: "40px",
                position: "static !important",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <AddIcon
                    sx={{
                      color: "#3F5163",
                      border: "2.4px solid #3F5163",
                      borderRadius: "5px",
                      fontSize: "20px",
                    }}
                  />
                }
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
                sx={{
                  fontSize: "20px",
                  color: expanded === index ? "#3F5163" : "#868686",

                  fontWeight: expanded === index ? "bold" : "normal", // Conditionally set font weight
                }}
              >
                {faq.question}
              </AccordionSummary>
              <AccordionDetails sx={{ fontWeight: "normal", color: "#868686" }}>{faq.answer}</AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>
    </>
  );
};

export default Faq;
