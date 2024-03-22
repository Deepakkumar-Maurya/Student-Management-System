const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const StudentProfilePhoto = require('../../models/studentProfilePhoto');


const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        console.log('11111');
        return cb(null, path.join(__dirname, "../../uploads"));
    },
    filename: function (req, file, cb) {
        console.log('22222');
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// ----------------------------------

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // Read binary data from the file
    const bitmap = fs.readFileSync(file);
    // Convert binary data to base64 encoded string
    return Buffer.from(bitmap).toString('base64');
}
// -------------------------------------

const upload = multer({ storage });



router.post("/", upload.single('inpFile'), async (req, res, next) => {
    const imgStr = base64_encode(req.file.path);
    console.log(imgStr);
    console.log(req.file.filename,"jjjjj");
    const file = req.file;
    const enrollment = req.body.enrollment;
    await StudentProfilePhoto.create({
        studentEnrollment: enrollment,
        profilePhoto: imgStr,
    });
    
    
    fs.unlinkSync(req.file.path)
    console.log("Delete File successfully.");
    
    return res.status(200).json({ message: "success" });

    
})

module.exports = router;


