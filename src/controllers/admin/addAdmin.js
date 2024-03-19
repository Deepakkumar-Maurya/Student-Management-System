const Admin = require('../../models/admins');

const addAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
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