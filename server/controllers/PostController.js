import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Post from "../models/PostModel.js";
import mongoose from "mongoose";

const createPost = asyncHandler(async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        //validation
        if (!title || !description || !image) {
          return res.status(400).send({
            success: false,
            message: "Please Provide ALl Fields",
          });
        }

        const exisitingUser = await User.findById(user);
        //validaton
        if (!exisitingUser) {
          return res.status(404).send({
            success: false,
            message: "unable to find user",
          });
        }
    
        const newBlog = new Post({ title, description, image, user});
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        exisitingUser.blogs.push(newBlog);
        await exisitingUser.save({ session });
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
          success: true,
          message: "Blog Created!",
          newBlog,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "Error WHile Creting blog",
          error,
        });
      }
    });

const getAllPosts = asyncHandler(async (req, res) => {
    try {
      const blogs = await Post.find({})
      if (!blogs) {
        return res.status(200).send({
          success: false,
          message: "No Blogs Found",
        });
      }
      return res.status(200).send({
        success: true,
        BlogCount: blogs.length,
        message: "All Blogs lists",
        blogs,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error WHile Getting Blogs",
        error,
      });
    }
  });

const updatePost = asyncHandler(async (req, res) => { 
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const blog = await Post.findByIdAndUpdate(
          id,
          { ...req.body },
          { new: true }
        );
        return res.status(200).send({
          success: true,
          message: "Blog Updated!",
          blog,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "Error WHile Updating Blog",
          error,
        });
      }
    });   
    
const getSinglePost = asyncHandler(async (req, res) => { 
    try {
        const { id } = req.params;
        const blog = await Post.findById(id);
        if (!blog) {
          return res.status(404).send({
            success: false,
            message: "blog not found with this id",
          });
        }
        return res.status(200).send({
          success: true,
          message: "fetch single blog",
          blog,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "error while getting single blog",
          error,
        });
      }
    });

const deletePost = asyncHandler(async (req, res) => { 
    try {
      const blog = await Post
        // .findOneAndDelete(req.params.id)
        .findByIdAndDelete(req.params.id)
        .populate("user");
      await blog.user.blogs.pull(blog);
      await blog.user.save();
      return res.status(200).send({
        success: true,
        message: "Blog Deleted!",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Erorr WHile Deleteing BLog",
        error,
      });
    }
  });

//GET USER BLOG
const getUserPost = asyncHandler(async (req, res) => {
  try {
    const userBlog = await User.findById(req.params.id).populate("blogs");

    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blogs not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      error,
    });
  }
});

  export default {
    createPost,
    getAllPosts,
    updatePost,
    getSinglePost,
    deletePost,
    getUserPost,
}