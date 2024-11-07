<template>
    <div id="login-form" class="login-page">
        <div class="form-box">
            <div class="title">
                <h2>เข้าสู่ระบบ</h2>
            </div>
            <div class="msg-box " v-if="messages.success_msg">
                <div class="msg success">{{ messages.success_msg }}</div>
            </div>
            <div class="msg-box" v-if="messages.error">
                <div class="msg">{{ messages.error }}</div>
            </div>
            <form @submit.prevent="login" class="input-group-login">
                <div class="user-box">
                    <input type="email" v-model="email" class="input-field" @input="clearMessages" required />
                    <label>อีเมล</label>
                </div>
                <div class="user-box">
                    <input type="password" v-model="password" class="input-field" @input="clearMessages" required />
                    <label>รหัสผ่าน</label>
                </div>
                <div class="login-register">
                    <a href="/users/register" class="formregister">สมัครสมาชิก</a>
                </div>
                <div class="forgotPassword">
                    <a href="/users/OTP" class="formregister">ลืมรหัสผ่าน</a>
                </div>
                <button type="submit" class="submit-btn">Log in</button>
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
            password: '',
            messages: {
                success_msg: '',
                error: ''
            },
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:8081/users/login', {
                    email: this.email,
                    password: this.password
                });

                if (response.status === 200 && response.data.token) {
                    this.messages.success_msg = response.data.message;
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));

                    setTimeout(() => {
                        this.$router.push('/users/Loading');
                        setTimeout(() => {
                            window.location.href = "http://localhost:8080";
                        }, 2000);
                    }, 800);
                    // window.location.href = "http://localhost:8080";

                } else {
                    this.messages.error = response.data.message;
                }
            } catch (error) {
                console.error('Error:', error);
                this.messages.error = 'An error occurred. Please try again.';
                this.messages.success_msg = '';
            }
        },
        clearMessages() {
            this.messages.success_msg = '';
            this.messages.error = '';
        },
    }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Poetsen+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap');

@media screen and (max-width: 768px) {
    .head {
        height: 100%;
    }
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Noto Sans Thai", serif;
}

body {
    overflow: hidden;
    /* ป้องกันการเลื่อนแนวนอนเมื่อย่อหน้า */
}

.form-box {
    width: 300px;
    height: 400px;
    position: relative;
    margin: 2% auto;
    background: #fff5ee;
    padding: 10px;
    overflow: hidden;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    transition: opacity 0.5s ease;
}

.title {
    font-family: "Poetsen One", sans-serif;
    font-style: normal;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 10px;
}

.msg-box {
    width: 80%;
    margin: 15px auto 0;
    text-align: center;
}

.msg {
    padding: 10px;
    background-color: #fa7070;
    font-family: sans-serif;
    color: black;
    text-align: center;
    font-size: 10px;
    border-radius: 10px;
}

.user-box {
    position: relative;
}

.input-field {
    width: 100%;
    padding: 10px 0;
    font-size: 13px;
    margin-bottom: 15px;
    border: none;
    border-bottom: 1px solid black;
    background: transparent;
}

.input-group-login .user-box {
    position: relative;
}

.input-group-login {
    top: 120px;
    position: absolute;
    width: 200px;
    transition: 0.5s;
}

.input-group-login .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 13px;
    margin-bottom: 15px;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    background: transparent;
}

.input-group-login .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 15px 0;
    font-size: 14px;
    color: #333333;
    pointer-events: none;
    transition: 0.5s;
}

.input-group-login .user-box input:focus~label,
.input-group-login .user-box input:valid~label {
    top: -25px;
    left: 0;
    color: #3269b6;
    font-size: 12px;
}

.submit-btn {
    width: 85%;
    padding: 10px 30px;
    cursor: pointer;
    display: block;
    margin: auto;
    background: #fdc78c;
    border: 0;
    outline: none;
    border-radius: 30px;
    transition: background-color 0.3s;
}

.submit-btn:hover {
    background: #b2a59b;
    color: white;
    box-shadow: 0 0 20px 9px #b7ada5;
}

.login-register {
    padding: 10px;
    font-family: sans-serif;
    text-align: center;
}

.login-register a {
    color: #044d0d;
    font-size: 13px;
    font-style: italic;
    text-decoration: none;
}

.login-register a:hover {
    text-decoration: underline;
}

.success {
    background-color: #2cb856;
}

.forgotPassword {
    padding: 20px;
}

.forgot-password {
    color: #1e2972;
    font-size: 14px;
    text-decoration: none;
}

.forgot-password:hover {
    text-decoration: underline;
}

</style>
