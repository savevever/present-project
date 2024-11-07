<template>
    <div class="product-category-container">
        <div class="category-container">
            <h2 class="category-title">
                สินค้าจากหมวดหมู่ : <span>{{ selectedCategoryName }}</span>
            </h2>
            <div class="products-container">
                <!-- Display only the products for the current page -->
                <div v-for="product in paginatedProducts" :key="product.id" class="originalDiv">
                    <div class="products-items">
                        <div class="image-wrapper">
                            <router-link :to="{
                                path: '/users/production',
                                query: { productId: product.id },
                            }">
                                <img v-if="product.images && product.images.length > 0" :src="product.images[0].src"
                                    alt="Product Image" />
                            </router-link>
                        </div>
                        <div class="products-item">
                            <p class="products-title">
                                {{ truncatedName(product.nameProduct) }}
                            </p>
                            <div class="price-soldout">
                                <p class="price">
                                    {{ product.price }}<span style="color: black"> บาท</span>
                                </p>
                                <p class="sold-out">
                                    <span>ขายแล้ว {{ product.totalSell || 0 }} ชิ้น</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pagination">
                <button @click="prevPage" :disabled="currentPage === 1">
                    Previous
                </button>

                <button v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }"
                    @click="gotoPage(page)">
                    {{ page }}
                </button>

                <button @click="nextPage" :disabled="currentPage === totalPages">
                    Next
                </button>
            </div>
        </div>
    </div>
    <footerComponent></footerComponent>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            products: [],
            selectedCategoryName: "",
            filteredProducts: [],
            currentPage: 1,
            itemsPerPage: 12,
            totalPages: 1,
        };
    },
    async mounted() {
        const categoryName = new URLSearchParams(window.location.search).get(
            "category"
        );
        if (categoryName) {
            this.selectedCategoryName = categoryName;
            await this.fetchProductsByCategory(categoryName);
        }
    },
    computed: {
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredProducts.slice(start, end);
        },
    },
    methods: {
        truncatedName(name) {
            console.log(this.products.price);

            console.log("filteredProducts", this.filteredProducts);
            if (name.length > 37) {
                const firstLine = name.substring(0, 20);
                const secondLine = name.substring(20, 37) + "...";
                return `${firstLine} \n${secondLine}`;
            }
            return name;
        },
        async fetchProductsByCategory(categoryName) {
            try {
                const response = await axios.get(
                    `http://localhost:8081/selling/productss`
                );
                this.products = response.data;
                this.filteredProducts = this.products.filter(
                    (product) => product.category === categoryName
                );
                this.totalPages = Math.ceil(
                    this.filteredProducts.length / this.itemsPerPage
                );
                this.currentPage = 1;
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        },
        gotoPage(page) {
            this.currentPage = page;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
    },
};
</script>

<style scoped>
* {
    font-family: "Noto Sans Thai", sans-serif;
    font-weight: 500;
    font-style: normal;
}

.product-category-container {
    display: flex;
    width: 100vw;
    /* background-color: rgb(255, 255, 255); */
    flex-direction: column;
    align-items: center;
}
.pagination {
    display: flex;
    justify-content: flex-end;
    width: 1300px;
    gap: 0.5rem;
    margin: 1rem 0 1.5rem 0;
}

.pagination button {
    padding: 0.5rem 1rem;
    border: 1px solid #3953a1;
    background: #f9f9f9;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
}

.pagination button:hover {
    background: #b6c8ff;
}

.pagination button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.pagination button.active {
    background: #3953a1;
    color: #fff;
    border-color: #3953a1;
}

.category-title {
    margin-top: 0;
    padding: 2rem;
    font-weight: 700;
    background-color: #ffffff;
    border-radius: 0 0 20px 20px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

.category-title span {
    color: #f09e4c;
}

.container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    padding-left: 25px;
    /* width: 80%; */
    margin: 20px auto;
    background-color: #2d3250;
    /* background-color: #3a3042; */
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
}

.products-container {
    width: 100%;
    display: flex;
    padding: 20px;
    padding-top: 20px;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    /* background-color: #f3efe8; */
    margin-top: 1.5rem;
    overflow: hidden;
    box-sizing: border-box;
}

.originalDiv {
    /* flex: 0 1 calc(16.66% - 20px); */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.products-items {
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    cursor: pointer;
    /* justify-content: center; */
    align-items: center;
    background-color: #ffffff;
    /* box-shadow: 0 0 15px rgb(25, 25, 25); */
    border: none;
    overflow: hidden;
    border-radius: 6px;
    transition: transform 0.3s ease;
}

.products-items:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.782);
}

.products-items img {
    width: 170px;
    height: 170px;
    object-fit: cover;
    object-position: center;
    image-rendering: crisp-edges;
}

.products-items p {
    width: 160px;
    height: 50px;
    padding: 5px;
    text-align: center;
}

.products-item {
    width: 100%;
    height: 130px;
    background: #ffffff;
    text-align: center;
}

.products-title {
    font-size: 13px;
    margin: 0;
    margin-top: 10px;
}

.price {
    font-size: 15px;
    color: #b80d0d;
}

.sold-out {
    font-size: 10px;
    margin-right: 10px;
    white-space: nowrap;
}

.price-soldout {
    width: 170px;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    overflow: hidden;
    padding-bottom: 0.5rem;
}

.link {
    text-decoration: none;
    color: black;
}
</style>