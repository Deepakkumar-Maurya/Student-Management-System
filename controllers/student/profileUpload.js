const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const StudentProfilePhoto = require('../../models/studentProfilePhoto');


const router = express.Router();


// multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// route to upload image
router.post("/", upload.single('inpFile'), async (req, res, next) => {
    const fileBuffer = req.file.buffer;
    const imgStr = Buffer.from(fileBuffer).toString('base64');
    console.log(imgStr);
    console.log(req.file.filename,"jjjjj");
    const file = req.file;
    const enrollment = req.body.enrollment;
    await StudentProfilePhoto.create({
        studentEnrollment: enrollment,
        profilePhoto: imgStr,
    });
    
    
    // fs.unlinkSync(req.file.path)
    // console.log("Delete File successfully.");
    
    return res.status(200).json({ message: "success" });

    
})

module.exports = router;


