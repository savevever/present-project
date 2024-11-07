<template>
  <div class="container">
    <div class="walpaper">
      <img src="../../assets/dc725ca4-4140-49cf-83ac-36898dae439b.jpg" alt="" />
      <span class="centered-text"
        >ChumChun OTOP <br />
        ยินดีให้บริการเเละขอขอบคุณผู้ใช้บริการทุกคนที่เข้าใช้งาน</span
      >
    </div>

    <div class="category-container">
      <div class="category-buttons">
        <p
          v-for="category in categories"
          :key="category.id"
          @click="goToProducts(category.name)"
          class="category-button"
        >
          {{ category.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await fetch("http://localhost:8081/selling/productss");
        const data = await response.json();
        this.categories = Array.from(new Set(data.map((item) => item.category)))
        .sort((a, b) => b.length - a.length) 
        .map((name, id) => ({ id, name }));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    goToProducts(categoryname) {
      this.$router.push(`/ProductCatrgory?category=${categoryname}`);
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

.category-container {
  background-color: #3953a1;
  padding: 0rem 1rem 0.3rem 4rem;
  /* border-radius: 8px; */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: hidden;
}

.walpaper {
  position: relative;
  width: 100vw;
  height: 34rem;
  overflow: hidden;
}

.walpaper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.walpaper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.centered-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2.1rem;
  font-weight: bold;
  z-index: 2;
  text-align: center;
  width: 800px;
}

.category-title {
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
}

.category-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  padding: 8px 10px 0 20px;
}

.category-button {
  /* padding: 8px 17px; */
  border: none;
  /* border-radius: 5px; */
  /* background: linear-gradient(to right, #01366e, #0d0361);   */
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
}

.category-button:hover {
  text-decoration: underline;
}
</style>
