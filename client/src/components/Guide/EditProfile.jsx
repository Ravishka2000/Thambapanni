import React, { useState } from 'react'
import { useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Button from "@mui/material/Button";
import axios from 'axios';
import Alert from "@mui/material/Alert"
import { Card, CardContent, Container } from '@mui/material';

const EditProfile = ({ onEditToggle }) => {

    const { user } = useAuthContext()
    const [ayurUser, setUser] = useState("")
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [bio, setBio] = useState("")
    const [charges, setCharges] = useState("")
    const [photo, setPhoto] = useState("")
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
                setAddress(json.address)
                setBio(json.bio)
                setCharges(json.charges)
                setPhoto(json.photo)
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
            mobile,
            address,
            bio,
            charges,
            photo
        }
        axios.put('http://localhost:7070/api/auth/update-guide', data, {
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
            <Box height={30}/>
            <Card style={{ backgroundColor: "#F1F6F9"  }} justifyContent="center">
                    <CardContent>
                    <Container maxWidth="sm" style={{marginTop: '20px', marginBottom: '20px'}}>
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
                    placeItems='center'>
                    <div>
                        <Grid item xs={12}
                            style={{ padding: "2" }}
                        >
                            <Box
                                textAlign="center" style={{ marginBottom: '16px', fontWeight: 'bold', color: '#19376D', padding: '3', }}>
                                <h1>
                                    Edit Profile
                                </h1>
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
                        <Grid item xs={12}>
                            <TextField
                                label="Address"
                                variant="standard"
                                focused
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                                style={{ width: '35ch' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Bio"
                                variant="standard"
                                focused
                                onChange={(e) => setBio(e.target.value)}
                                value={bio}
                                style={{ width: '35ch' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Charges"
                                variant="standard"
                                focused
                                onChange={(e) => setCharges(e.target.value)}
                                value={charges}
                                style={{ width: '35ch' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Profile picture"
                                variant="standard"
                                focused
                                onChange={(e) => setPhoto(e.target.value)}
                                value={photo}
                                style={{ width: '35ch' }}
                            />
                        </Grid>
                    </div>
                    <Grid item xs={20}
                        style={{ padding: "10" }}>
                        <Button variant="contained" type="submit"
                            sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '45ch', padding: 2, margin: 2, fontWeight: "bold" }}
                        >Save</Button>
                    </Grid>

                    
                </Grid>
                {error && <Alert variant="filled" severity="error" style={{ fontWeight: "bold", color: "#063970" }}>{error}</Alert>}
            </Box>
            </Container>
            </CardContent>
            </Card>
        </div>
    )
}

export default EditProfile