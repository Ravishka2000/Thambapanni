import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, Grid, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert"
import React from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin()
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = async (e) => {
        
        e.preventDefault()
        await login(email, password)
        console.log(error)

    }
    return (

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:"space-around",
             height: '50%',
            padding:"150px 20px",backgroundColor:"#FAF9F6",
            
            
          }} >
            <Grid item sx={{ display: { xs: 'none', md: 'block' }, alignItems: 'center', justifyContent: 'center', height: 650}} xs={6} md={6}>  
                <img src="https://res.cloudinary.com/daxiby67v/image/upload/v1683265442/aerial-view-of-sigiriya-rock-at-misty-morning--sri-lanka--drone-photo--1129567907-a6628ce7d636462f9a0e0361a3808178_az4rbv.jpg" alt="Example Image" style={{ width: '100%', height: '100%', objectFit: 'cover',borderRadius:"2rem 0 0 2rem" }} />  
            </Grid>


            <Grid item xs={6} md={6} sx={{height: 650}}>
            <Typography sx={{fontWeight:"bold",textAlign:"left",padding:"0.5rem",color:"#566573"}} variant="h6">
                    THAMBAPANNI
            </Typography>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    flexDirection: { xs: "column", sm: "row" },
                    display: 'flex', alignItems: 'center', justifyContent: 'center',height: 600,
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between">
                    <div>
                        <Grid item xs={12}
                        sx={{width:"100%"}}
                        >
                            <Box
                                >
                                <Typography sx={{fontWeight:"bold",fontSize:"15px",textAlign:"center",padding:"2rem 0"}} >
                                    Sign in
                                </Typography>
                                
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
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
                                                size="1"
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
                        <Typography textAlign={"right"}><Link to="/reset-password" style={{ textDecoration:"none", color: "#239B56",fontSize:"15px",paddingRight:"20px" }}>Forgot Passowrd?</Link></Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Button variant="contained" disabled={isLoading} type="submit" 
                            sx={{ color: 'white', backgroundColor: "#239B56", borderColor: 'green', width: '45ch', padding: 1, margin: 1, fontWeight: "bold",'&:hover': {background: '#239B56'} }}
                        >Sign In</Button>

                        <Grid item xs={12}
                        textAlign={"center"}>
                        <Typography style={{ color: "#239B56",marginBottom:2 }}>Don't have an account? <span><Link to="/signup" style={{ textDecoration:"none", color: "black",fontWeight:"bold" }}>Sign Up!</Link></span></Typography>
                        </Grid>
                    </Grid>
                    </div>
                    

                    
                    

                    {error && <Alert variant="outlined" severity="error" >{error}</Alert>}

                </Grid>
            </Box>
                

            </Grid>
        </Grid>
     
   
    )

}

export default Login;