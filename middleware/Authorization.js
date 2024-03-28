const User = require('../models/users');
const Admin = require('../models/admins');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const isLoggedIn = async (req, res, next) => {
  // console.log("Check user authorization");

  const token = req.cookies.token;
  // const token = req.session.token;
  console.log(token);
    
  // If there is no token, then redirect to login page.
  if (!token) {
    return res.redirect('/login');
  }

  // Verify the token.
  try {
    // Check if there is any user with this token.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role === 'student') {
      const user = await User.findOne({ enrollment: decoded.enrollment });
      if (user) {
        console.log(req.originalUrl);
        if (req.originalUrl.startsWith('/admin')) {
          return res.status(403).json({ message: 'Forbidden' });
        }
        console.log('user authenticated');
        next();
      } else {
        // Remove the Invalid token from the cookies.
        res.clearCookie('token');
        return res.redirect('/login');
      }
    }
    else if (decoded.role === 'admin') {
      const admin = await Admin.findOne({ username: decoded.username });
      if (admin) {
        if (req.originalUrl.startsWith('/student')) {
          return res.status(403).json({ message: 'Forbidden' });
        }
        console.log('user authenticated');
        next();
      } else {
        // Remove the Invalid token from the cookies.
        res.clearCookie('token');
        return res.redirect('/login');
      }
    }
  } catch (error) {
    console.log('Error is :', error.message);
    return res.redirect('/');
  }
};

module.exports = isLoggedIn;