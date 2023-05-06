import axios from "axios"
import { useState,useEffect } from "react"
import { Grid,Typography,Table,TableCell,TableBody,TableContainer,TableHead,TableRow,Paper,Button,IconButton, TextField, selectClasses,InputAdornment } from "@mui/material"
import Box from "@mui/material/Box"
import { Link } from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useAuthContext } from '../../hooks/useAuthContext';

const ManageHeritages=()=>{
    
    const[heritages,setHeritages]=useState([])
    const[search,setSearch] = useState("")
    const[original,setOriginal] = useState([])
    const { user } = useAuthContext()

    useEffect(()=>{
        axios.get("http://localhost:7070/api/heritages")
        .then(response=>{
            setHeritages(response.data)
            setOriginal(response.data)
        }).catch(error=>{
            console.log(error)
        })
    },[])

    const handleDelete=(id)=>{
        axios.delete("http://localhost:7070/api/heritages/"+id,{
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        })
        .then(response=>{
            console.log(response)
        }).catch(error=>{
            console.log(error)
        })
    }

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

    return(
        <div style={{margin: "20px 0",width:"100%",backgroundColor:"#FAF9F6" }}>
         <Box sx={{ overflowX: "hidden", marginTop: "0px", }}
                display="flex"
                justifyContent="left"
                alignItems="left"
                flexDirection={"column"}>
                <Typography sx={{ width: 350,padding:"1rem 0",color:"#1C2833" }}
                    variant="h4">
                    Heritages
                </Typography>
                <TextField 
                    onChange={handleSearch}
                    value={search}
                    sx={{ width: 600, margin: "auto", padding: "20px" }}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <SearchIcon />
                        </InputAdornment>
                    ),
                    }}
                />
                <div style={{ width: 450,padding:"1rem 0" }}>
                <Link to ={"/api/createHeritages/"}>
                    <Button variant="contained" type="submit" sx={{ color: 'black', backgroundColor: "#3498DB ", width: '30ch', marginBottom: 2, fontWeight: "bold",boxShadow:"none" ,'&:hover': {
                            backgroundColor: '#3498DB ',boxShadow:"none"},color:"bkack",textDecoration:"bold"}}>
                    <Typography>Add New Heritage</Typography>
                    <AddIcon/>
                </Button> 
                </Link>
                </div>
                <TableContainer component={Paper} sx={{ margin: "auto", width: 1000 }} elevation={0}>
                    <Table sx={{ maxWidth:"100%" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" sx={{fontWeight:"bold",fontSize:"15px"}}>Title</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {heritages && heritages.map((u) => (
                                <TableRow
                                    key={u._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    
                                    <TableCell component="th" align="left">
                                    <Link to={`/api/heritage/${u._id}`} style={{textDecoration:"none",color:"black"}}>
                                        {u.title}
                                    </Link>
                                    </TableCell>
                                    <TableCell component="th" align="right" sx={{display:"flex"}} >
                                        <IconButton variant="contained" type="submit" onClick={() => handleDelete(u._id)} sx={{ color: 'black', backgroundColor: "transparent", width: '5ch', marginBottom: 2, fontWeight: "bold",boxShadow:"none" ,'&:hover': {
                                            backgroundColor: 'transparent',boxShadow:"none" 
                                        },color:"#E74C3C"}}><DeleteIcon/></IconButton>
                                         <Link to ={"/api/editHeritages/"+u._id}>
                                         <IconButton variant="contained" type="submit" sx={{ color: 'black', backgroundColor: "transparent", width: '5ch', marginBottom: 2, fontWeight: "bold",boxShadow:"none" ,'&:hover': {
                                            backgroundColor: 'transparent',boxShadow:"none"},color:"#82E0AA"}}>
                                           <EditIcon/>
                                        </IconButton> 
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
