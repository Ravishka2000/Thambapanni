import axios from "axios"
import { useState, useEffect } from "react"
import { Typography, Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Paper, Button, IconButton, TextField, InputAdornment } from "@mui/material"
import Box from "@mui/material/Box"
import { Link } from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';


const ManageEvents = () => {

    const [events, setEvents] = useState([])
    const [search, setSearch] = useState("")
    const [original, setOriginal] = useState([])

    useEffect(() => {
        axios.get("http://localhost:7070/api/events")
            .then(response => {
                setEvents(response.data)
                setOriginal(response.data)
            }).catch(error => {
                console.log(error)
            })
    }, [events])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:7070/api/events/${id}`)
            .then(response => {
                // Filter out the deleted event from the state
                const updatedEvents = events.filter(event => event.id !== id);
                setEvents(updatedEvents);
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
        const searchWord = event.target.value

        if (searchWord === "") {
            setEvents(original)
        }
        else {
            const newFilter = events.filter((heritage) => {
                return heritage.title.toLowerCase().includes(searchWord.toLowerCase())
            })
            setEvents(newFilter)
        }
    }

    return (
        <div style={{ margin: "20px 0", width: "100%", backgroundColor: "#FAF9F6" }}>
            <Box sx={{ overflowX: "hidden", marginTop: "0px", }}
                display="flex"
                justifyContent="left"
                alignItems="left"
                flexDirection={"column"}>
                <Typography sx={{ width: 350, padding: "1rem 0", color: "#1C2833" }}
                    variant="h4">
                    Events
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
                <Box ml={7.5} my={3} style={{ width: 450, padding: "1rem 0" }}>
                    <Link to={"/create-events/"}>
                        <Button variant="contained" type="submit" style={{ textDecoration: 'none' }}>
                            <Typography >Add New Event</Typography>
                            <AddIcon />
                        </Button>
                    </Link>
                </Box>
                <TableContainer component={Paper} sx={{ margin: "auto", width: 1000 }} elevation={0}>
                    <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" sx={{ fontWeight: "bold", fontSize: "15px" }}>Title</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events && events.map((u) => (
                                <TableRow
                                    key={u._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" align="left">
                                        <Link to={`/event/${u._id}`} style={{ textDecoration: "none", color: "black" }}>
                                            {u.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell component="th" align="right" sx={{ display: "flex" }} >
                                        <IconButton variant="contained" type="submit" onClick={() => handleDelete(u._id)} sx={{
                                            color: 'black', backgroundColor: "transparent", width: '5ch', marginBottom: 2, fontWeight: "bold", boxShadow: "none", '&:hover': {
                                                backgroundColor: 'transparent', boxShadow: "none"
                                            }, color: "#E74C3C"
                                        }}><DeleteIcon /></IconButton>
                                        <Link to={"/edit-event/" + u._id}>
                                            <IconButton variant="contained" type="submit" sx={{
                                                color: 'black', backgroundColor: "transparent", width: '5ch', marginBottom: 2, fontWeight: "bold", boxShadow: "none", '&:hover': {
                                                    backgroundColor: 'transparent', boxShadow: "none"
                                                }, color: "#82E0AA"
                                            }}>
                                                <EditIcon />
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

export default ManageEvents
