import React, { useState } from 'react'
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useAuthContext } from '../../hooks/useAuthContext';
import Typography from '@mui/material/Typography';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar } from '@mui/material';


const UserInfo=()=>{

    
    const{user} = useAuthContext()
    const[ayurUser,setUser]=useState("")
    
    useEffect(()=>{
    
        const fetchUser = async()=>{
            const response = await fetch("http://localhost:7070/api/auth/"+ user._id,{
                headers :{ 'Authorization' :`Bearer ${user.token}`}
            })
    
            const json = await response.json()
    
            if(response.ok){
                setUser(json)
            }
            
        }
    
        if(user){
            fetchUser()
        }
    

    },[user])

        return (
            <Box sx={{ width: 800, margin: "auto", padding: "20px", backgroundColor: "#E8F8F5",borderRadius:"30px" }}>
              <Box sx={{ width: "100%", height: "500px", backgroundColor: "#EBF5FB", boxShadow: 1,borderRadius:"30px" }}>
                <Typography sx={{ width: "100%", textAlign: "left", padding: "20px", color: "black", fontWeight: "bold" }} variant="h3">
                  My Profile
                </Typography>
                <Typography sx={{ width: "100%", textAlign: "left", padding: "20px", color: "gray" }} variant="h6">
                  Hi, 👋🏼 Welcome Back!
                </Typography>
                <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3, backgroundColor: "#EBF5FB" }}>
                  <Paper sx={{ my: 1, mx: 'auto', p: 2,backgroundColor: "#EBF5FB",border:"none" }} elevation={0} variant="outlined">
                    <Grid container wrap="nowrap" spacing={2} alignItems="center" >
                      <Grid item >
                        <PersonIcon color="#AED6F1" fontSize="large" />
                      </Grid>
                      <Grid item xs>
                        <Typography sx={{ fontSize: "1.2rem", fontWeight: 'bold' }} textAlign="left">Full Name</Typography>
                        <Typography sx={{ fontSize: "1rem" }} textAlign="left">{ayurUser.firstName} {ayurUser.lastName}</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                  <Paper sx={{ my: 1, mx: 'auto', p: 2 ,backgroundColor: "#EBF5FB",border:"none"  }} elevation={0} variant="outlined">
                    <Grid container wrap="nowrap" spacing={2} alignItems="center">
                      <Grid item>
                        <EmailIcon  fontSize="large" />
                      </Grid>
                      <Grid item xs>
                        <Typography sx={{ fontSize: "1.2rem", fontWeight: 'bold' }} textAlign="left">Email</Typography>
                        <Typography sx={{ fontSize: "1rem" }} textAlign="left">{ayurUser.email}</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                  <Paper sx={{ my: 1, mx: 'auto', p: 2,backgroundColor: "#EBF5FB",border:"none"   }} elevation={0} variant="outlined">
                    <Grid container wrap="nowrap" spacing={2} alignItems="center">
                      <Grid item>
                        <SmartphoneIcon fontSize="large" />
                      </Grid>
                      <Grid item xs>
                        <Typography sx={{ fontSize: "1.2rem", fontWeight: 'bold' }} textAlign="left">Mobile</Typography>
                        <Typography sx={{ fontSize: "1rem" }} textAlign="left">{ayurUser.mobile}</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              </Box>
            </Box>
          )
      


}

export default UserInfo;