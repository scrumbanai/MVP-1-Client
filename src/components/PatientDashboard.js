import React, { useState } from "react";
import { Typography, AppBar, Tabs, Tab, Box, Button, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Grid, Paper, Avatar } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import MessageIcon from '@mui/icons-material/Message';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';

function PatientDashboard() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const user = { firstname: "John" }; // Replace with actual user data
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: '#3b5998' }}>
        <Grid container justifyContent="center" alignItems="center" style={{ padding: '10px' }}>
          <Avatar style={{ backgroundColor: '#fff', color: '#3b5998', marginRight: '10px' }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h5" style={{ color: '#fff' }}>Welcome, {user.firstname}</Typography>
        </Grid>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="patient dashboard tabs"
          variant="fullWidth"
          TabIndicatorProps={{ style: { backgroundColor: '#fff' } }}
        >
          <Tab icon={<AccountCircleIcon style={{ color: '#fff' }} />} label={<span style={{ color: '#fff' }}>Profile</span>} />
          <Tab icon={<EventIcon style={{ color: '#fff' }} />} label={<span style={{ color: '#fff' }}>Appointments</span>} />
          <Tab icon={<DescriptionIcon style={{ color: '#fff' }} />} label={<span style={{ color: '#fff' }}>Records</span>} />
          <Tab icon={<PaymentIcon style={{ color: '#fff' }} />} label={<span style={{ color: '#fff' }}>Billing</span>} />
          <Tab icon={<MessageIcon style={{ color: '#fff' }} />} label={<span style={{ color: '#fff' }}>Messages</span>} />
          <Tab icon={<FeedbackIcon style={{ color: '#fff' }} />} label={<span style={{ color: '#fff' }}>Feedback</span>} />
          <IconButton color="inherit" onClick={handleClickOpen} style={{ marginLeft: 'auto', color: '#fff' }}>
            <ExitToAppIcon />
          </IconButton>
        </Tabs>
      </AppBar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: '10px',
            padding: '20px',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center', fontWeight: 'bold' }}>Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center', marginBottom: '20px' }}>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={handleClose} variant="contained" color="secondary" style={{ marginRight: '10px' }}>
            Cancel
          </Button>
          <Button onClick={handleLogout} variant="contained" color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
      <TabPanel value={value} index={0}>
        <Profile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Appointments />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Records />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Billing />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Messages />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Feedback />
      </TabPanel>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    age: "30",
    contactInfo: "john.doe@example.com",
    emergencyContact: "Jane Doe - 123-456-7890",
    insurance: "XYZ Health Insurance"
  });

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    // Save profile changes logic here
    setEditMode(false);
  };

  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
            <Typography variant="h6" gutterBottom>Personal Details</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Name" secondary={editMode ? <TextField name="name" value={profile.name} onChange={handleChange} fullWidth /> : profile.name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Age" secondary={editMode ? <TextField name="age" value={profile.age} onChange={handleChange} fullWidth /> : profile.age} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Contact Info" secondary={editMode ? <TextField name="contactInfo" value={profile.contactInfo} onChange={handleChange} fullWidth /> : profile.contactInfo} />
              </ListItem>
            </List>
            {editMode ? (
              <Button variant="contained" color="primary" onClick={handleSave} fullWidth>Save</Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleEditToggle} fullWidth>Update Profile</Button>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
            <Typography variant="h6" gutterBottom>Medical History</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Past Appointment" secondary="Dr. Brown - 10/10/2023" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Diagnosis" secondary="Hypertension" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Treatment" secondary="Medication - Amlodipine" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
            <Typography variant="h6" gutterBottom>Emergency Contact & Insurance</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Emergency Contact" secondary={editMode ? <TextField name="emergencyContact" value={profile.emergencyContact} onChange={handleChange} fullWidth /> : profile.emergencyContact} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Insurance" secondary={profile.insurance} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Coverage" secondary="Full Coverage" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

function Appointments() {
  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
        <Typography variant="h6" gutterBottom>Appointments</Typography>
        <Button variant="contained" color="primary" fullWidth style={{ marginBottom: '20px' }}>Schedule Appointment</Button>
        <List>
          <ListItem>
            <ListItemText primary="Upcoming Appointment" secondary="Dr. Smith - 12/12/2023" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Past Appointment" secondary="Dr. Brown - 10/10/2023" />
          </ListItem>
        </List>
      </Paper>
    </div>
  );
}

function Records() {
  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
        <Typography variant="h6" gutterBottom>Health Records</Typography>
        <List>
          <ListItem>
            <ListItemText primary="Lab Results" secondary="Blood Test - Normal" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Diagnostic Reports" secondary="X-Ray - No issues" />
          </ListItem>
        </List>
        <Button variant="contained" color="primary" fullWidth>View All Records</Button>
      </Paper>
    </div>
  );
}

function Billing() {
  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
        <Typography variant="h6" gutterBottom>Billing & Payments</Typography>
        <List>
          <ListItem>
            <ListItemText primary="Billing Statement" secondary="Total: $200" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Payment History" secondary="Paid: $200 on 11/11/2023" />
          </ListItem>
        </List>
        <Button variant="contained" color="primary" fullWidth>Pay Now</Button>
      </Paper>
    </div>
  );
}

function Messages() {
  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
        <Typography variant="h6" gutterBottom>Messages</Typography>
        <Button variant="contained" color="primary" fullWidth style={{ marginBottom: '20px' }}>Message Doctor</Button>
        <Button variant="contained" color="primary" fullWidth>Video Consultation</Button>
      </Paper>
    </div>
  );
}

function Feedback() {
  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
        <Typography variant="h6" gutterBottom>Feedback & Rating</Typography>
        <Button variant="contained" color="primary" fullWidth style={{ marginBottom: '20px' }}>Rate Consultation</Button>
        <Button variant="contained" color="primary" fullWidth>Submit Feedback</Button>
      </Paper>
    </div>
  );
}

export default PatientDashboard;
