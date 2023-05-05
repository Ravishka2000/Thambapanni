import React, { useState, useEffect } from 'react'
import { Box, Card, CardMedia, CardContent, Typography, Grid, Divider } from '@mui/material';
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
        <>
        <br/><br/><br/><br/>
        <Typography fontSize={'1.6rem'} fontWeight={900} textAlign={"center"}>Discover our expert tour guides and <br/>book your next adventure with confidence.</Typography>
        <Divider/>
        <Grid container maxWidth={'xl'} display={'flex'} justifyContent={'space-between'} px={10} py={5}>
            
            {guides && guides.map((guide) => (
                <Grid item xs={12} lg={2} key={guide._id}>
                    <Link to={`/guides/${guide._id}`} style={{ textDecoration: 'none' }}>
                        <Card sx={{ width: 275, height: 375 }} elevation={5}>
                            <CardMedia component="img" height={210} image={guide.photo} alt={guide.firstName} />
                            <CardContent>
                                <Typography variant="h5" component="h2" textAlign={"center"}>
                                    {guide.firstName} {guide.lastName}
                                </Typography>
                                <Divider/>
                                <Typography variant="body2" height={75} color="textSecondary" component="p" textAlign={"center"}>
                                    {guide.bio}
                                </Typography>
                                <Divider/>
                                <Typography color="textSecondary" component="p"  gutterBottom variant="body1" textAlign={"center"}>
                                    Charges: {guide.charges}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
        </>
    );
}

export default ViewGuides;
