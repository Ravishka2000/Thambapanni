import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, Grid,Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert"
import React from "react";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [role, setRole] = useState('Customer');

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password, firstName, lastName, mobile, role)

    }

    return (

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:"space-around",
             height: '50%',
            padding:"150px 20px",backgroundColor:"white",
            
            
          }} >
            <Grid item sx={{ display: { xs: 'none', md: 'block' }, alignItems: 'center', justifyContent: 'center', height: 650}} xs={6} md={6}>  
                <img src="https://www.triptipedia.com/tip/img/MY5ZwP4OK.jpg" alt="Example Image" style={{ width: '100%', height: '100%', objectFit: 'cover',borderRadius:"2rem 0 0 2rem" }} />  
            </Grid>

        <Grid item xs={6} md={6} sx={{height: 650}}>

       
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    flexDirection: { xs: "column", sm: "row" }
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    justify="space-around"
                    >
                    <div style={{padding:"20px"}}>
                    <Grid item xs={12}
                        sx={{width:"100%"}}
                        >
                            <Box
                                >
                                <Typography sx={{fontWeight:"bold",fontSize:"15px",textAlign:"center",padding:"0.5rem 0"}} >
                                    Sign up
                                </Typography>
                                
                            </Box>
                        </Grid>

                        <Grid item xs={200}
                            style={{ padding: "10" }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="First Name"
                                multiline
                                maxRows={4}
                                onChange={(e) => setfirstName(e.target.value)}
                                value={firstName}
                                style={{ width: '45ch' }}
                            />
                        </Grid>

                        <Grid item xs={200}
                            style={{ padding: "10" }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Last Name"
                                multiline
                                maxRows={4}
                                onChange={(e) => setlastName(e.target.value)}
                                value={lastName}
                                style={{ width: '45ch' }}
                            />
                        </Grid>

                        <Grid item xs={200}
                            style={{ padding: "10" }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Email"
                                multiline
                                maxRows={4}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                style={{ width: '45ch' }}
                            />
                        </Grid>

                        <Grid item xs={200}
                            style={{ padding: "10" }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Mobile"
                                multiline
                                maxRows={4}
                                onChange={(e) => setMobile(e.target.value)}
                                value={mobile}
                                style={{ width: '45ch' }}
                            />
                        </Grid>



                        <Grid item xs={20}>
                            <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    endAdornment={
                                        <InputAdornment position="end" >
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"  
                                                style={{ width: '2rem',boxShadow: 'none' ,backgroundColor:'transparent' }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                  
                                     />
                            </FormControl>
                        </Grid>

                        
                        <Grid item xs={12}>
                        <Button variant="contained" disabled={isLoading} type="submit"
                            sx={{ color: 'white', backgroundColor: "#239B56", borderColor: 'green', width: '45ch', padding: 1, margin: 1, fontWeight: "bold",'&:hover': {background: '#239B56'} }}
                        >Sign Up</Button>
                        </Grid>

                        <Grid item xs={12}>
                        <Typography sx={{textAlign:"center"}} className="text" style={{ color: "#239B56" }}>Already have an account? <span><Link to="/login" style={{ textDecoration:"none", color: "black",fontWeight:"bold" }}>Sign In!</Link></span></Typography>
                        </Grid>
                    </div>

                    
                   
                    {error && <Alert variant="outlined" severity="error">{error}</Alert>}
                </Grid>
            </Box>
        </Grid>

        </Grid>
    )

}

export default Signup;