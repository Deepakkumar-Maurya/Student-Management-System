const mongoose = require('mongoose');

const parentSchema = mongoose.model('Parent', {
    Fathername: {
        type: String,
        required: true,
    },
    Mothername: {
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
    }
});

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;