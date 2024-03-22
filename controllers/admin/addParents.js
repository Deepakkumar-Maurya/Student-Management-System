const Parent = require('../models/parents');

const addParent = async (req, res) => {
    const { fatherName, motherName, fatherOccupation, motherOccupation, fatherPhone, motherPhone, studentEnrollment } = req.body;
    try {
        if (!fatherName ||!motherName ||!fatherOccupation ||!motherOccupation ||!fatherPhone ||!motherPhone ||!studentEnrollment) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        const parent = await Parent.create({
            fatherName,
            motherName,
            fatherOccupation,
            motherOccupation,
            fatherPhone,
            motherPhone,
            studentEnrollment
        });
        return res.redirect('/admin');
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}