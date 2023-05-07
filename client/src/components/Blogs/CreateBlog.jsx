import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBlog = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:7070/api/posts/create-post", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: user._id
      });
      if (data?.success) {
        alert("Blog Created");
        navigate("/my-blog");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <form className="create-blog" onSubmit={handleSubmit}>
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
            Create A Blog
          </Typography>
          <label htmlFor="title" id="title-label">Title</label>
          <TextField
            id="title"
            name="title"
            aria-labelledby="title-label"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <label htmlFor="description" id="description-label">Description</label>
          <TextField
            id="description"
            name="description"
            aria-labelledby="description-label"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            multiline
            rows={6}
            rowsMax={12}
            required
          />
          <label htmlFor="image" id="image-label">Image URL</label>
          <TextField
            id="image"
            name="image"
            aria-labelledby="image-label"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" color="primary" variant="contained">
            SUBMIT
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
