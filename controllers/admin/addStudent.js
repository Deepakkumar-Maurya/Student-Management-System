const Student = require('../../models/students');

// controller for adding student
const addStudent = async (req, res) => {
    const { name, enrollment, email, phone, address, department, year, semester, course } = req.body;
    try {
        // check if all fields are filled
        if (!enrollment ||!email ||!phone ||!address ||!department ||!year ||!semester ||!course) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        // common validations
        if (phone.length!== 10) {
            return res.status(400).json({ message: 'Phone number must be 10 digits' });
        }
        if (semester > 8 || semester < 1) {
            return res.status(400).json({ message: 'Semester must be between 1 and 8' });
        }
        if (year > 4 || year < 1) {
            return res.status(400).json({ message: 'Year must be between 1 and 4' });
        }
        if (email.indexOf('@') === -1) {
            return res.status(400).json({ message: 'Email must contain @' });
        }
        if (email.indexOf('.') === -1) {
            return res.status(400).json({ message: 'Email must contain.' });
        }

        const student = await Student.findOne({ enrollment });
        if (student) {
            return res.status(409).json({ message: 'Student with that enrollment already exists' });
        }

        // creating new student
        const newStudent = await Student.create({
            name,
            enrollment,
            email,
            phone,
            address,
            department,
            year,
            semester,
            course
        })
        return res.redirect('/admin');
    } catch(error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

module.exports = addStudent;