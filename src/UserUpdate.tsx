import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function UserUpdate() {
  const { id } = useParams();
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect:"follow"
    };

    fetch("https://www.melivecode.com/api/users/"+id,requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok') {
          setFname(result['user']['fname'])
          setLname(result['user']['lname'])
          setUsername(result['user']['username'])
          setEmail(result['user']['email'])
          setAvatar(result['user']['avatar'])
        } else {
          console.error("Failed to fetch user data:", result.message);
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "id":id,
      "fname":fname,
      "lname":lname,
      "username":username,
      "email":email,
      "avatar":avatar
    });

    const requestOptions: RequestInit = {
      method: "PUT", // Use PUT method for update
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch(`https://www.melivecode.com/api/users/update/`, requestOptions);
      const result = await response.json(); // Parse JSON from the response
      if (response.ok) {
        alert("User updated successfully!");
        window.location.href = '/'; // Redirect to the home page or users list
      } else {
        console.error("API response error:", result);
        alert("Failed to update user: " + (result.message || "Unknown error")); // Display error message from API
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while updating the user.");
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Update User
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
              <Button type="submit" variant="contained" fullWidth>UPDATE</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}



