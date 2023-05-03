import asyncHandler from "express-async-handler";
import Heritage from "../models/HeritageModel.js";
import mongoose from "mongoose";
import fs from 'fs'
import path from "path"
import cloudinary from "cloudinary"

// Configuration 
cloudinary.config({
    cloud_name: "daxiby67v",
    api_key: "239243262657564",
    api_secret: "9mMH_qDU-VCPGyaRGpbHfJjfUx4"
});

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
    const { title, description,location} = req.body;
    let {image} = req.file;

    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'heritages',
    });
    image = result.secure_url;
    
    try{
        const heritage = await Heritage.create({title,description,location,image})
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
const updateHeritage = async(req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such heritage" });
    }
  
    let { title, description, location } = req.body;
    let image = req.file && req.file.path;
  
    const heritage = await Heritage.findById(id);
  
    if (!heritage) {
      return res.status(404).json({ error: "No such heritage" });
    }
  
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "heritages",
      });
  
     
      if (heritage.image) {
        const public_id = heritage.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(public_id);
      }
  
      
      heritage.image = result.secure_url;
    }
  
    
    heritage.title = title;
    heritage.description = description;
    heritage.location = location;
  
    const updatedHeritage = await heritage.save();
  
    res.status(200).json({ heritage: updatedHeritage });
  };


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
          return res.status(400).json({ error: 'Heritage cannot be found' });
      }

      if (heritage.image) {
          const public_id = heritage.image.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(public_id);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'heritages',
      });

      heritage.image = result.secure_url;
      await heritage.save();

      
      fs.unlink(req.file.path, (err) => {
          if (err) {
              console.error(err);
          }
      });

      res.status(200).json(heritage);
    } catch (err) {
        return res.status(400).json({ error: err.message });

    }
};

export default {
    getAllHeritages,
    getHeritage,
    updateHeritage,
    deleteHeritage,
    createHeritage,
    uploadImages
}
