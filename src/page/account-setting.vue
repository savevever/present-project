<template>
    <div id="container">
        <div id="Purchase-history-container">
            <menuComponent></menuComponent>
            <div id="Purchase-history-right">
                <h1 class="title">ตั้งค่าบัญชี</h1>
                <p>จัดการข้อมูลส่วนตัวคุณของบัญชีผู้ใช้นี้</p>
                <div class="line"></div>
                <div class="items">
                    <div class="item1">
                        <p>
                            ชื่อผู้ใช้ :<span>{{ this.name }}</span>
                        </p>
                        <div style="display: flex; align-items: center">
                            <label for="" style="margin-right: 20px">ชื่อ</label>
                            <input type="text" v-model="UserName" />
                        </div>
                        <p>
                            อีเมลล์ :<span>{{ email }}</span>
                        </p>
                        <div class="gender">
                            <label for="male">เพศ</label>
                            <input type="radio" name="gender" id="male" value="male" v-model="gender" />
                            <label for="male">ชาย</label>
                            <input type="radio" name="gender" id="female" value="female" v-model="gender" />
                            <label for="female">หญิง</label>
                        </div>
                        <input type="date" v-model="date" />
                    </div>
                    <div class="item2">
                        <div class="upload-container" @dragover.prevent @drop.prevent="handleDrop">
                            <span>รูปภาพโปรไฟล์</span>
                            <div class="upload-icon-container" v-if="!imageUploaded">
                                <font-awesome-icon :icon="['fas', 'image']" @click="triggerFileInput('product')"
                                    class="upload-icon" />
                                <input type="file" ref="productImageInput" class="image-upload" accept="image/*"
                                    @change="previewImage($event, 'images')" multiple style="display: none" />
                            </div>
                            <div class="images-container" id="container-product-images">
                                <div v-if="imageUploaded" class="image-wrapper">
                                    <img v-if="images.length > 0" :src="images[0].src" alt="Product Image"
                                        class="uploaded-image" />
                                    <!-- <font-awesome-icon v-if="images.length > 0" :icon="['fas', 'circle-xmark']" class="delete-icon" @click="removeImage" /> -->
                                </div>
                            </div>
                            <p id="photo-product-images-error" v-if="photoProductImagesError" style="color: red">
                                กรุณาอัพโหลดรูปภาพ
                            </p>
                        </div>
                    </div>
                </div>
                <button @click="saveAccountSettings">บันทึก</button>
            </div>
        </div>
    </div>
    <footerComponent></footerComponent>
</template>

<script>
import Pica from "pica";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    components: {
        FontAwesomeIcon,
    },
    data() {
        return {
            email: "",
            gender: "",
            date: "",
            images: [],
            UserName: "",
            name: "",
            imageUploaded: false, // Flag to check if an image has been uploaded
            photoProductImagesError: false, // Add this for error handling if needed
        };
    },
    mounted() {
        const user = localStorage.getItem("user");
        const userObject = JSON.parse(user);
        this.email = userObject.email;
        this.name = userObject.name;
    },
    methods: {
        removeImage() {
            this.images = []; // Clear the images array
            this.imageUploaded = false; // Reset the upload flag
        },
        triggerFileInput(inputName) {
            const refName = this.$refs[`${inputName}ImageInput`];
            if (refName) refName.click();
        },
        async previewImage(event) {
            const pica = Pica();
            const files = event.target.files || event.dataTransfer.files;

            // Clear existing images
            this.images = [];
            this.imageUploaded = true; // Set flag to true on upload

            const file = files[0]; // Get the first file only
            if (!file) return; // Exit if no file

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;

                img.onload = async () => {
                    const originalCanvas = document.createElement("canvas");
                    originalCanvas.width = img.width;
                    originalCanvas.height = img.height;
                    const originalCtx = originalCanvas.getContext("2d");
                    originalCtx.drawImage(img, 0, 0, img.width, img.height);

                    const resizedCanvas = document.createElement("canvas");
                    const max_width = 400;
                    const max_height = 300;
                    let width = img.width;
                    let height = img.height;

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

                    await pica.resize(originalCanvas, resizedCanvas);
                    const blob = await pica.toBlob(resizedCanvas, "image/jpeg", 0.75);
                    const readerBlob = new FileReader();
                    readerBlob.onloadend = () => {
                        this.images.push({
                            id: "image1", // Static ID since only one image
                            src: readerBlob.result,
                        });
                    };
                    readerBlob.readAsDataURL(blob);
                };
            };
            reader.readAsDataURL(file);
            event.target.value = ""; // Clear the input for subsequent uploads
        },
        handleDrop(event) {
            const files = event.dataTransfer.files;
            if (files.length) {
                this.previewImage({ target: { files } }); // Call previewImage with dropped files
            }
        },
        async saveAccountSettings() {
            try {
                const user = JSON.parse(localStorage.getItem("user"));

                const payload = {
                    email: this.email,
                    gender: this.gender || user.gender,
                    date: this.date || user.date,
                    name: this.UserName || user.name,
                    image: this.images.length > 0 ? this.images[0].src : user.image,
                };

                console.log("Payload:", payload);

                const response = await axios.put(
                    "http://localhost:8081/users/account",
                    payload
                );

                user.name = payload.name;
                user.image = payload.image;
                localStorage.setItem("user", JSON.stringify(user));

                console.log("Updated user:", response.data);

                alert("บันทึกการตั้งค่าบัญชีเรียบร้อยแล้ว!");

                window.location.reload();
            } catch (error) {
                console.error("Error updating account:", error);
                alert("Error updating account. Please try again.");
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

.line {
    width: 750px;
    height: 3px;
    background-color: #e6e6e6;
    margin-top: 20px;
}

.items {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 100px;
}

.image-wrapper {
    position: relative;
    /* ให้มีตำแหน่งเพื่อการจัดการการลบ */
}

/* .gender label {
    font-size: 25px;
} */

.uploaded-image {
    width: 200px;
    /* กำหนดความกว้างของรูปภาพ */
    height: 200px;
    /* กำหนดความสูงของรูปภาพ */
    object-fit: cover;
}

.delete-icon {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 25px;
    color: rgb(255, 120, 120);
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
}

.delete-icon:hover {
    color: red;
    box-shadow: 0 0 10px #000000;
}

.upload-icon {
    font-size: 90px;
    /* Increased font size for the icon */
    color: #888;
    cursor: pointer;
    margin-bottom: 10px;
}

.upload-icon:hover {
    color: #555;
}

/* #Purchase-history-container {
    width: 1000px;
    height: 100%;
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    margin-top:4rem ;
} */

#Purchase-history-container {
    width: 1100px;
    /* กำหนดขนาดเท่ากัน */
    height: 630px;
    /* background-color: #1f1b3a; */
    display: flex;
    align-items: stretch;
    background-color: #1f1b3a;
    margin-top: 2rem;
    /* ระยะห่างด้านบนเท่ากัน */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

#Purchase-history-right {
    padding: 20px;
    height: 590px;
    width: 1100px;
    background-color: #ffffff;
}

#container {
    margin-top: 70px;
    height: 690px;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
}

#item-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.icon {
    font-size: 30px;
    color: #000000;
}

/* ****************************************** */
#account-setting-items {
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    gap: 2rem;
    width: 700px;
}

.checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

input {
    width: 30px;
    height: 30px;
}

input:checked {
    background-color: #ee4d2d;
}

.account-setting-item {
    display: flex;
    justify-content: space-between;
}

.upload-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    max-width: 100%;
    margin: 1% auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 90%;
}

button {
    margin-top: 70px;
    margin-left: 15%;
    width: 90px;
    height: 40px;
    border-radius: 5px;
    background: #ffeead;
    border: none;
    transition: 0.3s;
    cursor: pointer;
}

button:hover {
    background: #ffc16d;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.319);
}

.account-setting-item p {
    color: #897f7f;
}

.item1 {
    display: flex;
    flex-direction: column;
    gap: 15px;
    /* background-color: #fff; */
    padding: 20px;
    /* border-radius: 10px; */
    /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */
}

.item1 p {
    font-size: 14px;
    color: #333;
}

.item1 label {
    font-weight: bold;
    margin-bottom: 5px;
    display: inline-block;
    font-size: 14px;
}

.item1 input[type="text"],
.item1 input[type="date"] {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.item1 input[type="date"] {
    cursor: pointer;
}

/* สไตล์เพศ */
.gender {
    display: flex;
    /* flex-direction: row; */
    gap: 10px;
    align-items: center;
}

.gender label {
    margin-right: 10px;
    font-size: 14px;
}

.gender input[type="radio"] {
    margin-top: -6px;
    margin-right: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.upload-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    max-width: 100%;
    margin: 1% auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 90%;
    border: 2px dashed #888;
    /* Add a dashed border to indicate drop area */
    transition: border 0.3s ease;
    /* Smooth transition for border */
}

.upload-container:hover {
    border-color: #555;
    /* Change border color on hover */
}

.upload-icon-container {
    cursor: pointer;
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

.title {
    font-weight: 700;
}
</style>