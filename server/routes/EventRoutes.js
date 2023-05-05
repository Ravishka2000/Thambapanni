import express from "express";
import EventController from "../controllers/EventController.js";

const router = express.Router();

router.get('/', EventController.getAllEvents);
router.get('/get-event/:id', EventController.getEvent);
router.post('/', EventController.createEvent);
router.delete('/:id', EventController.deleteEvent);
router.put('/:id', EventController.updateEvent);

export default router;