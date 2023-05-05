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

    

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    
      
      const Bold = styled(Typography)(({theme})=>({
        textAlign: 'center',
        fontWeight:"bold",
        color:"black"
        
      }))
    
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

      const StyledPaper = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
        
      }));
    
    

      return(
        <div sx={{width:800,margin:"auto",padding:"20px",backgroundColor:"white"}}>
        
        <Box sx={{width:"100%",height:"500px",backgroundColor:"white"}}>
        <Typography sx={{width:"100%",textAlign:"left",padding:"5px 20px",color:"#3498DB",fontWeight:"800"}}
      variant="h3">
        My Profile
      </Typography>
      <Typography sx={{width:"100%",textAlign:"left",padding:"5px 20px",color:"black"}}
      variant="h6">
        Hi, 👋🏼 Welcome Back !
      </Typography>

            <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 ,backgroundColor:"white"}}>
            <StyledPaper
                    sx={{
                    my: 1,
                    mx: 'auto',
                    p: 2,
                    
                    }}
                    elevation={0}
                >
                <Grid container wrap="nowrap" spacing={2} >
                <Grid item>
                    <PersonIcon color="disabled" fontSize="large"/>
                </Grid>
                <Grid item xs >
                    <Typography sx={{fontSize: "1.2rem" ,
                                    fontWeight: 'bold' }} textAlign="left">Full name</Typography>
                    <Typography sx={{ fontSize: "1rem" }} textAlign="left">{ayurUser.firstName} {ayurUser.lastName}</Typography>
                </Grid>
                </Grid>
            </StyledPaper>
            <StyledPaper
                    sx={{
                    my: 1,
                    mx: 'auto',
                    p: 2,
                    
                    }}
                    elevation={0}
                >
                <Grid container wrap="nowrap" spacing={2} alignContent="left">
                <Grid item>
                    <EmailIcon color="disabled" fontSize="large"></EmailIcon>
                </Grid>
                <Grid item xs>
                    <Typography sx={{ fontSize: "1.2rem",
                                    fontWeight: 'bold' }} textAlign="left">Email</Typography>
                    <Typography sx={{ fontSize: "1rem"  }} textAlign="left">{ayurUser.email}</Typography>
                </Grid>
                </Grid>
            </StyledPaper>
            <StyledPaper
                    sx={{
                    my: 1,
                    mx: 'auto',
                    p: 2,
                    
                    }}
                    elevation={0}
                >
                <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <SmartphoneIcon color="disabled" fontSize="large"/>
                </Grid>
                <Grid item xs>
                    <Typography sx={{ fontSize: "1.2rem",
                                      fontWeight: 'bold'  }} textAlign="left">Mobile</Typography>
                    <Typography sx={{ fontSize: "1rem" }} textAlign="left">{ayurUser.mobile}</Typography>
                </Grid>
                </Grid>
            </StyledPaper>
            </Box>
        </Box>

        

        
           
        </div>

      )


}

export default UserInfo;