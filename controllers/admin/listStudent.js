const Student = require('../../models/students');

const listStudent = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;

    try {
        const count = await Student.countDocuments();
        const totalPages = Math.ceil(count / limit);    // total pages

        // get students and pagination
        const students = await Student.find({})
            .skip((page - 1) * limit)
            .limit(limit);
        // const studentList = students.map(user => user.name);
        console.log(students);

        // return res.status(200).json({ studentList, totalPages });
        return res.status(200).json({ students });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

module.exports = listStudent;
