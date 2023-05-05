import React, { useState, useEffect } from 'react'
import { Box, Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAuthContext } from "../../hooks/useAuthContext"

const Bookings = () => {

    const [bookings, setbookings] = useState();
    const { user } = useAuthContext()

    useEffect(() => {
        fetch("http://localhost:7070/api/booking/bookings")
            .then((res) => res.json())
            .then((data) => {              
                setbookings(data);              
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (bookings) {
            console.log(bookings);
        }
    }, [bookings]);

    return (

      <div>
        <Box height={80}/>
      <Box sx={{ overflowX: "hidden", marginTop: "20px" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={"column"}>
          <Typography variant="h5" style={{ marginBottom: '16px', fontWeight: 'bold', color: '#19376D', padding: '3', }}>
              My Bookings
          </Typography>
          <TableContainer component={Paper} sx={{ margin: "auto", width: 1200 }} elevation={0}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                      <TableRow>
                          <TableCell>Booking Id</TableCell>
                          <TableCell align="right">Name</TableCell>
                          <TableCell align="right">Date</TableCell>
                          <TableCell align="right">Location</TableCell>
                          <TableCell align="right">Group size</TableCell>
                          <TableCell align="right">Phone</TableCell>
                          <TableCell align="right">Email</TableCell>
                          <TableCell align="right">Status</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                  {bookings && bookings.filter(booking => booking.Customer === user._id).map(booking => (
                      <TableRow
                        key={booking._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" >
                    {booking._id}
                    </TableCell>
                    <TableCell component="th" align="right">
                    {booking.name}
                    </TableCell>
                    <TableCell component="th" align="right" >
                    {new Date(booking.tourDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell component="th" align="right" >
                    {booking.tourLocation}
                    </TableCell>
                    <TableCell component="th" align="right" >
                    {booking.groupSize}
                    </TableCell>
                    <TableCell component="th" align="right" >
                    {booking.phone}
                    </TableCell>
                    <TableCell component="th" align="right" >
                    {booking.email}
                    </TableCell>
                    <TableCell component="th" align="right" >
                    {booking.Status}
                    </TableCell>
                      </TableRow>
                     ))}
                      

                  </TableBody>
              </Table>
          </TableContainer>

      </Box>
  </div>
    );
}

export default Bookings;
