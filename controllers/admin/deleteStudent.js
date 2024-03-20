const Student = require('../../models/students');

const deleteStudent = async (req, res) => {
    const enrollment = req.body.enrollment;
    try {
        Student.deleteOne({ enrollment });
    } catch {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports = deleteStudent;