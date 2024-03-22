const studentLogout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.redirect('/');
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

module.exports = studentLogout;