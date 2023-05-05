import express from "express";
import EventController from "../controllers/EventController.js";

const router = express.Router();

router.get('/', EventController.getAllEvents);
router.post('/', EventController.createEvent);
router.delete('/:id', EventController.deleteEvent);

export default router;