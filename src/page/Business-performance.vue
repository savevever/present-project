<template>
    <div id="container">
        <div id="Purchase-history-container">
            <menuComponent></menuComponent>
            <div id="Purchase-history-right">
                <h1 class="title">ดูผลประกอบการ</h1>
                <div class="result">
                    <div class="items">
                        <div class="text">
                            <h3>ผลสรุปทั้งหมด</h3>
                            <p>เป็นผลสรุปที่อัปเดตทุกวันเวลาเที่ยงคืน</p>
                        </div>
                        <div class="graph-items">
                            <div class="item profit">
                                <font-awesome-icon :icon="['fas', 'coins']" class="icon" />
                                <h4 class="card-title">ยอดขายทั้งหมด</h4>
                                <div class="card-value"><span>{{ AlltotalPrice }}</span>บาท</div>
                                <!-- <a href="#" class="more-info">More info</a> -->
                            </div>
                            <div class="item totallsel">
                                <font-awesome-icon :icon="['fas', 'truck-fast']" class="icon" />
                                <h4 class="card-title">จำนวนสินค้าที่ขาย</h4>
                                <div class="card-value"><span>{{ Alltotalsell }}</span>จำนวน</div>
                                <!-- <a href="#" class="more-info">More info</a> -->
                            </div>
                            <div class="item product">
                                <font-awesome-icon :icon="['fas', 'book']" class="icon" />
                                <h4 class="card-title">จำนวนสินค้า</h4>
                                <div class="card-value"><span>{{ filteredProducts.length }}</span>จำนวน</div>
                                <!-- <a href="#" class="more-info">More info</a> -->
                            </div>
                            <div class="item comment">
                                <font-awesome-icon icon="fa-regular fa-comments" class="icon" />
                                <h4 class="card-title">จำนวนความคิดเห็น</h4>
                                <div class="card-value"><span>{{getTotalComments }}</span>จำนวน</div>
                                <!-- <a href="#" class="more-info">More info</a> -->
                            </div>
                        </div>


                    </div>
                    <div class="buttons">
                        <button class="btn" :class="{ active: activeComponent === 'top5mostSell' }"
                            @click="activeComponent = 'top5mostSell'">5สิ้นค้าขายดี</button>
                        <button class="btn" :class="{ active: activeComponent === 'proFit' }"
                            @click="activeComponent = 'proFit'">ยอดขายตามหมวดหมู่</button>
                        <button class="btn" :class="{ active: activeComponent === 'totallSell' }"
                            @click="activeComponent = 'totallSell'">ยอดขายรายเดือน</button>
                    </div>
                    <div class="graph">
                        <top5mostSell v-if="activeComponent === 'top5mostSell'" :filteredProducts="filteredProducts">
                        </top5mostSell>
                        <proFit v-if="activeComponent === 'proFit'" :filteredProducts="filteredProducts"></proFit>
                        <totallSell v-if="activeComponent === 'totallSell'" :filteredProducts="filteredProducts">
                        </totallSell>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footerComponent></footerComponent>
</template>
<script>
import proFit from '../components/graph/category.vue';
import top5mostSell from '../components/graph/top5mostSell.vue';
import totallSell from '../components/graph/totallSellM.vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoins, faTruckFast, faBook, faComments } from "@fortawesome/free-solid-svg-icons";
import { faComments as faCommentsRegular } from "@fortawesome/free-regular-svg-icons";
import axios from 'axios';

library.add(faCoins, faTruckFast, faBook, faComments, faCommentsRegular);
export default {

    name: "App",
    data() {
        return {
            isVisible: false,
            isVisible2: false,
            activeComponent: 'top5mostSell',
            shopId: [],
            shopName: '',
            productId: null,
            products: [],
            filteredProducts: [],
            userEmail: '',
            commentsCount: {}
        };
    },
    computed: {
        getTotalComments() {
            return this.filteredProducts.reduce((total, product) => {
                return total + (this.commentsCount[product.id] || 0);
            }, 0);
        },
        Alltotalsell() {
            return this.filteredProducts.reduce((total, product) => {
                return total + (product.totalSell || 0);
            }, 0);
        },
        AlltotalPrice() {
            return this.filteredProducts.reduce((total, product) => {
                return total + (product.totalPrice || 0);
            }, 0);
        }
    },
    async mounted() {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const userObject = JSON.parse(user);
                this.userEmail = userObject.email;
                // console.log('User email:', this.userEmail);
            } catch (error) {
                console.error('Error parsing user from localStorage:', error);
            }
        } else {
            console.warn('No user found in localStorage');
        }
        await this.fetchProductDetails();
        await this.fetchShopDetails();
        await this.getCommentsCount();
    },
    methods: {
        async fetchProductDetails() {
            try {
                const response = await axios.get("http://localhost:8081/selling/productss");
                this.products = response.data || [];
                // console.log('Product Details:', this.products);
                // this.getCommentsCount();
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        },
        async getCommentsCount() {
            for (let product of this.filteredProducts) {
                console.log("ssss",product);
                
                try {
                    const response = await axios.get(`http://localhost:8081/products/getComments/${product.id}`);
                    this.commentsCount[product.id] = response.data.length || 0;
                    console.log("aaa",this.commentsCount);
                    
                } catch (error) {
                    console.error(`Error fetching comments for product ${product.id}:`, error);
                }
            }
        },
        async fetchShopDetails() {
            try {
                const response = await axios.get('http://localhost:8081/shop/shopsFollow');
                const shops = response.data.data || [];
                const shop = shops.find(shop => shop.email === this.userEmail);
                if (shop) {
                    this.shopName = shop.shopName;
                    this.shopId = shop.shopId;
                    this.StoreFollow = shop.isFollowing;
                    this.followerCount = shop.follow;
                    this.filteredProducts = this.products.filter(product => product.shopId === this.shopId);
                } else {
                    console.error('Shop not found');
                }

            } catch (error) {
                console.error('Error fetching shop details:', error);
            }
        },
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        },
        toggleVisibility2() {
            this.isVisible2 = !this.isVisible2;
        }

    },
    components: {
        top5mostSell, totallSell, proFit, FontAwesomeIcon
    },
};
</script>
<style scoped>
* {
    font-family: "Noto Sans Thai", sans-serif;
    font-weight: 500;
    font-style: normal;
}

#Purchase-history-container {
    width: 1200px;
    height: 690px;
    background-color: rgb(255, 255, 255);
    display: flex;
    margin-top: 4rem;
}

.item {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    background-color: white;
    gap: 0.2rem;
    padding: 0.7rem;
    width: 150px;
    height: 80px;
}

#container {
    height: auto;
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    /* margin-bottom: 30px; */
}

.result {
    overflow: hidden;
    display: flex;
    widows: 600px;
    flex-direction: column;
    gap: 1.3rem;
    /* background-color: #ffffff; */
}

.items {
    background-color: white;
    display: flex;
    flex-direction: column;
}

.graph-items {

    /* width: 100%;
    height: 100%; */
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;
    padding: 1rem;
}

.user-title {
    display: flex;
    gap: 20px;
    display: flex;
    align-items: center;
}

.user {
    display: flex;
    flex-direction: column;
    gap: 7px;
}

#location-button button {
    padding: 7px 10px 7px 10px;
    font-size: 17px;
}


#item-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
}

.row {
    display: flex;
    gap: 40px;
    /* justify-content: flex-end; */
}

.row-item {
    display: flex;
    flex-direction: column;
}

.row-item label {
    font-size: 18px;
}

.row-item input {
    width: 360px;
    height: 30px;
}

.icon {
    font-size: 20px;

}

#Purchase-history-right {
    padding: 20px;
    width:  805px;
    height: 690px;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
}

/* *********************************************************** */
.profit {
    background-color: #FFE2E6;
}

.totallsel {
    background-color: #FFF4DE;
}

.product {
    background-color: #DCFCE7;
}

.comment {
    background-color: #F4E8FF;
}

.result {
    width: 95%;
    padding: 1rem 1.3rem 1rem 1.3rem;
    height: 90%;
    display: flex;
}

/* **************** */
.graph {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

h4 {
    margin: 0;
}

/* **************** */
.buttons {
    display: flex;
    gap: 0.5rem;
}

.btn {
    padding: 0.4rem 0.3rem 0.4rem 0.3rem;
    cursor: pointer;
}

.buttons :first-child {
    background-color: #f7c8ce;
    border: 2px solid #f895a2;
}

.buttons :nth-child(2) {
    background-color: #f8e6c5;
    border: 2px solid #fac65d;
}

.buttons :nth-child(3) {
    background-color: #c7f3d6;
    border: 2px solid #32a55a;
}

.text {
    width: 50%;
    margin-left: 2.3rem;
}

.text h3 {
    margin-bottom: 0;
}

.text p {
    color: #9c9b9b;
    margin-top: 0.3rem;
}
#container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow: hidden;
    margin-top: 2rem; /* ระยะห่างด้านบน */
    
}

#Purchase-history-container {
    width: 1100px; /* กำหนดขนาดเท่ากัน */
    /* background-color: #1f1b3a; */
    display: flex;
    align-items: stretch;
    margin-top: 2rem; /* ระยะห่างด้านบนเท่ากัน */
    background-color: #1f1b3a;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.title {
    font-weight: 700;
}
/* ********************** */
</style>
