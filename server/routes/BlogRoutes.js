import express from "express";
import AuthMiddlewares from "../middlewares/AuthMiddleware.js";
import BlogControllers from "../controllers/BlogController.js";

const router = express.Router();

router.post('/create', AuthMiddlewares.authMiddleware, BlogControllers.createBlog);
router.post('/rate', AuthMiddlewares.authMiddleware, BlogControllers.addRating);

export default router;