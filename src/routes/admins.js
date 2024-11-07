const express = require('express');
const router = express.Router();
const { User } = require('../config/database');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');

router.post('/change-role', authMiddleware, roleMiddleware('admin'), async (req, res) => {
    const { userId, newRole } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.role = newRole;
    await user.save();

    res.status(200).json({ message: 'Role updated successfully' });
});

module.exports = router;
