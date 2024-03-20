const Admin = require('../../models/admins');
const bcrypt = require('bcrypt');

const addAdmin = async (req, res) => {
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
            return res.status(409).json({ message: 'Admin already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.create({
            username,
            hashedPassword
        });
        res.status(201).json(newAdmin);
        return res.redirect('/admin-dashboard');
    } catch {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports = addAdmin;