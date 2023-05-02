import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles'; 
import {Grid,Paper,Typography,ButtonBase,Button,Card,CardActionArea,CardContent,CardMedia} from "@mui/material"
import axios from "axios"

const DisplayHeritages=()=>{

    const[heritages,setHeritages] = useState([])
    const[startIndex,setStartIndex] = useState(0)

    const handleNextClick = () => {
      if (startIndex + 3 < heritages.length) {
        setStartIndex(startIndex + 3);
      }
    };
  
    const handlePreviousClick = () => {
      if (startIndex - 3 >= 0) {
        setStartIndex(startIndex - 3);
      }
    };

    useEffect(()=>{
        axios.get("http://localhost:7070/api/heritages/")
        .then(response=>{
            setHeritages(response.data)
            console.log(heritages)
        }).catch(error=>{
            console.log(error)
        })
        
    },[])

    return(
        <div>
          <div style={{display:'flex',justifyContent:'center'}}>
            {heritages.slice(startIndex,startIndex+3).map(heritage=>(
            
              <Card key={heritage._id} sx={{ maxWidth: 345, maxHeight: 500, mb: 5,margin:"1rem" }}>
              <Link to={`/api/heritage/${heritage._id}`} style={{textDecoration:"none",color:"black"}}>
                <CardActionArea>
                    <CardMedia component='img' image={heritage.image} height="200" />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                                      {heritage.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            <div dangerouslySetInnerHTML={{ __html: heritage.description.slice(0, 300) }} />
                            </Typography>
                              </CardContent>
                            </CardActionArea>
              </Link>
                    </Card>
            ))}
          </div>
          <div style={{display: 'flex',
                        justifyContent: 'center',
                        marginTop: '10px',}}>
            <Button onClick={handlePreviousClick} disabled={startIndex === 0}>Previous</Button>
            <Button onClick={handleNextClick} disabled={startIndex + 3 >= heritages.length}>Next</Button>
          </div>
        </div>
    )

}

export default DisplayHeritages;