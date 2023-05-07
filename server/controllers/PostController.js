import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Post from "../models/PostModel.js";
import mongoose from "mongoose";
import { response } from "express";

const createPost = asyncHandler(async (req, res) => {
    try {
        const { title, description, image, user, location } = req.body;
        //validation
        if (!title || !description || !image ) {
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

        const newBlog = new Post({ title, description, image, user, location });
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
            message: "Error While Creting blog",
            error,
        });
    }
});

const getAllPosts = asyncHandler(async (req, res) => {
    try {
        const blogs = await Post.find().populate("user");
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
            message: "Error While Updating Blog",
            error,
        });
    }
});

const getSinglePost = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Post.findById(id).populate("comments.user");
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
            message: "Erorr While Deleteing BLog",
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

const addRating = asyncHandler(async (req, res) => {
    const { blogId, rating } = req.body;
    const userId = req.user._id;
    const blog = await Post.findById(blogId);
    if (!blog) {
        res.status(404).json({ message: 'Blog post not found' });
    } else {
        const existingRating = blog.ratings.find(r => r.user.toString() === userId.toString());
        if (existingRating) {
            existingRating.rating = rating;
        } else {
            blog.ratings.push({ user: userId, rating });
        }
        await blog.save();
        res.json(blog);
    }
});


const addComment = asyncHandler(async (req, res) => {
    const { blogId, text } = req.body;
    const userId = req.user._id;
    const blog = await Post.findById(blogId);
    if (!blog) {
        res.status(404).json({ message: 'Blog post not found' });
    } else {
        blog.comments.push({ user: userId, text });
        await blog.save();
        res.json(blog);
    }
});


const editComment = asyncHandler(async (req, res) => {
    const { blogId, text, id } = req.body;
    const userId = req.user._id;
    const blog = await Post.findById(blogId);
    if (!blog) {
        res.status(404).json({ message: 'Blog post not found' });
    } else {
        const existingComment = blog.comments.find(comment => comment._id.toString() === id.toString() && comment.user.toString() === userId.toString());
        if (existingComment) {
            existingComment.text = text;
            existingComment.date = Date.now();
            await blog.save();
            res.json(blog);
        }
    }
});


const deleteComment = asyncHandler(async (req, res) => {
    const { blogId, id } = req.body;
    const blog = await Post.findByIdAndUpdate(blogId, {
        $pull: { comments: { _id: id } }
    }, {
        new: true,
    });

    res.status(200).json({ updatedBlog: blog });
});

const likePost = asyncHandler(async (req, res) => {

    const postId = req.body.id;
    const userId = req.user._id;

    try {
        // Find the post by its ID
        const post = await Post.findById(postId);

        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
            // User has already liked the post, remove the like
            post.likes.pull(userId);
            post.isLiked = false;
        } else {
            // Add the user's ID to the likes array
            post.likes.push(userId);
            post.isLiked = true;
        }

        // Remove the user's ID from the disLikes array if present
        post.disLikes.pull(userId);
        post.isDisliked = false;


        // Save the updated post
        await post.save();

        // Return the updated post
        res.json({
            post,
            likes: post.likes.length,
            dislikes: post.disLikes.length,
        })
    } catch (error) {
        throw new Error(error.message);
    }
});

const dislikePost = asyncHandler(async (req, res) => {

    const postId = req.body.id;
    const userId = req.user._id;

    try {
        // Find the post by its ID
        const post = await Post.findById(postId);

        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
            // User has already liked the post, remove the like
            post.likes.pull(userId);
            post.isLiked = false;
        }

        // Check if the user has already disliked the post
        if (post.disLikes.includes(userId)) {
            // User has already disliked the post, remove the dislike
            post.disLikes.pull(userId);
            post.isDisliked = false;
        } else {
            // Add the user's ID to the disLikes array
            post.disLikes.push(userId);
            post.isDisliked = true;
        }

        // Save the updated post
        await post.save();

        // Return the updated post
        res.json({
            post,
            likes: post.likes.length,
            dislikes: post.disLikes.length,
        })
    } catch (error) {
        throw new Error(error.message);
    }
});

export default {
    createPost,
    getAllPosts,
    updatePost,
    getSinglePost,
    deletePost,
    getUserPost,
    addRating,
    addComment,
    editComment,
    deleteComment,
    likePost,
    dislikePost,
}