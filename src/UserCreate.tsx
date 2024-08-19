import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';

export default function UserCreate() {
  // State for form fields
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      fname,
      lname,
      username,
      email,
      avatar
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("https://www.melivecode.com/api/users/create", requestOptions);
      const result = await response.json(); // Parse JSON from the response
      if (response.ok) {
        alert("User created successfully!");
        window.location.href = '/'; // Redirect to the home page or users list
      } else {
        alert("Failed to create user: " + (result.message || "Unknown error")); // Display error message from API
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while creating the user.");
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Create User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="fname"
                label="First Name"
                variant="outlined"
                fullWidth
                required
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="lname"
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                fullWidth
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="avatar"
                label="Avatar"
                variant="outlined"
                fullWidth
                required
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>Create</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}


