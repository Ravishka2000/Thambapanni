import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import Header from './Header'

const LandingPage = () => {
    const text = 'We Specialize in Crafting Personalized Journeys that Fulfill Your Unique Travel Dreams and Exceed Your Expectations.'
    return (
        <Box>
            <Header />
            <canvas id='upper-half' style={{ clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0% 100%)', width: "100%", height: "50vh" }} />
            <Box sx={{ position: "absolute", top: "10%", left: "20px", display: "flex" }}>
                <Box mt={10} ml={24} >
                    <Typography variant='h1' fontWeight={800} lineHeight={1.2} letterSpacing={4} fontFamily={'serif'}>DREAM YOUR <br />NEXT <br />JOURNEY</Typography>
                    <Typography fontStyle={'italic'} variant='h5' mt={5} sx={{ maxWidth: "25em" }}>{text}</Typography>

                    <Box sx={{ display: "flex" }} mt={4}>

                        <Button variant='contained' color='success' sx={{ borderRadius: '30px', px: '40px', py: '10px' }}>Start</Button>
                        <Button variant='outlined' color='warning' sx={{ borderRadius: '30px', px: '40px', py: '10px', ml: '30px' }}>Events</Button>
                    </Box>
                </Box>
                <img src='https://res.cloudinary.com/ducirgwnz/image/upload/v1682865153/mask_kijwmb.png' height={650} width={650} style={{ marginLeft: "70px" }} />
            </Box>
            <Box bgcolor={'#f5fff5'} mt={40}>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </Box>
        </Box>
    )
}

export default LandingPage
