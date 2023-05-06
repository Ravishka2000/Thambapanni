import asyncHandler from "express-async-handler";
import Event from "../models/EventModel.js";

const getAllEvents = asyncHandler (async (req, res) => {
    const events =  await Event.find().populate("organizer");
    res.status(200).json(events);
});

const getEvent = asyncHandler (async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        res.status(200).json(event);
    } catch (error) {
        console.log(error);
    }
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

const deleteEvent = asyncHandler (async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findByIdAndDelete(id);
        res.json(event);
    } catch (error) {
        console.log(error);
    }
});

const updateEvent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, date, location, organizer } = req.body;
    try {
      const event = await Event.findByIdAndUpdate(
        id,
        {
          name,
          description,
          date,
          location,
          organizer
        },
        { new: true } // This option returns the updated event object
      );
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  

export default {
    getAllEvents,
    createEvent,
    deleteEvent,
    updateEvent,
    getEvent,
}