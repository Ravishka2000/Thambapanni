import { Box, Card, CardContent, Divider, Grid, Typography, Button } from '@mui/material';
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

    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (cardId) => {
        setSelectedCard(cardId);
    };
    const handleRegisterClick = () => {
        // Redirect to the registration link
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSdUi1zliXzcXcVwh0q1OG7HtnNCUZaIsQQsOHrPvamfAcyOLQ/viewform?usp=sf_link", "_blank");
    };


    return (
        <>
            <Grid container my={8} px={5} maxWidth={'100%'}>
                <Typography variant="h2" sx={{ ml: 'auto', mr: 'auto' }} my={4} textTransform={'uppercase'} fontWeight={900}>Events Organized by Us</Typography>
                <Divider variant='fullWidth' light />
                <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} justifyContent={'center'} maxWidth={'xl'} mb={10}>
                    {events && events.map((event) => (
                        <Box key={event._id} width={'450px'} p={2}>
                            <Card
                                draggable
                                elevation={5}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    opacity: selectedCard === event._id ? 0.8 : 1, // Decrease opacity if card is selected
                                    position: 'relative',
                                }}
                                onClick={() => handleCardClick(event._id)} // Handle card click
                            >
                                <CardContent>
                                    <Typography align='center' fontFamily={'serif'} fontSize={30} fontWeight={900} color={'seagreen'}>{event.name}</Typography>
                                    <Typography align='center' fontFamily={'serif'} fontSize={22}>
                                        <p dangerouslySetInnerHTML={{ __html: event.description }} />
                                    </Typography>
                                    <Grid item container mt={3} display={'flex'} justifyContent={'space-between'} lg={12}>
                                        <Grid item xs={5.8} border={2} p={2} boxShadow={2}>
                                            <Typography color={'error'} align='center'>Date</Typography>
                                            <Typography align='center'>{event.date.slice(0, 10)}</Typography>
                                        </Grid>
                                        <Grid item xs={5.8} border={2} p={2} boxShadow={2}>
                                            <Typography color={'primary'} align='center'>Location</Typography>
                                            <Typography align='center'>{event.location}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Typography align='center' fontWeight={900} mt={3} color={'maroon'}>Conducted By : {event.organizer.firstName} {event.organizer.lastName}</Typography>
                                </CardContent>
                                {selectedCard === event._id && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
                                        }}
                                    >
                                        <Button id="register-button" variant="contained" color="primary" onClick={handleRegisterClick}>Register</Button>
                                    </Box>
                                )}
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Grid>
        </>

    )
}

export default ViewEvents