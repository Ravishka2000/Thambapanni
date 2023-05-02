import asyncHandler from "express-async-handler";
import Heritage from "../models/HeritageModel.js";
import mongoose from "mongoose";
import fs from 'fs'
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//get a heritage
const getHeritage = async (req, res) => {
    const { id } = req.params

    const heritage = await Heritage.findById(id)

    if (!heritage) {
        res.status(400).json({ error: ' No such heritage' })
    }

    res.status(200).json(heritage)
}

//create a new heritage
const createHeritage = asyncHandler(async (req, res) => {
    const { title, description, location } = req.body;
    try {
        const heritage = await Heritage.create({ title, description, location })
        res.status(200).json(heritage)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

//get all heritges
const getAllHeritages = asyncHandler(async (req, res) => {

    const heritages = await Heritage.find({}).sort({ createdAt: -1 })

    res.status(200).json(heritages)
})

//update heritage 
const updateHeritage = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such heritage" })
    }

    const heritage = await Heritage.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!heritage) {
        return res.status(404).json({ error: "No such heritage" })
    }

    res.status(200).json({ heritage })
}

//delete heritage 
const deleteHeritage = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such heritage" })
    }

    const heritage = await Heritage.findByIdAndDelete({ _id: id })

    if (!heritage) {
        return res.status(404).json({ error: "No such heritage" })
    }

    res.status(200).json({ heritage })
}

//upload images
const uploadImages = async (req, res) => {
    try {
        const { id } = req.params;
        const heritage = await Heritage.findById(id);

        if (!heritage) {
            return res.status(400).json({ error: "Heritage can not be found" })
        }

        if (heritage.image) {
            fs.unlink(path.join(__dirname, '..', heritage.image), (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        heritage.image = req.file.path;
        await heritage.save();
        res.status(200).json(heritage);
    } catch (err) {
        if (req.file) {
            fs.unlink(req.file.path, (unlinkErr) => {
                if (unlinkErr) {
                    console.error(unlinkErr);
                }
            });
        }
        return res.status(400).json({ error: err.message })
    } finally {

    }

}

export default {
    getAllHeritages,
    getHeritage,
    updateHeritage,
    deleteHeritage,
    createHeritage,
    uploadImages
}
