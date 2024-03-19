const Student = require('../../models/students');

const addStudent = async (req, res) => {
    const { enrollment, password, email, phone, address, department, year, semester, course, fatherName, motherName } = req.body;
    try {
        const student = await Student.findOne({ enrollment });
        if (student) {
            return res.status(409).json({ message: 'Student with that enrollment already exists' });
        }
        const newStudent = await Student.create({
            enrollment,
            password,
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