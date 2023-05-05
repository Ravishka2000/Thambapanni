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

const Bookings = () => {

    const [booking, setbooking] = useState();

    useEffect(() => {
        fetch("http://localhost:7070/api/booking/bookings")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setbooking(data);
                console.log(booking);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (booking) {
            console.log(booking);
        }
    }, [booking]);

    return (

      <div>
        <Box height={20}/>
      <Box sx={{ overflowX: "hidden", marginTop: "20px" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={"column"}>
          <Typography sx={{ width: 800, margin: "auto", padding: "20px" }}
              variant="h4">
              My Bookings
          </Typography>
          <TableContainer component={Paper} sx={{ margin: "auto", width: 650 }} elevation={0}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                      <TableRow>
                          <TableCell>Order Id</TableCell>
                          <TableCell align="right">Amount</TableCell>
                          <TableCell align="right">Date</TableCell>
                          <TableCell align="right">Status</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {booking && booking.map((booking) => (
                          <TableRow
                              key={booking._id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                              <TableCell component="th" >
                                  {booking._id.slice(0, 10)}
                              </TableCell>
                              <TableCell component="th" align="right">
                                  {booking.paymentIntent.amount}
                              </TableCell>
                              <TableCell component="th" align="right" >
                                  {new Date(booking.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell component="th" align="right">
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
