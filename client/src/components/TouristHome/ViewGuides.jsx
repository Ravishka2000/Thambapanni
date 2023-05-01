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
        <Grid container>
                <Grid container spacing={2} sx={{ px: 2 }}>
                    {guides && guides.map((guide) => (
                        <Grid item xs={12} md={2} key={guide._id} marginY={3}>
                            <Link to={`/auth/${guide._id}`} style={{ textDecoration: 'none' }}>
                                <Card sx={{
                                    display: "flex",
                                    py: 2,
                                    flexDirection: "column",
                                    height: "100%",
                                    transition: "transform 0.2s ease-in-out",
                                    "&:hover": {
                                        transform: "scale(1.02)",
                                        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"
                                    }
                                }}>
                                    {guide.photo && guide.photo.length > 0 && (
                                        <CardMedia component="img" height="auto"  alt={guide.firstname} sx={{ pb: 1 }} />
                                    )}

                                    <CardContent sx={{ flex: 1 }}>
                                        <Box>
                                            <Typography variant="h6" gutterBottom style={{ fontWeight: 800 }}>
                                                {guide.firstname}
                                            </Typography>
                                            <Typography variant="h6" color="black">
                                                {guide.bio}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                            <Typography variant="h6" color="black">
                                                {guide.charges}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
    );
}

export default ViewGuides;
