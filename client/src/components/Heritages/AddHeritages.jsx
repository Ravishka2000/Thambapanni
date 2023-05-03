import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Box,Grid,TextField,Button,Alert} from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from "axios"


const CreateHeritage=()=>{

    const[title,setTitle] = useState("")
    const[description,setDescription] = useState("")
    const[location,setLocation]= useState("")
    const[error,setError]=useState("")
    const[image,setImage] = useState("")
    const [imageUrl, setImageUrl] = useState('');

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
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(image)
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('image', image);
        console.log(formData.get('image'))
      
        axios.post('http://localhost:7070/api/heritages/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      };

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
                            onChange={handleImageChange} 
                            style={{ width: '100%',color:'black' }}
                        />
                        {imageUrl && (
                        <img
                        src={imageUrl}
                        alt="Uploaded image"
                        style={{ width: '50%', height: 'auto' }}
                        />
                    )}
                        
                    </Grid>

                   
                    </div>
                    <Grid item xs={12}
                    style={{ padding:" 1rem 2rem"}}>
                        <Button variant="contained" type="submit"
                        sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '45ch', padding:"1rem", fontWeight:"bold"}}
                        >Create</Button>

                    </Grid>
                    {error && <Alert variant="filled" severity="error" style={{fontWeight:"bold",color: "#063970"}}>{error}</Alert>}
                    </Grid>
                   

                
            </Box>

        </div>
    )
}

export default CreateHeritage;