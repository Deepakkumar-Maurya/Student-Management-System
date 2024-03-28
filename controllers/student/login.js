const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const studentLogin = async (req, res) => {
    const { enrollment, password } = req.body;
    console.log(enrollment, password);
    try {
        // validations
        if (!enrollment ||!password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        // user login
        const user = await User.findOne({ enrollment });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {

                const token = jwt.sign({ enrollment: enrollment, role: 'student' }, process.env.JWT_SECRET);
                res.cookie('token', token, { maxAge: 900000, httpOnly: true });

                return res.redirect('/student');
            } else {
                return res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            return res.status(401).json({ message: 'No such student exists' });
        }
    } catch(error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

module.exports = studentLogin;