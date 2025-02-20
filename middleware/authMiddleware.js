
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware для проверки токена JWT
module.exports.authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Middleware для проверки ролей (RBAC)
module.exports.authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Access Forbidden' });
        }
        next();
    };
};
