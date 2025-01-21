import React from "react";
import { Typography, Container, Paper, TextField, Button } from "@mui/material";

function Contact() {
  return (
    <Container>
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>Contact Us</Typography>
        <form>
          <TextField label="Name" fullWidth margin="normal" variant="outlined" />
          <TextField label="Email" fullWidth margin="normal" variant="outlined" />
          <TextField label="Message" fullWidth margin="normal" variant="outlined" multiline rows={4} />
          <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>Send Message</Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Contact;
