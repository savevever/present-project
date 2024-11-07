const express = require('express');
const router = express.Router();
const { Shop, Follow,Payment } = require('../configs/database');
const crypto = require('crypto');

// POST /register-shop
router.post('/register-shop', async (req, res) => {
    try {
        const { userId, shopName, email, phoneNumber } = req.body;
        const shopId = crypto.createHash('sha256').update(userId + shopName).digest('hex');

        const newShop = await Shop.create({
            shopId,
            userId,
            shopName,
            email,
            phoneNumber
        });

        res.status(201).json({
            message: 'Shop created successfully', data: {
                shopId: newShop.shopId,
                userId: newShop.userId,
                shopName: newShop.shopName,
                email: newShop.email,
                phoneNumber: newShop.phoneNumber
            }
        });
    } catch (error) {
        console.error('Error registering shop:', error);
        res.status(500).json({ message: 'Failed to register shop' });
    }
});
router.get('/shopname', async (req, res) => {
    const { shopId } = req.query;
    try {
        const shop = await Shop.findOne({ shopId });
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }
        res.status(200).json({ shopId: shop.shopId, shopName: shop.shopName });
    } catch (error) {
        console.error('Error retrieving shop name:', error);
        res.status(500).json({ message: 'Failed to retrieve shop name' });
    }
});
router.get('/checkFollow', async (req, res) => {
    try {

        const existingFollow = await Follow.findAll();

        res.status(200).json({ message: 'Data retrieved successfully', data: existingFollow });
    } catch (error) {
        console.error('Error checking follow status:', error);
        res.status(500).send({
            message: 'Error checking follow status',
            error: error.message
        });
    }
});

router.patch('/product/:id/togglefollow', async (req, res) => {
    try {
        const shopId = req.params.id;
        const email = req.body.email;
        const FollowChange = req.body.FollowChange;

        const shop = await Shop.findOne({ where: { shopId: shopId } });
        if (!shop) {
            return res.status(404).send({ message: 'Shop not found' });
        }

        const existingFollow = await Follow.findOne({
            where: { email: email, shopId: shopId }
        });

        if (FollowChange === 1) { // กดติดตาม
            if (!existingFollow) {
                await Follow.create({ email: email, shopId: shopId });
                shop.follow += 1;
            }
        } else if (FollowChange === -1) {
            if (existingFollow) {
                await existingFollow.destroy();
                shop.follow -= 1;
            }
        }

        await shop.save();
        res.status(200).send({
            message: 'Follow status changed',
            follow: shop.follow
        });
    } catch (error) {
        console.error('Error toggling follow:', error);
        res.status(500).send({
            message: 'Error toggling follow',
            error: error.message
        });
    }
});

router.get('/follow', async (req, res) => {
    try {
        const shops = await Shop.findAll();
        res.status(200).json({ message: 'Shops retrieved successfully', data: shops });
    } catch (error) {
        console.error('Error retrieving shops:', error);
        res.status(500).json({ message: 'Failed to retrieve shops' });
    }
});
router.get('/shopsFollow', async (req, res) => {
    try {
        const { email } = req.query; // รับ email จากพารามิเตอร์คำขอ
        const shops = await Shop.findAll();

        for (const shop of shops) {
            // นับจำนวนการติดตามสำหรับร้านค้า
            shop.follow = shop.followedBy.length;

            // ตรวจสอบว่าผู้ใช้ปัจจุบันติดตามร้านค้านี้หรือไม่
            shop.isFollowing = shop.followedBy.includes(email);
        }

        res.status(200).json({ message: 'ดึงข้อมูลร้านค้าเรียบร้อยแล้ว', data: shops });
    } catch (error) {
        console.error('ข้อผิดพลาดในการดึงข้อมูลร้านค้า:', error);
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลร้านค้าได้' });
    }
});

router.get('/shops', async (req, res) => {
    try {
        const shops = await Shop.findAll();
        res.status(200).json({ message: 'Shops retrieved successfully', data: shops });
    } catch (error) {
        console.error('Error retrieving shops:', error);
        res.status(500).json({ message: 'Failed to retrieve shops' });
    }
});
router.get('/Payment', async (req, res) => {
    try {
        const shops = await Payment.findAll();
        res.status(200).json({ message: 'Shops retrieved successfully', data: shops });
    } catch (error) {
        console.error('Error retrieving shops:', error);
        res.status(500).json({ message: 'Failed to retrieve shops' });
    }
});
router.get('/Payment', async (req, res) => {
    try {
        const shops = await Payment.findAll();
        res.status(200).json({ message: 'Shops retrieved successfully', data: shops });
    } catch (error) {
        console.error('Error retrieving shops:', error);
        res.status(500).json({ message: 'Failed to retrieve shops' });
    }
});
router.get('/seller', async (req, res) => {
    try {
        const shops = await Payment.findAll();
        res.status(200).json({ message: 'Shops retrieved successfully', data: shops });
    } catch (error) {
        console.error('Error retrieving shops:', error);
        res.status(500).json({ message: 'Failed to retrieve shops' });
    }
});
router.delete('/shops', async (req, res) => {
    try {
        // ลบข้อมูลทั้งหมดจากฐานข้อมูล
        await Shop.destroy({
            where: {},
            truncate: true
        });

        // ส่ง response กลับไปที่ client
        res.status(200).json({ message: 'All shops deleted successfully' });
    } catch (error) {
        console.error('Error deleting shops:', error);
        res.status(500).json({ message: 'Failed to delete shops' });
    }
});
router.delete('/Payment', async (req, res) => {
    try {
        // ลบข้อมูลทั้งหมดจากฐานข้อมูล
        await Payment.destroy({
            where: {},
        });
        res.status(200).json({ message: 'All shops deleted successfully' });
    } catch (error) {
        console.error('Error deleting shops:', error);
        res.status(500).json({ message: 'Failed to delete shops' });
    }
});
router.get('/Paymentbyemail', async (req, res) => {
    try {
        const { email } = req.query;
        const shops = await Payment.findOne({ where: { email } });
        res.status(200).json({ message: 'ดึงข้อมูลร้านค้าเรียบร้อยแล้ว', data: shops });
    } catch (error) {
        console.error('ข้อผิดพลาดในการดึงข้อมูลร้านค้า:', error);
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลร้านค้าได้' });
    }
});
router.put('/account', async (req, res) => {
    const { email, image } = req.body;
    try {
        const shop = await Shop.findOne({ email });
        if (!shop) {
            console.error('User not found with email:', email);
            return res.status(404).send('User not found');
        }
        shop.image = image;
        await shop.save();
        res.status(200).json(shop);
    } catch (error) {
        console.error('Error during update:', error);
        res.status(500).send('Error during update');
    }
});
module.exports = router;
