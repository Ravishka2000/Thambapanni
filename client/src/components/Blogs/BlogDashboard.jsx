import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:7070/api/posts/all-posts");
      console.log("data", data);
      if (data?.success) {
        setBlogs(data?.blogs);
        console.log({data})
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", backgroundColor: "#eee", padding: "10px" }}>
            <Link to="/my-blog" style={{ padding: "10px", backgroundColor: "transparent", border: "none", fontSize: "16px", fontWeight: "bold", cursor: "pointer", color: "black", textDecoration: "none" }}>
                My Blogs
            </Link>
            <Link to="/create-blog" style={{ padding: "10px", backgroundColor: "transparent", border: "none", fontSize: "16px", fontWeight: "bold", cursor: "pointer", color: "black", textDecoration: "none" }}>
                Create New Blog
            </Link>
        </div>
        <br></br>
        {blogs && blogs.map(blog => (
            <BlogCard 
            id={blog?._id}
            isUser={JSON.parse(localStorage.getItem("user"))._id === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.firstName}
            time={blog.createdAt}
            />
        ))}
    </div>
  );
};

export default Blogs;