<template>
    <div id="container">
        <div id="Purchase-history-container">
            <menuComponent></menuComponent>
            <div id="Purchase-history-right">
                <h1 class="title">ประวัติการซื้อ</h1>
                <div id="item-container">
                    <div v-for="shop in shops" :key="shop.shopId" class="shop-container">
                        <h1 class="shop-name">ชื่อร้าน: {{ shop.shopName }}</h1>
                        <div v-for="product in filteredProducts(shop.shopId)" :key="product.productId" class="item">
                            <div class="line"></div>
                            <div class="items">
                                <input type="checkbox" v-model="product.checkbox" class="checked"
                                    @change="setSelectItem(product)" />

                                <img :src="product.image" alt="" style="width: 70px; height: 70px; object-fit: cover" />
                                <div class="item-1">
                                    <p>
                                        <span>{{ truncatedName(product.nameProduct) }}</span>
                                    </p>
                                    <div class="itemm">
                                        <p>
                                            ตัวเลือก:<span>{{ product.productTypes }}</span>
                                        </p>
                                        <p>x {{ product.quantity }}</p>
                                    </div>

                                </div>
                                <!-- <p>x {{ product.quantity }}</p> -->
                                <div class="item-2">
                                    <router-link :to="{
                                        path: '/selling/reviewPage',
                                        query: { productId: product.productId, historyId: product.Historyid },
                                    }"><button v-if="commentsExist[product.Historyid]">ให้คะเเนน</button></router-link>
                                    <p>{{ calculateLinePrice(product).toFixed(2) }} บาท</p>
                                    <!-- <p>{{ product.calculateLinePrice}} บาท</p>  -->
                                </div>
                            </div>
                        </div>
                        <div class="item-button">
                            <button @click="handleClick">สั่งซื้ออีกครั้ง</button>
                            <!-- <button @click="cancelOrder">ลบรายการสินค้า</button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footerComponent></footerComponent>
    </div>
</template>

<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default {
    data() {
        return {
            history: [],
            currentPage: 1,
            Historyid: '',
            itemsPerPage: 12,
            totalItems: 0,
            shops: [],
            products: [],
            selectedItems: [],
            commentsExist: {},
            filteredComents: []
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.history.slice(start, end);
        },
    },
    methods: {
        handleClick() {
            this.addToHistoryClicked();
            //     this.payment();
        },
        payment() {
            const selectedIds = this.selectedItems.map((product) => product.id);
            const totalAmount = this.selectedItems
                .reduce((sum, product) => sum + this.calculateLinePrice(product), 0)
                .toFixed(2);

            console.log("Selected IDs for payment:", selectedIds);
            console.log("Total amount:", totalAmount);

            axios
                .post("http://localhost:8081/2c2p/paymentToken", {
                    // ProductID: selectedIds.join(', '),
                    amount: totalAmount,
                })
                .then((paymentResponse) => {
                    const payloadObject = paymentResponse.data;
                    const payload = payloadObject.payload.payload.toString();
                    console.log("Payload received from 2C2P:", payload);

                    if (typeof payload === "string") {
                        const decoded = jwtDecode(payload);
                        console.log("Decoded JWT:", decoded);
                        const webPaymentUrl = decoded.webPaymentUrl;

                        if (webPaymentUrl) {
                            window.location.href = webPaymentUrl;
                        } else {
                            alert("ไม่พบลิงก์สำหรับการจ่ายเงินใน Payload");
                        }
                    } else {
                        console.error("Invalid token: Payload is not a string", payload);
                        alert("เกิดข้อผิดพลาดในการประมวลผล payment token");
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        console.error(
                            "Error processing payment token:",
                            error.response.data
                        );
                    } else {
                        console.error("Error processing payment token:", error.message);
                    }
                    alert("เกิดข้อผิดพลาดในการประมวลผล payment token");
                });
        },
        addToHistoryClicked() {
            if (this.selectedItems.length > 0) {
                this.selectedItems.forEach((product) => {
                    const calculatedPrice = this.calculateLinePrice2(product).toFixed(2);
                    const productData = {
                        productId: product.productId,
                        nameProduct: product.nameProduct,
                        price: calculatedPrice,
                        quantity: product.quantity,
                        image: product.image,
                        email: product.email,
                        shopId: product.shopId,
                        productTypes: product.productTypes,
                    };

                    console.log("Product Data for History:", productData);

                    axios;
                    axios
                        .post(
                            "http://localhost:8081/products/ProductTestOrder",
                            productData
                        )
                        .then((response) => {
                            console.log("Product added to history:", response.data);
                            window.location.href = "http://localhost:8080/AddressSeller";
                        })
                        .catch((error) => {
                            console.error(
                                "Error details:",
                                error.response ? error.response.data : error
                            );
                        });
                });
            }
        },
        truncatedName(name) {
            if (name.length > 35) {
                const secondLine = name.substring(0, 35) + "...";
                return `${secondLine}`;
            }
            return name;
        },
        totalPrice() {
            if (this.selectedItems.length > 0) {
                return this.calculateLinePrice(this.selectedItems[0]).toFixed(2);
            }
            return 0;
        },
        calculateLinePrice(product) {
            return product.price;
        },calculateLinePrice2(product) {
            return product.price /product.quantity ;
        },
        filteredProducts(shopId) {
            return this.products.filter((product) => product.shopId === shopId);
        },
        async loadHistory() {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user) {
                    throw new Error("User not found in localStorage");
                }
                const userEmail = user.email;
                if (!userEmail) {
                    throw new Error("User email not found");
                }

                const response = await axios.get(
                    "http://localhost:8081/products/getHistory"
                );
                const allHistory = response.data;

                this.history = allHistory.filter((entry) => entry.email === userEmail);
                this.totalItems = this.history.length;
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        },
        reorder(product) {
            console.log("Reordering product:", product);
        },
        async cancelOrder() {
            const itemsToRemove = this.selectedItems.filter(
                (product) => product.checkbox
            );
            try {
                for (const product of itemsToRemove) {
                    console.log("History ID to delete:", product.Historyid);
                    await axios.delete(
                        `http://localhost:8081/products/delHistory/${product.Historyid}`
                    );
                    console.log(`Deleted product with ID: ${product.productId}`);
                }
                await this.loadHistory();
                window.location.reload();
            } catch (error) {
                console.error("Error canceling orders:", error);
            }
        },
        gotoPage(page) {
            this.currentPage = page;
        },
        handleRedirectToLocalhost() {
            const currentUrl = window.location.href;
            const expectedLocalhostUrl =
                "http://localhost:8080/users/PurchaseHistory";
            // console.log("Current URL:", currentUrl);
            if (currentUrl !== expectedLocalhostUrl) {
                // const localhostUrl = currentUrl.replace(
                //     `${process.env.VUE_APP_NGROK_URL}users/PurchaseHistory`,
                //     expectedLocalhostUrl
                // );
                // console.log("Redirecting to:", localhostUrl);
                window.location.href = expectedLocalhostUrl;
            }
        },
        async getProducts() {
            try {
                const response = await axios.get(
                    "http://localhost:8081/products/getHistory"
                );
                this.products = response.data;
                console.log("Fetched Products:", this.products);
            } catch (error) {
                console.error(
                    "Error fetching products:",
                    error.response ? error.response.data : error
                );
            }
        },
        async getComments() {
            try {
                const response = await axios.get(`http://localhost:8081/products/getComments`);

                this.filteredComments = response.data.filter(comment => comment.email === this.userEmail());
                // console.log("this.products",this.products);

                this.products.forEach(product => {
                    const hasComment = this.filteredComments.some(comment => comment.historyId === product.Historyid);
                    this.commentsExist[product.Historyid] = !hasComment;
                });

            } catch (error) {
                console.error("Error fetching comments:", error.response ? error.response.data : error);
            }
        },
        async checkCommentsForProducts() {
            for (const product of this.products) {
                // console.log("product.Historyid",product.Historyid);

                await this.getComments(product.Historyid);
            }
        },
        async getShops() {
            try {
                const response = await axios.get("http://localhost:8081/shop/shops");
                const fetchedShops = response.data.data;

                const uniqueShopIds = [
                    ...new Set(this.products.map((product) => product.shopId)),
                ];
                console.log("Unique Shop IDs:", uniqueShopIds);

                for (const shopId of uniqueShopIds) {
                    const existingShop = this.shops.find(
                        (shop) => shop.shopId === shopId
                    );
                    if (!existingShop) {
                        const shopData = fetchedShops.find(
                            (shop) => shop.shopId === shopId
                        );
                        if (shopData) {
                            this.shops.push({
                                shopId: shopData.shopId,
                                shopName: shopData.shopName,
                            });
                            console.log("Added Shop:", shopData); // Log ร้านค้าที่ถูกเพิ่ม
                        }
                    }
                }
                console.log("All Shops:", this.shops); // Log ข้อมูลร้านค้าทั้งหมดที่ถูกดึงมา
            } catch (error) {
                console.error(
                    "Error fetching shops:",
                    error.response ? error.response.data : error
                );
            }
        },
        setSelectItem(product) {
            if (product.checkbox) {
                // ถ้าถูกเลือก เพิ่มสินค้าเข้าไปใน selectedItems
                this.selectedItems.push(product);
            } else {
                // ถ้าถูกยกเลิกการเลือก เอาสินค้าออกจาก selectedItems
                const index = this.selectedItems.findIndex(
                    (item) => item.id === product.id
                );
                if (index !== -1) {
                    this.selectedItems.splice(index, 1);
                }
            }
            console.log("Selected items:", this.selectedItems);
        },
        userEmail() {
            const user = JSON.parse(localStorage.getItem('user'));
            // console.log('User Email:', user ? user.email : null);
            return user ? user.email : null;
        },
    },
    async mounted() {
        this.handleRedirectToLocalhost();
        await this.getProducts();
        await this.getShops();
        await this.loadHistory();
        this.checkCommentsForProducts();
    },
};
</script>


<style scoped>
* {
    font-family: "Noto Sans Thai", sans-serif;
    font-weight: 500;
    font-style: normal;
}

#container {
    /* margin-top: 55px; */
    /* min-height: 690px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow: hidden;
    margin-top: 2rem;

}

#Purchase-history-container {
    width: 1000px;
    background-color: #1f1b3a;
    display: flex;
    /* align-items: stretch; */
}

#Purchase-history-right {
    width: 1100px;
    padding: 20px;
    background-color: #e6e6e6;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.title {
    margin-top: 20px;
    font-weight: 700;
}

.shop-name {
    font-size: 23px;
}

#item-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.item {
    background-color: #ffffff;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.items {
    display: flex;
    align-items: center;
    gap: 30px;
    width: 100%;
}

.itemm {
    gap: 25px;
    display: flex;
    flex-direction: row;
    color: rgb(74, 74, 74);
}

.itemm p:nth-child(2) {
    font-size: 15px;
    color: rgb(115, 115, 115);
    font-weight: 400;
}

.item-2 {
    width: 90px;
    padding: 0 20px;
    gap: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-left: auto;
}

.item-2 button {
    padding: 0.5rem 1rem;
    border: 1px solid #ff8c00;
    color: #ff8c00;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
    transition: 0.3s;
}

.item-2 button:hover {
    color: #ffffff;
    background-color: #ff8c00;
}

.checked {
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: 0.3s;
}

.product-image {
    width: 70px;
    /* Adjusted size for consistency */
    height: 70px;
    object-fit: cover;
}

.item-details {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.product-name {
    margin: 0;
    font-size: 14px;
}

.product-line-price {
    font-size: 16px;
    font-weight: bold;
}

.item-button {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
}

.item-button button {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

.item-button button:first-child {
    background-color: #fde0ae;
    border: 1px solid #ffa811;
}

.item-button button:first-child:hover {
    background-color: #ffc869;
}

.item-button button:nth-child(2) {
    background-color: #ffffff;
}

.item-button button:nth-child(2):hover {
    color: #ff3636;
    border-color: #ff3636;
}

#container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow: hidden;
    margin-top: 2rem;
    /* ระยะห่างด้านบน */
}

#Purchase-history-container {
    width: 1100px;
    /* กำหนดขนาดเท่ากัน */
    /* background-color: #1f1b3a; */
    display: flex;
    align-items: stretch;
    margin-top: 2rem;
    /* ระยะห่างด้านบนเท่ากัน */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
