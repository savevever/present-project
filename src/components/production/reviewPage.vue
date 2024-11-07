<template>
    <div class="container">
        <p class="title">เขียนรีวิว</p>

        <!-- สินค้า -->
        <div class="product-con">
            <h2>{{ productTitle }}</h2>
            <img :src="productImage" alt="Product Image" class="image">
            <p>{{ productPrice }} บาท</p>
        </div>
        <!-- คะแนนดาว -->
        <div class="star-container">
            <div class="star-widget">
                <input type="radio" name="rate" id="rate-5" v-model="rating" value="5">
                <label for="rate-5"><font-awesome-icon :icon="['fas', 'star']" /></label>

                <input type="radio" name="rate" id="rate-4" v-model="rating" value="4">
                <label for="rate-4"><font-awesome-icon :icon="['fas', 'star']" /></label>

                <input type="radio" name="rate" id="rate-3" v-model="rating" value="3">
                <label for="rate-3"><font-awesome-icon :icon="['fas', 'star']" /></label>

                <input type="radio" name="rate" id="rate-2" v-model="rating" value="2">
                <label for="rate-2"><font-awesome-icon :icon="['fas', 'star']" /></label>

                <input type="radio" name="rate" id="rate-1" v-model="rating" value="1">
                <label for="rate-1"><font-awesome-icon :icon="['fas', 'star']" /></label>

                <form action="#">
                    <p></p>
                    <header></header>
                </form>
            </div>
        </div>

        <!-- เขียนรีวิว -->
        <div class="review-container">
            <p>เขียนรีวิวสินค้า</p>
            <textarea id="review" v-model="reviewText" placeholder="รายละเอียดต่างๆ ของสินค้า"
                @input="adjustTextareaHeight($event.target)"></textarea>
        </div>

        <!-- เพิ่มรูปภาพ -->
        <div class="upload-container">
            <p>เพิ่มรูปภาพ</p>
            <div class="images-container" id="container-product-images">
                <div v-for="(image, index) in images" :key="image.id" class="image-wrapper">
                    <img :src="image.src" alt="Product Image" class="uploaded-image" />
                    <span class="delete-icon" @click="removeImage(index)">x</span>
                </div>
            </div>

            <div class="upload-icon-container">
                <font-awesome-icon :icon="['fas', 'image']" @click="triggerFileInput('product')" class="upload-icon" />
            </div>

            <input type="file" ref="productImageInput" class="image-upload" accept="image/*"
                @change="previewImage($event, 'images')" multiple style="display: none" />
        </div>

        <button type="button" class="btn" @click="addToComment">
            ยืนยัน
        </button>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faImage, faStar } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Pica from 'pica';
library.add(faImage, faStar)
export default {
    props: {
        initialProduct: {
            type: Object,
            default: () => ({})
        }
    },
    name: 'ReviewPage',
    data() {
        return {
            reviewText: '',
            rating: '',
            images: [],
            nextImageId: 1,
            productId: '',
            productTitle: 'ไม่มีชื่อสินค้า',
            productPrice: 'ไม่ทราบราคา',
            productImage: 'ไม่มีรูปภาพ',
            historyId:""
        };
    },
    mounted() {
        const productId = new URLSearchParams(window.location.search).get('productId');
        const historyId = new URLSearchParams(window.location.search).get('historyId');
        if (productId) {           
            this.fetchProductDetails(productId);
            this.productId = productId
        }
        if (historyId) {
        this.historyId = historyId;
    }
    console.log(this.historyId);
    },
    components: {
        FontAwesomeIcon,
    },
    methods: {
        fetchProductDetails(productId) {
            console.log('Fetching product details for ID:', productId);
            axios.get('http://localhost:8081/selling/productss')
                .then(response => {
                    console.log('Response Data:', response.data);
                    if (response.data && response.data.length > 0) {
                        const product = response.data.find(product => product.id == productId);
                        if (product) {
                            this.productTitle = product.nameProduct;
                            this.productPrice = product.price;
                            if (product.imageList && product.imageList.length > 0) {
                                this.productImage = product.images[0].src;
                            } else {
                                this.productImage = '../../assets/default.png';
                            }

                            console.log('Product Data:', product);
                        } else {
                            console.log('ไม่พบข้อมูลสินค้าที่มี ID นี้');
                        }
                    } else {
                        console.log('ไม่พบข้อมูลสินค้า');
                    }
                })
                .catch(error => {
                    console.error('ข้อผิดพลาดในการดึงข้อมูล:', error);
                });
        },
        adjustTextareaHeight(textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + 2 + "px";
        },
        triggerFileInput(inputName) {
            const refMap = {
                product: "productImageInput",
            };
            const refName = refMap[inputName];
            const input = this.$refs[refName];
            if (input) {
                input.click();
            }
        },
        async previewImage(event) {
            const pica = Pica();
            const files = event.target.files;

            this.images.length = 0;

            for (const file of files) {
                if (file) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const img = new Image();
                    img.src = e.target.result;

                    img.onload = async () => {
                    const originalCanvas = document.createElement('canvas');
                    originalCanvas.width = img.width;
                    originalCanvas.height = img.height;
                    const originalCtx = originalCanvas.getContext('2d');
                    originalCtx.drawImage(img, 0, 0, img.width, img.height);

                    const resizedCanvas = document.createElement('canvas');
                    const max_width = 300;
                    const max_height = 250;
                    let width = img.width;
                    let height = img.height;

                    // ปรับขนาดภาพให้ตรงตามเงื่อนไขที่กำหนด
                    if (width > height) {
                        if (width > max_width) {
                        height = (height * max_width) / width;
                        width = max_width;
                        }
                    } else {
                        if (height > max_height) {
                        width = (width * max_height) / height;
                        height = max_height;
                        }
                    }

                    resizedCanvas.width = width;
                    resizedCanvas.height = height;

                    // ทำการย่อภาพและแปลงเป็น Blob
                    await pica.resize(originalCanvas, resizedCanvas);
                    pica.toBlob(resizedCanvas, 'image/jpeg', 0.3).then((blob) => {
                        const readerBlob = new FileReader();
                        readerBlob.onloadend = () => {
                        this.images.push({
                            id: `image${this.nextImageId++}`,
                            src: readerBlob.result,
                        });
                        };
                        readerBlob.readAsDataURL(blob);
                    });
                    };
                };
                reader.readAsDataURL(file);
                }
            }

            // รีเซ็ตค่า input
            event.target.value = "";
        },
        // removeImage(index) {
        //     this.images.splice(index, 1);
        //     
            
        // },
        userEmail() {
            const user = JSON.parse(localStorage.getItem('user'));
            console.log('User Email:', user ? user.email : null);
            return user ? user.email : null;
        },
        addToComment() {
            const user = JSON.parse(localStorage.getItem('user'));
            const productData = {
                nameProduct: this.productTitle,
                imageProduct: this.productImage,
                price: this.productPrice,
                detail: this.reviewText,
                imageComment: JSON.stringify(this.images.map(img => ({
                    id: img.id,
                    src: img.src
                }))),
                star: this.rating,
                shopId: this.productId,
                email: this.userEmail(),
                historyId: this.historyId,
                productId: this.productId,
                AcImg: user.image,
                AcName: user.name,         
            };
            console.log('Product Data for History:', productData);
            axios.post(`http://localhost:8081/products/createComment`, productData)
                .then(response => {
                    console.log("Product added to history:", response.data);
                    window.location.href = `http://localhost:8080/users/production?productId=${this.productId}`;
                })
                .catch(error => {
                    console.error("Error details:", error.response.data);
                });


        },
    }
}
</script>

<style scoped>
.container {
    max-width: 1260px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.title {
    font-size: 1.5rem;
    text-align: center;
}

p {
    font-size: 1.2rem;
}

.product-con {
    padding: 20px;
    text-align: center;
}

.review-container {
    width: 90%;
    height: auto;
    margin: 20px auto;
    text-align: center;
    align-items: center;
}

#review {
    height: auto;
    box-sizing: border-box;
    width: 80%;
    padding: 10px;
    font-size: 1.2rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    overflow: hidden;
}

textarea {
    font-size: 20px;
    width: 40%;
    resize: none;
}

.btn {
    width: 30%;
    padding: 10px;
    font-size: 20px;
    border: #a1a1a1;
    background: #a1a1a1;
    border-radius: 20px;
    margin-top: 20px;
    cursor: pointer;
}

.btn:hover {
    background: rgb(235, 149, 149);
    color: white;
}

.star-container {
    width: 100%; /* ปรับขนาดให้เป็นเต็มพื้นที่ */
    max-width: 400px;
    background: #f4f4f4;
    padding: 20px 30px;
    border: 1px solid #f4f4f4;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
}

.star-widget form header:before,
.star-widget form p:before {
    display: block; /* แสดงเป็นบล็อกเพื่อให้อยู่ตรงกลาง */
    text-align: center; /* จัดให้อยู่ตรงกลาง */
    width: 100%; /* ขยายให้เต็มความกว้าง */
    font-size: 1.2rem; /* กำหนดขนาดตัวอักษรตามต้องการ */
    margin-top: 10px; /* เพิ่มระยะห่างด้านบน */
}

.star-widget input {
    display: none;
    cursor: pointer;
}

.star-widget label {
    font-size: 40px;
    color: #444;
    padding: 10px;
    float: right;
    transition: all 0.2s ease;
    cursor: pointer;
    text-align: center;
}

input:not(:checked)~label:hover,
input:not(:checked)~label:hover~label {
    color: rgb(238, 196, 60);
}

input:checked~label {
    color: #ffcc00;
}

input#rate-5:checked~label {
    color: #f5d34d;
    text-shadow: 0 0 20px #952;
}

#rate-1:checked~form header:before {
    content: "Very Bad";
}

#rate-1:checked~form p:before {
    content: "😔";
}

#rate-2:checked~form header:before {
    content: "Bad";
}

#rate-2:checked~form p:before {
    content: "☹️";
}

#rate-3:checked~form header:before {
    content: "Good";
}

#rate-3:checked~form p:before {
    content: "🙂";
}

#rate-4:checked~form header:before {
    content: "Very Good";
}

#rate-4:checked~form p:before {
    content: "🥰";
}

#rate-5:checked~form header:before {
    content: "Excellent";
}

#rate-5:checked~form p:before {
    content: "😍🤗";
}

.upload-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;
    position: relative;
}

.image {
    width: 170px;
    height: 170px;
}

.image-wrapper {
    position: relative;
    display: inline-block;
    margin: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border-radius: 8px;
    width: 200px;
    height: 200px;
}

.upload-icon {
    font-size: 50px;
    color: #888;
    cursor: pointer;
    margin-bottom: 20px;
}

.upload-icon:hover {
    color: #555;
}

.delete-icon {
    position: absolute;
    top: 0;
    right: 0;
    background: red;
    color: white;
    cursor: pointer;
    padding: 2px 5px;
    border-radius: 50%;
    font-size: 14px;
}

.images-container {
    display: flex;
    flex-wrap: wrap;
}

.uploaded-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>
