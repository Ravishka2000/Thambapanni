import { Container,Box,Typography,Chip,Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios"

const DisplayABlog = ()=>{
    const [blog, setBlog] = useState({});
    const id = useParams().id;
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        image: "",
      });
    const navigate = useNavigate();
    // get blog details
    const getBlogDetail = async () => {
      try {
        const { data } = await axios.get(`http://localhost:7070/api/posts/get-post/${id}`);
        if (data?.success) {
          setBlog(data?.blog);
          setInputs({
            title: data?.blog.title,
            description: data?.blog.description,
            image: data?.blog.image,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getBlogDetail();
    }, [id]); 
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return(
        <div>
            <div style={{backgroundColor:"#FAF9F6"}}>
                <section>
                <Container maxWidth="md">
                <Box py={10}> 
                    <Box textAlign="center" mb={5}>
                    <Container maxWidth="sm">
                        <Box my={4}>
                        <Typography  component="span" color=" #313639" sx={{fontSize:"12px"}}>{new Date(blog.createdAt).toLocaleDateString('en-US', options)} </Typography>
                        <Typography variant="h3" component="h2">
                            <Typography variant="h3" component="span" color=" #313639" sx={{textTransform:"capitalize"}}>{blog.title} </Typography>
                        </Typography>
                        {/* <Typography  component="span" color=" #313639" sx={{fontSize:"15px",fontStyle:"italic"}}>{heritage.location} </Typography> */}
                        </Box>
                    </Container>
                    </Box>
                    <Box>
                    <Box my={4} sx={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                        <img src={blog.image} alt=""  sx={{ maxWidth: '100%'}}/>
                    </Box>
                    <Typography variant="subtitle1" color="textSecondary" paragraph={true} >
                    <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                    </Typography>
                    </Box>
                </Box>
                </Container>
            </section>      
        </div>
        </div>
    )

}

export default DisplayABlog;