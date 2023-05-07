import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function BlogCard({
    title,
    description,
    image,
    username,
    time,
    id,
    isUser,
}) {

    const { user } = useAuthContext();
    const [isLiked, setIsLiked] = useState();
    const [isDisliked, setIsDisliked] = useState();

    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/blog-details/${id}`);
    };

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:7070/api/posts/delete-post/${id}`);
            if (data?.success) {
                alert("Blog Deleted");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

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

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return (

        <Card
            sx={{
                width: "40%",
                margin: "auto",
                mt: 2,
                padding: 2,
                boxShadow: "5px 5px 10px #ccc",
                ":hover:": {
                    boxShadow: "10px 10px 20px #ccc",
                },
            }}
        >
            {isUser && (
                <Box display={"flex"}>
                    <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                        <ModeEditIcon color="info" />
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Box>
            )}

            <Link to={`/a_blog/${id}`} style={{ textDecoration: "none", color: "black" }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }}>
                            {username}
                        </Avatar>
                    }
                    title={username}
                    subheader={new Date(time).toLocaleDateString('en-US', options)}
                />
                <CardMedia component="img" height="194" image={image} />
            </Link>
            <CardContent>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <IconButton onClick={handleLikeButton} style={{
                        color: isLiked ? 'blue' : 'inherit',
                        transition: 'color 0.5s ease',
                    }}>
                        {isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltOutlinedIcon />}
                    </IconButton>

                    <IconButton onClick={handleDislikeButton} style={{
                        color: isDisliked ? 'primary' : 'inherit',
                        transition: 'color 0.5s ease',
                    }}>
                        {isDisliked ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
                    </IconButton>
                </Box>
                <Typography variant="h6" color="text.secondary">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>

    );
}
