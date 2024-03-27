const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    fatherName: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true
    },
    fatherOccupation: {
        type: String,
        required: true
    },
    motherOccupation: {
        type: String,
        required: true
    },
    fatherPhone: {
        type: String,
        required: true,
    },
    motherPhone: {
        type: String,
        required: true
    },
    studentEnrollment: {
        type: mongoose.Schema.Types.Number,
        ref: 'Student',
        required: true
    }
});

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;