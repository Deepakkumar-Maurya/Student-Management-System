const Parent = require('../../models/parents');

const editParents = async (req, res) => {
    const oldEnrollment = req.query.enrollment;
    const {fatherName, motherName, fatherOccupation, motherOccupation, fatherPhone, motherPhone, studentEnrollment} = req.body;
    try {

        const filter = { studentEnrollment: oldEnrollment };
        const update = { fatherName: fatherName, motherName: motherName, fatherOccupation: fatherOccupation, motherOccupation: motherOccupation, fatherPhone: fatherPhone, motherPhone: motherPhone, studentEnrollment: studentEnrollment };

        await Parent.update(filter, update);
        return res.redirect('/admin');
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

module.exports = editParents;