const User = require('../../models/users');
const bcrypt = require('bcrypt');

const studentLogin = async (req, res) => {
    const { enrollment, password } = req.body;
    try {
        if (!enrollment ||!password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        const user = await User.findOne({ enrollment });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                res.status(200).json(user);
                return res.redirect('/student-dashboard');
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            res.status(401).json({ message: 'No such student exists' });
        }
    } catch {
        res.status(500).json({ message: 'Something went wrong' });
    }
}