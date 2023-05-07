import express from "express";
import AuthMiddlewares from "../middlewares/AuthMiddleware.js";
import PostControllers from "../controllers/PostController.js";

const router = express.Router();

// GET || all blogs
router.get("/all-posts", PostControllers.getAllPosts);

//POST || create blog
router.post("/create-post", PostControllers.createPost);

//PUT || update blog
router.put("/update-post/:id", PostControllers.updatePost);

//GET || SIngle Blog Details
router.get("/get-post/:id", PostControllers.getSinglePost);

//DELETE || delete blog
router.delete("/delete-post/:id", PostControllers.deletePost);

//GET || user blog
router.get("/user-post/:id", PostControllers.getUserPost);

router.post('/rate', AuthMiddlewares.authMiddleware, PostControllers.addRating);
router.post('/comment', AuthMiddlewares.authMiddleware, PostControllers.addComment);
router.patch('/edit-comment', AuthMiddlewares.authMiddleware, PostControllers.editComment);
router.patch('/like', AuthMiddlewares.authMiddleware, PostControllers.likePost);
router.patch('/dislike', AuthMiddlewares.authMiddleware, PostControllers.dislikePost);
router.delete('/delete-comment', AuthMiddlewares.authMiddleware, PostControllers.deleteComment);


export default router;