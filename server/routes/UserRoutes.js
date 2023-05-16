import express from "express";
import UserControllers from "../controllers/UserController.js";
import AuthMiddlewares from "../middlewares/AuthMiddleware.js";
import multer from "multer";
import User from "../models/UserModel.js"

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./client/public/uploads");
    },
    flename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})
const upload = multer({storage: storage});

const router = express.Router();

router.post('/register', UserControllers.createUser);
router.put('/password', AuthMiddlewares.authMiddleware, UserControllers.updatePassword);
router.post('/forgot-password-token', UserControllers.forgotPasswordToken);
router.put('/reset-password/:token', UserControllers.resetPassword);
router.post('/login', UserControllers.loginUser);
router.post('/admin-login', UserControllers.loginAdmin);
router.post('/guide-login', UserControllers.loginGuide);
router.get('/all-users', UserControllers.getAllUsers);
router.get('/all-guides', UserControllers.getAllGuides);
router.get('/refresh', UserControllers.handleRefreshToken);
router.get('/logout', UserControllers.logout);
router.get('/:id', UserControllers.getUser);
router.delete('/:id', UserControllers.deleteUser);
router.put('/update-user', AuthMiddlewares.authMiddleware, UserControllers.updateUser);
router.put('/update-guide', AuthMiddlewares.authMiddleware, UserControllers.updateGuide);
router.put('/save-address', AuthMiddlewares.authMiddleware, UserControllers.saveAddress);

export default router;