const { User } = require('../configs/database');
const nodemailer = require('nodemailer');

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000); 
}

const sendOtp = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error("Email does not exist");
        }
        const otp = generateOTP();
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'savevever1@gmail.com',
                pass: 'bhdp jvok kvzv uqoz',
            },
        });
        const mailOptions = {
            from: 'savevever1@gmail.com',
            to: email,
            subject: 'Password reset OTP',
            text: `Your OTP (It will expire in 10 minutes): ${otp}`,
        };
        await transporter.sendMail(mailOptions);
        return { otp };
    } catch (error) {
        console.error('Error in sendOtp function:', error);
        throw error;
    }
}

module.exports = { sendOtp};
