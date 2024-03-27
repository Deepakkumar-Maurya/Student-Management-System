const Admin = require('../../models/admins');
const bcrypt = require('bcryptjs');

// controller for adding admin
const addAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        // validations
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

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10);
        // creating new admin
        const newAdmin = await Admin.create({
            username,
            password : hashedPassword
        });
        return res.redirect('/admin');
    } catch(error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

module.exports = addAdmin;