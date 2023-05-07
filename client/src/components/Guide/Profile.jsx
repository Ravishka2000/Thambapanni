import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { TextField, Card, CardContent, Container } from '@mui/material';
import Box from '@mui/material/Box';
import { useAuthContext } from "../../hooks/useAuthContext";
import Button from "@mui/material/Button";

const Profile = () => {

    const { user } = useAuthContext();
    const[guide, setUser]=useState("");

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
    <>
      <Box height={20}/>
      <section style={{ margin: '32px 0' }}>
      <Grid container spacing={2} marginTop={10}>
        {guide && (
          <>
            <Grid item xs={12} sm={6}>
              <img
                src={guide.photo}
                alt={guide.firstname}
                style={{ 
                width: '350px',
                height: '350px',
                display: 'block',
                margin: '0 auto',
                borderWidth: 1,
                borderColor: '#2f2f2f',
                borderRadius: '50%' }}
              />
              <br/><br/>
              <Typography variant="h5" style={{ marginBottom: '16px', fontWeight: 'bold', color: '#19376D' }}>
                <center>{guide.firstName} {guide.lastName}</center>
              </Typography>
              <Typography variant="h6" style={{ marginBottom: '16px', color: '#19376D' }}>
                <center>Guide of Team Thambapanni Since {new Date(guide.createdAt).getFullYear()}</center>
              </Typography>
             
            </Grid>
            <Grid item xs={12} sm={6} style={{ backgroundColor: '#ffff' }}>
            
            <Card style={{ backgroundColor: "#3aff0031"  }} justifyContent="center">
                    <CardContent>
                    <Container maxWidth="sm" style={{marginTop: '20px', marginBottom: '20px'}}>
                        
                            <Typography variant="h5" style={{ marginBottom: '16px', fontWeight: 'bold', color: '#19376D', padding: '3', }}>
                              <center>My Profile</center>
                            </Typography>
                            <form >
                            
                            <Grid container spacing={2}>
                            <Grid container item spacing={2} xs={12}>
                                    <Grid item xs={4}  sx={{ borderColor: 'green', padding: 3, fontWeight: "bold" }}>
                                        Name
                                    </Grid>
                                    <Grid item xs={8}  sx={{ borderColor: 'green',  padding: 3 }}>
                                    {guide.firstName} {guide.lastName}
                                    </Grid>
                            </Grid>
                            <Grid container item spacing={2} xs={12}>
                                    <Grid item xs={4}  sx={{ borderColor: 'green', padding: 3, fontWeight: "bold" }}>
                                        Bio
                                    </Grid>
                                    <Grid item xs={8} sx={{ borderColor: 'green',  padding: 3 }}>
                                    {guide.bio} 
                                    </Grid>
                            </Grid>
                            <Grid container item spacing={2} xs={12}>
                                    <Grid item xs={4}  sx={{ borderColor: 'green', padding: 3, fontWeight: "bold" }}>
                                        Email
                                    </Grid>
                                    <Grid item xs={8} sx={{ borderColor: 'green',  padding: 3 }}>
                                    {guide.email} 
                                    </Grid>
                            </Grid>
                            <Grid container item spacing={2} xs={12}>
                                    <Grid item xs={4}  sx={{ borderColor: 'green', padding: 3, fontWeight: "bold" }}>
                                        Mobile
                                    </Grid>
                                    <Grid item xs={8} sx={{ borderColor: 'green',  padding: 3 }}>
                                    {guide.mobile} 
                                    </Grid>
                            </Grid>
                            <Grid container item spacing={2} xs={12}>
                                    <Grid item xs={4}  sx={{ borderColor: 'green', padding: 3, fontWeight: "bold" }}>
                                        Address
                                    </Grid>
                                    <Grid item xs={8} sx={{ borderColor: 'green',  padding: 3 }}>
                                    {guide.address} 
                                    </Grid>
                            </Grid>
                            <Grid container item spacing={2} xs={12}>
                                    <Grid item xs={4}  sx={{ borderColor: 'green', padding: 3, fontWeight: "bold" }}>
                                        Charges
                                    </Grid>
                                    <Grid item xs={8} sx={{ borderColor: 'green',  padding: 3 }}>
                                    {guide.charges} 
                                    </Grid>
                            </Grid>
                        
                                
                        
                                {/* <Button variant="contained" 
                                    sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '85ch', padding: 2, margin: 2, fontWeight: "bold" }}
                                >Edit</Button>
                       */}
                            </Grid>
                        </form>
                        
                        </Container>
                    </CardContent>
                </Card>
            </Grid>
          </>
        )}
      </Grid>
    </section>
        <Box height={500}/> 
    </>
  )
}

export default Profile
