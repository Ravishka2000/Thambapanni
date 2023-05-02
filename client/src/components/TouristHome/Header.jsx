import { useEffect, useState } from 'react';
import { AppBar, Box, Grid, IconButton, Menu, Drawer, Toolbar, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuthContext } from '../../hooks/useAuthContext';

const Header = () => {

    const { user } = useAuthContext()
    const [open, setOpen] = useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <Grid container>
            <Grid item xs={12} md={12}>
                <AppBar position="absolute" color="transparent" elevation={0} sx={{ mt: 2 }}>
                    <Toolbar>
                        <Typography component={Link} to="/" sx={{ textDecoration: 'none', fontSize: '28px', fontWeight: '900', color: 'white', marginLeft: 'auto', marginRight: 'auto' }}>THAMBAPANNI</Typography>
                        <Box sx={{ marginLeft: 'auto', marginRight: 'auto', display: { xs: 'none', md: 'block' } }}>
                            <Typography component={Link} to="/blogs" sx={{ textDecoration: 'none', fontSize: '18px', fontWeight: '600', color: 'white', pl: '30px' }}>Blogs</Typography>
                            <Typography component={Link} to="/guides" sx={{ textDecoration: 'none', fontSize: '18px', fontWeight: '600', color: 'white', pl: '30px' }}>Guides</Typography>
                            <Typography component={Link} to="/blogs" sx={{ textDecoration: 'none', fontSize: '18px', fontWeight: '600', color: 'white', pl: '30px' }}>About Us</Typography>
                            <Typography component={Link} to="/blogs" sx={{ textDecoration: 'none', fontSize: '18px', fontWeight: '600', color: 'white', pl: '30px' }}>Contact Us</Typography>
                        </Box>
                        <Typography component={Link} to="/" sx={{ textDecoration: 'none', fontSize: '18px', fontWeight: '800', color: 'white', pl: '20px', marginLeft: 'auto', display: { xs: 'none', md: 'block' } }}>Login</Typography>
                        <Typography component={Link} to="/" sx={{ textDecoration: 'none', fontSize: '18px', fontWeight: '800', color: 'white', pl: '20px', marginRight: '20px', display: { xs: 'none', md: 'block' } }}>Register</Typography>
                        <Box sx={{ marginLeft: 'auto', display: { xs: 'block', md: 'none' } }}>
                            <IconButton onClick={handleDrawerToggle}>
                                <MenuIcon sx={{ color: 'white', fontSize: '35px' }} />
                            </IconButton>

                        </Box>
                    </Toolbar>
                </AppBar>
                <Box sx={{ display: { xs: 'block', md: 'none' }, background: 'white' }}>
                    <Drawer anchor="top" open={open} onClose={handleDrawerToggle} variant="temporary" sx={{ width: '100%' }}>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#FFFEF7', padding: '20px' }}>
                            <Typography component={Link} to="/" sx={{ textDecoration: 'none', fontSize: '28px', fontWeight: '900', color: 'black' }}>THAMBAPANNI</Typography>
                            <Divider/>
                            <Typography component={Link} to="/" sx={{ textDecoration: 'none', fontSize: '20px', fontWeight: '500', color: 'black', mt: '20px' }}>Home</Typography>
                            <Typography component={Link} to="/" sx={{ textDecoration: 'none', fontSize: '20px', fontWeight: '500', color: 'black', mt: '20px' }}>Blogs</Typography>
                            <Typography component={Link} to="/guides" sx={{ textDecoration: 'none', fontSize: '20px', fontWeight: '500', color: 'black', mt: '20px' }}>Guides</Typography>
                            <Typography component={Link} to="/" sx={{ textDecoration: 'none', fontSize: '20px', fontWeight: '500', color: 'black', mt: '20px' }}>About Us</Typography>
                            <Typography component={Link} to="/" sx={{ textDecoration: 'none', fontSize: '20px', fontWeight: '500', color: 'black', my: '20px' }}>Contact Us</Typography>
                            <Divider/>
                            <Typography component={Link} to="/" sx={{ textDecoration: 'none', fontSize: '20px', fontWeight: '500', color: 'black', mt: '20px' }}>Login</Typography>
                            <Typography component={Link} to="/" sx={{ textDecoration: 'none', fontSize: '20px', fontWeight: '500', color: 'black', mt: '20px' }}>Register</Typography>
                        </Box>
                    </Drawer>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Header;
