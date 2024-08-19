import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { ButtonGroup } from '@mui/material';

interface User {
  id: number;
  fname: string;
  lname: string;
  username: string;
  avatar: string;
}

export default function Users() {
  const [items, setItems] = useState<User[]>([]);

  useEffect(() => {
    UserGet();
  }, []);

  const UserGet = () => {
    fetch("https://www.melivecode.com/api/users")
      .then((res) => res.json())
      .then((result: User[]) => {
        setItems(result);
      })
      .catch((error) => console.error('Error fetching users:', error));
  };

  const UserUpdate = (id: number) => {
    window.location.href = `/update/${id}`; // Redirect to the update page
  }

  const UserDelete = async (id: number) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "DELETE",
      headers: myHeaders,
      body: JSON.stringify({ id })
    };

    try {
      const response = await fetch("https://www.melivecode.com/api/users/delete", requestOptions);
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        if (result.status === 'ok') {
          UserGet(); // Refresh the list after deletion
        }
      } else {
        alert("Failed to delete user: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Box display={'flex'}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" gutterBottom>
                Users
              </Typography>
            </Box>
            <Box>
              <Link href="/create" underline="none">
                <Button variant="contained">Create</Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Avatar</TableCell>
                  <TableCell align="right">Fname</TableCell>
                  <TableCell align="right">Lname</TableCell>
                  <TableCell align="right">Username</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">
                      <img src={row.avatar} alt={row.username} width="50" />
                    </TableCell>
                    <TableCell align="right">{row.fname}</TableCell>
                    <TableCell align="right">{row.lname}</TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup variant="contained" aria-label="Basic button group">
                        <Button onClick={() => UserUpdate(row.id)}>Edit</Button>
                        <Button onClick={() => UserDelete(row.id)}>Delete</Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
