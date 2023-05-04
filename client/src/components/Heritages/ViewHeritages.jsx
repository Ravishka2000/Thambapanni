import React, { useState, useEffect } from 'react';
import { Card, CardMedia, Box, Grid, Typography,InputAdornment,TextField } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const ViewHeritages = () => {
    const [heritages, setHeritages] = useState([]);
    const[original,setOriginal] = useState([])
    const[search,setSearch] = useState("")


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:7070/api/heritages/");
                setHeritages(response.data);
                setOriginal(response.data)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleSearch=(event)=>{
        setSearch(event.target.value)
        const searchWord = event.target.value
       

        if(searchWord===""){
            setHeritages(original)
        }
        else{
            const newFilter = heritages.filter((heritage)=>{
                return heritage.title.toLowerCase().includes(searchWord.toLowerCase())
            })
            setHeritages(newFilter) 
        }
        
        
    }

    return (
        <div style={{backgroundColor:"#FAF9F6"}}>
        <Box display="flex" flexDirection="column" alignItems="left" sx={{paddingTop:"80px"}} bgcolor={'#fafafa'}>
        <TextField 
                onChange={handleSearch}
                value={search}
                sx={{ width: 600, margin: " 20px auto"}}
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <SearchIcon />
                    </InputAdornment>
                ),
                }}
        />
        <Grid container mt={10}>
            <Grid item xs={12} md={12}>
                {heritages &&
                    heritages.map((heritage) => (
                        <Grid item xs={12} sm={12} key={heritage._id} mx={{ xs: 3, md: 20 }}>
                            <Link
                                to ={"/api/heritage/"+heritage._id}
                                style={{ textDecoration: "none" }}
                            >
                                <Card sx={{ display: "flex", my: 4, maxHeight: { xs: 700, lg: 250 }, flexDirection: { xs: "column", lg: "row" } }}>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: { xs: '100%', lg: 300 },
                                            height: { xs: 200, lg: 'auto' },
                                        }}
                                        image={heritage.image}
                                        alt={heritage.title}
                                    />
                                    <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>
                                        <Typography
                                            fontFamily={'Roboto'}
                                            fontSize={24}
                                            fontWeight={800}
                                        >
                                            {heritage.title}
                                        </Typography>
                                        <Typography fontSize={15} my={2} display={{ xs: 'none', lg: 'block' }} >
                                        <div dangerouslySetInnerHTML={{ __html: heritage.description.slice(0, 300) }} />
                                            <span style={{ color: "#00008B",fontStyle:"italic" }}>...Read More</span>
                                        </Typography>
                                        <Typography
                                            fontSize={15}
                                            fontWeight={800}
                                            color=" #313639"
                                            mb={2}
                                        >
                                            {heritage.location}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
            </Grid>
        </Grid>
        </Box>
        </div>
    )
}

export default ViewHeritages
