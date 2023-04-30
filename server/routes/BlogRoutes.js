import express from "express";
import AuthMiddlewares from "../middlewares/AuthMiddleware.js";
import BlogControllers from "../controllers/BlogController.js";

const router = express.Router();

router.post('/create', AuthMiddlewares.authMiddleware, BlogControllers.createBlog);
router.post('/rate', AuthMiddlewares.authMiddleware, BlogControllers.addRating);
router.post('/comment', AuthMiddlewares.authMiddleware, BlogControllers.addComment);
router.patch('/edit-comment', AuthMiddlewares.authMiddleware, BlogControllers.editComment);

export default router;