import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, InputLabel, Typography, TextField, Button } from "@mui/material";

const BlogDetails = () => {
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

  const handleChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.put(`http://localhost:7070/api/posts/update-post/${id}`, {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        });
        if (data?.success) {
          alert("Blog Updated");
          navigate("/my-blog");
        }
      } catch (error) {
        console.log(error);
      }
  };

    console.log(blog);
    
    return (
        <>
          <br />
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <Box
              width={"50%"}
              border={3}
              borderRadius={10}
              padding={3}
              margin="auto"
              boxShadow={"10px 10px 20px #ccc"}
              display="flex"
              flexDirection={"column"}
              marginTop="30px"
            >
              <Typography
                variant="h2"
                textAlign={"center"}
                fontWeight="bold"
                padding={3}
                color="gray"
              >
                Update Blog
              </Typography>
              <InputLabel
                sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
              >
                Title
              </InputLabel>
              <TextField
                name="title"
                value={inputs.title}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <InputLabel
                sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
              >
                Description
              </InputLabel>
              <TextField
                name="description"
                value={inputs.description}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                multiline
                rows={6}
                rowsMax={12}
                required
              />
              <InputLabel
                sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
              >
                Image URL
              </InputLabel>
              <TextField
                name="image"
                value={inputs.image}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <Button type="submit" color="warning" variant="contained">
                UPDATE
              </Button>
            </Box>
          </form>
        </>
      );
    };

export default BlogDetails