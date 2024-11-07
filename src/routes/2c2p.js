const axios = require('axios');
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
// const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');
const { Payment } = require('../configs/database');

const secretKey = 'CD229682D3297390B9F66FF4020B758F4A5E625AF4992E5D75D311D6458B38E2';

const base64UrlEncode = (str) => {
    return Buffer.from(str)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};
// ฟังก์ชันถอดรหัส JWT
// Create JWT token
const createJWT = (header, payload, secret) => {
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    console.log("Header (Before Encoding):", JSON.stringify(header));
    console.log("Payload (Before Encoding):", JSON.stringify(payload));
    const signatureBase = `${encodedHeader}.${encodedPayload}`;
    const signature = crypto.createHmac('sha256', secret)
        .update(signatureBase)
        .digest('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    const jwtToken = `${encodedHeader}.${encodedPayload}.${signature}`;
    console.log("Complete JWT Token:", jwtToken);
    return jwtToken;
};
// สร้าง Payment Token โดยการส่งคำร้องไปยัง 2C2P API
const createPaymentToken = async (amount,userDefined1,invoiceNo) => {
    const header = {
        alg: "HS256",
        typ: "JWT"
    };
    // const invoiceNo = crypto.randomUUID();

    const payloadData = {
        iss: "Online JWT Builder",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
        aud: "www.example.com",
        sub: "jrocket@example.com",
        merchantID: "JT04",
        invoiceNo: invoiceNo,
        description: "test",
        amount: amount,
        userDefined1: userDefined1,
        currencyCode: "THB",
        frontendReturnUrl: `${process.env.VUE_APP_NGROK_URL}receiptComponent`,
        backendReturnUrl: `${process.env.VUE_APP_NGROK_URL}2c2p/callback`,
        
    };
    console.log("userDefined1:", userDefined1);
    const token = createJWT(header, payloadData, secretKey);
    try {
        const response = await axios.post('https://sandbox-pgw.2c2p.com/payment/4.3/paymentToken', {
            payload: token
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Payment API Response:", response.data);
        return response.data;
    } catch (error) {
        // Log the error for better debugging
        if (error.response) {
            console.error('Error creating payment token:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        } else {
            console.error('Error creating payment token:', error.message);
        }
        throw new Error('Failed to create payment token');
    }
};

router.post('/callback', async (req, res) => {
    console.log("/callback");
    const payload = req.body.payload;
    console.log('POST request payload:', payload);
    try {
        const decoded = jwtDecode(payload);
        console.log("Decoded JWT:", decoded);
        const newPaymentEntry = await Payment.create({
            accountNo: decoded.accountNo || null,
            customerToken: decoded.customerToken || null,
            customerTokenExpiry: decoded.customerTokenExpiry || null,
            loyaltyPoints: decoded.loyaltyPoints || null,
            uniqueAccountReference: decoded.uniqueAccountReference || null,
            childMerchantID: decoded.childMerchantID || null,
            processBy: decoded.processBy,
            paymentID: decoded.paymentID,
            schemePaymentID: decoded.schemePaymentID || null,
            merchantID: decoded.merchantID,
            invoiceNo: decoded.invoiceNo,
            amount: parseFloat(decoded.amount),
            monthlyPayment: decoded.monthlyPayment || null,
            userDefined1: decoded.userDefined1 ,
            userDefined2: decoded.userDefined2 || null,
            userDefined3: decoded.userDefined3 || null,
            userDefined4: decoded.userDefined4 || null,
            userDefined5: decoded.userDefined5 || null,
            currencyCode: decoded.currencyCode,
            recurringUniqueID: decoded.recurringUniqueID || null,
            tranRef: decoded.tranRef,
            referenceNo: decoded.referenceNo || null,
            approvalCode: decoded.approvalCode || null,
            eci: decoded.eci || null,
            transactionDateTime: decoded.transactionDateTime,
            agentCode: decoded.agentCode || null,
            channelCode: decoded.channelCode || null,
            issuerCountry: decoded.issuerCountry || null,
            issuerBank: decoded.issuerBank || null,
            installmentMerchantAbsorbRate: decoded.installmentMerchantAbsorbRate || null,
            cardType: decoded.cardType || null,
            idempotencyID: decoded.idempotencyID || null,
            paymentScheme: decoded.paymentScheme || null,
            displayProcessingAmount: decoded.displayProcessingAmount || false,
            respCode: decoded.respCode,
            respDesc: decoded.respDesc || null
        });

        console.log("Payment entry created successfully");
        console.log(newPaymentEntry);
        res.status(200).json({ redirectUrl: '/users/PurchaseHistory' });
    } catch (error) {
        console.error('Error processing payment:', error.message);
        res.status(500).send('Failed to process payment');
    }
});


router.get('/', (req, res) => {
    const payload = req.query.payload || req.body.payload;
    console.log('GET request payload:', payload);
    res.status(200).send('payment success');
});
router.post('/paymentToken', async (req, res) => {
    try {
        const { amount, invoiceNo,userDefined1  } = req.body;
        const paymentResponse = await createPaymentToken(amount, invoiceNo,userDefined1 );
        console.log('Received payment response:', paymentResponse);
        res.status(200).json({ payload: paymentResponse });
    } catch (err) {
        console.error('Error processing payment token:', err);
        res.status(500).json({ message: 'Failed to process payment token' });
    }
});

module.exports = router;