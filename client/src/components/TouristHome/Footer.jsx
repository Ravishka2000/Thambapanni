import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';

const Footer = () => {
    return (
        <Grid container>
            <Grid xs={12} sm={2} ml={{ xs: 0, sm: 23 }} textAlign={{ xs: 'center', sm: 'left' }}>
                <Typography fontWeight={900} fontSize={20} fontFamily={'serif'} mt={2}>Thambapanni</Typography>
                <Typography fontWeight={300} fontSize={18} fontFamily={'serif'} mt={2} color={'#536287'} maxWidth={400}>An Online Web Application for Promote Cultural Heritages</Typography>
                <Box display={'flex'} flexDirection={'row'} ml={{ xs: '2', sm: -1.2 }} justifyContent={{ xs: 'center', sm: 'left' }}>
                    <IconButton>
                        <FacebookRoundedIcon color='info' />
                    </IconButton>

                    <IconButton>
                        <SubscriptionsRoundedIcon color='error' />
                    </IconButton>

                    <IconButton>
                        <LocalPhoneRoundedIcon color='success' />
                    </IconButton>
                </Box>
            </Grid>
            <Grid xs={12} sm={2} ml={{ xs: 0, sm: 23 }} textAlign={{ xs: 'center', sm: 'left' }}>
                <Typography fontWeight={900} fontSize={20} fontFamily={'serif'} mt={2}>Company</Typography>
                <Typography fontWeight={300} fontSize={18} fontFamily={'serif'} mt={2} color={'#536287'}>About Us</Typography>
                <Typography fontWeight={300} fontSize={18} fontFamily={'serif'} mt={1} color={'#536287'}>Contact Us</Typography>
                <Typography fontWeight={300} fontSize={18} fontFamily={'serif'} mt={1} color={'#536287'}>Privacy Policy</Typography>
                <IconButton>

                </IconButton>
            </Grid>
            <Grid xs={12} sm={2} ml={{ xs: 0, sm: 23 }} textAlign={{ xs: 'center', sm: 'left' }}>
                <Typography fontWeight={900} fontSize={20} fontFamily={'serif'} mt={2}>Services</Typography>
                <Typography fontWeight={300} fontSize={18} fontFamily={'serif'} mt={2} color={'#536287'}>Blogs</Typography>
                <Typography fontWeight={300} fontSize={18} fontFamily={'serif'} mt={1} color={'#536287'}>Guides</Typography>
                <Typography fontWeight={300} fontSize={18} fontFamily={'serif'} mt={1} color={'#536287'}>Events</Typography>
                <IconButton>

                </IconButton>
            </Grid>
            <Grid xs={12} my={5}>
                <Typography fontWeight={300} fontSize={18} fontFamily={'serif'} mt={2} textAlign={'center'} color={'#536287'}>© 2023 Thambapanni. All rights reserved.</Typography>
            </Grid>
        </Grid>
    )
}

export default Footer
