import axios from "axios"
import { useState,useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Box,Grid,TextField,Button,Alert} from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useParams } from "react-router-dom";

const EditHeritage=()=>{

    const id = useParams().id
    const[title,setTitle] = useState("")
    const[description,setDescription] = useState("")
    const[location,setLocation]= useState("")
    const[error,setError]=useState("")
    const[image,setImage] = useState("")

    useEffect(()=>{
        axios.get("http://localhost:7070/api/heritages/"+id)
        .then(response=>{
            setTitle(response.data.title)
            setLocation(response.data.location)
            setImage(response.data.image)
            setDescription(response.data.description)
        }).catch(error=>{
            console.log(error)
        })
    },[])

    const handleChange = (value) => {
        setDescription(value);
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };
    

    const handleSubmit= async (e) =>{
        e.preventDefault()
        const data = {
            title,
            description,
            location,
            image
        }
        axios.patch("http://localhost:7070/api/heritages/"+id,data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response=>{
            console.log(response)
        }).catch(error=>{
            console.log(error)
            
        })


    }

    return( 
        <div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                    flexDirection: { xs: "column", sm: "row" },
                    padding:"2",
                    marginTop:"50px"
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
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
                    style={{padding:" 1rem 2rem"}}
                    >
                        <Box 
                        textAlign="left">
                        <h1>
                        Add Heritage
                        </h1>
                        </Box>
                    </Grid>
                    <Grid item xs={12}
                    style={{ padding:" 1rem 2rem"}}>
                    <TextField
                            label="Title"
                            variant="standard"
                            focused
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            style={{ width: '100%',color:'black' }}
                    />
                    </Grid>
                    <Grid item xs={12}
                    style={{ padding:" 1rem 2rem"}}>
                    <TextField
                    
                            label="Location"
                            variant="standard"
                            focused
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                            style={{ width: '100%',color:'black' }}
                    />
                    </Grid>
                    <Grid item xs={12}
                    style={{ padding:" 1rem 2rem"}}>
                    <ReactQuill
                        onChange={handleChange}
                        value={description}
                        style={{ height: '300px',padding:" 1rem 0" }}
                        />
                    </Grid>

                    <Grid item xs={12}
                    style={{ padding:"2rem 2rem",display:"flex",flexDirection:"column"}}>
                        <label style={{ padding:" 1rem 0"}}>
                            Image
                        </label>

                        <input type="file" name="image" 
                            onChange={(e)=> handleImageChange(e)} 
                            style={{ width: '100%',color:'black' }}
                        />
                        
                        {image && <img src={image} style={{ width: '50%', height: '500px', objectFit: 'cover', padding:" 1rem 0" }} />}
                    </Grid>

                   
                    </div>
                    <Grid item xs={12}
                    style={{ padding:" 1rem 2rem"}}>
                        <Button variant="contained" type="submit"
                        sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '45ch', padding:"1rem", fontWeight:"bold"}}
                        >Edit</Button>
                    </Grid>
                    {error && <Alert variant="filled" severity="error" style={{fontWeight:"bold",color: "#063970"}}>{error}</Alert>}
                    </Grid>
                   

                
            </Box>

        </div>
    )




}

export default EditHeritage