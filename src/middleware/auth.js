const jwt = require('jsonwebtoken');
const { User } = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findByPk(decoded.id);
        req.user.role = decoded.role;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

const fetchProtectedData = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ message: 'Protected data accessed', user });
    } catch (error) {
        res.status(500).json({ message: 'Error accessing protected data' });
    }
};

module.exports = {
    authMiddleware,
    fetchProtectedData
};
