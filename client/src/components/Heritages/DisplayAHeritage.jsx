import { Container,Box,Typography,Chip,Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import ReactQuill from "react-quill"

const DisplayAHeritage = ()=>{
    const[heritage,setHeritage] = useState("")
    const id = useParams().id
    useEffect(()=>{
        axios.get("http://localhost:7070/api/heritages/"+id)
        .then(response=>{
            setHeritage(response.data)
        }).catch(error=>{
            console.log(error)
        })
    },[])
    return(
        <div style={{backgroundColor:"#FAF9F6"}}>
            <section>
        <Container maxWidth="md">
          <Box py={10}>
            <Box textAlign="center" mb={5}>
              <Container maxWidth="sm">
                {/* <Chip color="primary" label={heritage.createdAt} /> */}
                <Box my={4}>
                  <Typography variant="h3" component="h2">
                    <Typography variant="h3" component="span" color=" #313639" sx={{textTransform:"capitalize"}}>{heritage.title} </Typography>
                  </Typography>
                </Box>
              </Container>
            </Box>
            <Box>
              <Box my={4} sx={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <img src={heritage.image} alt=""  sx={{ maxWidth: '100%'}}/>
              </Box>
              <Typography variant="subtitle1" color="textSecondary" paragraph={true} >
              <div dangerouslySetInnerHTML={{ __html: heritage.description }} />
              </Typography>
            </Box>
          </Box>
        </Container>
    </section>      
        </div>
    )




}

export default DisplayAHeritage;