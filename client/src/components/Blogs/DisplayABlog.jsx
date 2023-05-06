import { Container,Box,Typography,Chip,Avatar, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios"
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useAuthContext } from '../../hooks/useAuthContext';


const DisplayABlog = ()=>{
    const [blog, setBlog] = useState({});
    const [likes, setLikes] = useState([]);
    const [disLikes, setDislikes] = useState([]);
    const [isLiked, setIsLiked] = useState();
    const [isDisliked, setIsDisliked] = useState();

    const id = useParams().id;
    const { user } = useAuthContext();
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
        console.log(data);
        if (data?.success) {
          setBlog(data?.blog);
          setInputs({
            title: data?.blog.title,
            description: data?.blog.description,
            image: data?.blog.image,
            location: data?.blog.location,
          });
          setLikes(data.blog.likes);
          setDislikes(data.blog.disLikes);
          setIsDisliked(data.blog.isDisliked);
          setIsLiked(data.blog.isLiked);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getBlogDetail();
    },[isLiked]); 
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const handleLikeButton = async () => {
      try {
          const response = await axios.patch('http://localhost:7070/api/posts/like', { id }, {
              headers: {
                  'Authorization': `Bearer ${user.token}`
              }
          });
          setIsLiked(response.data.post.isLiked);
          setIsDisliked(response.data.post.isDisliked);
          console.log(response);
      } catch (error) {
          console.log(error);
      }
  }

  const handleDislikeButton = async () => {
      try {
          const response = await axios.patch('http://localhost:7070/api/posts/dislike', { id }, {
              headers: {
                  'Authorization': `Bearer ${user.token}`
              }
          });
          setIsLiked(response.data.post.isLiked);
          setIsDisliked(response.data.post.isDisliked);
          console.log(response);
      } catch (error) {
          console.log(error);
      }
  }

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
                    <Box display={'flex'} justifyContent={'space-between'}>
                      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>

                    <IconButton onClick={handleLikeButton} style={{
                        color: isLiked ? 'blue' : 'inherit',
                        transition: 'color 0.5s ease',
                    }}>
                        {isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltOutlinedIcon />}
                    </IconButton>
                    <Typography fontSize={20} fontWeight={800} ml={1}>{likes.length}</Typography>
                      </Box>
                      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton onClick={handleDislikeButton} style={{
                        color: isDisliked ? 'primary' : 'inherit',
                        transition: 'color 0.5s ease',
                    }}>
                        {isDisliked ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
                    </IconButton>
                    <Typography fontSize={20} fontWeight={800} ml={1}>{disLikes ? disLikes.length : 0}</Typography>
                    </Box>
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