import { useEffect, useState } from 'react';
import { AppBar, Box, Grid, IconButton, Drawer, Toolbar, Typography, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {

    const { user } = useAuthContext()
    const { logout } = useLogout();

    const [open, setOpen] = useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleLogoutClick = () => {
        logout()
    }

    const [scrollPosition, setScrollPosition] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setScrollPosition(window.scrollY);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (scrollPosition > 150) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    }, [scrollPosition]);

    return (
        <Grid container mt={0}>
            <Grid item xs={12} md={12}>
                <AppBar position="fixed"
                    sx={{
                        backgroundColor: isScrolled ? '#b7ff00d0' : '#3aff0031',
                        color: 'black',
                        boxShadow: isScrolled ? '0px 2px 10px rgba(0, 0, 0, 0.5)' : 'none',
                    }}
                    elevation={isScrolled ? 1 : 0}>
                    <Toolbar>
                        <Typography component={Link} to="/" sx={{ textDecoration: 'none', fontSize: '28px', fontWeight: '900', color: 'black', marginLeft: 'auto', marginRight: 'auto' }}>THAMBAPANNI</Typography>
                        <Box sx={{ marginLeft: 'auto', marginRight: 'auto', display: { xs: 'none', md: 'block' } }}>
                            <Typography component={Link} to="/heritages" sx={{ textDecoration: 'none', fontSize: '18px', fontWeight: '600', color: 'black', pl: '30px' }}>Heritages</Typography>
                            <Typography component={Link} to="/blogs" sx={{ textDecoration: 'none', fontSize: '18px', fontWeight: '600', color: 'black', pl: '30px' }}>Blogs</Typography>
                            <Typography component={Link} to="/events" sx={{ textDecoration: 'none', fontSize: '18px', fontWeight: '600', color: 'black', pl: '30px' }}>Events</Typography>
                            <Typography component={Link} to="/guides" sx={{ textDecoration: 'none', fontSize: '18px', fontWeight: '600', color: 'black', pl: '30px' }}>Guides</Typography>
                            <Typography component={Link} to="/about" sx={{ textDecoration: 'none', fontSize: '18px', fontWeight: '600', color: 'black', pl: '30px' }}>About Us</Typography>
                            <Typography component={Link} to="/contact" sx={{ textDecoration: 'none', fontSize: '18px', fontWeight: '600', color: 'black', pl: '30px' }}>Contact Us</Typography>
                        </Box>
                        {user ? (
                            <>
                                <Typography component={Link} to={user.role==="admin"?"/api/admin-dashboard":user.role === "guide" ? "/guide-dashboard" : "/user-dashboard"} sx={{ textDecoration: 'none', fontSize: '18px', fontWeight: '800', color: 'black', pl: '20px', marginLeft: 'auto', display: { xs: 'none', md: 'block' } }}>{user.role==="admin" ? "Admin Dashboard" :user.role==="guide"? "Guide Dashboard":"Profile"}</Typography>
                                <Button onClick={handleLogoutClick} component={Link} to="/" sx={{ textDecoration: 'none', textTransform: 'none', fontSize: '18px', fontWeight: '800', color: 'black', pl: '20px', marginRight: '20px', display: { xs: 'none', md: 'block' } }}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Typography component={Link} to="/login" sx={{ textDecoration: 'none', fontSize: '18px', fontWeight: '800', color: 'black', pl: '20px', marginLeft: 'auto', display: { xs: 'none', md: 'block' } }}>Login</Typography>
                                <Typography component={Link} to="/signup" sx={{ textDecoration: 'none', fontSize: '18px', fontWeight: '800', color: 'black', pl: '20px', marginRight: '20px', display: { xs: 'none', md: 'block' } }}>Register</Typography>
                            </>
                        )}
                        <Box sx={{ marginLeft: 'auto', display: { xs: 'block', md: 'none' } }}>
                            <IconButton onClick={handleDrawerToggle}>
                                <MenuIcon sx={{ color: 'black', fontSize: '35px' }} />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box sx={{ display: { xs: 'block', md: 'none' }, background: 'white' }}>
                    <Drawer anchor="top" open={open} onClose={handleDrawerToggle} variant="temporary" sx={{ width: '100%' }}>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#FFFEF7', padding: '20px' }}>
                            <Typography component={Link} to="/" sx={{ textDecoration: 'none', fontSize: '28px', fontWeight: '900', color: 'black' }}>THAMBAPANNI</Typography>
                            <Divider />
                            <Typography component={Link} to="/" sx={{ textDecoration: 'none', fontSize: '20px', fontWeight: '500', color: 'black', mt: '20px' }}>Home</Typography>
                            <Typography component={Link} to="/heritages" sx={{ textDecoration: 'none', fontSize: '20px', fontWeight: '500', color: 'black', mt: '20px' }}>Heritages</Typography>
                            <Typography component={Link} to="/blogs" sx={{ textDecoration: 'none', fontSize: '20px', fontWeight: '500', color: 'black', mt: '20px' }}>Blogs</Typography>
                            <Typography component={Link} to="/events" sx={{ textDecoration: 'none', fontSize: '20px', fontWeight: '500', color: 'black', mt: '20px' }}>Events</Typography>
                            <Typography component={Link} to="/guides" sx={{ textDecoration: 'none', fontSize: '20px', fontWeight: '500', color: 'black', mt: '20px' }}>Guides</Typography>
                            <Typography component={Link} to="/about" sx={{ textDecoration: 'none', fontSize: '20px', fontWeight: '500', color: 'black', mt: '20px' }}>About Us</Typography>
                            <Typography component={Link} to="/contact" sx={{ textDecoration: 'none', fontSize: '20px', fontWeight: '500', color: 'black', my: '20px' }}>Contact Us</Typography>
                            <Divider />
                            {user ? (
                                <>
                                    <Typography component={Link} to="/" sx={{ textDecoration: 'none', fontSize: '20px', fontWeight: '500', color: 'black', mt: '20px' }}>{user.role}</Typography>
                                    <Button onClick={handleLogoutClick} component={Link} to="/" sx={{ textDecoration: 'none', textTransform: 'none', fontSize: '20px', fontWeight: '500', color: 'black', mt: '20px', ml: '0' }}>Logout</Button>
                                </>
                            ) : (
                                <>
                                    <Typography component={Link} to="/login" sx={{ textDecoration: 'none', fontSize: '20px', fontWeight: '500', color: 'black', mt: '20px' }}>Login</Typography>
                                    <Typography component={Link} to="/rolesignup" sx={{ textDecoration: 'none', fontSize: '20px', fontWeight: '500', color: 'black', mt: '20px' }}>Register</Typography>
                                </>
                            )}
                        </Box>
                    </Drawer>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Header;
