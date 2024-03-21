const User = require('../../models/users');
const bcrypt = require('bcrypt');

const studentSignup = async (req, res) => {
    const { enrollment, password } = req.body;
    console.log(enrollment, password); 
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
            password : hashedPassword
        });
        console.log(newUser);
        return res.redirect('/login');
    } catch(error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

module.exports = studentSignup;