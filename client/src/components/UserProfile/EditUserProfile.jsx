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
        <Box sx={{ width: 500, margin: "auto", padding: "20px", backgroundColor: "#E8F8F5",borderRadius:"30px" }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box
                component="form"
                sx={{
                  backgroundColor: '#F8F8F8',
                  borderRadius: '20px',
                  boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)',
                  p: 4,
                  width: '500px',
                  backgroundColor: "#EBF5FB"
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <Typography variant="h4" sx={{ mb: 3,color:"black",textAlign:"left" }}>
                  Edit Profile
                </Typography>
        
                <TextField variant="standard" value={email} disabled sx={{ mb: 2, width: '100%' }} />
        
                <TextField
                  label="First Name"
                  variant="standard"
                  focused
                  onChange={(e) => setfirstName(e.target.value)}
                  value={firstName}
                  sx={{ mb: 2, width: '100%' }}
                />
        
                <TextField
                  label="Last Name"
                  variant="standard"
                  focused
                  onChange={(e) => setlastName(e.target.value)}
                  value={lastName}
                  sx={{ mb: 2, width: '100%' }}
                />
        
                <TextField
                  label="Mobile"
                  variant="standard"
                  focused
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                  sx={{ mb: 3, width: '100%' }}
                />
        
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        backgroundColor: '#9CCC65',
                        color: '#fff',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: '#9CCC65',
                        },
                        width: '100%',
                      }}
                    >
                      Save
                    </Button>
                  </Grid>
        
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      onClick={handleCancelClick}
                      sx={{
                        backgroundColor: '#EF5350',
                        color: '#fff',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: '#EF5350',
                        },
                        width: '100%',
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
        
                {error && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#C0392B' }}>
                      {error}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            </Box>
          
    )
}

export default EditInfo