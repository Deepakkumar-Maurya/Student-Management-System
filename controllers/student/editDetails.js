const Student = require('../../models/students');

const editDetails = async (req, res) => {
    const oldEnrollment = req.query.enrollment;
    const {name, enrollment, email, phone, address, department, year, semester, course } = req.body;
    try {

        const filter = { enrollment: oldEnrollment };
        const update = { name: name, enrollment: enrollment, email: email, phone: phone, address: address, department: department, year: year, semester: semester, course: course };

        await Student.update(filter, update);
        return res.redirect('/student');
    } catch {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports = editDetails;