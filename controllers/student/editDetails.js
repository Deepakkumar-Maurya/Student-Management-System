const Student = require('../../models/students');

const editDetails = async (req, res) => {
    const oldEnrollment = req.query.enrollment;
    const {name, enrollment, email, phone, address, department, year, semester, course, fatherName, motherName } = req.body;
    try {

        const filter = { enrollment: oldEnrollment };
        const update = { name: name, enrollment: enrollment, email: email, phone: phone, address: address, department: department, year: year, semester: semester, course: course, fatherName: fatherName, motherName: motherName };

        await Student.update(filter, update);
        res.status(200).json({ message: 'Student details updated successfully' });
        return res.redirect('/student-dashboard');
    } catch {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports = editDetails;