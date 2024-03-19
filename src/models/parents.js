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
    phone: {
        type: String,
        required: true,
        unique: true
    }
});

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;