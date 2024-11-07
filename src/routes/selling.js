const express = require('express');
const crypto = require('crypto');

const router = express.Router();
const { Selling, ProductTest, seller, ProductLikes } = require('../configs/database');
router.post('/users/FormOneSeller', (req, res) => {
    res.json({ message: 'Form One Seller Page' });
});

// router.post('/createSeller', async (req, res) => {
//     try {
//         const {
//             shopName, email, phoneNumber, sellerType, prefix, otherPrefix, firstName,
//             lastName, idCardNumber, birthDay, province, amphoe, district, zipcode,
//             addressDetails, idCardImages, pairIdCardImages, corporateType, corporateName,
//             corporateRegistrationNumber, provinceCorporate, amphoeCorporate, districtCorporate,
//             zipcodeCorporate, detailsCorporate, companyCertificateImages, directorIdCardImages,
//             VAT, office, VATImages,
//         } = req.body;

//         const newSeller = await seller.create({
//             shopName, email, phoneNumber, sellerType, prefix, otherPrefix, firstName,
//             lastName, idCardNumber, birthDay, province, amphoe, district, zipcode,
//             addressDetails, idCardImages, pairIdCardImages, corporateType, corporateName,
//             corporateRegistrationNumber, provinceCorporate, amphoeCorporate, districtCorporate,
//             zipcodeCorporate, detailsCorporate, companyCertificateImages, directorIdCardImages,
//             VAT, office, VATImages,
//         });

//         res.status(201).json({ message: 'Seller created successfully', seller: newSeller });
//     } catch (error) {
//         console.error('Error creating seller:', error);
//         res.status(500).json({ message: 'Error creating seller', error: error.message });
//     }
// });

// router.post('/createSeller', async (req, res) => {
//     try {
//         // รับข้อมูลจาก body ของ request
//         const {
//             shopName,
//             email,
//             phoneNumber,
//             sellerType,
//             prefix,
//             firstName,
//             lastName,
//             idCardNumber,
//             birthDay,
//             province,
//             amphoe,
//             district,
//             zipcode,
//             addressDetails,
//             idCardImages,
//             pairIdCardImages,
//             corporateType,
//             corporateName,
//             corporateRegistrationNumber,
//             provinceCorporate,
//             amphoeCorporate,
//             districtCorporate,
//             zipcodeCorporate,
//             detailsCorporate,
//             companyCertificateImages,
//             directorIdCardImages,
//             VAT,
//             office,
//             VATImages
//         } = req.body;

//         // สร้างผู้ขายใหม่ในฐานข้อมูล
//         const newSeller = await seller.create({
//             shopName,
//             email,
//             phoneNumber,
//             sellerType,
//             prefix,
//             firstName,
//             lastName,
//             idCardNumber,
//             birthDay,
//             province,
//             amphoe,
//             district,
//             zipcode,
//             addressDetail: addressDetails, // ตรงกับชื่อ field ใน model
//             idCardImages,
//             pairIdCardImages,
//             corporateType,
//             corporateName,
//             corporateRegistrationNumber,
//             provinceCorporate,
//             amphoeCorporate,
//             districtCorporate,
//             zipcodeCorporate,
//             detailsCorporate,
//             companyCertificateImages,
//             directorIdCardImages,
//             VAT,
//             office,
//             VATImages
//         });

//         // ส่ง response กลับไปที่ client
//         res.status(201).json({ message: 'Seller created successfully', data: newSeller });
//     } catch (error) {
//         console.error('Error details:', error);
//         res.status(500).json({ message: 'Failed to create seller', error: error.message });
//     }
// });

router.post('/createSeller', async (req, res) => {
    try {
        console.log('Request body:', req.body); // ตรวจสอบข้อมูลที่ส่งมาจาก client

        // สร้างผู้ขายใหม่ในฐานข้อมูล
        const newSeller = await seller.create({
            shopName: req.body.shopName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            sellerType: req.body.sellerType,
            prefix: req.body.prefix,
            otherPrefix: req.body.otherPrefix,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            idCardNumber: req.body.idCardNumber,
            birthDay: req.body.birthDay,
            province: req.body.province,
            amphoe: req.body.amphoe,
            district: req.body.district,
            zipcode: req.body.zipcode,
            addressDetail: req.body.addressDetails,
            idCardImages: req.body.idCardImages,
            pairIdCardImages: req.body.pairIdCardImages,

            // ข้อมูลเกี่ยวกับ Corporate
            corporateType: req.body.corporateType,
            corporateName: req.body.corporateName,
            corporateRegistrationNumber: req.body.corporateRegistrationNumber,
            provinceCorporate: req.body.provinceCorporate,
            amphoeCorporate: req.body.amphoeCorporate,
            districtCorporate: req.body.districtCorporate,
            zipcodeCorporate: req.body.zipcodeCorporate,
            detailsCorporate: req.body.detailsCorporate,
            companyCertificateImages: req.body.companyCertificateImages,
            directorIdCardImages: req.body.directorIdCardImages,
            VAT: req.body.VAT,
            office: req.body.office,
            VATImages: req.body.VATImages,
        });

        res.status(201).json({ message: 'Seller created successfully', data: newSeller });
    } catch (error) {
        console.error('Error details:', error);
        res.status(500).json({ message: 'Failed to create seller', error: error.message });
    }
});

// Endpoint to save data
router.post('/save-data', async (req, res) => {
    try {
        const { shopName, email, phoneNumber } = req.body;

        // Validate required fields
        if (!shopName || !email || !phoneNumber) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Save data to database
        const newSelling = await Selling.create({
            shopName, email, phoneNumber
        });

        res.status(201).json({ message: 'Data saved successfully', data: newSelling });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Failed to save data', error: error.message });
    }
});

// Endpoint to view data
router.get('/view-data', async (req, res) => {
    try {
        // Retrieve all data from the Selling table
        const allSellings = await seller.findAll();

        res.status(200).json({ message: 'Data retrieved successfully', data: allSellings });
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Failed to retrieve data', error: error.message });
    }
});

router.delete('/view-data', async (req, res) => {
    try {
        await seller.destroy({
            where: {}
        });

        res.status(200).json({ message: 'All shops deleted successfully' });
    } catch (error) {
        console.error('Error deleting shops:', error);
        res.status(500).json({ message: 'Failed to delete shops' });
    }
});
const multer = require('multer');
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 * 1024 } });
router.post('/save-product-data', upload.any(), async (req, res) => {// ************
    console.log('Received request body:', req.body);
    try {
        const productData = {
            ...req.body,
            images: typeof req.body.images === 'string' ? JSON.parse(req.body.images) : req.body.images,
            productTypes: typeof req.body.productTypes === 'string' ? JSON.parse(req.body.productTypes) : req.body.productTypes,
            imageList: typeof req.body.imageList === 'string' ? JSON.parse(req.body.imageList) : req.body.imageList,
        };

        console.log('Product data to be saved:', productData);
        if (!productData.id) {
            productData.id = crypto.randomUUID();
        }
        await ProductTest.create(productData);

        res.status(200).json({ message: 'บันทึกข้อมูลลง PostgreSQL สำเร็จ' });
    } catch (err) {
        console.error('ข้อผิดพลาดในการบันทึกข้อมูลลง PostgreSQL:', err);
        res.status(500).json({ message: 'ไม่สามารถบันทึกข้อมูลได้' });
    }
});
router.put('/updateProduct/:id', async (req, res) => {
    const { id } = req.params;
    const { totalSell, totalPrice } = req.body;

    if (isNaN(totalSell) || isNaN(totalPrice)) {
        return res.status(400).json({ error: 'Invalid input: totalSell or totalPrice is not a number' });
    }

    try {
        const product = await ProductTest.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const updatedTotalSell = (product.totalSell || 0) + parseInt(totalSell);
        const updatedTotalPrice = (product.totalPrice || 0) + parseFloat(totalPrice);

        product.totalSell = updatedTotalSell;
        product.totalPrice = updatedTotalPrice;
        product.numberProducts -= parseInt(totalSell);
        await product.save();

        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

router.get('/productss', async (req, res) => {
    try {
        const products = await ProductTest.findAll();
        res.status(200).json(products);
    } catch (err) {
        console.error('ข้อผิดพลาดในการดึงข้อมูลจาก PostgreSQL:', err);
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลได้' });
    }
});
router.get('/product/latest', async (req, res) => {
    try {
        // ดึงข้อมูลผลิตภัณฑ์ที่มี id สูงสุด (หรือข้อมูลล่าสุด)
        const latestProduct = await ProductTest.findOne({
            order: [['id', 'DESC']], // สั่งให้ค้นหา id ที่มีค่ามากที่สุด
        });
        if (latestProduct) {
            res.status(200).json(latestProduct);
        } else {
            res.status(404).json({ message: 'ไม่พบผลิตภัณฑ์' });
        }
    } catch (err) {
        console.error('ข้อผิดพลาดในการดึงข้อมูลจาก PostgreSQL:', err);
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลได้' });
    }
});
router.delete('/Delateproducts', async (req, res) => {
    try {
        // ลบข้อมูลทั้งหมดจากตาราง ProductTest
        await ProductTest.destroy({
            where: {}, // ไม่มีเงื่อนไข where หมายถึงลบข้อมูลทั้งหมด
            truncate: true // ใช้ truncate เพื่อลบข้อมูลทั้งหมดและรีเซ็ตการนับ ID
        });

        res.status(200).json({ message: 'ลบข้อมูลทั้งหมดสำเร็จ' });
    } catch (err) {
        console.error('ข้อผิดพลาดในการลบข้อมูลทั้งหมดจาก PostgreSQL:', err);
        res.status(500).json({ message: 'ไม่สามารถลบข้อมูลทั้งหมดได้' });
    }
});
router.delete('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        console.log('Product ID ที่ได้รับ:', productId);
        const product = await ProductTest.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณต้องการลบ' });
        }

        await product.destroy();
        res.status(200).json({ message: 'ลบสินค้าสำเร็จ' });
    } catch (err) {
        console.error('ข้อผิดพลาดในการลบข้อมูลจาก PostgreSQL:', err);
        res.status(500).json({ message: 'ไม่สามารถลบข้อมูลได้' });
    }
});
router.post('/users/salesPage', async (req, res) => {
    try {
        // ดึงข้อมูลทั้งหมดจากตาราง Selling
        const products = await Selling.findAll();

        // ส่งข้อมูลไปยังหน้า sales-page
        res.json({ message: 'Sales Page Data', products });
    } catch (err) {
        console.error('Error retrieving data from PostgreSQL:', err);
        return res.status(500).send('Error retrieving data');
    }
});
router.post('/users/FormTwoSeller', async (req, res) => {
    try {
        // ดึงข้อมูลทั้งหมดจากตาราง Selling
        const data = await Selling.findAll();

        // ส่งข้อมูลไปยังหน้า form-two-seller
        res.json({ message: 'Form Two Seller Data', products: data });
    } catch (err) {
        console.error('Error retrieving data from PostgreSQL:', err);
        return res.status(500).send('Error retrieving data');
    }
});
router.post('/users/FormThreeSeller', (req, res) => {
    res.json({ message: 'Form Three Seller Page' });
});

router.post('/users/FormFourSeller', (req, res) => {
    res.json({ message: 'Form Four Seller Page' });
});
router.get('/selling-login', async (req, res) => {
    res.json({ message: 'Selling Login Page' });
});

router.get('/start-selling', (req, res) => {
    // fs.readFile('seller.json', 'utf8', (err, data) => {
    //     if (err) {
    //         console.error('Error reading file', err);
    //         return res.status(500).send('Internal Server Error');
    //     }

    //     const formData = JSON.parse(data);
    //     const username = req.user ? req.user.name : '';
    // });
    res.json({ message: 'Start Selling Page' });
});
router.post('/api/saveProductData', async (req, res) => {
    const data = req.body;

    try {
        if (data.id) {
            await Selling.update(data, {
                where: { id: data.id }
            });
        } else {
            // Create new entry
            await Selling.create(data);
        }

        console.log('Data saved successfully');
        res.json({ message: 'Data saved successfully' });
    } catch (err) {
        console.error('Error saving data to PostgreSQL', err);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

router.get('/selling/:id/checkLikes', async (req, res) => {
    try {
        const { id: id } = req.params;
        const { email } = req.query;

        const existingFollow = await ProductLikes.findOne({
            where: { id, email }
        });

        res.status(200).send({ checkLikes: !!existingFollow });
    } catch (error) {
        console.error('Error checking follow status:', error);
        res.status(500).send({
            message: 'Error checking follow status',
            error: error.message
        });
    }
});

router.get('/checkLikes', async (req, res) => {
    try {

        const existingFollow = await ProductLikes.findAll();

        res.status(200).json({ message: 'Data retrieved successfully', data: existingFollow });
    } catch (error) {
        console.error('Error checking follow status:', error);
        res.status(500).send({
            message: 'Error checking follow status',
            error: error.message
        });
    }
});

router.put('/product/:id/toggleLike', async (req, res) => {
    try {
        const productId = req.params.id;
        const email = req.body.email;
        // const likeChange = req.body.likeChange;
        const existingLike = await ProductLikes.findOne({ where: { productId, email } });
        const product = await ProductTest.findByPk(productId);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        if (existingLike) {
            product.likes -= 1;
            await existingLike.destroy();
        } else {
            product.likes += 1;
            await ProductLikes.create({ productId, email });
        }
        await product.save();
        res.status(200).send({
            message: 'Product like status changed',
            likes: product.likes
        });
    } catch (error) {
        console.error('Error toggling like:', error);
        res.status(500).send({
            message: 'Error toggling like',
            error: error.message
        });
    }
});
router.get('/productsByCategory/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
    const products = await ProductTest.find({ category: categoryId });
    res.json(products);
});
router.put('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const { nameProduct, price, numberProducts, images, imageList } = req.body;

        const product = await ProductTest.findOne({ where: { id: productId } });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updateData = {};
        if (nameProduct !== undefined) updateData.nameProduct = nameProduct;
        if (price !== undefined) updateData.price = price;
        if (numberProducts !== undefined) updateData.numberProducts = numberProducts;

        // ตรวจสอบว่า `images` มีการส่งเข้ามาหรือไม่
        if (images !== undefined && images.length > 0) {
            // ถ้ามีการส่ง `images` ใหม่ ให้แทนที่ค่าปัจจุบัน
            updateData.images = images;
        } else {
            // ถ้าไม่มีก็เก็บค่าปัจจุบันไว้
            updateData.images = product.images; // ใช้ค่าเดิม
        }

        // ตรวจสอบ `imageList` เพื่ออัปเดต
        if (imageList !== undefined) {
            updateData.imageList = imageList; // อัปเดต `imageList`
        }

        await product.update(updateData);
        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product details' });
    }
});




router.post('/products/:productId/images', async (req, res) => {
    try {
        const productId = req.params.productId;
        const images = req.body.images || [];

        const product = await ProductTest.findOne({ where: { id: productId } });
        console.log('Received body:', req.body);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedImages = [...(product.images || []), ...images];
        await product.update({ images: updatedImages });

        res.status(200).json({ message: 'Images added successfully', images: updatedImages });
    } catch (error) {
        console.error('Error adding images:', error);
        res.status(500).json({ message: 'Error adding images' });
    }
});







module.exports = router;