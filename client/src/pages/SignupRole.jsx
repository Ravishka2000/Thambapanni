import React, { useEffect } from 'react';
import Granim from 'granim';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom';

const SignupRole = () => {

    useEffect(() => {
        new Granim({
            element: "#upper-half",
            direction: "left-right",
            opacity: [1, 1],
            states: {
                "default-state": {
                    gradients: [
                        ['#DA22FF', '#9733EE'],
                        ['#FAD961', '#F76B1C'],
                        ['#F6D365', '#FCE38A'],
                        ['#43C6AC', '#F8FFAE'],
                        ['#667db6', '#0082c8'],
                        ['#0082c8', '#667db6'],
                    ],
                    transitionSpeed: 2000,
                }
            }
        });
    }, []);

    
    return (
        <Box maxWidth={"100%"}>
            <canvas id='upper-half' style={{ clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0% 100%)', width: "100%", height: "40vh" }} />

            <Grid container spacing={1} width={'100%'} sx={{ position: "absolute", top: { xs: "15%", sm: "10%" }, right: { xs: "0%", sm: "auto" }, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center" }}>
                <Grid xs={12} sm={6} mt={{ xs: 0, sm: 10 }} ml={{ xs: 0, sm: 24 }} textAlign={{ xs: 'center', sm: 'left' }}>
                    <Typography variant='h1' fontWeight={800} lineHeight={{ xs: 1, sm: 1.2 }} letterSpacing={{ xs: 2, sm: 4 }} fontFamily={'serif'} fontSize={{ xs: '2rem', sm: '5rem' }}>SIGNUP AS A..</Typography>

                    
                </Grid>
                
            </Grid>
                
                    
                <Grid container item spacing={2} xs={12}>
                                    <Grid item xs={6}>
                                    <Link to="/guide-signup">
                                    <img src='https://img.freepik.com/free-vector/man-holiday-adventure-international-tourism-worldwide-sightseeing-tour-student-exchange-program-tourist-with-backpack-traveling-abroad_335657-3466.jpg?w=740&t=st=1683360352~exp=1683360952~hmac=4d01ccea13e06d5143e9834b11d594fd8e6a746c96c8a89e8dd0fe94613e6cc5' 
                                    style={{ 
                                        width: '300px',
                                        height: '300px',
                                        display: 'block',
                                        margin: '0 auto',
                                        borderWidth: 3,
                                        border: '3px solid #2f2f2f',
                                        borderRadius: '50%' }} elevation={8} />
                                    </Link>    
                                        <Typography fontStyle={'italic'} variant='h6' align='center' mt={5} sx={{ maxWidth: { xs: "20em", sm: "30em" } }} fontSize={{ xs: '1rem', sm: '1.4rem' }}>Guide</Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                    <Link to="/signup">
                                    <img src='https://img.freepik.com/free-vector/local-tourism-concept_23-2148606915.jpg?w=740&t=st=1683361367~exp=1683361967~hmac=514a9d605d216467d0c8a5313729cf142b5aad581c5f851402a00cd96ccf99ce' 
                                    style={{ 
                                        width: '300px',
                                        height: '300px',
                                        display: 'block',
                                        margin: '0 auto',
                                        borderWidth: 3,
                                        border: '3px solid #2f2f2f',
                                        borderRadius: '50%' }} elevation={8} />
                                    </Link>
                                        <Typography fontStyle={'italic'} variant='h6' align='center' mt={5} sx={{ maxWidth: { xs: "20em", sm: "30em" } }} fontSize={{ xs: '1rem', sm: '1.4rem' }}>Customer</Typography>
                                    </Grid>
                             

         
                </Grid>

        </Box>
    )
}

export default SignupRole
