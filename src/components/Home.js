import React from "react";
import { Typography, Container, Grid, Paper } from "@mui/material";

function Home() {
  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>Welcome to Our Website</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>About Us</Typography>
            <Typography variant="body1">
              We are a modern, contemporary, and responsive website providing the best services for our users.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>Our Services</Typography>
            <Typography variant="body1">
              We offer a variety of services to cater to your needs. Explore our website to learn more.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
