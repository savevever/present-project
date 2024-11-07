<template>
    <div id="container">
        <div id="comment-container">
            <h1>แสดงความคิดเห็น</h1>
            <div class="comment" v-for="(comment, index) in comments" :key="index">
                <img :src="comment.AcImg ? comment.AcImg : require('@/assets/1.png')" alt="Comment Image" class="imgF">
                <div class="comment-right">
                    <p >{{ comment.AcName }}</p>
                    <div class="star-container">
                        <FontAwesomeIcon v-for="n in 5" :key="n"
                            :icon="n <= comment.star ? 'fa-solid fa-star' : 'fa-regular fa-star'" class="star-icon" />
                    </div>
                    <p id="date">{{ formatDate(comment.createdAt) }}</p>
                    <!-- <h3>{{ comment.nameProduct }}</h3>                    -->
                    <p id="comment-text">{{ comment.detail }}</p>
                    <div class="image-comment-container">
                        <img v-for="(image, imgIndex) in parseImageComment(comment.imageComment)" :key="imgIndex"
                            :src="image.src" alt="Comment Image" class="comment-image" />
                    </div>

                </div>
            </div>
        </div>
    </div>
    <footerComponent></footerComponent>
</template>

<script>
import axios from 'axios';
import { faImage, faStar } from '@fortawesome/free-solid-svg-icons'
library.add(faImage, faStar)
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'; // ดาวเปล่า
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fasStar, farStar);
export default {
    components: {
        FontAwesomeIcon,
    },
    data() {
        return {
            comments: [],
            productId: "",

        };
    },
    mounted() {

        const productId = new URLSearchParams(window.location.search).get('productId');
        if (productId) {
            this.productId = productId
        }
        this.loadComment();
    },
    methods: {
        async loadComment() {
            try {
                const response = await axios.get(`http://localhost:8081/products/getComments/${this.productId}`);
                this.comments = response.data;
                console.log("sdasdasdasd", this.comments);

            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },
        parseImageComment(imageComment) {
            try {
                return JSON.parse(imageComment);
            } catch (error) {
                console.error('Error parsing imageComment:', error);
                return [];
            }
        }
    },
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

.star-icon {
    color: #ffb61a;
}

#comment-container {
    width: 920px;
    /* margin-right: 60px; */
    background-color: rgb(255, 255, 255);
    margin-bottom: 30px;
    padding: 20px 50px 20px 50px;
}
.comment-image{
    width: 50px;
    height: 50px;
}
.comment {
    background-color: rgb(234, 240, 238);
    display: flex;
    width: 100%;
    height: auto;
    margin-top: 10px;
    align-items: center;
    padding: 10px 0 10px 0;
    border-radius: 10px;
}

.imgF {
    height: 65px;
    width: 65px;
    border-radius: 40px;
    margin: 0 20px 0 20px;
}

#comment-container h1 {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 20px;
}

.comment-right {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.comment-right p {
    margin: 0;
}

.comment-right h3 {
    margin: 0;
}

#comment-text {
    font-size: 16px;
}

#date {
    font-size: 12px;
    color: rgb(87, 86, 86);
}
</style>