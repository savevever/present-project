<template>
    <div>
        <ul id="menu-form">
            <li class="form1">ข้อมูลร้านค้า</li>
            <li class="form2">ยืนยันตัวตน</li>
            <li class="form3">ข้อมูลเพิ่มเติม</li>
            <li class="form4">ส่งแบบฟอร์ม</li>
        </ul>
        <div id="form1">
            <div class="formbox">
                <label class="section">ชื่อร้านค้า :</label>
                <input type="text" ref="shopName" id="shop-name" name="shop-name" class="input-form" placeholder="Name"
                    v-model="user.name" @input="clearShopNameError" />
            </div>
            <div class="formbox">
                <label class="section">อีเมล :</label>
                <a id="email">{{ user.email }}</a>
            </div>
            <div class="formbox">
                <label class="section">หมายเลขโทรศัพท์ :</label>
                <input type="tel" ref="phoneNumber" id="phone-number" name="phone-number" class="input-form"
                    placeholder="Phone Number" minlength="10" maxlength="10" v-model="phoneNumber"
                    @input="handlePhoneInput" />
                <p id="phone-error" ref="phoneError" v-if="phoneError" style="color: red">
                    หมายเลขโทรศัพท์ต้องมี 10 หลักและเป็นตัวเลขเท่านั้น
                </p>
            </div>
            <p id="form1-error" ref="formError" class="error-message" v-if="form1Error">
                กรุณากรอกข้อมูลให้ครบถ้วน
            </p>
            <button type="button" class="btn" @click="redirectToFormTwoSeller">
                ถัดไป
            </button>
        </div>
    </div>
</template>


<script>
import axios from "axios";

export default {
    data() {
        return {
            user: {
                name: "",
                email: "",
            },
            phoneNumber: '',
            phoneError: false,
            form1Error: false,
            shopNameError: false,
            shopName: '' 
        };
    },
    created() {
        this.getUserName();
    },
    methods: {
        getUserName() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                this.user.name = user.name;
                this.user.email = user.email;
                this.userId = user.id;
            }
        },
        validatePhoneNumber() {
            if (
                this.phoneNumber.trim() !== "" &&
                !isNaN(this.phoneNumber) &&
                this.phoneNumber.length === 10
            ) {
                this.phoneError = false;
                return true;
            } else {
                this.phoneError = true;
                return false;
            }
        },
        validateForm1() {
            const shopName = this.user.name.trim();
            const phoneNumber = this.phoneNumber.trim();
            let isValid = true;

            this.form1Error = false;
            this.shopNameError = false;
            this.phoneError = false;

            if (shopName === '') {
                this.$refs.shopName.classList.add('input-error');
                this.shopNameError = true;
                isValid = false;
            } else {
                this.$refs.shopName.classList.remove('input-error');
            }

            if (phoneNumber === '' || phoneNumber.length !== 10 || isNaN(phoneNumber)) {
                this.$refs.phoneNumber.classList.add('input-error');
                this.phoneError = true;
                isValid = false;
            } else {
                this.$refs.phoneNumber.classList.remove('input-error');
                this.phoneError = false;
            }

            if (!isValid) {
                this.form1Error = true;
                if (this.$refs.formError) {
                    this.$refs.formError.style.display = "block";
                }
            } else {
                if (this.$refs.formError) {
                    this.$refs.formError.style.display = "none";
                }
            }

            return isValid;
        },
        clearForm1Error() {
            this.form1Error = false;
            if (this.$refs.formError) {
                this.$refs.formError.style.display = "none";
            }
        },
        clearShopNameError() {
            this.shopNameError = false;
            this.clearForm1Error();
            if (this.$refs.shopName) {
                this.$refs.shopName.classList.remove('input-error');
            }
        },
        handlePhoneInput() {
            this.validatePhoneNumber();
            this.clearForm1Error();
            if (!this.phoneError) {
                if (this.$refs.phoneNumber) {
                    this.$refs.phoneNumber.classList.remove('input-error');
                }
            }
        },
        getFormOneData() {
            const data1 = {
                shopName: this.user.name,
                email: this.user.email,
                phoneNumber: this.phoneNumber
            };

            axios.post('http://localhost:8081/shop/register-shop', data1)
                .then(response => {
                    console.log(response.data);
                    this.shopId = response.data.data.shopId; 
                    this.shopName = response.data.data.shopName;
                })
                .catch(error => {
                    console.error('Error saving data:', error);
                });
        },
        redirectToFormTwoSeller() {
            if (this.validateForm1()) {
                //this.saveDataJson();
                this.getFormOneData();
                console.log(this.validateForm1());
                this.$router.push("/selling/FormTwoSeller");
            }
        }
    }
};
</script>

<style scoped>
#menu-form {
    padding: 15px;
    list-style-type: none;
    overflow: hidden;
    justify-content: space-around;
    display: flex;
    color: #a9a9a9;
}

.form1 {
    color: red;
}

.red-text {
    color: red;
}


#form1 {
    margin: auto;
    width: 80%;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 10px;
    border-radius: 5px;
}

#email {
    font-size: 20px;
}

.formbox {
    margin: 2% auto;
}

.input-form {
    width: 180px;
    height: 30px;
    padding: 5px;
    color: #383838;
}

.section {
    padding-right: 10px;
    margin: 0.5% auto;
}

.btn {
    padding: 7px;
    width: 100px;
    font-size: 17px;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0.2, 0.3);
    cursor: pointer;
    border: none;
    background-color: #b99470;
    color: white;
    margin: 1.5% auto;
}

.btn:hover {
    background-color: #eccbaa;
    color: black;
}

#address-details,
#address-details1 {
    height: 100px;
    box-sizing: border-box;
    width: 60%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    overflow-wrap: auto;
}

.section {
    font-family: "Times New Roman", Times, serif;
    font-size: 15px;
    margin-bottom: 10px;
}

.start {
    font-size: 15px;
}

.input-error {
    border: 1px solid red;
}

.error-message {
    color: red;
}
</style>
