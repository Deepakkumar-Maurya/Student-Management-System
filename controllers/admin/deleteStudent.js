const Student = require('../../models/students');

const deleteStudent = async (req, res) => {
    const enrollment = req.body.enrollment;
    try {
        await Student.deleteOne({ enrollment });
        // return res.redirect('/admin');
        return res.status(200).json({ message: 'Student deleted successfully' });
    } catch(error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

module.exports = deleteStudent;