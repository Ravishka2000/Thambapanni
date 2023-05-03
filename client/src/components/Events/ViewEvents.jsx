import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const ViewEvents = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:7070/api/events/");
                setEvents(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchEvents();
    }, [])

    return (
        <Grid container>

        </Grid>
    )
}

export default ViewEvents