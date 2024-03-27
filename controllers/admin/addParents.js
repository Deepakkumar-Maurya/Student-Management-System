const Parent = require('../../models/parents');

// controller for adding parent
const addParents = async (req, res) => {
    const { fatherName, motherName, fatherOccupation, motherOccupation, fatherPhone, motherPhone, studentEnrollment } = req.body;
    try {
        // check if all fields are filled
        if (!fatherName ||!motherName ||!fatherOccupation ||!motherOccupation ||!fatherPhone ||!motherPhone ||!studentEnrollment) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        // add parent to database
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

module.exports = addParents;