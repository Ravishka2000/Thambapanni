import asyncHandler from "express-async-handler";
import Event from "../models/EventModel.js";

const getAllEvents = asyncHandler (async (req, res) => {
    const events =  await Event.find().populate("organizer");
    res.status(200).json(events);
});

const createEvent = asyncHandler (async (req, res) => {
    const { name, description, date, location, organizer } = req.body;
    try {
        const event = await Event.create({ name, description, date, location, organizer });
        res.status(200).json(event);
    } catch (error) {
        console.log(error);
    }
});

export default {
    getAllEvents,
    createEvent,
}