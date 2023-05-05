import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Booking from "../models/BookingModel.js";
import uniqid from "uniqid";

const createBooking = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { name, email, phone, tourDate, tourLocation, groupSize, specialRequirements, guideId } = req.body;
  
    console.log(req.user);
    // Find the guide(user) with the given ID
    const guide = await User.findById(guideId);
  
    if (!guide) {
      res.status(404);
      throw new Error("Guide not found");
    }
  
    // Create a new booking
    const booking = new Booking({
      name,
      email,
      phone,
      tourDate,
      tourLocation,
      groupSize,
      specialRequirements,
      paymentIntent: {
        id: uniqid(),
        method: "PayPal",
        amount: "4.00",
        status: "Pending",
        created: Date.now(),
        currency: "USD",
    },
      status: "Pending",
      Customer: _id,
      guide, // Store the guide's ID in the booking
    });
  
    // Save the booking to the database
    const savedBooking = await booking.save();
  
    // Send a response with the saved booking data
    res.status(201).json(savedBooking);
  });

const getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find();
  
    res.json(bookings);
});


export default {
    createBooking,
    getAllBookings,
}