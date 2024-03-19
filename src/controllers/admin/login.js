const Admin = require('../../models/admins');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username ||!password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }   
        const admin = await Admin.findOne({ username });
        if (admin) {
            const isMatch = await bcrypt.compare(password, admin.password);
            if (isMatch) {
                const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.cookie('token', token, { httpOnly: true });
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