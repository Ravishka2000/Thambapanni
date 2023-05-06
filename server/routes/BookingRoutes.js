import express from "express";
import BookingControllers from "../controllers/BookingController.js";
import AuthMiddlewares from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post('/Add', AuthMiddlewares.authMiddleware, BookingControllers.createBooking);
router.get('/bookings', BookingControllers.getAllBookings);
router.put('/update/:id', BookingControllers.updateStatus);

export default router;