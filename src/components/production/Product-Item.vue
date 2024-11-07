<template>
  <header>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap" rel="stylesheet" />
  </header>
  <div id="container">
    <div id="containerProductItem">
      <div id="ProductItem">
        <div id="ProductItemHead">
          <div id="ProductItemImg">
            <img :src="product && product.images && product.images.length > 0
              ? product.images[0].src
              : '../../assets/default.png'
              " id="Image" />

            <div id="ProductItemImgSlice">
              <curosurSlice></curosurSlice>
            </div>
          </div>
          <div id="ProductItemTxt">
            <div>
              <h2>{{ product ? product.nameProduct : "Loading..." }}</h2>
            </div>
            <div id="like">
              <font-awesome-icon :icon="['fas', 'heart']" class="heart" :class="{ red: checkLikes }"
                @click="handleToggleLike" />
              <p>
                <span>{{ this.likesCount || 0 }}</span> คนที่ถูกใจ
              </p>
              <p>
                <span>ขายแล้ว
                  {{
                    product && product.totalSell ? product.totalSell : 0
                  }}</span>
                ชิ้น
              </p>
            </div>
            <p class="price">฿{{ product ? product.price : "Loading..." }}</p>
            <div class="option">
              <div v-if="product && product.productTypes">
                <div v-for="(type, index) in product.productTypes" :key="index" class="product-type-group">
                  <p>{{ type.productType1 }}</p>
                  <div class="product-type-buttons">
                    <button v-for="(option, optionIndex) in type.inputProductType1" :key="optionIndex"
                      @click="handleProductTypeClick(option, index)"
                      :class="{ selected: selectedOptions[index] === option }">
                      {{ option }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="quantityitems">
              <div class="quantity">
                <p>จำนวน</p>
                <div id="quantitycount">
                  <button class="minus" @click="decrement">-</button>
                  <input type="number" v-model="inputValue" @input="updateCount" min="0" class="no-spinner" />
                  <!-- <span>{{ count }}</span> -->
                  <button class="plus" @click="increment">+</button>
                </div>
                <p>
                  มีสินค้าทั้งหมด:<span>{{
                    product ? product.numberProducts : "Loading..."
                  }}</span>
                  ชิ้น
                </p>
              </div>
              <div id="ProductItemButton">
                <button @click="addToCartClicked" :disabled="!isProductTypeSelected" class="btn1">
                  เพิ่มสินค้าลงในตะกร้า
                </button>
                <!-- <router-link to="/users/PurchaseHistory"> -->
                <button class="btn2" @click="handleClick" :disabled="!isProductTypeSelected">
                  ซื้อสินค้าเลย
                </button>
                <!-- </router-link> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import curosurSlice from "./curosurSlice.vue";
// import { jwtDecode } from "jwt-decode";


library.add(faHeart);

export default {
  components: {
    curosurSlice,
  },
  data() {
    return {
      count: 0,
      selectedOptions: [],
      filteredProducts: [],
      isPressedHeart: false,
      likesCount: 0,
      inputValue: "0",
      // id: false,
      checkLikes: false,
    };
  },
  computed: {
    ...mapGetters({
      product: "selectedProduct",
    }),
    isProductTypeSelected() {
      if (
        this.product &&
        this.product.productTypes &&
        this.product.productTypes.length > 0
      ) {
        // If product has productTypes, ensure one is selected and count > 0
        return this.selectedOptions.length > 0 && this.count > 0;
      } else {
        // If productTypes is null, only check that count > 0
        return this.count > 0;
      }
    },
  },
  // created:{
  //     await checkFollowStatus();
  // },
  methods: {
    isLoggedIn() {
      const token = localStorage.getItem("token");
      return !!token; // คืนค่า true ถ้ามี token
    },
    async checkFollowStatus() {
      try {
        const response = await axios.get(
          `http://localhost:8081/selling/checkLikes`
        );
        if (response) {
          this.checkLikes = response.data.data.some(
            (item) =>
              item.email === this.userEmail() &&
              item.productId === this.product.id
          );
        } else {
          this.checkLikes = false;
        }
      } catch (error) {
        console.error("Error checking follow status:", error);
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
        this.checkFollowStatus()
      } catch (error) {
        console.error('Error fetching shop details:', error);
      }
    },
    async fetchProductDetails(productId) {
      return axios
        .get("http://localhost:8081/selling/productss")
        .then((response) => {
          if (response.data && response.data.length > 0) {
            const product = response.data.find(
              (product) => product.id == productId
            );
            if (product && product.productTypes) {
              this.$store.dispatch("setSelectedProduct", product);
              this.likesCount = product.likes;
              this.id = product.id;
            } else {
              console.log("ไม่พบข้อมูลสินค้าที่มี ID นี้");
            }
          } else {
            console.log("ไม่พบข้อมูลสินค้า");
          }
        })
        .catch((error) => {
          console.error("ข้อผิดพลาดในการดึงข้อมูล:", error);
        });
    },

    userEmail() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user ? user.email : null;
    },
    addToCartClicked() {
      if (this.product) {
        const selectedProductType = this.selectedOptions[0] || 'ค่าเริ่มต้น';
        const productData = {
          productId: this.product.id,
          nameProduct: this.product.nameProduct,
          price: this.product.price,
          quantity: this.count,
          image: this.product.images && this.product.images.length > 0 ? this.product.images[0].src : '../../assets/default.png',
          email: this.userEmail(),
          shopId: this.product.shopId,
          productTypes: selectedProductType
        };

        axios.put(`http://localhost:8081/selling/updateProduct/${productData.productId}`, {
          totalSell: parseInt(productData.quantity),
          totalPrice: parseFloat(productData.price) * parseInt(productData.quantity)
        })
          .then(response => {
            console.log("Product added to history:", response.data);
          })
          .catch(error => {
            console.error("Error details:", error.response.data);
          });

        axios.get(`http://localhost:8081/products/checkCart/${productData.productId}`)
          .then(response => {
            if (response.data.exists) {
              // หากพบสินค้าในตะกร้า ให้เรียก API /updateCartQuantity/add เพื่อเพิ่มจำนวน
              axios.put(`http://localhost:8081/products/updateCartQuantity/add/${productData.productId}`, {
                additionalQuantity: productData.quantity
              })
                .then(response => {
                  console.log("Product quantity updated:", response.data);
                })
                .catch(error => {
                  console.error("Error updating product quantity:", error);
                });
            } else {
              // หากไม่พบสินค้าในตะกร้า ให้เพิ่มสินค้าใหม่
              axios.post('http://localhost:8081/products/createCartEntry', productData)
                .then(response => {
                  console.log("Product added to cart:", response.data);
                })
                .catch(error => {
                  console.error("Error adding product to cart:", error);
                });
            }
          })
          .catch(error => {
            console.error("Error checking cart:", error);
          });
      }
    }
    ,
    handleClick() {
      if (!this.isLoggedIn()) {
        // ถ้ายังไม่ได้ล็อกอิน
        window.location.href = "/users/login"; // เปลี่ยนไปยังหน้าล็อกอิน
        return;
      }
      this.addToHistoryClicked();
      // this.handleAddToHistory();
    },
    addToHistoryClicked() {
      console.log("this.count", this.count);

      if (this.product) {
        const selectedProductType = this.selectedOptions[0] || "ค่าเริ่มต้น";
        const productData = {
          productId: this.product.id,
          nameProduct: this.product.nameProduct,
          price: this.product.price,
          quantity: this.count || 0,
          image:
            this.product.images && this.product.images.length > 0
              ? this.product.images[0].src
              : "../../assets/default.png",
          email: this.userEmail(),
          shopId: this.product.shopId,
          productTypes: selectedProductType,
        };
        axios
          .put(
            `http://localhost:8081/selling/updateProduct/${productData.productId}`,
            {
              totalSell: parseInt(productData.quantity),
              totalPrice:
                parseFloat(productData.price) * parseInt(productData.quantity),
            }
          )
          .then((response) => {
            console.log("Product added to history:", response.data);
          })
          .catch((error) => {
            console.error("Error details:", error.response.data);
          });

        axios
          .post("http://localhost:8081/products/ProductTestOrder", productData)
          .then((response) => {
            console.log("Product added to history:", response.data);
            window.location.href = "http://localhost:8080/AddressSeller";
          })
          .catch((error) => {
            console.error("Error details:", error.response.data);
          });
      }
    },
    handleProductTypeClick(option, index) {
      this.selectedOptions[index] = option;
      // console.log('Selected options:', this.selectedOptions);
      for (let i = 0; i < this.selectedOptions.length; i++) {
        if (i !== index) {
          this.selectedOptions[i] = null; // Reset other selections
        }
      }
    },
    async handleToggleLike() {
      if (this.product) {
        const productId = this.product.id;
        try {
          const url = `http://localhost:8081/selling/product/${productId}/toggleLike`;
          // const likeChange = this.isPressedHeart ? -1 : 1;
          // console.log("likeChange", likeChange);

          const response = await axios.put(url, {
            // likeChange: likeChange,
            email: this.userEmail(),
          });
          // window.location.reload();
          this.checkFollowStatus();
          this.likesCount = response.data.likes;
          this.isPressedHeart = !this.isPressedHeart;
          console.log("Updated likes:", response.data);

          this.isPressedHeart = !this.isPressedHeart;
        } catch (error) {
          console.error("Error toggling like:", error);
        }
      }
    },
    increment() {
      // เพิ่มค่า count ถ้ามันยังไม่เกินจำนวนสินค้าในคลัง
      if (this.count < this.product.numberProducts) {
        this.count++;
        this.inputValue = this.count.toString(); // อัปเดต inputValue ให้ตรงกับ count
      }
      console.log("this.count", this.count);
    },
    decrement() {
      // ลดค่า count ถ้ามันมากกว่า 0
      if (this.count > 0) {
        this.count--;
        this.inputValue = this.count.toString(); // อัปเดต inputValue ให้ตรงกับ count
      }
      console.log("this.count", this.count);
    },
    updateCount() {
      //ตรวจค่าที่พิมพ์
      this.count = Number(this.inputValue);
      if (this.count < 0) {
        this.count = 0;
      } else if (!Number.isInteger(this.count)) {
        this.count = Math.floor(this.count); // แปลงเป็นจำนวนเต็ม
      }

      if (this.count > this.product.numberProducts) {
        this.count = this.product.numberProducts; // จำกัดไม่ให้เกินจำนวนสินค้า
      }

      this.inputValue = this.count.toString(); // แปลงกลับเป็น string สำหรับ input
    },
    calculateLinePrice() {
      return this.product.price * this.count;
    },
    // handleAddToHistory() {
    //   const totalAmount = this.calculateLinePrice().toFixed(2);
    //   if (this.isProductTypeSelected) {
    //     const ProductIDString = this.product.id.toString();
    //     console.log(ProductIDString);
    //     axios
    //       .post("http://localhost:8081/2c2p/paymentToken", {
    //         amount: totalAmount,
    //       })
    //       .then((paymentResponse) => {
    //         const payloadObject = paymentResponse.data;
    //         const payload = payloadObject.payload.payload.toString();
    //         console.log("Payload received from 2C2P:", payload);

    //         if (typeof payload === "string") {
    //           const decoded = jwtDecode(payload);
    //           console.log("Decoded JWT:", decoded);

    //           const webPaymentUrl = decoded.webPaymentUrl;
    //           if (webPaymentUrl) {
    //             window.location.href = webPaymentUrl;
    //           } else {
    //             alert("ไม่พบลิงก์สำหรับการจ่ายเงินใน Payload");
    //           }
    //         } else {
    //           console.error("Invalid token: Payload is not a string", payload);
    //           alert("เกิดข้อผิดพลาดในการประมวลผล payment token");
    //         }
    //       })
    //       .catch((error) => {
    //         if (error.response) {
    //           console.error(
    //             "Error processing payment token:",
    //             error.response.data
    //           );
    //         } else {
    //           console.error("Error processing payment token:", error.message);
    //         }
    //         alert("เกิดข้อผิดพลาดในการประมวลผล payment token");
    //       });
    //   } else {
    //     alert("กรุณาเลือกประเภทสินค้าก่อน");
    //   }
    // },
  },
  mounted() {
    const productId = new URLSearchParams(window.location.search).get(
      "productId"
    );
    if (productId) {
      this.fetchProductDetails(productId).then(() => {
        this.checkFollowStatus();
      });
    }
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
  /* height: 580px; */
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  /* padding-right: 60px; */
}

#containerProductItem {
  display: flex;
  width: 1000px;
  flex-direction: column;
  background-color: #ffffff;
  padding: 15px 0 0 15px;
}

#Image {
  width: 450px;
  height: 450px;
  background-size: cover;
  background-position: center;
  object-fit: cover;
  border-radius: 5px;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* #ProductItemImg{
    max-height: 450px;
} */
#ProductItemHead {
  display: flex;
  gap: 40px;
  min-height: 500px;
  padding: 20px;
  /* background-color: #ffffff; */
}

.product-type-group {
  display: flex;
  /* justify-content: center; */
  align-items: center;
}

.selected {
  color: rgb(255, 149, 0);
  border: 2px solid rgb(255, 149, 0);
}

.product-type-buttons button {
  /* border: 2px solid #a0a0a065; */
  background: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.product-type-buttons button:hover {
  border: 2px solid #a0a0a065;
  background-color: #c2c2c2;
  color: #000000;
}

.product-type-buttons button.selected {
  background-color: rgb(255, 214, 163);
  /* สีแดงเมื่อเลือก */
  border: 2px solid #ffb662;
  color: black;
}

#ProductItemTxt {
  width: 760px;
  /* height: 500px; */
  padding: 15px;
  /* background-color: rgb(255, 255, 255); */
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  padding-bottom: 0;
}

router-link {
  padding: 0;
  margin: 0;
  border: 0;
}

.heart {
  width: 30px;
  height: 30px;
  color: rgb(18, 20, 18);
  cursor: pointer;
  position: relative;
  transition: background-color 0.5s;
}

.heart:hover {
  color: red;
}

.red {
  color: red;
}

#like {
  /* margin: 20px 0 20px 0; */
  display: flex;
  align-items: center;
  gap: 35px;
}

#like p {
  font-size: 18px;
}

.option {
  display: flex;
  align-items: center;
  /* margin: 20px 0 20px 0; */
}

.option p {
  width: 60px;
  font-size: 15px;
  padding: 0px;
}

.option button {
  padding: 10px 20px 10px 20px;
  margin: 0 10px 10px 10px;
}

.pink {
  background-color: #ffb6c1;
  /* สีชมพูอ่อน */
}

.price {
  font-size: 25px;
}

.quantity {
  display: flex;
  gap: 20px;
  margin-top: 10px;
  /* position: absolute; */
  /* bottom: 0; */
  width: 100%;
}

.quantity p {
  font-size: 20px;
}

#quantitycount {
  display: flex;
  align-items: center;
}

#quantitycount input {
  font-size: 22px;
  width: 55px;
  height: 30px;
  text-align: center;
  border: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
}

.minus,
.plus {
  width: 30px;
  height: 32px;
  font-size: 20px;
  color: rgb(0, 0, 0);
  background-color: #ffffff;
  border: 2px solid #e8e8e8;
  cursor: pointer;
}

.minus:hover,
.plus:hover {
  background-color: #e8e8e8;
  border: 2px solid #e8e8e8;
}

#ProductItemBottom {
  display: flex;
  gap: 3.9rem;
  margin: 20px 0 20px 0;
  align-items: center;
}

.quantityitems {
  display: flex;
  flex-direction: column;
}

#ProductItemButton {
  margin-bottom: 45px;
  display: flex;
  gap: 40px;
  margin-top: 1.5rem;
}

.btn1,
.btn2 {
  /* width: 200px;
    height: 70px; */
  background: #ffe5b9;
  font-size: 16px;
  border: 1px solid #ffae22;
  padding: 1rem 2rem 1rem 2rem;
  /* color: #8d5b04; */
  cursor: pointer;
  transition: 0s;
}

.btn1:disabled,
.btn2:disabled {
  background: #ccc;
  /* Light gray for disabled state */
  border: 1px solid #707070;
  cursor: not-allowed;
  /* Change cursor to indicate disabled */
}

.btn1:hover:not(:disabled),
.btn2:hover:not(:disabled) {
  background: #ffae22;
  border-radius: 15px;
}

#quantitycount button {
  width: 30px;
  font-size: 20px;
  cursor: pointer;
}

.no-spinner {
  /* ซ่อนปุ่ม spinner */
  -moz-appearance: textfield;
}

.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
  /* ซ่อนปุ่ม spinner สำหรับ Chrome และ Safari */
  -webkit-appearance: none;
  margin: 0;
}
</style>
