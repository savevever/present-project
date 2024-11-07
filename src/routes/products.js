const express = require('express');
const router = express.Router();
const { Product, history, cart, comment, historySeller, ProductTestOrder, OrderHistory } = require('../configs/database');

router.post('/createGraph', async (req, res) => {
    const { id, name, price, stock, totalSales, numberOfOrders, itemsSold, cogs, shippingCosts, day, month, year } = req.body;
    try {
        const newProduct = await Product.create({
            id,
            name,
            price,
            stock,
            totalSales,
            numberOfOrders,
            itemsSold,
            cogs,
            shippingCosts,
            day,
            month,
            year
        });
        console.log("Product created successfully");
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Error creating product');
    }
});
router.get('/getGraph', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});
router.delete('/delGraph', async (req, res) => {
    try {
        await Product.destroy({ where: {} });
        res.status(200).send('All products have been deleted.');
    } catch (error) {
        console.error('Error deleting products:', error);
        res.status(500).send('Error deleting products');
    }
});
router.post('/createHistoryEntry', async (req, res) => {
    const { productId, image, email, nameProduct, shopId, price, quantity, productTypes } = req.body;
    try {
        console.log('Request Body:', req.body);
        if (!productId || !nameProduct || !shopId || price === undefined || quantity === undefined) {
            throw new Error('ข้อมูลที่จำเป็นหายไป');
        }
        const newHistoryEntry = await history.create({
            productId,
            image,
            email,
            nameProduct,
            shopId,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            productTypes
        });
        console.log("สร้าง Entry ใน history สำเร็จ");
        res.status(201).json({ newHistoryEntry, });
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการสร้าง history entry:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสร้าง history entry' });
    }
});
router.post('/createHistoryEntrySeller', async (req, res) => {
    const { productId, image, email, nameProduct, shopId, price, quantity, productTypes } = req.body;
    try {
        console.log('Request Body:', req.body);
        if (!productId || !nameProduct || !shopId || price === undefined || quantity === undefined) {
            throw new Error('ข้อมูลที่จำเป็นหายไป');
        }
        const newHistoryEntrySeller = await historySeller.create({
            productId,
            image,
            email,
            nameProduct,
            shopId,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            productTypes
        });

        console.log("สร้าง Entry ใน history สำเร็จ");
        res.status(201).json({ newHistoryEntrySeller });
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการสร้าง history entry:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสร้าง history entry' });
    }
});
router.delete('/OrderHistory', async (req, res) => {
    try {
        await OrderHistory.destroy({ where: {} });

        res.status(200).send('History entry has been deleted.');
    } catch (error) {
        console.error('Error deleting history entry:', error);
        res.status(500).send('Error deleting history entry');
    }
});
router.post('/OrderHistory', async (req, res) => {
    const { productId, image, email, nameProduct, category, shopId, Orderid, price, quantity, productTypes } = req.body;
    try {
        console.log('Request Body:', req.body);
        if (!productId || !nameProduct || !shopId || price === undefined || quantity === undefined) {
            throw new Error('Missing required fields');
        }
        const newHistoryEntry = await OrderHistory.create({
            Orderid,
            productId,
            image,
            email,
            nameProduct,
            category,
            shopId,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            productTypes
        });
        console.log("Entry created successfully in history");
        res.status(201).json(newHistoryEntry);
    } catch (error) {
        console.error('Error creating history entry:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'Error creating history entry' });
    }
});
router.post('/ProductTestOrder', async (req, res) => {
    const { productId, image, email, nameProduct, category, shopId, price, quantity, productTypes } = req.body;
    try {
        console.log('Request Body:', req.body);
        if (!productId || !nameProduct || !shopId || price === undefined || quantity === undefined) {
            throw new Error('Missing required fields');
        }
        const newHistoryEntry = await ProductTestOrder.create({
            productId,
            image,
            email,
            nameProduct,
            category,
            shopId,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            productTypes
        });
        console.log("Entry created successfully in history");
        res.status(201).json(newHistoryEntry);
    } catch (error) {
        console.error('Error creating history entry:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'Error creating history entry' });
    }
});
router.delete('/Comment', async (req, res) => {
    try {
        await comment.destroy({ where: {} });
        res.status(200).send('cart entry has been deleted.');
    } catch (error) {
        console.error('Error deleting cart entry:', error);
        res.status(500).send('Error deleting cart entry');
    }
});
router.post('/createComment', async (req, res) => {
    const { AcImg, AcName, nameProduct, imageProduct, price, detail, imageComment, star, email, productId } = req.body;
    try {
        const newHistoryEntry = await comment.create({
            nameProduct,
            imageProduct,
            price,
            detail,
            imageComment,
            star,
            email,
            productId,
            AcImg,
            AcName
        });

        console.log("Entry created successfully in history");
        res.status(201).json(newHistoryEntry);
    } catch (error) {
        console.error('Error creating history entry:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'Error creating history entry' });
    }
});
router.get('/getComments/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const comments = await comment.findAll({ where: { productId } });

        if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found.' });
        }
        console.log("Comments retrieved successfully.");
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error retrieving comments:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'Error retrieving comments' });
    }
});
router.get('/getComments', async (req, res) => {
    try {
        const comments = await comment.findAll({ where: {} });

        console.log("Comments retrieved successfully.");
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving comments' });
    }
});
router.post('/createCartEntry', async (req, res) => {
    const { productId, image, email, nameProduct, shopId, price, quantity, productTypes } = req.body;
    try {
        console.log('Request Body:', req.body);
        if (!productId || !nameProduct || !shopId || price === undefined || quantity === undefined) {
            throw new Error('Missing required fields');
        }
        const newcartEntry = await cart.create({
            productId,
            image,
            email,
            nameProduct,
            shopId,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            productTypes
        });

        console.log("Entry created successfully in history");
        res.status(201).json(newcartEntry);
    } catch (error) {
        console.error('Error creating history entry:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).send('Error creating history entry');
    }
});
router.get('/getHistory', async (req, res) => {
    try {
        const historyEntries = await history.findAll();
        res.json(historyEntries);
    } catch (error) {
        console.error('Error fetching history entries:', error);
        res.status(500).send('Error fetching history entries');
    }
});
router.delete('/DelProductTestOrder', async (req, res) => {
    const { email } = req.body; // ดึง email จาก request body

    if (!email) {
        return res.status(400).send('ไม่มี email');
    }

    try {
        await ProductTestOrder.destroy({ where: { email } });
        res.status(200).send('ลบรายการในประวัติการสั่งซื้อสำเร็จแล้ว');
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการลบรายการในตะกร้า:', error);
        res.status(500).send('เกิดข้อผิดพลาดในการลบรายการในตะกร้า');
    }
});
router.delete('/DelOrder', async (req, res) => {

    try {
        await ProductTestOrder.destroy({ where: {} });
        res.status(200).send('ลบรายการในประวัติการสั่งซื้อสำเร็จแล้ว');
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการลบรายการในตะกร้า:', error);
        res.status(500).send('เกิดข้อผิดพลาดในการลบรายการในตะกร้า');
    }
});
router.get('/getProductTestOrder', async (req, res) => {
    try {
        // ใช้ email เป็นเงื่อนไขในการลบรายการ
        // await ProductTestOrder.findAll({ where: {  } });
        const historyEntries = await ProductTestOrder.findAll({ where: {} });
        res.json(historyEntries);
        // res.status(200).send('ลบรายการในประวัติการสั่งซื้อสำเร็จแล้ว');
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการลบรายการในตะกร้า:', error);
        res.status(500).send('เกิดข้อผิดพลาดในการลบรายการในตะกร้า');
    }
});
router.get('/OrderHistory', async (req, res) => {
    try {
        // ใช้ email เป็นเงื่อนไขในการลบรายการ
        // await ProductTestOrder.findAll({ where: {  } });
        const historyEntries = await OrderHistory.findAll({ where: {} });
        res.json(historyEntries);
        // res.status(200).send('ลบรายการในประวัติการสั่งซื้อสำเร็จแล้ว');
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการลบรายการในตะกร้า:', error);
        res.status(500).send('เกิดข้อผิดพลาดในการลบรายการในตะกร้า');
    }
});
router.get('/OrderHistoryEmail', async (req, res) => {
    try {
        const { email } = req.query;
        const shops = await OrderHistory.findOne({ where: { email } });
        res.status(200).json({ message: 'ดึงข้อมูลร้านค้าเรียบร้อยแล้ว', data: shops });
    } catch (error) {
        console.error('ข้อผิดพลาดในการดึงข้อมูลร้านค้า:', error);
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลร้านค้าได้' });
    }
});
router.get('/gethistorySeller', async (req, res) => {
    try {
        const historyEntries = await historySeller.findAll();
        res.json(historyEntries);
    } catch (error) {
        console.error('Error fetching history entries:', error);
        res.status(500).send('Error fetching history entries');
    }
});
router.get('/getCart', async (req, res) => {
    try {
        const cartEntries = await cart.findAll();
        res.json(cartEntries);
    } catch (error) {
        console.error('Error fetching cart entries:', error);
        res.status(500).send('Error fetching cart entries');
    }
});
router.delete('/delHistory/:Historyid', async (req, res) => {
    const { Historyid } = req.params;

    try {
        const result = await history.destroy({ where: { Historyid } });

        if (result > 0) {
            res.status(200).send(`Product with ID ${Historyid} has been deleted.`);
        } else {
            res.status(404).send(`Product with ID ${Historyid} not found.`);
        }
    } catch (error) {
        console.error('Error deleting history entry:', error);
        res.status(500).send('Error deleting history entry.');
    }
});
router.delete('/delHistorySellrt/:Historyid', async (req, res) => {
    const { Historyid } = req.params;

    try {
        const result = await historySeller.destroy({ where: { Historyid } });

        if (result > 0) {
            res.status(200).send(`Product with ID ${Historyid} has been deleted.`);
        } else {
            res.status(404).send(`Product with ID ${Historyid} not found.`);
        }
    } catch (error) {
        console.error('Error deleting history entry:', error);
        res.status(500).send('Error deleting history entry.');
    }
});

router.delete('/delCart/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        await cart.destroy({ where: { productId } });
        res.status(200).send('All cart entries have been deleted.');
    } catch (error) {
        console.error('Error deleting cart entries:', error);
        res.status(500).send('Error deleting cart entries');
    }
});
router.delete('/delHistory', async (req, res) => {
    try {
        await history.destroy({ where: {} });

        res.status(200).send('History entry has been deleted.');
    } catch (error) {
        console.error('Error deleting history entry:', error);
        res.status(500).send('Error deleting history entry');
    }
});
// router.delete('/delCart', async (req, res) => {
//     try {
//         await cart.destroy({ where: {} });
//         res.status(200).send('cart entry has been deleted.');
//     } catch (error) {
//         console.error('Error deleting cart entry:', error);
//         res.status(500).send('Error deleting cart entry');
//     }
// });
router.put('/updateCartQuantity/add/:productId', async (req, res) => {
    const { productId } = req.params;
    const { additionalQuantity } = req.body;

    try {
        const existingProduct = await cart.findOne({ where: { productId } });
        if (existingProduct) {
            const updatedQuantity = existingProduct.quantity + parseInt(additionalQuantity, 10);

            await existingProduct.update({ quantity: updatedQuantity });
            res.status(200).json({ message: 'Product quantity updated successfully', quantity: updatedQuantity });
        } else {
            res.status(404).json({ error: 'Product not found in cart' });
        }
    } catch (error) {
        console.error('Error updating cart quantity:', error);
        res.status(500).json({ error: 'Error updating cart quantity' });
    }
});

// เส้นทางสำหรับแทนที่จำนวนสินค้า
router.put('/updateCartQuantity/replace/:id', async (req, res) => {
    const { id } = req.params;
    const { replaceQuantity } = req.body;

    try {
        const existingProduct = await cart.findOne({ where: { id } });
        if (existingProduct) {
            const updatedQuantity = parseInt(replaceQuantity, 10);

            await existingProduct.update({ quantity: updatedQuantity });
            res.status(200).json({ message: 'Product quantity replaced successfully', quantity: updatedQuantity });
        } else {
            res.status(404).json({ error: 'Product not found in cart' });
        }
    } catch (error) {
        console.error('Error replacing cart quantity:', error);
        res.status(500).json({ error: 'Error replacing cart quantity' });
    }
});

router.get('/checkCart/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const existingProduct = await cart.findOne({ where: { productId } });
        if (existingProduct) {
            res.status(200).json({ exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking cart:', error);
        res.status(500).json({ error: 'Error checking cart' });
    }
});
module.exports = router;
