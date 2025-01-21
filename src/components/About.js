import React from "react";
import { Typography, Container, Paper } from "@mui/material";

function About() {
  return (
    <Container>
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>About Us</Typography>
        <Typography variant="body1">
          Our website is dedicated to providing the best user experience. We are constantly updating our content to keep it fun, informative, and engaging.
        </Typography>
      </Paper>
    </Container>
  );
}

export default About;
