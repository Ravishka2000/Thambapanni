import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.get(`http://localhost:7070/api/posts/user-post/${user._id}`);
      console.log("data", data);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getUserBlogs();
  }, []);
  
  console.log(blogs);
  return (
    <div>
        <br></br>
        <br></br>
        <br></br>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog?._id}
            isUser={true}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.firstName}
            time={blog?.createdAt}
          />
        ))
      ) : (
        <h1>You Havent Created a blog</h1>
      )}
    </div>
  );
};

export default UserBlogs;
