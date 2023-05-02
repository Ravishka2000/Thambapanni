import express from 'express'
import HeritageController from "../controllers/HeritageController.js"
const router = express.Router();
import multer from 'multer';
import path from 'path';

//file path 
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads/");
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});

router.post("/",HeritageController.createHeritage)
router.get('/',HeritageController.getAllHeritages)
router.get('/:id',HeritageController.getHeritage)
router.patch('/:id',HeritageController.updateHeritage)
router.delete('/:id',HeritageController.deleteHeritage)
router.put('/:id/image',upload.single("image"),HeritageController.uploadImages)

export default router;