const Admin = require('../../models/admins');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username ||!password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        if (username.length < 4) {
            return res.status(400).json({ message: 'Username must be at least 4 characters long' });
        }
        if (password.length < 4) {
            return res.status(400).json({ message: 'Password must be at least 4 characters long' });
        }

        const admin = await Admin.findOne({ username });
        if (admin) {
            const isMatch = await bcrypt.compare(password, admin.password);
            if (isMatch) {

                const token = jwt.sign({ username: username }, process.env.JWT_SECRET);
                res.cookie('token', token, { maxAge: 900000, httpOnly: true });

                res.status(200).json(admin);
                return res.redirect('/admin-dashboard');
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            res.status(401).json({ message: 'No such admin exists' });
        }
    } catch {
        res.status(500).json({ message: 'Something went wrong' });
    }

}

module.exports = adminLogin;