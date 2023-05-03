import React, { useState, useEffect } from 'react'
import { Box, Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { Link } from "react-router-dom";

const ViewGuides = () => {

    const [guides, setGuides] = useState();

    useEffect(() => {
        fetch("http://localhost:7070/api/auth/all-guides")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setGuides(data);
                console.log(guides);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (guides) {
            console.log(guides);
        }
    }, [guides]);

    return (

        <Grid container marginTop={10}>
            <Grid container spacing={40} sx={{ px: 2 }}>
                {guides && guides.map((guide) => (
                    <Grid item xs={12} md={2} key={guide._id} marginY={3}>
                        <Card sx={{ width: 250, height: 375 }} className="mb-3">
                            <Link to={`/guides/${guide._id}`} style={{ textDecoration: 'none' }}>
                                <CardMedia component="img" height={200} image={guide.photo} alt={guide.firstName} />
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {guide.firstName} {guide.lastName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {guide.bio}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Charges: {guide.charges}
                                    </Typography>
                                </CardContent>
                            </Link>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}

export default ViewGuides;
