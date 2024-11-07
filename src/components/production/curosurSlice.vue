<template>
    <div class="carousel">
        <div class="carousel-inner" :style="{ transform: `translateX(${-currentSlide * (100 / imagesPerSlide)}%)` }">
            <div class="carousel-item" v-for="(image, index) in imageList" :key="index">
                <img :src="image.src" :alt="`Image ${image.id}`" @click="ShowImg(index)" />
            </div>
        </div>
        
        <font-awesome-icon v-if="imageList.length > imagesPerSlide" :icon="['fas', 'chevron-left']" @click="prevSlide" class="carousel-control prev" />
        <font-awesome-icon v-if="imageList.length > imagesPerSlide" :icon="['fas', 'chevron-right']" @click="nextSlide" class="carousel-control next" />

        <div v-if="imageList.length > imagesPerSlide" class="pagination-dots">
            <span v-for="(dot, index) in imageList.length - 3" 
                :key="index" 
                :class="{'dot': true, 'active-dot': currentSlide === index}"
                @click="goToSlide(index)">
            </span>
        </div>

        <div v-if="showModal" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <img :src="selectedImage?.src" :alt="`Selected Image ${selectedImage?.id}`" />
                <font-awesome-icon :icon="['fas', 'circle-chevron-left']" @click="prevImage" class="modal-nav prev"/>
                <font-awesome-icon :icon="['fas', 'circle-chevron-right']" @click="nextImage" class="modal-nav next"/>
                <font-awesome-icon :icon="['fas', 'xmark']" @click="closeModal" class="close-button" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            currentSlide: 0,
            imageList: [],
            imagesPerSlide: 4,
            showModal: false,
            selectedImage: null,
            selectedIndex: 0
        };
    },
    computed: {
        maxSlides() {
            return Math.ceil(this.imageList.length / this.imagesPerSlide);
        }
    },
    methods: {
        async fetchProductDetails(productId) {
            try {
                const response = await axios.get(`http://localhost:8081/selling/productss`);
                if (response.data && response.data.length > 0) {
                    const product = response.data.find(product => product.id == productId);
                    if (product) {
                        this.imageList = product.imageList;
                        console.log(this.imageList);
                    } else {
                        console.log('ไม่พบข้อมูลสินค้าที่มี ID นี้');
                    }
                } else {
                    console.log('ไม่พบข้อมูลสินค้า');
                }
            } catch (error) {
                console.error('ข้อผิดพลาดในการดึงข้อมูล:', error);
            }
        },
        nextSlide() {
            if (this.currentSlide < this.imageList.length-4) {
                this.currentSlide++;
            }
        },
        prevSlide() {
            if (this.currentSlide > 0) {
                this.currentSlide--;
            }
        },
        ShowImg(index) {
            this.selectedIndex = index;
            this.selectedImage = this.imageList[index];
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.selectedImage = null;
        },
        nextImage() {
            if (this.selectedIndex < this.imageList.length - 1) {
                this.selectedIndex++;
            } else {
                this.selectedIndex = 0;
            }
            this.selectedImage = this.imageList[this.selectedIndex];
        },
        prevImage() {
            if (this.selectedIndex > 0) {
                this.selectedIndex--;
            } else {
                this.selectedIndex = this.imageList.length - 1;  // Wrap to last image
            }
            this.selectedImage = this.imageList[this.selectedIndex];
        },
        goToSlide(index) {
            this.currentSlide = index;
        }
    },
    async mounted() {
        const productId = new URLSearchParams(window.location.search).get('productId');
        if (productId) {
            await this.fetchProductDetails(productId);
        }
    }
};
</script>

<style scoped>
.carousel {
    width: 450px;
    overflow: hidden;
    position: relative;
}

.carousel-inner {
    display: flex;
    transition: transform 0.5s ease-in-out;
}

.carousel-item {
    flex-shrink: 0;
    width: calc(100% / 4);
}

.carousel-item img {
    width: 92px;
    height: 92px;
    padding: 10px;
    object-fit: cover;
    border-radius: 15px;
    cursor: pointer;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    filter: contrast(1.2);
    transition: transform 0.3s ease;
}

.carousel-item img:hover {
    transform: scale(1.05);
}

.carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    padding: 10px;
    cursor: pointer;
    transition: color 0.3s ease;
}

.carousel-control:disabled {
    color: rgba(0, 0, 0, 0.2);
    cursor: not-allowed;
}

.prev {
    left: -10px;
    font-size: 40px;
    color: rgba(0, 0, 0, 0.47);
}

.next {
    right: -10px;
    font-size: 40px;
    color: rgba(0, 0, 0, 0.47);
}

.prev:hover,
.next:hover {
    color: black;
}

.pagination-dots {
    display: flex;
    justify-content: center;
    margin-top: -10px;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.active-dot {
    background-color: rgba(0, 0, 0, 0.7);
}

.modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    display: flex;
    align-items: center;
}

.modal-content img {
    width: 500px;
    height: auto;
    transition: 0.3s ease;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    filter: contrast(1.2);
}

.close-button {
    position: absolute;
    top: 5px;
    right: 7px;
    font-size: 25px;
    color: #ffffff;
    border: none;
    padding: 5px;
    cursor: pointer;
}

.close-button:hover {
    transition: color 0.3s ease;
    color: #ff9393;
}

.modal-nav {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: rgba(255, 255, 255, 0.479);
    background: none;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.modal-nav:hover {
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.592);
    transition: box-shadow 0.3s ease color 0.3s ease;
    color: #ffffff;
}

.modal-nav.prev {
    left: -15px;
}

.modal-nav.next {
    right: -15px;
}
</style>
