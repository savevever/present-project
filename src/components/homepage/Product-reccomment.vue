<template>
  <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap" rel="stylesheet">
  </head>

  <div class="container">
    <div class="products-container">
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="originalDiv"
      >
        <div class="products-items">
          <div @click="selectProduct(product)">
            <router-link
              :to="{
                path: '/users/production',
                query: { productId: product.id },
              }"
            >
              <img :src="product.images[0].src" />
            </router-link>
          </div>
          <router-link class="link"
              :to="{
                path: '/users/production',
                query: { productId: product.id },
              }"
            >
            <div class="products-item">
              <p class="products-title">{{ truncatedName(product.nameProduct) }}</p>
              <div class="price-soldout">
                <p class="price">
                  {{ product.price }}<span style="color: black"> บาท</span>
                </p>
                
                <!-- <p class="sold-out">ขายแล้ว {{ product.soldCount }} ชิ้น</p> -->
                <p class="sold-out">
                  <span>ขายแล้ว {{  product.totalSell|| 0  }} ชิ้น</span>
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <paginationComponent
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:page="gotoPage"
    />
  </div>
</template>

<script>
import paginationComponent from "../pagination-component.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 14,
      filteredProducts: [],
      totalSell: 0,
    };
  },
  components: {
    paginationComponent,
  },
  created() {
    this.loadProducts();
  },
  computed: {
    ...mapGetters(["products"]),

    Alltotalsell() {
      return this.filteredProducts.reduce((total, product) => {
        return total + (product.totalSell || 0);
      }, 0);
    },
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const products = this.products.slice(start, end);
      console.log("Paginated products:", products);
      return products;
    },
  },
  methods: {
    truncatedName(name) {
        if (name.length > 37) {
            const firstLine = name.substring(0, 20);
            const secondLine = name.substring(20, 37) + '...';
            return `${firstLine}\n${secondLine}`;
        }
        return name;
    },
    async fetchShopDetails() {
      try {
        const response = await axios.get(
          "http://localhost:8081/shop/shopsFollow"
        );
        const shops = response.data.data || [];
        const shop = shops.find((shop) => shop.email === this.userEmail);
        if (shop) {
          this.shopName = shop.shopName;
          this.shopId = shop.shopId;
          this.StoreFollow = shop.isFollowing;
          this.followerCount = shop.follow;
          this.filteredProducts = this.products.filter(
            (product) => product.shopId === this.shopId
          );
        } else {
          console.error("Shop not found");
        }
      } catch (error) {
        console.error("Error fetching shop details:", error);
      }
    },
    ...mapActions(["setSelectedProduct"]),
    async loadProducts() {
      try {
        const response = await axios.get(
          "http://localhost:8081/selling/productss"
        );
        this.$store.commit("SET_PRODUCTS", response.data);
        console.log("Fetched products:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    gotoPage(page) {
      this.currentPage = page;
    },
    selectProduct(product) {
      this.setSelectedProduct(product);
    },
  },
};
</script>



<style scoped>
*{
  font-family: "Noto Sans Thai", sans-serif;
  font-weight: 500;
  font-style: normal;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding-left: 25px;
  /* width: 80%; */
  /* margin: 20px auto; */
  /* background-color: #212330; */
  background-color: #efefef;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
}

.products-container {
  width: 95%;
  display: flex;
  padding: 20px;
  padding-top: 20px;
  flex-wrap: wrap;
  justify-content: flex-start;
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
  border: 1px solid rgba(0, 0, 0, 0.184);
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
  /* background: #ffffff; */
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