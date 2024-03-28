const User = require('../models/user')
const jwt = require("jsonwebtoken")

exports.isAuthenticated = async (req, res, next) => {

    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ message: 'Login first to access this page' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id);

    next()
};

exports.isAuthorized = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `You are not allowed to acccess or do something on this page` })
        }
        next()
    }
}