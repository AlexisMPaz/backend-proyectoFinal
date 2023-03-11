import { Router } from "express";
import multer from "multer";

export const routerUpload = Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/public/img');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

const upload = multer({storage:storage});

//Upload Images
routerUpload.post('/upload', upload.single('product'), (req,res) => {
    console.log(req.file);
    res.send({response:"Imagen cargada"});
});