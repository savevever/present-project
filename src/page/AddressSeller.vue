<template>
    <div class="checkout">
        <h1>การชำระเงิน</h1>

        <!-- ส่วนที่อยู่ -->
        <div class="address-section">
            <h2>ที่อยู่การจัดส่ง</h2>
            <div v-if="Adressfilter.length" class="address">
                <div v-for="(address, index) in Adressfilter" :key="index" class="address-item">
                    <p>ชื่อ: {{ address.name }}</p>
                    <p>ที่อยู่: {{ address.address }}</p>
                    <p>ตำบล: {{ address.district }}</p>
                    <p>จังหวัด: {{ address.province }}</p>
                    <p>รหัสไปรษณีย์: {{ address.postalCode }}</p>
                    <!-- <p>อีเมล: {{ address.email }}</p> -->
                </div>
                <router-link to="/users/locationAdress">
                    <p>เปลี่ยน</p>
                </router-link>
            </div>
            <router-link v-else to="/users/locationAdress">
                <p>กรุณากรอกข้อที่อยู่</p>
            </router-link>
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
            <h2>การชำระเงิน</h2>
            <button @click="handleClick()"  :disabled="!Adressfilter.length"   class="payment-button">ชำระเงิน</button>
        </div>
    </div>
</template>

<script>
// import receiptComponent from './page/receipt-component.vue';
// import receiptComponent from './receipt-component.vue';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';

export default {
    components: {
        // receiptComponent
    },
    data() {
        return {
            Adressfilter: [],
            Orderfilter: [],
            // Orderfilter: []
        };
    }, async mounted() {
        // this.handleRedirectToLocalhost();
        await this.loadCart()
        await this.loadOrder()
    },
    methods: {
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
                axios.post('http://localhost:8081/users/recipes', { email:userEmail,Orderid:selectedIds })
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
        ,
        payment() {
            const selectedIds = this.Orderfilter.map(order => order.Orderid).join(',');
            console.log("selectedIds", selectedIds);
            const totalAmount = this.Orderfilter
                .reduce((sum, order) => sum + this.calculateLinePrice(order), 0)
                .toFixed(2);
            // console.log("Total amount:", totalAmount);
            const invoiceNo = uuidv4();

            axios.post('http://localhost:8081/2c2p/paymentToken', {
                invoiceNo:selectedIds ,
                amount: totalAmount,
                userDefined1: invoiceNo
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
        // async clearCart() {
        //     try {
        //         const user = JSON.parse(localStorage.getItem('user'));
        //         if (!user) {
        //             throw new Error('User not found in localStorage');
        //         }
        //         const userEmail = user.email;
        //         if (!userEmail) {
        //             throw new Error('User email not found');
        //         }

        //         await axios.delete('http://localhost:8081/products/DelProductTestOrder', {
        //             data: { email: userEmail }
        //         });

        //         // console.log('Cart items cleared for email:', userEmail);
        //     } catch (error) {
        //         console.error('Error clearing cart items:', error);
        //     }
        // },
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
        // handleRedirectToLocalhost() {
        //     const currentUrl = window.location.href;
        //     const expectedLocalhostUrl = 'http://localhost:8080/AddressSeller';
        //     console.log('Current URL:', currentUrl);
        //     if (currentUrl !== expectedLocalhostUrl) {
        //         window.location.href = expectedLocalhostUrl;
        //     }
        // },
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
    width: 80%;
    margin-right: 20px;
}
.payment-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
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
</style>