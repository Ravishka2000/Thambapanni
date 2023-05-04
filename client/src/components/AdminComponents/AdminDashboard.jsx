import React, { useState } from 'react'
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useAuthContext } from '../../hooks/useAuthContext';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ManageHeritages from "./ManageHeritages"
import Users from './Users';
import Dashboard from './Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import EventNoteIcon from '@mui/icons-material/EventNote';


const AdminDashboard=()=>{

    const [activeLink, setActiveLink] = useState('link1');

    const handleLinkClick = (link) => {
        setActiveLink(link);
      };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    return(
            <div style={{backgroundColor:"#FAF9F6"}}>
              <Box sx={{ overflowX: "hidden", marginTop: "60px",marginBottom:"100px",width: "100%" }}>
              <Box sx={{ width: "100" }}>
              <Grid  container
              direction="row"
              justifyContent="center"
              alignItems="flex-start" 
              >
                <Grid item xs={2} sx={{height:"100%",backgroundColor:"#E5E8E8"}} >
                  <Item>
                  <Box sx={{ width: '100%',height: '100vh',padding:"0",margin:"0"}} elevation={0}>
                    <List>
                      <ListItemButton
                        onClick={() => handleLinkClick('link1')}
                        className={activeLink === 'link1' ? 'active' : ''}
                        sx={{
                            backgroundColor: activeLink === 'link1' ? '#D5F5E3' : 'transparent', 
                            '&:hover': {
                              backgroundColor: '#D5F5E3',
                            },
                           
                          }}
                      >
                      <BarChartIcon/>
                        <ListItemText primary="Dashboard" />
                      </ListItemButton>
                    </List>
                    <List>
                      <ListItemButton
                        onClick={() => handleLinkClick('link2')}
                        className={activeLink === 'link2' ? 'active' : ''}
                        sx={{
                            backgroundColor: activeLink === 'link2' ? '#D5F5E3' : 'transparent', 
                            '&:hover': {
                              backgroundColor: '#D5F5E3',
                            },
                          }}
                       
                      >
                      <GroupIcon/>
                        <ListItemText primary="Users" 
                          
                        />
                      </ListItemButton>
                    </List>
                    <List>
                      <ListItemButton
                        onClick={() => handleLinkClick('link3')}
                        className={activeLink === 'link3' ? 'active' : ''}
                        sx={{
                            backgroundColor: activeLink === 'link3' ? '#D5F5E3' : 'transparent', 
                            '&:hover': {
                              backgroundColor: '#D5F5E3',
                            },
                          }}
                      >
                      <ArticleIcon/>
                        <ListItemText primary="Heritages" />
                      </ListItemButton>
                    </List>
                    <List>
                      <ListItemButton
                        onClick={() => handleLinkClick('link4')}
                        className={activeLink === 'link4' ? 'active' : ''}
                        sx={{
                            backgroundColor: activeLink === 'link4' ? '#D5F5E3' : 'transparent', 
                            '&:hover': {
                              backgroundColor: '#D5F5E3',
                            },
                          }}
                      >
                      <EventNoteIcon/>
                        <ListItemText primary="Events" />
                      </ListItemButton>
                    </List>
                  </Box>
                  </Item>
                </Grid>
                <Grid item xs={10} sx={{boxShadow:"none"}} elevation={0}>
                  <Item sx={{boxShadow:"none",backgroundColor:"#FAF9F6"}}>
                  {activeLink === 'link1' && <Dashboard />}
                  {activeLink === 'link2' && <Users />}
                  {activeLink === 'link3' && <ManageHeritages />}
                  {/* {activeLink === 'link4' && <UsersChart/>}   */}
                  </Item>
                </Grid>
              </Grid>
            </Box>
            </Box>
              
            </div>
    )
  




}

export default AdminDashboard;