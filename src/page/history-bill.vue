<template>
    <div class="receipt">
        <div class="detail">
            <div class="itemLeft">
                <!-- <h2>Receipt</h2> -->
                <div class="seller">
                    <div v-for="shop in shopfilter" :key="shop.id">
                        <h2><strong>{{ shop.shopName }}</strong></h2>
                    </div>
                    <div v-for="shop in sellerfilter" :key="shop.id">
                        <p>{{ shop.addressDetail }}{{ shop.district }}{{ shop.province }} {{ shop.subDistrict
                            }}{{
                                shop.postalCode }}</p>
                    </div>
                    <!-- <p> เลขประจำตัวผู้เสียภาษี </p> -->
                    <div v-for="shop in shopfilter" :key="shop.id">
                        <p>{{ shop.phoneNumber }}</p>
                    </div>
                </div>
                <div class="user">
                    <h2>ลูกค้า</h2>
                    <p> {{ this.addressname }} </p>
                    <p> {{ this.addressaddress }} อ.{{ this.addressdistrict }} จ.{{ this.addressprovince }}</p>
                    <p>{{ this.addresspostalCode }} </p>
                </div>
            </div>
            <div class="itemRight">
                <h2>ใบกำกับภาษี/ใบเสร็จรับเงิน</h2>
                <div class="seller2">
                    <div v-for="shop in paymentfilter" :key="shop.id">
                        <p><strong>เลขที่ </strong>{{ shop.recipesid }}</p><span></span>
                    </div>
                    <div v-for="shop in paymentfilter" :key="shop.id">
                        <p><strong>วันที่ </strong>{{ shop.createdAt }} </p><span></span>
                    </div>
                </div>
                <!-- <div class="user2">
                    <div>
                        <p> ชื่องาน </p><span></span>
                    </div>
                    <div>
                        <p> ผู้ติดต่อ </p><span></span>
                    </div>
                    <div>
                        <p> เบอร์โทร </p><span></span>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="line"></div>
        <div class="items">
            <div class="item-1">
                <p class="item"><span>ลำดับ</span></p>
                <div class="item">
                    <p>รายการ</p>
                </div>
            </div>
            <div class="item-2">
                <div class="item">
                    <p>ราคาต่อหน่วย</p>
                </div>
                <div class="item">
                    <p>จำนวน</p>
                </div>
                <div class="item">
                    <p>ภาษี</p>
                </div>
                <div class="item">
                    <p>มูลค่า</p>
                </div>
            </div>
        </div>

        <div v-for="(product, index)  in this.Orderfilter" :key="product.productId" class="itemm">
            <div class="line"></div>
            <div class="items">
                <div class="item-1">
                    <p class="item"><span>{{ index + 1 }}</span></p>
                    <p class="item"><span>{{ product.nameProduct }} ({{ product.productTypes }})</span></p>
                    <!-- <div>
                        <p class="item">ตัวเลือก:<span></span></p>
                    </div> -->
                </div>
                <div class="item-2">
                    <div class="item">
                        <!-- <p>ราคาต่อหน่วย</p> -->
                        <span>{{ product.price }}</span>
                    </div>
                    <div class="item">
                        <!-- <p>จำนวน</p> -->
                        <span>{{ product.quantity }}</span>
                    </div>
                    <div class="item">
                        <!-- <p>ภาษี:</p> -->
                        <span>7%</span>
                    </div>
                    <div class="item">
                        <span>{{ calculateLinePrice(product).toFixed(2) }} บาท</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-bottom">
            <div class="detailbottom">
                <div class="detail-detail">
                    <p> รวมเป็นเงิน </p><span>{{ totalAmount.toFixed(2) }}บาท</span>
                </div>
                <!-- <div>
                <p> มูลค่าที่ไม่มี/ยกเว้นภาษี </p><span></span>
            </div> -->
                <!-- <div>
                <p> มูลค่าที่คำนวณภาษี</p><span>{{ totalTax.toFixed(2) }} บาท</span>
            </div> -->
                <div class="detail-detail">
                    <p> ภาษีมูลค่าเพิ่ม 7% </p><span>{{ totalTax.toFixed(2) }} บาท</span>
                </div>
                <div class="detail-detail">
                    <p> จำนวนเงินรวมทั้งสิ้น</p><span>{{ totalWithTax.toFixed(2) }} บาท</span>
                </div>
                <div class="detail-detail">
                    <p> ยอดชำระ </p><span>{{ totalWithTax.toFixed(2) }} บาท</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        orderFilter: {
            type: Array,
            required: true
        }
    }, computed: {
        totalAmount() {
            // Calculate the total price by iterating over Orderfilter
            return this.Orderfilter.reduce((total, product) => {
                return total + (product.price * product.quantity);
            }, 0);
        },
        totalTax() {
            return this.totalAmount * 0.07;
        },
        // Calculate the total after tax
        totalWithTax() {
            return this.totalAmount + this.totalTax;
        }
    },
    data() {
        return {
            Adressfilter: [],
            Orderfilter: [],
            shopfilter: [],
            // userfilter: [],
            sellerfilter: [],
            shopIds: [],
            addressname: "",
            addressdistrict: "",
            addresspostalCode: "",
            addressprovince: "",
            addressaddress: "",
            paymentfilter: [],

        }
    },
    async mounted() {
        // await this.loadCart()
        await this.loadOrder()
        await this.loadshop()
        await this.loadseller()
        await this.loadaddress()
        await this.loadpayment()
    },
    methods: {
        calculateLinePrice(product) {
            return product.price * product.quantity;
        },
        calculateTotal() {
            return this.Orderfilter.reduce((total, product) => total + this.calculateLinePrice(product), 0);
        },
        calculateTaxExcluded() {
            // คำนวณมูลค่าที่ไม่มีภาษี (ถ้าต้องการ)
            return 0; // เปลี่ยนให้เหมาะสม
        },
        calculateTax() {
            return this.calculateTotal() * 0.07; // คำนวณภาษี 7%
        },
        calculateTotalIncludingTax() {
            return this.calculateTotal() + this.calculateTax();
        },
        async loadOrder() {
            // console.log("loadOrder method called");
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    throw new Error('User not found in localStorage');
                }
                const userEmail = user.email;
                if (!userEmail) {
                    throw new Error('User email not found');
                }
                // console.log(userEmail);

                const response = await axios.get('http://localhost:8081/products/getProductTestOrder');
                // console.log("response", response);

                const Adress = Array.isArray(response.data) ? response.data : [response.data];
                this.Orderfilter = Adress.filter(entry => entry.email === userEmail);
                this.shopIds = this.Orderfilter.map(entry => entry.shopId);
                console.log("this.Orderfilter", this.Orderfilter);
                console.log("this.shopIds", this.shopIds);

            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        },

        async loadshop() {
            // console.log("loadOrder method called");
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    throw new Error('User not found in localStorage');
                }
                const userEmail = user.email;
                if (!userEmail) {
                    throw new Error('User email not found');
                }
                // console.log(userEmail);

                const response = await axios.get('http://localhost:8081/shop/shops');
                console.log("response", response.data.data);

                const Adress = response.data.data;
                // console.log("Adress", Adress);
                // console.log("this.shopIds",this.shopIds);

                this.shopfilter = Adress.filter(entry => this.shopIds.includes(entry.shopId));
                console.log("this.shopfilter", this.shopfilter);


            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        },

        async loadseller() {
            // console.log("loadOrder method called");
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    throw new Error('User not found in localStorage');
                }
                const userEmail = user.email;
                if (!userEmail) {
                    throw new Error('User email not found');
                }
                // console.log(userEmail);

                const response = await axios.get('http://localhost:8081/selling/view-data');
                // console.log("response", response);

                const Adress = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
                // console.log("Adress",Adress);

                this.sellerfilter = Adress.filter(entry => entry.sellerEmail === userEmail);
                // console.log("Adress",this.sellerfilter);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        },
        async loadaddress() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user.email;

            axios.get(`http://localhost:8081/users/address?email=${userEmail}`)
                .then(response => {
                    if (response.data) {
                        const addressData = response.data;
                        this.addressname = addressData.name;
                        this.addressdistrict = addressData.district;
                        this.addresspostalCode = addressData.postalCode;
                        this.addressprovince = addressData.province;
                        this.addressaddress = addressData.address;
                        this.addressnumber = addressData.number;

                    }
                    // console.log("this.Adressfilter", this.Adressfilter);
                })


                .catch(error => {
                    console.error("Error retrieving address:", error.response ? error.response.data : error);
                });


        },
        async loadpayment() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user.email;
            const response = await axios.get(`http://localhost:8081/users/recipes?email=${userEmail}`)
            const Adress = Array.isArray(response.data) ? response.data : [response.data];
            this.paymentfilter = Adress
            // console.log("this.paymentfilter",this.paymentfilter);

            this.paymentfilter = Adress.map(item => {
                const formattedDate = new Date(item.createdAt).toLocaleString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: "Asia/Bangkok"
                });
                return { ...item, createdAt: formattedDate };
            });
        }
    }
}
</script>

<style scoped>
.receipt {
    width: 80%;
    margin: auto;
    padding: 40px 50px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
}


.order-details,
.total {
    margin: 20px 0;
}

.detail {
    display: flex;
    justify-content: space-between;
}

.detail-detail {
    display: flex;
    align-items: center;

}

/* .itemm{
    display: flex;
} */
.items {
    display: flex;
    align-items: center;
    width: 90%;
    justify-content: space-around;
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

.item-2 {
    display: flex;
    gap: 15px;
    margin-left: 120px;
    align-items: center;
}

.itemLeft {
    width: 40%;
}

.itemRight {
    width: 40%;
}

.line {
    width: 100%;
    height: 2px;
    background-color: rgb(179, 172, 172);
    margin: 20px 0 10px 0;
}

.item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
}


.itembottom {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    /* Aligns each item in the column to the right */
}

.itembottom div {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    /* Ensures the text aligns to the right across the entire container */
}

.detailbottom {
    display: flex;
    flex-direction: column;
    /* Stack items vertically */
    width: 100%;
    /* Take up full width */
}

.detail-bottom {
    display: flex;
    justify-content: center;
    /* Center the content horizontally */
    padding: 10px;
    margin-top: 50px;
}

.detailbottom {
    display: flex;
    flex-direction: column;
    /* Stack items vertically */
    width: 100%;
    /* Take up full width */
}

.detail-detail {
    display: flex;
    justify-content: space-between;
    /* Align items on both ends */
    padding: 5px 0;
    border-bottom: 1px solid #ccc;
    /* Add separator between rows */
    width: 30%;
    /* Set width */
    margin-left: auto;
    /* Push the element to the right */
}

.detail-detail p {
    margin: 0;
    /* Remove margin from the paragraph */
    font-weight: bold;
}

.detail-detail span {
    font-weight: normal;
    padding-left: 10px;
}
</style>