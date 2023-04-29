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

export default {
    createBlog,
}