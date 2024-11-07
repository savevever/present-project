<template>
  <div id="container">
    <div id="Purchase-history-container">
      <menuComponent></menuComponent>
      <div id="Purchase-history-right">
        <h1>ตะกร้าสินค้า</h1>
        <div id="item-container">
          <div v-for="(product, index) in cartItems" :key="index" class="item">
            <div class="items">
              <input type="checkbox" v-model="product.checkbox" class="checked" @change="setSelectItem(product)" />
              <img :src="product.image" alt="" style="width: 100px; height: 100px" />

              <div class="item-1">
                <p>
                  <span> {{ truncatedName(product.nameProduct) }}</span>
                </p>
                <p>
                  ตัวเลือก:<span>{{ product.productTypes }}</span>
                </p>
              </div>
              <div class="item-2">
                <!-- <div class="quantitycount">
                  <button class="minus" @click="decrement(product)">-</button>
                  <input type="number" v-model="product.quantity" min="1" 
                    :max="product.numberProducts" 
                    @change="onQuantityChange(product.id, product.quantity)" 
                    class="no-spinner" 
                    @input="checkTyping(product)"/>
                  <button class="plus" @click="increment(product)">+</button>
                </div> -->
                <div class="quantitycount" :key="product.id">
                  <button class="minus" @click="decrement(product)">-</button>
                  <input type="number" v-model="product.quantity" :max="product.numberProducts"
                    @change="onQuantityChange(product.id, product.quantity)" @input="updateCount(product)" min="0"
                    class="no-spinner" />
                  <button class="plus" @click="increment(product)">+</button>
                </div>
                <div class="product-line-price">
                  {{ calculateLinePrice(product).toFixed(2) }} บาท
                </div>
              </div>
            </div>
          </div>
          <div class="item-button">
            <button @click="handleClick">สั่งซื้อ</button>
            <button @click="selectAllbutton(cartItems)">
              เลือกสินค้าทั้งหมด
            </button>
            <button @click="clearCart()">ลบรายการสินค้า</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footerComponent></footerComponent>
</template>

<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";
export default {
  data() {
    return {
      selectedItems: [],
      cartItems: [],
      currentPage: 1,
      itemsPerPage: 12,
      totalItems: 0,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.cartItems.slice(start, end);
    },
    totalPrice() {
      if (this.selectedItems.length > 0) {
        return this.calculateLinePrice(this.selectedItems[0]).toFixed(2);
      }
      return 0;
    },
  },
  methods: {
    truncatedName(name) {
      if (name.length > 35) {
        // const firstLine = name.substring(0, 20);
        const secondLine = name.substring(0, 35) + "...";
        return `${secondLine}`;
      }
      return name;
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
    async loadCart() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          throw new Error("User not found in localStorage");
        }
        const userEmail = user.email;
        if (!userEmail) {
          throw new Error("User email not found");
        }

        // ดึงข้อมูลจาก API สำหรับสินค้าทั้งหมด
        const productsResponse = await axios.get(
          "http://localhost:8081/selling/productss"
        );
        const allProducts = productsResponse.data; // เก็บข้อมูลสินค้าทั้งหมด

        const response = await axios.get(
          "http://localhost:8081/products/getCart"
        );
        const allCartItems = response.data;
        console.log("allCartItems", allCartItems);

        // กรองรายการสินค้าในตะกร้าตามอีเมลของผู้ใช้
        this.cartItems = allCartItems.filter(
          (entry) => entry.email === userEmail
        );

        const tempCart = [];

        this.cartItems.forEach((item) => {
          const existingItem = tempCart.find(
            (tempItem) =>
              tempItem.productId === item.productId &&
              tempItem.productTypes === item.productTypes
          );

          if (existingItem) {
            existingItem.quantity += item.quantity;
          } else {
            // หา numberProducts จาก allProducts
            const productDetails = allProducts.find(
              (product) => product.id === item.productId
            );
            const numberProducts = productDetails
              ? productDetails.numberProducts
              : 0; // กำหนดค่าเป็น 0 ถ้าไม่พบ

            tempCart.push({ ...item, numberProducts }); // เพิ่ม numberProducts ลงใน tempCart
          }
        });

        this.cartItems = tempCart;

        this.cartItems.forEach((item) => {
          if (item.quantity === 0) {
            item.quantity = 1;
          }
        });

        this.totalItems = this.cartItems.length;
        console.log("this.cartItems", this.cartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    },
    calculateLinePrice(product) {
      return product.price * product.quantity;
    },
    userEmail() {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User Email:", user ? user.email : null);
      return user ? user.email : null;
    },
    addToHistoryClicked() {
      if (this.selectedItems.length > 0) {
        this.selectedItems.forEach((product) => {
          // const calculatedPrice = this.calculateLinePrice(product).toFixed(2);

          const productData = {
            productId: product.id,
            nameProduct: product.nameProduct,
            price: product.price,
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
    async handleClick() {
      this.addToHistoryClicked();
      this.clearCart();
      // await this.payment();
      // await this.clearProduct();
    },
    async clearCart() {
      const itemsToRemove = this.selectedItems.filter(product => product.checkbox);

      try {
        for (const product of itemsToRemove) {
          await axios.delete(`http://localhost:8081/products/delCart/${product.productId}`);
          console.log(`Deleted product with ID: ${product.productId}`);
        }
        await this.loadCart();
      } catch (error) {
        console.error('Error canceling orders:', error);
      }
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
    increment(product) {
      if (!product.checkbox) {
        product.checkbox = true;
        this.setSelectItem(product);
      }

      if (product.quantity < product.numberProducts) {
        product.quantity++;
        this.onQuantityChange(product.id, product.quantity);
      }
      console.log("Product ID:", product.id, "New quantity:", product.quantity);
    },

    decrement(product) {
      if (!product.checkbox) {
        product.checkbox = true;
        this.setSelectItem(product);
      }

      if (product.quantity > 1) {
        product.quantity--;
        this.onQuantityChange(product.id, product.quantity);
      } else if (product.quantity === 1) {
        const confirmClear = window.confirm(
          "คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้ออกจากตะกร้า?"
        );
        if (confirmClear) {
          product.quantity = 0;
          this.clearCart();
        } else {
          product.quantity = 1;
        }
      }
      console.log("Product ID:", product.id, "New quantity:", product.quantity);
    },
    updateCount(product) {
      product.checkbox = true;
      if (product.quantity < 1) {
        const confirmClear = window.confirm(
          "คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้ออกจากตะกร้า?"
        );
        if (confirmClear) {
          product.quantity = 0;
          this.clearCart();
        } else {
          product.quantity = 1;
        }
      } else if (!Number.isInteger(product.quantity)) {
        product.quantity = Math.floor(product.quantity);
      }

      if (product.quantity > product.numberProducts) {
        product.quantity = product.numberProducts;
      }

      if (product.quantity > 0) {
        this.onQuantityChange(product.id, product.quantity);
      }
    },
    onQuantityChange(id) {
      // Check if cartItems exists and contains products
      if (!this.cartItems) {
        console.error("cartItems array is undefined");
        return;
      }
      const product = this.cartItems.find((item) => item.id === id);
      console.log("product", product);

      if (product) {
        const newQuantity = product.quantity;

        axios
          .put(`http://localhost:8081/products/updateCartQuantity/replace/${id}`, {
            replaceQuantity: newQuantity,
            // isReplace: true
          })
          .then((response) => {
            console.log("Quantity updated:", response.data);
          })
          .catch((error) => {
            console.error("Error updating quantity:", error);
          });
      } else {
        console.error("Product not found in cartItems");
      }
    },
    selectAllbutton(allItems) {
      const allSelected = allItems.every((product) => product.checkbox);
      allItems.forEach((product) => {
        product.checkbox = !allSelected;
      });
      this.selectedItems = allSelected ? [] : [...allItems];
    },
    async checkout() {
      const totalAmount = this.cartTotal;
      const success = await this.processPayment({
        userId: 1,
        amount: totalAmount,
      });
      if (success) {
        alert("ชำระเงินสำเร็จ");
        console.log("ยอดเงินคงเหลือ: " + this.currentBalance);
        this.$store.commit("REMOVE_ALL_CART_ITEMS");
      } else {
        alert("ยอดเงินไม่พอ");
      }
    },
    gotoPage(page) {
      this.currentPage = page;
    },
  },
  async mounted() {
    await this.loadCart();
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
  height: auto;
  /* min-height: 690px; */
  display: flex;
  width: 100%;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

/* #Purchase-history-container {
  width: 1000px;
  height: auto;
  min-height: 590px;
  background-color: #1f1b3a;
  display: flex;
  align-items: stretch;
  margin-top: 4rem;
} */

#Purchase-history-container {
  width: 1100px;
  height: 100%;
  /* กำหนดขนาดเท่ากัน */
  background-color: #1f1b3a;
  display: flex;
  align-items: stretch;
  margin-top: 2rem;
  /* ระยะห่างด้านบนเท่ากัน */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

#Purchase-history-right {
  width: 1100px;
  height: auto;
  min-height: 590px;
  padding: 20px;
  background-color: #e6e6e6;
  display: flex;
  /* margin-top: -15px;
    margin-right: -38px; */
  flex-direction: column;
  gap: 1.5rem;
}

h1 {
  /* font-size: 24px; */
  margin-top: 20px;
  font-weight: 700;
}

#item-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
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

.item-2 {
  width: 90px;
  padding: 0 20px;
  gap: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
}

.checked {
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: 0.3s;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.item-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-name,
.product-type {
  margin: 0;
  font-size: 14px;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.product-line-price {
  font-size: 13px;
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
}

.item-button button:first-child {
  background-color: #fde0ae;
  border-color: #fcdca6;
  cursor: pointer;
  transition: 0.3s;
}

.item-button button:first-child:hover {
  background-color: #ffc869;
}

.item-button button:nth-child(2),
.item-button button:nth-child(3) {
  background-color: #ffffff;
  cursor: pointer;
  transition: 0.3s;
}

.item-button button:nth-child(2):hover {
  color: #236500;
  border-color: #72bf78;
}

.item-button button:nth-child(3):hover {
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

.quantitycount {
  display: flex;
  align-items: center;
}

.quantitycount input {
  font-size: 22px;
  width: 50px;
  height: 29px;
  text-align: center;
  border: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
}

.quantitycount button {
  width: 30px;
  font-size: 20px;
  cursor: pointer;
}
</style>
