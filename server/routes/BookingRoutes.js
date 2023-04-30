import express from "express";
import AuthMiddlewares from "../middlewares/AuthMiddleware.js";
import BookingControllers from "../controllers/BookingController.js";

const router = express.Router();

router.post('/Add', BookingControllers.createBooking);


export default router;