import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  createTheme,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { Link } from "react-router-dom";

const defaultTheme = createTheme();
const Signup = () => {
  return (
    <Grid2>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlined />
          </Avatar>
          <h2>Sign Up</h2>
          <TextField
            id="standard-basic"
            label="First Name"
            variant="standard"
            placeholder="Enter Your First Name"
            fullWidth
            style={{ marginBottom: defaultTheme.spacing(2) }}
          />
          <TextField
            id="standard-basic"
            label="Last Name"
            variant="standard"
            placeholder="Enter Your Last Name"
            fullWidth
            style={{ marginBottom: defaultTheme.spacing(2) }}
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            placeholder="Enter Your Email"
            fullWidth
            style={{ marginBottom: defaultTheme.spacing(2) }}
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            placeholder="Enter Your Password"
            type="password"
            fullWidth
            style={{ marginBottom: defaultTheme.spacing(2) }}
          />
          <TextField
            id="standard-basic"
            label="Confirm Password"
            variant="standard"
            placeholder="Confirm Your Password"
            type="password"
            fullWidth
            style={{ marginBottom: defaultTheme.spacing(2) }}
          />
          <Button
            variant="contained"
            fullWidth
            color="success"
            style={{ marginTop: defaultTheme.spacing(3) }}
          >
            Sign Up
          </Button>
        </Grid>
        <Grid align="center" style={{marginTop:defaultTheme.spacing(3)}}>
        <Link to="/login">
          Already have an account? Sign In
        </Link>
        </Grid>
      </Paper>
    </Grid2>
  );
};
const paperStyle = {
  padding: 20,
  height: "70vh",
  width: 280,
  margin: "20px auto",
};
const avatarStyle = {
  backgroundColor: "green",
};
export default Signup;
