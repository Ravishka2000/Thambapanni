import axios from "axios"
import { useState,useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Grid,TextField,Button,Alert,Container,Typography,IconButton} from "@mui/material"
import Box from '@mui/system/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAuthContext } from '../../hooks/useAuthContext';

import { useParams } from "react-router-dom";

const EditHeritage=()=>{

    const id = useParams().id
    const { user } = useAuthContext()
    const[title,setTitle] = useState("")
    const[description,setDescription] = useState("")
    const[location,setLocation]= useState("")
    const[error,setError]=useState("")
    const[image,setImage] = useState("")
    const [imageUrl, setImageUrl] = useState('');
    const[success,setSuccess] = useState('');

    useEffect(()=>{
        axios.get("http://localhost:7070/api/heritages/"+id)
        .then(response=>{
            setTitle(response.data.title)
            setLocation(response.data.location)
            setImage(response.data.image)
            setDescription(response.data.description)
            setImageUrl(response.data.image)
        }).catch(error=>{
            console.log(error)
        })
    },[])

    const handleChange = (value) => {
        setDescription(value);
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          setImage(file);
          setImageUrl(URL.createObjectURL(file));
        }
    };
    

    const handleSubmit= async (e) =>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('image', image);
        console.log(formData.get('image'))

        axios.patch("http://localhost:7070/api/heritages/"+id,formData,{
            headers: {
                
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(response=>{
            console.log(response)
            setSuccess("Heritage is updated successfully")
        }).catch(error=>{
            setError(error.response.data.error)
            
        })


    }

    return( 
        <div style={{backgroundColor:"#FAF9F6"}}>
         <section>
         <Container maxWidth="md">
         <Box py={10}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                    flexDirection: { xs: "column", sm: "row" },
                    padding:"2",
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
                    style={{padding:"1rem 0"}}>
                    <Typography variant="h4" component="span" color=" #313639" sx={{textTransform:"capitalize"}}>Edit Heritage </Typography>
                    </Grid>

                    <Container>
                    <Box>
                    <Grid item xs={12}>
                    <TextField    
                        focused  
                        variant="outlined"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}  
                        InputProps={{
                                style: {
                                  color: '#313639',
                                  fontSize: '2.5rem',
                                  outline: 'none',
                                  whiteSpace: 'pre-wrap', 
                                  wordWrap: 'break-word',
                                  textAlign:'center',
                                },
                                wrap: 'soft'
                        }}
                        multiline
                        helperText="Enter the title of your article"
                        style={{margin:"0"}}
                    />
                    </Grid>
                    </Box>
                    </Container>

                    <Grid item xs={12}
                    style={{padding:"0 1.5rem "}}
                    >
                    <Box>
                      <Box my={4} sx={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                      <input type="file" name="image" 
                              onChange={handleImageChange} 
                              style={{ display: 'none' }}
                              id="image"     
                                
                      />
                      <label htmlFor="image">
                        <IconButton component="span"  style={{ display: 'flex', justifyContent: 'flex-start' ,backgroundColor:"none" ,'&:hover': {background: 'white'},width:"2.5rem"}} >
                          <CloudUploadIcon />
                        </IconButton>
                        <Typography style={{textAlign:"left",color:" #313639",fontSize:"12px",padding:"5px"}}>Upload your image</Typography>
                      </label>
                      {imageUrl && (
                        <img
                        src={imageUrl}
                        alt="Uploaded image"
                        style={{ maxWidth:"100%"}}
                        />)}
                      </Box>
                    </Box>
                    </Grid>
                    
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
                        style={{margin:"0"}}
                    />
                    </Grid>
                    </Box>
                    </Container>

                    <Grid item xs={12} style={{padding:"0 1.5rem "}}>
                    <ReactQuill
                        onChange={handleChange}
                        value={description}
                        style={{ height: '500px'}}
                        />
                    </Grid>
                    </div>
                    <Grid item xs={12}
                    style={{ marginTop:"4rem",}}>
                        <Button variant="contained" type="submit"
                        sx={{ color: 'black', backgroundColor: "#F8C471", width: '30ch', padding:"1rem", fontWeight:"bold",'&:hover': {background: '#F8C471',boxShadow:"none"},boxShadow:"none"}}
                        >Edit</Button>

                    </Grid>
                    <div style={{paddingTop:"20px"}}>
                    {error && <Alert variant="outlined" severity="error" style={{width:"250px",margin:"auto"}}>{error}</Alert>}
                    {success && <Alert variant="outlined" severity="success" style={{width:"250px",margin:"auto"}}>{success}</Alert>}
                    </div>
                    </Grid>
                   

                
            </Box>
        </Box>
        </Container>
        </section>
        </div>
    )




}

export default EditHeritage