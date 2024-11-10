<template>
    <div class="checkout">
        <h1 class="logo">การชำระเงิน | Chumchun OTOP</h1>

        <!-- ส่วนที่อยู่ -->
        <div class="address-section">
            <h2><font-awesome-icon :icon="['fas', 'map-location-dot']"  class="icons" />ที่อยู่การจัดส่ง</h2>
            <div v-if="Adressfilter.length" class="address">
                <div v-for="(address, index) in Adressfilter" :key="index" class="address-item">
                    <p>ชื่อ: {{ address.name }}</p>
                    <p>ที่อยู่: {{ address.address }}</p>
                    <p>ตำบล: {{ address.district }}</p>
                    <p>จังหวัด: {{ address.province }}</p>
                    <p>รหัสไปรษณีย์: {{ address.postalCode }}</p>
                    <!-- <p>อีเมล: {{ address.email }}</p> -->
                </div>

            </div>
            <p @click="showModal = true" style="text-decoration: underline; cursor: pointer; color: darkgreen; margin-left: 25px;">
                เปลี่ยน</p>

            <!-- </router-link> -->
        </div>
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <button @click="showModal = false" class="close-btn">×</button> <!-- ปุ่มปิดโมดัล -->
                <h2>กรอกข้อมูลที่อยู่</h2>
                <div id="location-right">
                    <h1>ที่อยู่</h1>
                    <div id="form">
                        <form v-if="!isSaved" action="">
                            <div class="row">
                                <div class="row-item">
                                    <label for="">ชื่อ-นามสกุล</label>
                                    <input type="text" v-model="name">
                                </div>
                                <div class="row-item">
                                    <label for="">เขต/อำเภอ</label>
                                    <input type="text" v-model="district">
                                </div>
                            </div>
                            <div class="row">
                                <div class="row-item">
                                    <label for="">รหัสไปรษณีย์</label>
                                    <input type="text" v-model="postalCode">
                                </div>
                                <div class="row-item">
                                    <label for="">จังหวัด</label>
                                    <input type="text" v-model="province">
                                </div>
                            </div>
                            <div class="row">
                                <div class="row-item">
                                    <label for="">บ้านเลขที่,ซอย,หมู่, ถนน,แขวง/ตำบล</label>
                                    <input type="text" v-model="address">
                                </div>
                                <div class="row-item">
                                    <label for="">เบอร์</label>
                                    <input type="text" v-model="number">
                                </div>
                            </div>
                        </form>

                        <div v-else>
                            <!-- Display saved address data -->
                            <div class="row">
                                <div class="row-item2">
                                    <strong>ชื่อ-นามสกุล: </strong>{{ name }}
                                </div>
                                <div class="row-item2">
                                    <strong>เขต/อำเภอ: </strong>{{ district }}
                                </div>
                            </div>
                            <div class="row">
                                <div class="row-item2">
                                    <strong>รหัสไปรษณีย์: </strong>{{ postalCode }}
                                </div>
                                <div class="row-item2">
                                    <strong>จังหวัด: </strong>{{ province }}
                                </div>
                            </div>
                            <div class="row">
                                <div class="row-item2">
                                    <strong>บ้านเลขที่,ซอย,หมู่,ถนน,แขวง/ตำบล: </strong>{{ address }}
                                </div>
                                <div class="row-item2">
                                    <strong>เบอร์โทร: </strong>{{ number }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="map-container">
                        <mapAdress></mapAdress>
                    </div>
                    <div id="location-button">
                        <button v-if="!isSaved && !hasAddress" @click="createAddress"
                            class="payment-button">บันทึก</button>
                        <button v-if="!isSaved && hasAddress" @click="updateAddress"
                            class="payment-button">อัปเดต</button>
                        <button v-if="isSaved" @click="editAddress" class="payment-button">แก้ไข</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-details-section">
            <div class="details">
                <h2>สั่งซื้อสินค้าแล้ว</h2>

            </div>

            <div v-for="product in this.Orderfilter" :key="product.productId" class="itemm">
                <div class="line"></div>
                <div class="items">
                    <img :src="product.image" alt="" style="width: 70px; height: 70px; object-fit: cover;">
                    <div class="item-1">
                        <p><span>{{ product.nameProduct }}</span></p>
                        <div>
                            <p>ตัวเลือก:<span>{{ product.productTypes }}</span></p>
                        </div>
                    </div>
                    <div class="item-2">
                        <div class="item">
                            <p>ราคาต่อหน่วย</p><span>{{ product.price }}</span>
                        </div>
                        <div class="item">
                            <p>จำนวน</p><span>{{ product.quantity }}</span>
                        </div>
                        <div class="item">
                            <p>ราคา</p>
                            <span>{{ calculateLinePrice(product).toFixed(2) }} บาท</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="product-details-section">
            <receiptComponent :orderFilter="Orderfilter" />
        </div> -->
        <div class="payment-section">
            <div class="payment">
                <h2>ชำระเงิน</h2>
                <!-- <div class="line"></div> -->
                <div class="pay">
                    <div class="pay-item">
                        <p>รวมการสั่งซื้อ:<span class="tax-amount">฿{{ calculateTotalPrice() }}</span></p>
                    </div>
                    <div class="pay-item">
                        <p>การจัดส่ง:<span class="tax-amount">฿0</span></p>
                    </div>

                    <div class="pay-item">
                        <p>ภาษี7%:<span class="tax-amount">฿{{ calculateVAT() }}</span></p>
                    </div>
                    <div class="pay-item">
                        <p>ยอดชำระเงินทั้งหมด:<span class="tax-amount">฿{{ Tax() }}</span></p>
                    </div>
                    <button @click="handleClick()" :disabled="!Adressfilter.length"
                        class="payment-button">ชำระเงิน</button>
                </div>

            </div>

        </div>
    </div>
    <footerComponent></footerComponent>
</template>

<script>
// import receiptComponent from './page/receipt-component.vue';
// import receiptComponent from './receipt-component.vue';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
// import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far);
export default {
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
            Adressfilter: [],
            Orderfilter: [],
            showModal: false,
            name: "",
            district: "",
            postalCode: "",
            province: "",
            number: "",
            address: "",
            userEmail: '',
            // ispost: false,
            isSaved: false,
            hasAddress: false
            // Orderfilter: []
        };
    }, async mounted() {
        // this.handleRedirectToLocalhost();
        await this.loadCart()
        await this.loadOrder()
        this.getAddress();
    },
    methods: {
        createAddress() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user.email;
            const addressData = {
                name: this.name,
                district: this.district,
                postalCode: this.postalCode,
                province: this.province,
                address: this.address,
                email: userEmail,
                number: this.number
            };

            axios.post('http://localhost:8081/users/address', addressData)
                .then(response => {
                    console.log("Address created:", response.data);
                    this.isSaved = true;
                    this.hasAddress = true;
                })
                .catch(error => {
                    console.error("Error creating address:", error.response ? error.response.data : error);
                });
        },

        updateAddress() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user.email;
            const addressData = {
                name: this.name,
                district: this.district,
                postalCode: this.postalCode,
                province: this.province,
                address: this.address,
                email: userEmail,
                number: this.number
            };
            console.log("hasAddress", this.hasAddress);

            axios.put('http://localhost:8081/users/address', addressData)
                .then(response => {
                    console.log("Address updated:", response.data);
                    this.isSaved = true;
                })
                .catch(error => {
                    console.error("Error updating address:", error.response ? error.response.data : error);
                });
        },

        getAddress() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user.email;

            axios.get(`http://localhost:8081/users/address?email=${userEmail}`)
                .then(response => {
                    if (response.data) {
                        const addressData = response.data;
                        this.name = addressData.name;
                        this.district = addressData.district;
                        this.postalCode = addressData.postalCode;
                        this.province = addressData.province;
                        this.address = addressData.address;
                        this.number = addressData.number;
                        this.isSaved = true;
                        if (addressData.name !== undefined && addressData.email === userEmail) {
                            this.hasAddress = true;
                        }
                    } else {
                        this.hasAddress = false;
                    }
                    console.log("hasAddress", this.hasAddress);
                })

                .catch(error => {
                    console.error("Error retrieving address:", error.response ? error.response.data : error);
                });
        },

        editAddress() {
            this.isSaved = false;
        },
        handleClick() {
            this.addToHistoryClicked();
            // this.$emit('orderCompleted', this.Orderfilter);
            this.payment();
        },
        addToHistoryClicked() {
            this.Orderfilter.forEach(product => {
                const calculatedPrice = this.calculateLinePrice(product).toFixed(2);
                const productData = {
                    productId: product.productId,
                    nameProduct: product.nameProduct,
                    price: calculatedPrice,
                    quantity: product.quantity,
                    image: product.image,
                    email: product.email,
                    shopId: product.shopId,
                    productTypes: product.productTypes,
                    Orderid: product.Orderid,
                };
                console.log("productData", productData.Orderid);
                // axios.put(`http://localhost:8081/selling/updateProduct/${productData.productId}`, {
                //     totalSell: parseInt(productData.quantity),
                //     totalPrice: parseFloat(productData.price) * parseInt(productData.quantity)
                // })
                //     .then(response => {
                //         console.log("Product added to history:", response.data);
                //     })
                //     .catch(error => {
                //         console.error("Error details:", error.response.data);
                //     });
                axios.post('http://localhost:8081/products/OrderHistory', {
                    Orderid: productData.Orderid,
                    productId: productData.productId,
                    nameProduct: productData.nameProduct,
                    image: productData.image,
                    email: productData.email,
                    shopId: productData.shopId,
                    price: productData.price,
                    quantity: productData.quantity,
                    productTypes: productData.productTypes,
                }).then(response => {
                    console.log("❤❤❤❤❤:", response.data);
                })
                    .catch(error => {
                        console.error("เกิดข้อผิดพลาดในการสร้าง Entry ใน history:", error, productData.Orderid);
                    });
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    throw new Error('User not found in localStorage');
                }
                const userEmail = user.email;
                if (!userEmail) {
                    throw new Error('User email not found');
                }
                const selectedIds = this.Orderfilter.map(order => order.Orderid).join(',');
                axios.post('http://localhost:8081/users/recipes', { email: userEmail, Orderid: selectedIds })
                    .then(response => {
                        console.log("⭕⭕⭕", response.data);
                    })
                    .catch(error => {
                        console.error("เกิดข้อผิดพลาดในการสร้าง recipes ใน recipes:", error.response ? error.response.data : error);
                    });
                axios.post('http://localhost:8081/products/createHistoryEntry', productData)
                    .then(response => {
                        console.log("สร้าง Entry ใน history สำเร็จ:", response.data);

                    })
                    .catch(error => {
                        console.error("เกิดข้อผิดพลาดในการสร้าง Entry ใน history:", error.response ? error.response.data : error);
                    });
                axios.post('http://localhost:8081/products/createHistoryEntrySeller', productData)
                    .then(response => {
                        console.log("สร้าง Entry ใน historySeller สำเร็จ:", response.data);
                    }).catch(error => {
                        console.error("เกิดข้อผิดพลาดในการสร้าง Entry ใน historySeller:", error.response ? error.response.data : error);
                    });
            });
        }
        , calculateVAT() {
            const totalPrice = parseFloat(this.calculateTotalPrice());  // แปลงค่าเป็นตัวเลข
            const vat = totalPrice * 0.07;  // คำนวณ VAT 7%
            return vat.toFixed(2);  // คืนค่าภาษี 7% ที่คำนวณได้ในรูปแบบทศนิยม 2 ตำแหน่ง
        }, calculateTotalPrice() {
            return this.Orderfilter.reduce((total, product) => {
                return total + this.calculateLinePrice(product);
            }, 0).toFixed(2);
        }, Tax() {
            const subtotal = this.Orderfilter.reduce((total, product) => {
                return total + this.calculateLinePrice(product);
            }, 0);
            const totalWithVAT = subtotal * 1.07;
            return Math.round(totalWithVAT); // ปัดเศษเป็นจำนวนเต็ม
        },

        payment() {
            const selectedIds = this.Orderfilter.map(order => order.Orderid).join(',');
            console.log("selectedIds", selectedIds);
            // const totalAmount = this.Orderfilter
            //     .reduce((sum, order) => sum + this.calculateLinePrice(order), 0)
            //     .toFixed(2);
            // console.log("Total amount:", totalAmount);
            // const invoiceNo = uuidv4();

            axios.post('http://localhost:8081/2c2p/paymentToken', {
                // invoiceNo: selectedIds,
                amount: this.Tax(),
                // userDefined1: invoiceNo
            })
                .then(paymentResponse => {
                    // console.log('Full payment response:', paymentResponse.data);
                    const payloadObject = paymentResponse.data;
                    const payload = payloadObject.payload?.payload?.toString();
                    // console.log('Payload received from 2C2P:', payload);

                    if (typeof payload === 'string') {
                        const decoded = jwtDecode(payload);
                        // console.log('Decoded JWT:', decoded);
                        const webPaymentUrl = decoded.webPaymentUrl;
                        if (webPaymentUrl) {
                            // this.clearCart();
                            window.location.href = webPaymentUrl;
                        } else {
                            alert('ไม่พบลิงก์สำหรับการจ่ายเงินใน Payload');
                        }
                    } else {
                        alert('เกิดข้อผิดพลาดในการประมวลผล payment token');
                    }
                })
                .catch(error => {
                    if (error.response) {
                        console.error('Error processing payment token:', error.response.data);
                    } else {
                        console.error('Error processing payment token:', error.message);
                    }
                    alert('เกิดข้อผิดพลาดในการประมวลผล payment token');
                });
        },
        calculateLinePrice(product) {
            return product.price * product.quantity;
        }, showReceipt(orderData) {
            this.orderData = orderData;
        },
        async loadOrder() {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    throw new Error('User not found in localStorage');
                }
                const userEmail = user.email;
                if (!userEmail) {
                    throw new Error('User email not found');
                }

                const response = await axios.get('http://localhost:8081/products/getProductTestOrder');
                // console.log("response", response);

                const Adress = Array.isArray(response.data) ? response.data : [response.data];
                this.Orderfilter = Adress.filter(entry => entry.email === userEmail);
                console.log("this.Orderfilter", this.Orderfilter);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        },

        async loadCart() {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    throw new Error('User not found in localStorage');
                }
                const userEmail = user.email;
                if (!userEmail) {
                    throw new Error('User email not found');
                }
                const response = await axios.get(`http://localhost:8081/users/address?email=${userEmail}`);
                const Adress = Array.isArray(response.data) ? response.data : [response.data];
                this.Adressfilter = Adress
                // console.log(this.Adressfilter);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }
        ,

    }
};
</script>

<style scoped>
.address {
    display: flex;
}

.address-item {
    padding-left: 20px;
    display: flex;
    gap: 20px;
    width: 90%;
    /* margin-right: 20px; */
}



.checkout {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.items {
    display: flex;
    height: 88px;
    align-items: center;
    justify-content: space-around;
}

.item {
    /* height: 200px; */
    display: flex;
    align-items: center;
    /* flex-direction: column; */
    gap: 10px;
    width: 150px;
    /* padding-bottom: 30px;  */
    /* align-items: center; */
    /* text-align: center; */
}

.line {
    width: 100%;
    height: 2px;
    background-color: rgb(179, 172, 172);
    margin: 20px 0 10px 0;
}

.product {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}

.address-section,
.product-details-section,
.payment-section {
    /* display: flex; */
    margin-bottom: 20px;
    background-color: #ffffff;
    padding: 1rem 1.5rem;
    width: 70%;
}

.details {
    display: flex;
    align-items: center;
}
.logo  {
    text-decoration: none;
    /* color: #201658; */
    color: #e67700;
    /* font-size: 20px; */
    font-family: 'Poetsen One', sans-serif;
}

.logo :hover {
    text-decoration: underline;
}
.item-2 {
    display: flex;
    gap: 15px;
    margin-left: 100px;
    align-items: center;
}

.item-1 {
    margin-left: 20px;
    display: flex;
    align-items: center;
    gap: 2rem;
}

.item-1 p {
    display: flex;
    width: 100px;
    align-items: center;
}

/* .item-1 span {
    font-size: 24px;
} */
.payment-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* แก้ไขจาก align-items: flex-end เป็น align-items: flex-start เพื่อให้ยืดด้านขวา */
    margin-bottom: 20px;
    background-color: #ffffff;
    padding: 1rem 1.5rem;
    width: 70%;
}

.payment {
    max-width: 500px;
    width: 100%;
    text-align: right;
    margin-left: auto;
    /* ทำให้ .payment ชิดด้านขวาใน .payment-section */
}

.pay-item {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
}

.pay-item p {
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.icons{
    color: #007bff;
    margin-right: 10px;
}
.price {
    margin-left: auto;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
    max-width: 100%;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

/* ************* */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
    position: relative;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    font-size: 30px;
    cursor: pointer;
    color: #888;
}

.close-btn:hover {
    color: #f00;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.address-form .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}

.row-item {
    flex: 1;
    margin-right: 10px;
}

.row-item:last-child {
    margin-right: 0;
}

.row-item input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 5px;
}

.row-item input::placeholder {
    font-size: 14px;
    color: #aaa;
}

.save-address-btn {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 15px;
}

.save-address-btn:hover {
    background-color: #45a049;
}

.saved-address .row {
    margin-bottom: 15px;
}

.row-item2 {
    font-size: 16px;
    color: #333;
    margin-bottom: 5px;
    background-color: #f9f9f9;
    padding: 8px;
    border-radius: 4px;
}

.change-address-btn {
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
    margin-top: 10px;
}

.change-address-btn:hover {
    color: #0056b3;
}

.payment-button {
    color: #ffffff;
    background-color: #009721;
    border: 1px solid #006426;
    padding: 7px 15px;
    margin-top: 20px;
}

</style>