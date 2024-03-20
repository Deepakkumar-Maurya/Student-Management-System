const Student = require('../../models/students');

const addStudent = async (req, res) => {
    const { name, enrollment, email, phone, address, department, year, semester, course, fatherName, motherName } = req.body;
    try {
        if (!enrollment ||!email ||!phone ||!address ||!department ||!year ||!semester ||!course ||!fatherName ||!motherName) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        if (phone.length!== 10) {
            return res.status(400).json({ message: 'Phone number must be 10 digits' });
        }
        if (semester > 8 || semester < 1) {
            return res.status(400).json({ message: 'Semester must be between 1 and 8' });
        }
        if (year > 4 || year < 1) {
            return res.status(400).json({ message: 'Year must be between 1 and 4' });
        }

        const student = await Student.findOne({ enrollment });
        if (student) {
            return res.status(409).json({ message: 'Student with that enrollment already exists' });
        }
        const newStudent = await Student.create({
            enrollment,
            email,
            phone,
            address,
            department,
            year,
            semester,
            course,
            fatherName,
            motherName
        })
        res.status(201).json(newStudent);
        return res.redirect('/student-dashboard');
    } catch {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports = addStudent;