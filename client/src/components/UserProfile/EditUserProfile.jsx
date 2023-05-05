import React, { useState } from 'react'
import { useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid,Typography } from '@mui/material';
import Button from "@mui/material/Button";
import axios from 'axios';
import Alert from "@mui/material/Alert"
const EditInfo = ({ onEditToggle }) => {

    const { user } = useAuthContext()
    const [ayurUser, setUser] = useState("")
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")


    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:7070/api/auth/${user._id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
            const json = await response.json()

            if (response.ok) {
                setUser(json)
                setEmail(json.email)
                setfirstName(json.firstName)
                setlastName(json.lastName)
                setMobile(json.mobile)
            }
        }
        fetchUser()

        console.log(email)

    }, [user])

    const handleCancelClick = () => {
        onEditToggle()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            email,
            firstName,
            lastName,
            mobile
        }
        axios.put('http://localhost:7070/api/auth/update-user', data, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        })
            .then(response => {
                if (response.status === 200) {
                    const json = response.data
                    onEditToggle();
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
                    flexDirection: { xs: "column", sm: "row" },
                    height:"500px"
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Grid
                    container
                    spacing={1}
                    direction="column"
                    alignItems="left"
                    justifyContent="space-between"
                    justify="space-between"
                    placeItems='center'
                    sx={{width:"500px",height:600}}>
                    <div style={{height:500}}>
                    <Grid item xs={12}
                        >
                            <Box
                                textAlign="center">
                                <Typography sx={{width:"100%",textAlign:"left",padding:"20px 20px",color:"black"}}
                                variant="h3">
                                    Edit Profile
                                </Typography>
                            </Box>
                    </Grid>
                    <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                value={email}
                                focused
                                disabled
                                style={{ width: '35ch' }}
                            />
                    </Grid>
                    <Grid item xs={12}>
                            <TextField

                                label="First Name"
                                variant="standard"
                                focused
                                onChange={(e) => setfirstName(e.target.value)}
                                value={firstName}
                                style={{ width: '35ch' }}
                            />
                    </Grid>
                    <Grid item xs={12}>
                            <TextField
                                label="Last Name"
                                variant="standard"
                                focused
                                onChange={(e) => setlastName(e.target.value)}
                                value={lastName}
                                style={{ width: '35ch' }}
                            />
                    </Grid>
                    <Grid item xs={12}>
                            <TextField
                                label="Mobile"
                                variant="standard"
                                focused
                                onChange={(e) => setMobile(e.target.value)}
                                value={mobile}
                                style={{ width: '35ch' }}
                            />
                    </Grid>
                    <Grid item xs={12}
                    >
                        <Button variant="contained" type="submit"
                            sx={{ color: 'white', backgroundColor: "#3498DB", borderColor: 'green', width: '35ch', padding: 2, margin: 2, fontWeight: "bold",'&:hover': {background: '#3498DB'} }}
                        >Save</Button>
                    </Grid>

                    <Button variant="contained" onClick={handleCancelClick}
                       sx={{ color: 'white', backgroundColor: "#3498DB", borderColor: 'green', width: '35ch', padding: 2, margin: 2, fontWeight: "bold",'&:hover': {background: '#3498DB'} }}
                    >Back</Button>
                    </div>
                </Grid>
                {error && <Alert variant="filled" severity="error" style={{ fontWeight: "bold", color: "#063970" }}>{error}</Alert>}
            </Box>
        </div>
    )
}

export default EditInfo