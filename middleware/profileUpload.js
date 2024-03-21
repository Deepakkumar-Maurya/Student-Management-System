const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        return cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post("/uploadfile", upload.single('inpFile'), (req, res, next) => {
    console.log(req.file);
})