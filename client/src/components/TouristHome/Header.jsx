import { useEffect } from 'react';
import { AppBar, Box, Card, CardMedia, Grid, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Granim from 'granim';

const Header = () => {

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
        <Grid container>
            <Grid item xs={12} md={12}>
                <AppBar position="absolute" color="transparent" elevation={0} sx={{mt: 2}}>
                    <Toolbar>
                        <Typography component={Link} to="/" sx={{textDecoration: 'none', fontSize: '28px', fontWeight: '900', color: 'white', marginLeft: 'auto', marginRight: 'auto' }}>THAMBAPANNI</Typography>
                        <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <Typography component={Link} to="/blogs" sx={{textDecoration: 'none', fontSize: '18px', fontWeight: '600', color: 'white' }}>Blogs</Typography>
                            <Typography component={Link} to="/about" sx={{textDecoration: 'none', fontSize: '18px', fontWeight: '600', color: 'white', pl: '30px' }}>About Us</Typography>
                            <Typography component={Link} to="/contact" sx={{textDecoration: 'none', fontSize: '18px', fontWeight: '600', color: 'white', pl: '30px' }}>Contact Us</Typography>
                        </div>
                        <Typography component={Link} to="/" sx={{textDecoration: 'none', fontSize: '18px', fontWeight: '800', color: 'white', pl: '20px', marginLeft: 'auto' }}>Login</Typography><Typography component={Link} to="/" sx={{textDecoration: 'none', fontSize: '18px', fontWeight: '800', color: 'white', pl: '20px', marginRight: '20px' }}>Register</Typography>
                    </Toolbar>
                </AppBar>
                <canvas id='upper-half' style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0% 100%)', width: "100%", height: "50vh" }} />
            </Grid>
                <img src='https://res.cloudinary.com/ducirgwnz/image/upload/v1682865153/mask_kijwmb.png' height={500} width={500} style/>

        </Grid>
    );
};

export default Header;
