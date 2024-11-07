<template>
    <div id="container">
        <div id="detail-container">
            <h1>รายละเอียดสินค้า</h1>
            <p>{{ productDetails }}</p>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            productDetails: '' 
        };
    },
    methods: {
        async fetchProductDetails(productId) {
            try {
                const response = await axios.get(`http://localhost:8081/selling/productss`);
                if (response.data && response.data.length > 0) {
                    const product = response.data.find(product => product.id == productId);
                    if (product) {
                        this.productDetails = product.productDetails;
                        console.log(this.productDetails);
                    } else {
                        console.log('ไม่พบข้อมูลสินค้าที่มี ID นี้');
                    }
                } else {
                    console.log('ไม่พบข้อมูลสินค้า');
                }
            } catch (error) {
                console.error('ข้อผิดพลาดในการดึงข้อมูล:', error);
            }
        }
    },
    async mounted() {
        const productId = new URLSearchParams(window.location.search).get('productId');
        if (productId) {
            this.fetchProductDetails(productId);
        }
    }
};
</script>




<style scoped>
*{
    font-family: "Noto Sans Thai", sans-serif;
    font-weight: 500;
    font-style: normal;
}

#container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
}

#detail-container {
    width: 920px;
    height: auto;
    max-height: 500px;
    background-color: rgb(255, 255, 255);
    /* margin-right: 60px; */
    margin-bottom: 30px;
    padding: 20px 50px 20px 50px;
}

#container h1 {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 20px;
}

#container p {
    font-size: 15px;
}
</style>