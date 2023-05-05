import { Box, Card, Grid, Typography, CardActionArea, CardContent, CardMedia } from '@mui/material'
import React from 'react'

const AboutUs = () => {

    const text = "Thambapanni, the Sri Lanka's largest travel guidance platform, helps hundreds of thousands of people each month become better travelers, from planning to booking to taking a trip. Travelers across the Sri Lanka use the Thambapanni site and app to discover where to stay, what to do and where to eat based on guidance from those who have been there before. With more than 1 billion reviews and opinions of nearly 8 million businesses, travelers turn to Thambapanni to find deals on accommodations, book experiences, reserve tables at delicious restaurants and discover great places nearby. As a travel guidance company available in 43 markets and 22 languages, Thambapanni makes planning easy no matter the trip type. The subsidiaries of Thambapanni, Inc. (Nasdaq: TRIP), own and operate a portfolio of travel media brands and businesses, operating under various websites and apps."

    return (
        <Grid container spacing={2} py={10}>
            <img src="https://res.cloudinary.com/ducirgwnz/image/upload/v1683180799/srilanka_gpeedc.jpg" height={600} width={'100%'}></img>
            <Grid container py={10} mx="auto" maxWidth="xl">
                <Typography fontFamily={'serif'} variant='h2' fontWeight={900} mx={'auto'}>About Thambapanni</Typography>
                <Typography fontSize={15} color={'#435366'} mt={3} mx={3}>{text}</Typography>
            </Grid>

            <Grid container mx="auto" maxWidth="xl">
                <Typography fontFamily={'serif'} variant='h2' fontWeight={900} mx={3}>Our Team</Typography>
            </Grid>

            <Grid container mx="auto" maxWidth="xl" >
                <Grid container display={'flex'} justifyContent={'space-between'} mt={5} mx={3}>
                    <Card sx={{ width: 300 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image=""
                                alt=""
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">Ravishka Dulshan</Typography>
                                <Typography variant="body1" color="text.secondary">President & CEO</Typography>
                                <Typography variant="body2" color="text.secondary">Software Engineer SLIIT</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card sx={{ width: 300 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image=""
                                alt=""
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">Pravini Wickramanayake</Typography>
                                <Typography variant="body1" color="text.secondary">Chief Financial Officer</Typography>
                                <Typography variant="body2" color="text.secondary">Software Engineer SLIIT</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card sx={{ width: 300 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image=""
                                alt=""
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">Hiranya Pieris</Typography>
                                <Typography variant="body1" color="text.secondary">Chief Legal Officer and Secretary</Typography>
                                <Typography variant="body2" color="text.secondary">Software Engineer SLIIT</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card sx={{ width: 300 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image=""
                                alt=""
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5">Nimesha Priyabandu</Typography>
                                <Typography variant="body1" color="text.secondary">Chief Marketing Officer</Typography>
                                <Typography variant="body2" color="text.secondary">Software Engineer SLIIT</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    
                </Grid>
            </Grid>

        </Grid>
    )
}

export default AboutUs;
