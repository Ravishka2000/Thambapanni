import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material'
import React from 'react';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

const ContactUs = () => {
    return (
        <Grid container spacing={2} py={20} mx="auto" maxWidth="lg">
            <Grid item xs={12} md={6}>
                <Typography fontSize={'3.5rem'} fontWeight={900}>Speak to an expert</Typography>
                <Typography mt={5}>Our team can help you:</Typography>
                <Box display={'flex'} mt={2}>
                    <CheckCircleTwoToneIcon color='primary' fontSize='small' />
                    <Typography ml={1} fontSize={15} color={'#435366'}>Getting Started in Thambapanni</Typography>
                </Box>
                <Box display={'flex'} mt={2}>
                    <CheckCircleTwoToneIcon color='primary' fontSize='small' />
                    <Typography ml={1} fontSize={15} color={'#435366'}>Contact our agent</Typography>
                </Box>
                <Box display={'flex'} mt={2}>
                    <CheckCircleTwoToneIcon color='primary' fontSize='small' />
                    <Typography ml={1} fontSize={15} color={'#435366'}>Selecting a Guide</Typography>
                </Box>
                <Box display={'flex'} mt={2}>
                    <CheckCircleTwoToneIcon color='primary' fontSize='small' />
                    <Typography ml={1} fontSize={15} color={'#435366'}>Payment issues</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={5} container justifyContent="center">
                <Card sx={{ p: 5 }} elevation={15}>
                    <Grid container spacing={2} alignItems="center">

                        <Grid item xs={4}>
                            <Typography fontWeight={600}>First Name</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField label="First Name" fullWidth InputProps={{ style: { backgroundColor: "#f1f4f7", height: "45px" } }} />
                        </Grid>

                        <Grid item xs={4}>
                            <Typography fontWeight={600}>Last Name</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField label="Last Name" fullWidth InputProps={{ style: { backgroundColor: "#f1f4f7", height: "45px" } }} />
                        </Grid>

                        <Grid item xs={4}>
                            <Typography fontWeight={600}>Work Email</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField label="Work Email" fullWidth InputProps={{ style: { backgroundColor: "#f1f4f7", height: "45px" } }} />
                        </Grid>

                        <Grid item xs={4}>
                            <Typography fontWeight={600}>Work Phone</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField label="Work Phone" fullWidth InputProps={{ style: { backgroundColor: "#f1f4f7", height: "45px" } }} />
                        </Grid>

                        <Grid item xs={4}>
                            <Typography fontWeight={600}>Country</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField label="Country" fullWidth InputProps={{ style: { backgroundColor: "#f1f4f7", height: "45px" } }} />
                        </Grid>

                        <Grid item xs={4}>
                            <Typography fontWeight={600}>Your Massage</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField multiline rows={3} label="Your Massage" fullWidth InputProps={{ style: { backgroundColor: "#f1f4f7" } }} />
                        </Grid>
                        <Button variant='contained' color='secondary' sx={{ borderRadius: 15, ml: 'auto', mt: 3 }}>Submit</Button>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ContactUs
