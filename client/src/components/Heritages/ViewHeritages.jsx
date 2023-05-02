import React, { useState, useEffect } from 'react';
import { Card, CardMedia, Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewHeritages = () => {
    const [heritages, setHeritages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:7070/api/heritages/");
                setHeritages(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <Grid container mt={10}>
            <Grid xs={12} md={12}>
                {heritages && heritages.map((heritage) => (
                    <Grid xs={12} sm={12} key={heritage._id} mx={20}>
                        <Link to={`/heritage/${heritage._id}`} style={{ textDecoration: 'none' }}>
                            <Card sx={{ display: 'flex', my: 4, maxHeight: 250 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 300 }}
                                    image={heritage.image}
                                    alt={heritage.title}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column', p: 4 }}>
                                    <Typography fontFamily={'serif'} fontSize={24} fontWeight={800}>{heritage.title}</Typography>
                                    <Typography fontSize={20} my={2} >{heritage.description.slice(0, 300)}<span style={{ color: 'blue' }}>...Read More</span></Typography>
                                    <Typography fontSize={20} fontWeight={800} color={'error'} mb={2}>{heritage.location}</Typography>
                                </Box>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}

export default ViewHeritages
