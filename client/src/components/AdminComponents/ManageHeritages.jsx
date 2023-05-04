import axios from "axios"
import { useState,useEffect } from "react"
import { Box,Grid,Typography,Table,TableCell,TableBody,TableContainer,TableHead,TableRow,Paper,Button } from "@mui/material"
import { Link } from "react-router-dom"

const ManageHeritages=()=>{
    
    const[heritages,setHeritages]=useState([])

    useEffect(()=>{
        axios.get("http://localhost:7070/api/heritages")
        .then(response=>{
            setHeritages(response.data)
        }).catch(error=>{
            console.log(error)
        })
    },[heritages])

    const handleDelete=(id)=>{

        axios.delete("http://localhost:7070/api/heritages/"+id)
        .then(response=>{
            console.log(response)
        }).catch(error=>{
            console.log(error)
        })
    }

    return(
        <div>
         <Box sx={{ overflowX: "hidden", marginTop: "20px" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection={"column"}>
                <Grid container wrap="nowrap" spacing={2}>
                </Grid>
                <Typography sx={{ width: 650, margin: "auto", padding: "20px" }}
                    variant="h4">
                    Heritages
                </Typography>
                <TableContainer component={Paper} sx={{ margin: "auto", width: 650 }} elevation={0}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {heritages && heritages.map((u) => (
                                <TableRow
                                    key={u._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  
                                    <TableCell component="th" align="left">
                                        {u.title}
                                    </TableCell>
                                    <TableCell component="th" align="right" >
                                        
                                        <Button variant="contained" type="submit" onClick={() => handleDelete(u._id)} sx={{ color: 'black', backgroundColor: "transparent", width: '5ch', marginBottom: 2, fontWeight: "bold",boxShadow:"none" ,'&:hover': {
                                            backgroundColor: 'transparent',boxShadow:"none" 
                                        },}}>Delete</Button>
                                         <Link to ={"/api/editHeritages/"+u._id}>
                                         <Button variant="contained" type="submit" sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '15ch', fontWeight: "bold" }}>
                                           Edit
                                        </Button> 
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>

        </div>
    )
}

export default ManageHeritages
