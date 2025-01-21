import React, { useState } from "react";
import { TextField, Button, Typography, Link, Checkbox, FormControlLabel, Grid, Snackbar, Paper, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        setSnackbarMessage("Login successful! Redirecting...");
        setSnackbarOpen(true);
        setTimeout(() => {
          if (response.role === "admin") {
            navigate("/admin-dashboard");
          } else if (response.role === "patient") {
            navigate("/patient-dashboard");
          } else if (response.role === "doctor") {
            navigate("/doctor-dashboard");
          } else {
            navigate("/user-dashboard");
          }
        }, 1500);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={6} style={{ padding: '30px', borderRadius: '10px' }}>
          <Grid container justifyContent="center">
            <Avatar style={{ backgroundColor: '#3b5998', marginBottom: '20px' }}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>
          <form onSubmit={handleLogin}>
            <Typography variant="h4" align="center" gutterBottom>Welcome Back</Typography>
            <Typography variant="h6" align="center" gutterBottom>Please sign in to continue</Typography>
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth margin="normal" variant="outlined" />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth margin="normal" variant="outlined" />
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
              label="Remember me"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px', padding: '10px' }}>Login</Button>
            {error && <Typography color="error" align="center" style={{ marginTop: '10px' }}>{error}</Typography>}
            <Typography variant="body1" align="center" style={{ margin: '20px 0' }}>or</Typography>
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              fullWidth
              onClick={() => {
                // Trigger Google login
              }}
              style={{ backgroundColor: '#db4437', color: '#fff', marginBottom: '10px', padding: '10px' }}
            >
              Login with Google
            </Button>
            <Button
              variant="contained"
              startIcon={<FacebookIcon />}
              fullWidth
              onClick={() => {
                // Trigger Facebook login
              }}
              style={{ backgroundColor: '#3b5998', color: '#fff', padding: '10px' }}
            >
              Login with Facebook
            </Button>
            <Grid container justifyContent="center" style={{ marginTop: '10px' }}>
              <Link href="/forgot-password" variant="body2" style={{ fontSize: '14px', textTransform: 'capitalize' }}>
                Forgot Your Password?
              </Link>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '10px' }}>
              <Link href="/register" variant="body2" style={{ fontSize: '14px', textTransform: 'capitalize' }}>
                Don't Have An Account? Register Now!
              </Link>
            </Grid>
          </form>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
