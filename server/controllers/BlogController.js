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

export default {
    createBlog,
    addRating,
}