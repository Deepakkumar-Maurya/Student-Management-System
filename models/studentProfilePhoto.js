const mongoose = require('mongoose');

const studentProfilePhotoSchema = new mongoose.Schema({
    studentEnrollment: {
        type: String,
        required: true,
        unique: true
    },
    profilePhoto: {
        type: String,
        required: true
    }
});

const StudentProfilePhoto = mongoose.model('StudentProfilePhoto', studentProfilePhotoSchema);

module.exports = StudentProfilePhoto;