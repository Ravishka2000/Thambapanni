import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid,Typography } from '@mui/material';
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert"
import axios from "axios";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        axios.post('http://localhost:7070/api/auth/forgot-password-token', { email }, {
            headers: { 'Content-Type': "application/json" }
        })
            .then(response => {

                if (response.status === 200) {
                    const json = response.data
                    setSuccess("Password reset link is sent to your email addreess")
                } else {
                    setError(response.message)
                }

            }).catch(error => {
                setError(error.response.data.message);
            })

    }

    return (
        <div>
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
                    style={{ minHeight: '100vh' }}>
                 
                        <Grid item xs={12}
                            style={{ padding: "2" }}
                        >
                            <Box
                                >
                                 <Typography sx={{fontWeight:"bold",fontSize:"20px",textAlign:"center",padding:"2rem 0"}} >
                                    Reset Password
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}
                        >
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
                    <Button variant="contained" type="submit"
                            sx={{ color: 'white', backgroundColor: "#239B56", borderColor: 'green', width: '48ch', padding: 2, margin: 2, fontWeight: "bold",'&:hover': {background: '#239B56'} }}
                    >Reset Password</Button>
                     <Grid item xs={12}
                     sx={{width:"45ch"}}>
                    <Typography sx={{fontSize:"15px",textAlign:"center",padding:"0.5rem 0",width:"45ch",color:"gray"}} >
                    Temporary password reset code is valid for 10 minutes.
                   
                    </Typography>
                    </Grid>
                    <Grid item xs={12}
                     sx={{width:"45ch"}}>
                    <Typography sx={{textAlign:"center"}}><p className="text" style={{ color: "#239B56" }}>Back to <span><Link to="/login" style={{ textDecoration:"none", color: "black",fontWeight:"bold" }}>Sign In!</Link></span></p></Typography>
                    
                    </Grid>
                    <Grid item xs={12}>
                        {error && <Alert variant="outlined" severity="error">{error}</Alert>}
                        {success && <Alert variant="outlined" severity="success">{success}</Alert>}
                    </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>


    )


}

export default ForgetPassword