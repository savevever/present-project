<template>
    <div class="otp-container">
        <h2>Verify OTP</h2>
        
        <!-- Step 1: Input email -->
        <div v-if="!emailEntered">
            <form @submit.prevent="enterEmail">
                <div class="input-group">
                    <label for="email">Enter Email:</label>
                    <input type="email" id="email" v-model="email" required />
                </div>
                <button type="submit">Submit Email</button>
                <p v-if="message" :class="messageType">{{ message }}</p>
            </form>
        </div>

        <!-- Step 2: Send OTP -->
        <div v-else-if="!otpSent">
            <button @click="sendOtp">Send OTP</button>
        </div>

        <!-- Step 3: Verify OTP -->
        <div v-else-if="!otpVerified">
            <form @submit.prevent="verifyOtp">
                <div class="input-group">
                    <label for="otp">Enter OTP:</label>
                    <input type="text" id="otp" v-model="otp" required />
                </div>
                <button type="submit">Verify OTP</button>
                <p v-if="message" :class="messageType">{{ message }}</p>
            </form>
        </div>

        <!-- Step 4: Update Password -->
        <div v-else>
            <form @submit.prevent="submitPassword">
                <div class="input-group">
                    <label for="password">New Password:</label>
                    <input type="password" id="password" v-model="password" required />
                </div>
                <div class="input-group">
                    <label for="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" v-model="confirmPassword" required />
                </div>
                <button type="submit">Submit Password</button>
                <p v-if="message" :class="messageType">{{ message }}</p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            otp: '',
            password: '',
            confirmPassword: '',
            message: '',
            messageType: '',
            emailEntered: false,
            otpSent: false,
            otpVerified: false
        };
    },
    methods: {
        // Method to enter email
        enterEmail() {
            if (this.email) {
                this.emailEntered = true;
            } else {
                this.message = 'Please enter a valid email.';
                this.messageType = 'error';
            }
        },

        // Method to send OTP
        async sendOtp() {
            try {
                await axios.post('http://localhost:8081/users/forgotpassword', { email: this.email });

                this.message = 'OTP sent successfully. Please check your email.';
                this.messageType = 'success';
                this.otpSent = true;

            } catch (error) {
                this.message = error.response.data.message || 'Error sending OTP';
                this.messageType = 'error';
            }
        },

        // Method to verify OTP
        async verifyOtp() {
            try {
                const OTP = parseInt(this.otp);
                const productData = {
                    email: this.email,
                    OTP: OTP,
                };
                const response = await axios.post('http://localhost:8081/users/forgotpassword', productData);
                this.message = response.data.message;
                this.messageType = 'success';
                console.log("success");
                this.otpVerified = true;

            } catch (error) {
                this.message = error.response.data.message || 'Error verifying OTP';
                this.messageType = 'error';
            }
        },

        // Method to submit password
        async submitPassword() {
            if (this.password !== this.confirmPassword) {
                this.message = "Passwords do not match";
                this.messageType = "error";
                return;
            }

            try {
                const passwordData = {
                    email: this.email,
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                };
                const response = await axios.put('http://localhost:8081/users/updatepassword', passwordData);
                
                this.message = response.data.message;
                this.messageType = 'success';
                window.location.href = "http://localhost:8080/users/login"
            } catch (error) {
                this.message = error.response.data.message || 'Error updating password';
                this.messageType = 'error';
            }
        }
    },
};
</script>

<style scoped>
* {
    font-family: 'Nunito', sans-serif;
}

.otp-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    /* font-family: 'Arial', sans-serif; */
    text-align: center;
}

.otp-container h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
}

.input-group {
    margin-bottom: 20px;
    text-align: left;
}

.input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: normal;
    color: #555;
}

.input-group input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    transition: 0.3s;
}

.input-group input:focus {
    border-color: #11355b;
    outline: none;
}

button {
    width: 40%;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: bold;
    color: #000000;
    background-color: #fdc78c;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #ffab52;
}

.success {
    color: #28a745;
    font-weight: bold;
    margin-top: 10px;
}

.error {
    color: #dc3545;
    font-weight: bold;
    margin-top: 10px;
}

@media (max-width: 480px) {
    .otp-container {
        padding: 15px;
    }

    .otp-container h2 {
        font-size: 20px;
    }

    button {
        padding: 8px 10px;
        font-size: 14px;
    }
}

</style>