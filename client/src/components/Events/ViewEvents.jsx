import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewEvents = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:7070/api/events/");
                setEvents(response.data);
                console.log(events);
            } catch (error) {
                console.log(error);
            }
        }
        fetchEvents();
    }, [])

    return (
        <>
            <Grid xs={12} container mt={10} px={5}>
                <Typography variant="h2" sx={{ ml: 'auto', mr: 'auto' }} my={4} textTransform={'uppercase'} fontWeight={900}>Events Organized by Us</Typography>
                <Box display={'flex'} maxWidth={'xl'}>
                    {events && events.map((event) => (
                        <Box key={event._id}>
                            <Card draggable elevation={5} sx={{ maxWidth: '500px', mx: 3 }}>
                                <CardContent>
                                    <Typography align='center' fontFamily={'serif'} fontSize={30} fontWeight={900} color={'seagreen'}>{event.name}</Typography>
                                    <Typography align='center' fontFamily={'serif'} fontSize={22} >{event.description}</Typography>
                                    <Grid container mt={3} display={'flex'} justifyContent={'space-between'} lg={12}>
                                        <Grid lg={5.8} border={2} p={2} boxShadow={2}>
                                            <Typography color={'error'} align='center'>Date</Typography>
                                            <Typography align='center'>{event.date.slice(0, 10)}</Typography>
                                        </Grid>
                                        <Grid lg={5.8} border={2} p={2} boxShadow={2}>
                                            <Typography color={'primary'} align='center'>Location</Typography>
                                            <Typography align='center'>{event.location}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Typography align='center' fontWeight={900} mt={3} color={'maroon'}>Conducted By : {event.organizer.firstName} {event.organizer.lastName}</Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Grid>
        </>
    )
}

export default ViewEvents