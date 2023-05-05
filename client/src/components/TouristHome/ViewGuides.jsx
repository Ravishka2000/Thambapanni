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

        <Grid container mt={8} maxWidth={'xl'} display={'flex'} justifyContent={'space-between'} px={10} py={5}>
            {guides && guides.map((guide) => (
                <Grid item xs={12} lg={2} key={guide._id}>
                    <Link to={`/guides/${guide._id}`} style={{ textDecoration: 'none' }}>
                        <Card sx={{ width: 275, height: 375 }}>
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
                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
}

export default ViewGuides;
