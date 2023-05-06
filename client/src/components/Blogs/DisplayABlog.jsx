import { Container, Box, Typography, Grid, Avatar, IconButton, Rating, TextField, Button, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useAuthContext } from '../../hooks/useAuthContext';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const DisplayABlog = () => {
    const { user } = useAuthContext();
    const [blog, setBlog] = useState({});
    const [likes, setLikes] = useState([]);
    const [disLikes, setDislikes] = useState([]);
    const [isLiked, setIsLiked] = useState();
    const [isDisliked, setIsDisliked] = useState();
    const [blogId, setBlogId] = useState('');
    const [rating, setrating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [edit, setEdit] = useState(false);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleRatingSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:7070/api/posts/rate', { blogId, rating },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                });
            console.log(response);
        } catch (err) {
            setError('Error adding rating');
        }
    };

    const handleCommentSubmit = async () => {
        try {
            await axios.post('http://localhost:7070/api/posts/comment', { blogId, text: comment },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                });
            setComment('');
            setError('');
        } catch (err) {
            setError('Error adding comment');
        }
    };

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
                setBlogId(data.blog._id);
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
    }, [isLiked]);
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

    const handleEditIcon = () => {
        setEdit(true);
    }

    return (
        <Box>
            <Box style={{ backgroundColor: "#FAF9F6" }}>
                <section>
                    <Container maxWidth="md">
                        <Box py={10}>
                            <Box textAlign="center" mb={5}>
                                <Container maxWidth="sm">
                                    <Box my={4}>
                                        <Typography component="span" color=" #313639" sx={{ fontSize: "12px" }}>{new Date(blog.createdAt).toLocaleDateString('en-US', options)} </Typography>
                                        <Typography variant="h3" component="h2">
                                            <Typography variant="h3" component="span" color=" #313639" sx={{ textTransform: "capitalize" }}>{blog.title} </Typography>
                                        </Typography>
                                    </Box>
                                </Container>
                            </Box>
                            <Box>
                                <Box my={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <img src={blog.image} alt="" />
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
                                    <Box dangerouslySetInnerHTML={{ __html: blog.description }} />
                                </Typography>
                            </Box>
                        </Box>
                    </Container>
                </section>
            </Box>
            <Box display="flex" px={30}>
                <Box width="50%" pr={2} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h6">Rate this Place</Typography>
                    <Rating
                        name="rating"
                        value={rating}
                        sx={{ fontSize: "65px", my: 2 }}
                        onChange={(event, newValue) => {
                            setrating(newValue);
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={handleRatingSubmit} sx={{ width: '50%' }}>
                        Submit Rating
                    </Button>
                </Box>
                <Box width="50%" pl={2}>
                    <Typography variant="h6">Add your comment</Typography>
                    <TextField
                        value={comment}
                        onChange={handleCommentChange}
                        label="Comment"
                        variant="outlined"
                        multiline
                        rows={2}
                        fullWidth
                        sx={{ my: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
                        Submit Comment
                    </Button>
                </Box>
            </Box>

            <Grid xs={12} mt={10}>
                <Container>
                    <Typography variant='h4' fontWeight={700} mb={3}>User Reviews</Typography>
                    {blog.comments && blog.comments.map((comment) => (
                        <>
                            {comment.user && (
                                <Card variant='outlined' sx={{ my: "40px", p: "10px" }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }} mb={3} justifyContent={'space-between'}>

                                            <Box display={'flex'} alignItems={'center'}>
                                                <IconButton sx={{ p: 0, marginRight: "10px" }}>
                                                    <Avatar alt={comment.user.firstName} />
                                                </IconButton>
                                                <Typography>{comment.user.firstName} {comment.user.lastName}</Typography>
                                            </Box>
                                            <Box>
                                                {comment.user._id == user._id && (
                                                    <Box>
                                                        <IconButton onClick={handleEditIcon}>
                                                            <ModeEditIcon />
                                                        </IconButton>
                                                        <IconButton>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                        {edit ? (
                                            <TextField value={comment.text}></TextField>
                                        ) : (
                                            <Typography>{comment.text}</Typography>

                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </>
                    ))}
                </Container>
            </Grid>

        </Box>
    )

}

export default DisplayABlog;