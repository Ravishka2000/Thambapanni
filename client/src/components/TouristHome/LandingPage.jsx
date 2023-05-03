import React, { useEffect } from 'react';
import Granim from 'granim';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import DisplayHeritages from '../Heritages/DisplayHeritages';

const LandingPage = () => {

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

    const text = 'Immerse Yourself In The Rich Culture And Heritage Of Sri Lanka With Our Unique Travel Experiences And Workshops. From Traditional Crafts To Ancient Temples, Our Guides Will Take You On A Journey To Discover The Soul Of Ceylon. Let Us Guide You On An Unforgettable Adventure Filled With History, Art, And Beauty.'
    return (
        <Box maxWidth={"100%"}>
            <canvas id='upper-half' style={{ clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0% 100%)', width: "100%", height: "40vh" }} />

            <Grid container spacing={1} width={'100%'} sx={{ position: "absolute", top: { xs: "15%", sm: "10%" }, right: { xs: "0%", sm: "auto" }, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center" }}>
                <Grid xs={12} sm={6} mt={{ xs: 0, sm: 10 }} ml={{ xs: 0, sm: 24 }} textAlign={{ xs: 'center', sm: 'left' }}>
                    <Typography variant='h1' fontWeight={800} lineHeight={{ xs: 1, sm: 1.2 }} letterSpacing={{ xs: 2, sm: 4 }} fontFamily={'serif'} fontSize={{ xs: '2rem', sm: '5rem' }}>DISCOVER THE <br />SOUL OF <br />CEYLONE</Typography>
                    <Typography fontStyle={'italic'} variant='h6' mt={5} sx={{ maxWidth: { xs: "20em", sm: "30em" } }} fontSize={{ xs: '1rem', sm: '1.4rem' }}>{text}</Typography>

                    <Box sx={{ display: "flex", flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'flex-start' } }} mt={4}>

                        <Button variant='contained' color='success' sx={{ borderRadius: '30px', px: '40px', py: '10px', mb: { xs: 2, sm: 0 }, mr: { xs: 0, sm: 2 } }}>Start</Button>
                        <Button variant='outlined' color='warning' sx={{ borderRadius: '30px', px: '40px', py: '10px' }}>Events</Button>
                    </Box>
                </Grid>
                <Grid xs={12} sm={4}>

                    <img src='https://res.cloudinary.com/ducirgwnz/image/upload/v1682922963/My_project_b9xdsw.png' style={{ marginBottom: "1px", width: "100%", height: "100%" }} />
                </Grid>
            </Grid>

            <Grid container bgcolor={'#fafafa'} mt={{ xs: 80, sm: 50 }} py={5}>
                <Grid xs={12} sm={12} mx={{ xs: 0, sm: 23 }} textAlign={{ xs: 'center', sm: 'left' }}>
                    <Typography fontWeight={800} fontFamily={'serif'} fontSize={{ xs: '1.5rem', sm: '2.8rem' }}>View Heritages of Sri Lanka</Typography>
                    {/* <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} justifyContent={'space-between'} mt={3} alignItems={{ xs: 'center', sm: 'flex-start' }}>

                        <Card sx={{ maxWidth: 345, maxHeight: 500, mb: 5 }}>
                            <CardActionArea>
                                <CardMedia component='img' image='https://res.cloudinary.com/ducirgwnz/image/upload/v1682941573/brian-kyed-8NpelZe-EzM-unsplash_ayy82p.jpg' height="200" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Ancient City of Sigiriya
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Sigiriya, considered by some as the eighth wonder of the world, consists of an ancient castle used by King Kasyapa of the 5th century AD. The Sigiriya site has the remains of an upper Sky Palace sited on the flat top of the rock, a mid-level terrace that includes the Lion Gate and the Mirror Wall and the Sigiriya Frescoes, the lower palace that clings to the slopes below the rock, and the moats, walls and gardens that extend for some hundreds of metres out from the base of the rock.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <Card sx={{ maxWidth: 345, minHeight: 500, mb: 5 }}>
                            <CardActionArea>
                                <CardMedia component='img' image='https://res.cloudinary.com/ducirgwnz/image/upload/v1682941752/rathna-deepaya-JCp4tDY7BPY-unsplash_i9zt21.jpg' height="200" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Royal Palace in Polonnaruwa
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        The second most ancient of Sri Lankas kingdoms, Polonnaruwa was first declared the capital city by King Vijayabahu I, who defeated the Chola invaders in 1070 CE to reunite the country once more under a local leader.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <Card sx={{ maxWidth: 345, minHeight: 500, mb: 5 }}>
                            <CardActionArea>
                                <CardMedia component='img' image='https://res.cloudinary.com/ducirgwnz/image/upload/v1682941981/chathura-anuradha-subasinghe-40uQmE9Zq8g-unsplash_agpewy.jpg' height="200" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Sri Dalada Maligawa
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        The Sri Dalada Maligawa or The Temple of the Sacred Tooth Relic is a temple in the city of Kandy in Sri Lanka. It was built within the royal palace complex which houses the tooth relic of the Buddha, a tooth, which is venerated by Buddhists.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                    </Box> */}

                    <DisplayHeritages/>
                </Grid>

            </Grid>
        </Box>
    )
}

export default LandingPage
