<template>
    <div id="login-form" class="login-page">
        <div class="form-box">
            <div class="title">
                <h2>สมัครสมาชิก</h2>
            </div>
            <div v-if="messages.error.length" class="msg">
                {{ messages.error }}
            </div>
            <div v-if="messages.success_msg" class="msg-success">
                {{ messages.success_msg }}
            </div>
            <form @submit.prevent="registerUser" class="input-group-register">
                <div class="user-box">
                    <input type="text" v-model="name" name="name" class="input-field" required />
                    <label>ชื่อ</label>
                </div>
                <div class="user-box">
                    <input type="email" v-model="email" name="email" class="input-field" required />
                    <label>อีเมล</label>
                </div>
                <div class="user-box">
                    <input type="password" v-model="password" name="password" class="input-field" required />
                    <label>รหัสผ่าน</label>
                </div>
                <div class="user-box">
                    <input type="password" v-model="ConfirmPassword" name="ConfirmPassword" class="input-field"
                        required />
                    <label>ยืนยันรหัสผ่าน</label>
                </div>
                <div class="login">
                    <router-link to="/users/login">
                        <p>เข้าสู่ระบบ</p>
                    </router-link>
                </div>
                <button type="submit" class="submit-btn">Register</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            ConfirmPassword: '',
            messages: {
                error: [],
                success_msg: ''
            },
        };
    },
    // git remote add origin https://github.com/savevever/blalala.git
    methods: {
        registerUser() {
            this.messages.error = [];
            this.messages.success_msg = '';

            if (this.password !== this.ConfirmPassword) {
                this.messages.error  = 'Passwords do not match.';
            }
            if (this.password.length < 6) {
                this.messages.error = 'Password must be at least 6 characters long.';
            }

            if (this.messages.error.length) {
                return;
            }

            axios.post('http://localhost:8081/users/register', {
                name: this.name,
                email: this.email,
                password: this.password,
                // ConfirmPassword: this.ConfirmPassword
            })
                .then(response => {
                    console.log(response.data);
                    this.messages.success_msg = 'Registration successful!';
                    this.messages.error = '';

                    setTimeout(() => {
                        this.$router.push('/users/Loading');
                        setTimeout(() => {
                            this.$router.push('/users/login');
                        }, 2000);
                    }, 900);

                })
                .catch(error => {
                    console.error('Error:', error);
                    this.messages.error = 'An error occurred. Please try again.';
                    this.messages.success_msg = '';
                });
        }

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
    padding: 5px;
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
    margin-top: 6px;
}

.msg, .msg-success {
    padding: 10px;
    font-family: sans-serif;
    color: black;
    background-color: #fa7070;
    font-size: 10px;
    border-radius: 10px;
    display: inline-block;
    margin: 0 5px;
}

.msg-success {
    background-color: #70fa99;
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

.login {
    padding: 0px;
    font-family: sans-serif;
    text-align: center;
}

.login a {
    color: #044d0d;
    font-size: 13px;
    font-style: italic;
    text-decoration: none;
}

.login a:hover {
    text-decoration: underline;
}

.input-group-register .user-box {
    position: relative;
}

.input-group-register {
    top: 110px;
    position: absolute;
    width: 200px;
    transition: 0.5s;
}

.input-group-register .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 13px;
    margin-bottom: 15px;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    background: transparent;
}

.input-group-register .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 15px 0;
    font-size: 14px;
    color: #333333;
    pointer-events: none;
    transition: 0.5s;
}

.input-group-register .user-box input:focus~label,
.input-group-register .user-box input:valid~label {
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
</style>