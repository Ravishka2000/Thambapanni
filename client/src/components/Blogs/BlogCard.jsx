import * as React from "react";
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
import axios from "axios"

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {

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

  <Link to={`/a_blog/${id}`} style={{textDecoration:"none",color:"black"}}>
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
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      </Link>
    </Card>
    
  );
}
