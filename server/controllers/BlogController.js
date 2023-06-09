import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Blog from "../models/BlogModel.js";

const createBlog = asyncHandler(async (req, res) => {
    const { title, description, category, location } = req.body;
    const author = req.user._id;
    const blog = new Blog({
        title,
        author,
        description,
        category,
        location
    });
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
});


const addRating = asyncHandler(async (req, res) => {
    const { blogId, rating } = req.body;
    const userId = req.user._id;
    const blog = await Blog.findById(blogId);
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
    const blog = await Blog.findById(blogId);
    if (!blog) {
        res.status(404).json({ message: 'Blog post not found' });
    } else {
        blog.comments.push({ user: userId, text });
        await blog.save();
        res.json(blog);
    }
});


const editComment = asyncHandler (async (req, res) => {
    const { blogId, text, id } = req.body;
    const userId =  req.user._id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
        res.status(404).json({ message: 'Blog post not found' });
    }else{
        const existingComment = blog.comments.find(comment => comment._id.toString() === id.toString() && comment.user.toString() === userId.toString());
        if (existingComment) {
            existingComment.text = text;
            existingComment.date = Date.now();
            await blog.save();
            res.json(blog);
        }
    }
});


const deleteComment = asyncHandler (async (req, res) => {
    const { blogId, id } = req.body;
    const blog = await Blog.findByIdAndUpdate(blogId, {
        $pull: { comments: { _id: id }}
    }, {
        new: true,
    });
    
    res.status(200).json({updatedBlog: blog});
});

export default {
    createBlog,
    addRating,
    addComment,
    editComment,
    deleteComment,
}