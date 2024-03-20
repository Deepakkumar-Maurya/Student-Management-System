const User = require('../../models/users');
const bcrypt = require('bcrypt');

const studentSignup = async (req, res) => {
    const { enrollment, password } = req.body;
    try {
        if (!enrollment ||!password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        const user = await User.findOne({ enrollment });
        if (user) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            enrollment,
            hashedPassword
        });
        res.status(201).json(newUser);
        return res.redirect('/student-dashboard');
    } catch {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports = studentSignup;