import { useEffect, useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import Box from "@mui/material/Box"
import { Typography,Paper} from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Grid from '@mui/material/Grid';
import InboxIcon from '@mui/icons-material/Inbox';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
Chart.register(CategoryScale, LinearScale, BarController, BarElement);
import axios from "axios";
import { styled } from '@mui/material/styles';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import EventNoteIcon from '@mui/icons-material/EventNote';



const Dashboard = () => {
    const { user } = useAuthContext()
    const [users, setUsers] = useState([])
    const[heritages,setHeritages]=useState([])
    const[events,setEvents] = useState([])

    const dateop = { year: 'numeric', month: 'long', day: 'numeric' };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));      
    
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("http://localhost:7070/api/auth/all-users")
            const json = await response.json()
            if (response.ok) {
                setUsers(json)
            }
        }

        fetchUsers()

        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:7070/api/events/");
                setEvents(response.data);
                console.log(events);
            } catch (error) {
                console.log(error);
            }
        }
        fetchEvents();

        axios.get("http://localhost:7070/api/heritages")
        .then(response=>{
            setHeritages(response.data)
        }).catch(error=>{
            console.log(error)
        })

            
    }, [users])

    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const userperMonth = Array(12).fill(0);
    const eventsPerMonth = Array(12).fill(0);


    for (const user of users) {
        const createdDate = new Date(user.createdAt);
        const month = createdDate.getMonth();
        userperMonth[month]++;
    }

    for (const event of events) {
        const createdDate = new Date(event.createdAt);
        const month = createdDate.getMonth();
        eventsPerMonth[month]++;
    }

   

    const data1 = {
        labels: months,
        datasets: [{
            label: "Users Per Month",
            data: userperMonth,
            backgroundColor: 'rgba(156, 39, 176, 0.2)',
            borderColor: 'rgb(156, 39, 176)',
            borderWidth: 1
        }]
    }

    const data2 = {
        labels: months,
        datasets: [{
            label: "Heritages Per Month",
            data: eventsPerMonth,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
        }]
    }

    const options = {
        scales: {
          x: {
            type: 'category',
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const count = context.raw
                return `Count: ${count}`
              }
            }
          }
        }
      };
    
    return (
        <div style={{padding:"1rem"}}>
        <Typography variant="h6" sx={{textAlign:"left",color:"black",fontStyle:"bold"}}>Hi, Welcome Back!</Typography>
        <Typography sx={{textAlign:"left",fontStyle:"bold"}}>Today's date is: {new Date().toLocaleDateString("en-US",dateop)}</Typography>
         <Box sx={{ width: '100%',paddingTop:"30px" }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={4} >
                <Item elevation={0} style={{padding:"1rem",borderRadius:"15px",backgroundColor:"#CE93D8"}}>
                    <GroupIcon sx={{color:"#4A235A",fontSize:"3rem"}}/>
                    <Typography sx={{color:"#4A235A",fontSize:"1rem"}}>Total Users</Typography>
                    <Typography sx={{color:"#4A235A",fontSize:"2rem"}}>{users.length}</Typography>
                </Item>
                </Grid>
                <Grid item xs={4}>
                <Item elevation={0} style={{padding:"1rem",borderRadius:"15px",backgroundColor:"#90CAF9"}}>
                    <ArticleIcon sx={{color:"#154360",fontSize:"3rem"}}/>
                    <Typography sx={{color:"#154360",fontSize:"1rem"}}>Total Blogs</Typography>
                    <Typography sx={{color:"#154360",fontSize:"2rem"}}>{users.length}</Typography>
                </Item>
                </Grid>
                <Grid item xs={4}>
                <Item elevation={0} style={{padding:"1rem",borderRadius:"15px",backgroundColor:"#80DEEA"}}>
                    <EventNoteIcon sx={{color:"#0E6251",fontSize:"3rem"}}/>
                    <Typography sx={{color:"#0E6251",fontSize:"1rem"}}>Total Events</Typography>
                    <Typography sx={{color:"#0E6251",fontSize:"2rem"}}>{events.length}</Typography>
                </Item>
                </Grid>
            </Grid>
        </Box>
        <Box
        display="flex"
                justifyContent="left"
                alignItems="left"
                flexDirection={"row"}
                sx={{paddingTop:"50px"}}

        >
            <Box sx={{ overflowX: "hidden", marginTop: "20px",width:550,backgroundColor:"white",borderRadius:"10px",padding:"1rem" }}
                display="flex"
                justifyContent="left"
                alignItems="left"
                flexDirection={"column"}>
                <Typography sx={{ width: 300,color:"black",fontStyle:"bold",textAlign:"left" }}
                    variant="h6">
                    Users Per Month
                </Typography>
                <Box>
                </Box>
                <Bar data={data1} options={options}/>
            </Box>
            <Box sx={{ overflowX: "hidden", marginTop: "20px",width:550,backgroundColor:"white",borderRadius:"10px",padding:"1rem",marginLeft:"1rem", }}
                display="flex"
                justifyContent="left"
                alignItems="left"
                flexDirection={"column"}>
                <Typography sx={{ width: 300 ,color:"black",fontStyle:"bold",textAlign:"left" }}
                    variant="h6">
                    Events Held Per Month
                </Typography>
                <Box>
                </Box>
                <Bar data={data2} options={options}/>
            </Box>
            </Box>
        </div>
        
    )
}

export default Dashboard