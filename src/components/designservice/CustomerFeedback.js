import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";

const CustomerFeedback = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header */}
      <Typography variant="h4" align="center" gutterBottom>
        Feedback from our Customers
      </Typography>

      {/* First Image Row */}
      <Box mb={6}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={2}>
            <img src="https://via.placeholder.com/100x300" alt="Dummy Image 1" width="100%" />
          </Grid>
          <Grid item xs={12} sm={2}>
            <img src="https://via.placeholder.com/100x300" alt="Dummy Image 2" width="100%" />
          </Grid>
          <Grid item xs={12} sm={2}>
            <img src="https://via.placeholder.com/100x300" alt="Dummy Image 3" width="100%" />
          </Grid>
          <Grid item xs={12} sm={2}>
            <img src="https://via.placeholder.com/100x300" alt="Dummy Image 4" width="100%" />
          </Grid>
          <Grid item xs={12} sm={2}>
            <img src="https://via.placeholder.com/100x300" alt="Dummy Image 5" width="100%" />
          </Grid>
        </Grid>
      </Box>

      {/* First Text Testimonial */}
      <Typography variant="body1" align="center" paragraph>
        “I have had very personable and helpful guidance working with the free design service. My questions have always
        been answered, and signs.com has gone out of their way to ensure our product is of the highest quality. They
        have done an excellent job of working with our deadlines and provided a quick turnaround! Very easy to use and
        helpful! Thank you!!!”
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        - Shaylee Franks
      </Typography>

      {/* Second Image Row */}
      <Box mb={6}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={4}>
            <img src="https://via.placeholder.com/300x150" alt="Dummy Image 6" width="100%" />
            <Typography variant="body2" align="center">
              Finished Design
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <img src="https://via.placeholder.com/300x150" alt="Dummy Image 7" width="100%" />
            <Typography variant="body2" align="center">
              Actual Product
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Second Text Testimonial */}
      <Typography variant="body1" align="center" paragraph>
        “Sent image to Laura, graphics designer. She kept in touch by email, cleaned up my design, and within a couple
        of days I had my banner in hand. Great job, thanks again!”
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        - Kevin Winder
      </Typography>

      {/* Third Image Row */}
      <Box mb={6}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={4}>
            <img src="https://via.placeholder.com/300x150" alt="Dummy Image 8" width="100%" />
            <Typography variant="body2" align="center">
              Finished Design
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <img src="https://via.placeholder.com/300x150" alt="Dummy Image 9" width="100%" />
            <Typography variant="body2" align="center">
              Actual Product
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Third Text Testimonial */}
      <Typography variant="body1" align="center" paragraph>
        “Kamisha King, my designer, was awesome, very helpful and professional.”
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        - Lori Dunbar
      </Typography>

      {/* FAQ Section */}
      <Box mb={6}>
        <Typography variant="h5" gutterBottom>
          How do I start?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Start by filling out our Request Form. Please provide us with as much detail as you can (written
          description/images) so we can get started on creating your design right away.
        </Typography>

        <Typography variant="h5" gutterBottom>
          How long does it take?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Once you fill out our request form, you will be contacted by one of our graphic designers within one to two
          business days. Though many times a graphic designer will contact you in a matter of hours to get the process
          started.
        </Typography>

        <Typography variant="h5" gutterBottom>
          What types of signs can you design?
        </Typography>
        <Typography variant="body1" gutterBottom>
          We can create a design for any of the products we offer, ranging from aluminum signs to banners to window
          decals.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Can you create logos?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Logo design is a bit more technical, so we do not offer that at this time. However, we will be more than happy
          to help refine a logo you provide us.
        </Typography>

        <Typography variant="h5" gutterBottom>
          What is a vector?
        </Typography>
        <Typography variant="body1" gutterBottom>
          A vector is a type of graphic that uses mathematical equations to produce an image.
        </Typography>

        {/* Add more FAQ sections as needed */}
      </Box>
    </Container>
  );
};

export default CustomerFeedback;
