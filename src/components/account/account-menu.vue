<template>
    <div id="Purchase-history-left">
        <div class="user">
            <div class="user-title" @click="toggleVisibility">
                <h3>ผู้ซื้อ</h3>
                <font-awesome-icon :icon="['fas', 'caret-down']" class="icon" />
            </div>
            <div class="item">
                <font-awesome-icon :icon="['far', 'paste']" class="icons" v-show="isVisible"/>
                <p v-show="isVisible"><router-link to="/users/PurchaseHistory"
                    class="custom-link" >ประวัติการซื้อ</router-link></p>
            </div>
            <div class="item">
                <font-awesome-icon :icon="['fas', 'cart-shopping']"  class="icons" v-show="isVisible"/> 
                <p v-show="isVisible"><router-link to="/users/cart" class="custom-link">ตะกร้าสินค้า</router-link></p>
            </div>
            <div class="item">
                <font-awesome-icon :icon="['fas', 'map-location-dot']"  class="icons" v-show="isVisible"/>
                <p v-show="isVisible"><router-link to="/users/locationAdress" class="custom-link">ที่อยู่</router-link></p>
            </div>
            <div class="item">
                <font-awesome-icon :icon="['fas', 'gear']"  class="icons" v-show="isVisible"/>
                <p v-show="isVisible"><router-link to="/users/setting" class="custom-link">ตั้งค่าบัญชี</router-link>
                </p>
            </div>
            <!-- <div class="item">
                <font-awesome-icon :icon="['fas', 'gear']"  class="icons" v-show="isVisible"/>
                <p v-show="isVisible"><router-link to="/historyBill" class="custom-link">ดูประวัติใบเสร็จชำระเงิน</router-link>
                </p>
            </div> -->
           
            
        </div>
        <div v-if="userRole === 'seller'" class="user">
            <div class="user-title" @click="toggleVisibility2">
                <h3>ผู้ขาย</h3>
                <font-awesome-icon :icon="['fas', 'caret-down']" class="icon" />
            </div>
            <div class="item">
                <font-awesome-icon :icon="['fas', 'chart-line']"  class="icons" v-show="isVisible2"/>
                <p v-show="isVisible2"><router-link to="/OrderHistory" class="custom-link">ประวัติสินค้าที่ถูกซื้อ</router-link></p>
            </div>
            <div class="item">
                <font-awesome-icon :icon="['fas', 'chart-line']"  class="icons" v-show="isVisible2"/>
                <p v-show="isVisible2"><router-link to="/users/Business" class="custom-link">ดูผลประกอบการ</router-link></p>
            </div>
            <div class="item">
                <font-awesome-icon :icon="['fas', 'circle-plus']"  class="icons" v-show="isVisible2"/>
                <p v-show="isVisible2"><router-link to="/selling/StartSelling"
                    class="custom-link">วางขายสินค้า</router-link></p>
            </div>
            <div class="item">
                <font-awesome-icon :icon="['fas', 'store']"  class="icons" v-show="isVisible2"/>
                <p v-show="isVisible2"><router-link to="/selling/mystore" class="custom-link">ร้านค้าของฉัน</router-link></p>
            </div>
            
           
            
            <!--<p v-show="isVisible2"><router-link to="/users/Center" class="custom-link">ตั้งค่าการแจ้งเตือน</router-link> -->
        </div>
        <h2 class="logout" @click="logout">ออกจากระบบ</h2>
    </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far);
export default {
    components: {
        FontAwesomeIcon,
    }, data() {
        return {
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
            isVisible: true,
            isVisible2: true,
            userRole: '',
            isLoggedIn: false
        };
    }, created() {
        this.checkUserRole();
        this.checkLoginStatus();
    }, methods: {
        checkUserRole() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.role) {
                this.userRole = user.role;
            }
        },
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        },
        toggleVisibility2() {
            this.isVisible2 = !this.isVisible2;
        }, gotoPage(page) {
            this.currentPage = page;
        },
        checkbutton(checkboxName) {
            this[checkboxName] = !this[checkboxName];
        },
        checkLoginStatus() {
            const token = localStorage.getItem('token');
            this.isLoggedIn = !!token;
        },  
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.isLoggedIn = false;
            this.userRole = '';  
            // window.location.href = `${process.env.VUE_APP_NGROK}`;
            window.location.href = process.env.VUE_APP_NGROK || 'http://localhost:8080';
        }
    }
}
</script>

<style scoped>
#Purchase-history-left {
    min-width: 205px;
    height: 90%;
    background-color: #1f1b3a;
    padding: 15px 25px 15px 25px;
    display: flex;
    flex-direction: column;
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); */
}

.logout {
    margin-top: 4rem;
    color: #ff7979;
}
.logout:hover {
    color: #ff2424;
}

#Purchase-history-left p {
    margin: 10px;
}

.user-title {
    display: flex;
    gap: 5rem;
    align-items: center;
}
.item{
    display: flex;
    align-items: center;
}
.icons{
    color: #53c8ff;
}
.user {
    display: flex;
    flex-direction: column;
    /* gap: 0.2rem; */
    height: 280px;
}
.seller{
    display: flex;
    flex-direction: column;
    /* gap: 0.2rem; */
    height: 240px;
}
.icon {
    font-size: 30px;
    color: #ffc192;
    cursor: pointer;
}

p,
h3,
h2 {
    cursor: pointer;
    color: #ffc192;
}

.custom-link {
    text-decoration: none;
    color: #fff0df;
}
</style>