import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box"
import { Typography,IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';

const Users = () => {

    const [users, setUsers] = useState([])

    const handleDelete = (id) => {

        const deleteUsers = async () => {
            const response = await fetch("http://localhost:7070/api/auth/" + id, {
                method: "DELETE"
            })
            const json = await response.json()
            if (response.ok) {
                console.log("deleted")
            }
        }
        deleteUsers()
    }

    useEffect(() => {

        const fetchUsers = async () => {
            const response = await fetch("http://localhost:7070/api/auth/all-users")
            const json = await response.json()
            if (response.ok) {
                setUsers(json)
            }
        }
     
            fetchUsers()
        

    }, [])


    return (
        <div>
            <Box sx={{ overflowX: "hidden", margin: "20px 0",width:"100%" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection={"column"}>
                {/* <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <PersonOutlineOutlinedIcon color="disabled" fontSize="large" />
                    </Grid>
                    <Grid item xs >
                        <Typography sx={{
                            fontSize: "1.2rem",
                            fontWeight: 'bold'
                        }} textAlign="left" variant="h3">Total Users</Typography>
                        <Typography sx={{ fontSize: "1rem" }} textAlign="left">{users.length}</Typography>
                    </Grid>
                </Grid> */}
                <Typography sx={{ width: 1000, textAlign:"left", padding: "20px" ,color:"#1C2833" }}
                    variant="h4">
                    Users
                </Typography>
                <TableContainer component={Paper} sx={{ margin: "auto", width: 1000 }} elevation={0}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell sx={{fontWeight:"bold",fontSize:"15px"}}>Email</TableCell>
                                <TableCell align="right" sx={{fontWeight:"bold",fontSize:"15px"}}>Full name</TableCell>
                                <TableCell align="right" sx={{fontWeight:"bold",fontSize:"15px"}}>Mobile</TableCell>
                                <TableCell align="right" sx={{fontWeight:"bold",fontSize:"15px"}}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users.map((u) => (
                                <TableRow
                                    key={u._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" >
                                        {u.email}
                                    </TableCell>
                                    <TableCell component="th" align="right">
                                        {u.firstName} {u.lastName}
                                    </TableCell>
                                    <TableCell component="th" align="right" >
                                        {u.mobile}
                                    </TableCell>
                                    <TableCell component="th" align="right" >
                                    <IconButton variant="contained" type="submit" onClick={() => handleDelete(u._id)} sx={{ color: 'black', backgroundColor: "transparent", width: '5ch', marginBottom: 2, fontWeight: "bold",boxShadow:"none" ,'&:hover': {
                                            backgroundColor: 'transparent',boxShadow:"none" 
                                        },color:"#E74C3C"}}><DeleteIcon/></IconButton>
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

export default Users