import { useState } from 'react';
import ReactQuill from 'react-quill';
import { Grid, TextField, Button, Alert, Container, Typography } from "@mui/material"
import Box from '@mui/system/Box';
import axios from "axios"
import React from 'react';

const CreateHeritage = () => {


    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [organizer, setOrganizer] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState('');

    const handleChange = (value) => {
        setDescription(value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const eventData = {
            name,
            description,
            location,
            date,
            organizer
        }

        axios.post('http://localhost:7070/api/events/', eventData)
            .then(response => {
                console.log(response.data);
                setSuccess('Event is created successfully')
            })
            .catch(error => {
                setError(error.response.data.error);
            });
    };

    return (
        <div style={{ backgroundColor: "#FAF9F6" }}>
            <section>
                <Container maxWidth="md">
                    <Box py={10}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '100%' },
                                flexDirection: { xs: "column", sm: "row" },
                                padding: "2",

                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                            textAlign="center"
                            mb={5}
                        >
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="left"
                                justifyContent="left"
                            >
                                <div>
                                    <Grid item xs={12}
                                        style={{ padding: "1rem 0" }}>
                                        <Typography variant="h4" component="span" color=" #313639" sx={{ textTransform: "capitalize" }}>Add New Event </Typography>
                                    </Grid>
                                    <Container>
                                        <Box my={4}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    focused
                                                    variant="outlined"
                                                    onChange={(e) => setName(e.target.value)}
                                                    value={name}
                                                    InputProps={{
                                                        style: {
                                                            color: '#313639',
                                                            fontSize: '2.5rem',
                                                            outline: 'none',
                                                            whiteSpace: 'pre-wrap',
                                                            wordWrap: 'break-word',
                                                            textAlign: 'center',
                                                        },
                                                        wrap: 'soft'
                                                    }}
                                                    multiline
                                                    helperText="Enter the Name of your Event"
                                                    style={{ margin: "0" }}
                                                />
                                            </Grid>
                                        </Box>
                                    </Container>

                                    <Container>
                                        <Box my={4}>
                                            <Grid item xs={12}
                                            >
                                                <TextField
                                                    focused
                                                    variant="outlined"
                                                    onChange={(e) => setLocation(e.target.value)}
                                                    value={location}
                                                    InputProps={{
                                                        style: {
                                                            color: '#313639',
                                                            fontSize: '1.25rem',
                                                            outline: 'none',
                                                        },

                                                    }}
                                                    multiline
                                                    helperText="Enter the location of your destination"
                                                    style={{ margin: "0" }}
                                                />
                                            </Grid>
                                        </Box>
                                    </Container>
                                    <Container>
                                        <Box my={4}>
                                            <Grid item xs={12}
                                            >
                                                <TextField
                                                    focused
                                                    variant="outlined"
                                                    onChange={(e) => setDate(e.target.value)}
                                                    value={date}
                                                    InputProps={{
                                                        style: {
                                                            color: '#313639',
                                                            fontSize: '1.25rem',
                                                            outline: 'none',
                                                        },

                                                    }}
                                                    multiline
                                                    helperText="Enter the Date"
                                                    style={{ margin: "0" }}
                                                />
                                            </Grid>
                                        </Box>
                                    </Container>

                                    <Container>
                                        <Box my={4}>
                                            <Grid item xs={12}
                                            >
                                                <TextField
                                                    focused
                                                    variant="outlined"
                                                    onChange={(e) => setOrganizer(e.target.value)}
                                                    value={organizer}
                                                    InputProps={{
                                                        style: {
                                                            color: '#313639',
                                                            fontSize: '1.25rem',
                                                            outline: 'none',
                                                        },

                                                    }}
                                                    multiline
                                                    helperText="Enter the Organizer"
                                                    style={{ margin: "0" }}
                                                />
                                            </Grid>
                                        </Box>
                                    </Container>

                                    <Grid item xs={12} style={{ padding: "0 1.5rem " }}>
                                        <ReactQuill
                                            onChange={handleChange}
                                            value={description}
                                            style={{ height: '500px' }}
                                        />
                                    </Grid>

                                </div>
                                <Grid item xs={12}
                                    style={{ marginTop: "4rem", }}>
                                    <Button variant="contained" type="submit"
                                        sx={{ color: 'black', backgroundColor: "#F8C471", width: '30ch', padding: "1rem", fontWeight: "bold", '&:hover': { background: '#F8C471', boxShadow: "none" }, boxShadow: "none" }}
                                    >Create</Button>

                                </Grid>
                                <div style={{ paddingTop: "20px" }}>
                                    {error && <Alert variant="outlined" severity="error" style={{ width: "250px", margin: "auto" }}>{error}</Alert>}
                                    {success && <Alert variant="outlined" severity="success" style={{ width: "250px", margin: "auto" }}>{success}</Alert>}
                                </div>
                            </Grid>

                        </Box>
                    </Box>
                </Container>
            </section>
        </div>
    )
}

export default CreateHeritage;