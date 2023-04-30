import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import BlogRoutes from "./routes/BlogRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import BookingRoutes from "./routes/BookingRoutes.js"

dotenv.config();

const app = express();
const PARAMS = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
};
const URI = process.env.MONGOOSE_URI;
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/blogs", BlogRoutes);
app.use("/api/auth", UserRoutes);
app.use("/api/booking", BookingRoutes);

mongoose.set("strictQuery", false);
mongoose.connect(URI, PARAMS)
    .then(() => app.listen(PORT, 
        () => console.info(`Server running on PORT ${PORT} 🔥`)))
    .catch((err) => console.error(err.message));