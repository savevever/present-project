<template>

    <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link rel="stylesheet"
            href="https://earthchie.github.io/jquery.Thailand.js/jquery.Thailand.js/dist/jquery.Thailand.min.css" />
    </head>
    <div id="form-container">
        <div class="product-container">
            <div class="product-form-section">
                <div class="upload-container">
                    <label for="input-file" id="drop-area" @dragover.prevent="handleDragOver('main')"
                        @dragleave="handleDragLeave('main')" @drop="handleDrop('main', $event)">
                        <input type="file" accept="image/*" id="input-file" hidden @change="handleFileChange" />
                        <div id="img-view" :class="{ dragging: isDraggingMain }" ref="imgView" class="imgView">
                            <img v-if="images.length" :src="images[0].src" alt="Preview" id="preview-img" />
                            <div v-else>
                                <font-awesome-icon :icon="['fas', 'circle-up']" id="icon-up" />
                                <p>เลือกไฟล์รูปภาพ หรือลากเเล้ววางที่นี้</p>
                                <span>เราขอแนะนำให้ใช้ไฟล์คุณภาพสูงประเภท .jpg หรือ .png
                                    ที่มีขนาดน้อยกว่า 10 MB</span>
                            </div>
                        </div>
                    </label>
                </div>

                <div class="Name-category-price-num-container">
                    <div class="name-product">
                        <span>ชื่อสินค้า</span>
                        <textarea v-model="nameProduct" placeholder="ชื่อสินค้า"
                            @input="adjustTextareaHeight($event.target)"></textarea>
                    </div>
                    <div class="category-name">
                        <span>หมวดหมู่</span>
                        <select v-model="category" @change="handleCategoryChange" ref="category" id="category">
                            <option value="เสื้อผ้า">เสื้อผ้า</option>
                            <option value="กระเป๋า">กระเป๋า</option>
                            <option value="รองเท้า">รองเท้า</option>
                            <option value="เครื่องประดับ">เครื่องประดับ</option>
                            <option value="ของใช้ภายในบ้าน">ของใช้ภายในบ้าน</option>
                            <option value="อาหารเครื่องดื่ม">อาหารเครื่องดื่ม</option>
                            <option value="งานฝีมือ">งานฝีมือ</option>
                            <option value="ความงาม">ความงาม</option>
                            <option value="อื่นๆ">อื่นๆ</option>
                        </select>
                        <div v-if="category === 'อื่นๆ'" class="additional-input">
                            <label for="other-category">ระบุหมวดหมู่:</label>
                            <input type="text" id="other-category" v-model="otherCategory" />
                        </div>
                    </div>

                    <div class="price-input">
                        <span>ราคา</span>
                        <input v-model="price" type="number" placeholder="ระบุราคา" />
                    </div>
                    <div class="number-products-input">
                        <span>จำนวนสินค้า</span>
                        <input v-model="numberProducts" type="number" placeholder="ระบุจำนวนสินค้า" />
                    </div>
                </div>
            </div>

            <div class="product-images-and-types">
                <div class="example-images-container">
                    <span>ตัวอย่างรูปภาพสินค้า</span>
                    <div class="uploaded-images">
                        <div v-for="(image, index) in imageList" :key="image.id" class="uploaded-image">
                            <img :src="image.src" :alt="'Product Image ' + (index + 1)" />
                            <font-awesome-icon :icon="['fas', 'circle-xmark']" @click="removeExampleImage(index)"
                                class="remove-btn" />
                            <!-- <button @click="removeExampleImage(index)" class="remove-btn">X</button> -->
                        </div>
                    </div>
                    <div v-if="imageList.length < 10" class="additional-upload-container">
                        <label for="input-file-example" class="additional-drop-area"
                            @dragover.prevent="handleDragOver('example')" @dragleave="handleDragLeave('example')"
                            @drop="handleDrop('example', $event)">
                            <input type="file" accept="image/*" id="input-file-example" hidden
                                @change="handleFileChangeAdditional" multiple />
                            <div class="additional-img-view" :class="{ dragging: isDraggingExample }"
                                ref="imgViewExample">
                                <img v-if="previewImageExample" :src="previewImageExample" alt="Preview"
                                    class="preview-img-example" />
                                <div v-else>
                                    <font-awesome-icon :icon="['fas', 'circle-up']" class="icon-up-example" />
                                    <p>เลือกรูปภาพตัวอย่าง หรือลากใส่ที่นี้</p>
                                    <span>เราขอแนะนำให้ใช้ไฟล์คุณภาพสูงประเภท .jpg หรือ .png</span><br />
                                    <span>ที่มีขนาดน้อยกว่า 10 MB ไม่เกิน 10 รูป</span>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
                <div class="input-container">
                    <span>ประเภทสินค้า</span>
                    <div v-for="(set, index) in productTypes" :key="index" class="input-group">
                        <div class="input-with-icon">
                            <input v-model="set.productType1" type="text" class="product-type"
                                placeholder="ประเภท เช่น สี ขนาด" />
                            <div v-for="(input, inputIndex) in set.inputProductType1" :key="inputIndex">
                                <input v-model="set.inputProductType1[inputIndex]" type="text"
                                    class="input-product-type" placeholder="ขาว XXL" />
                                <font-awesome-icon :icon="['fas', 'circle-minus']" class="deleteInput"
                                    @click="deleteInput(index, inputIndex)" />
                            </div>
                            <span class="add-input-icon" @click="addInputField(index)">
                                <i class="fa-solid fa-circle-plus"></i>
                            </span>
                        </div>
                    </div>

                    <!-- <div style="text-align: center; margin-top: 20px">
                        <a class="add-set-icon" @click="addInputSet()">
                            <i class="fa-solid fa-circle-plus" id="add-set"></i>
                        </a>
                    </div> -->
                </div>
            </div>
        </div>

        <div class="details">
            <span>รายละเอียดสินค้า</span>
            <textarea v-model="productDetails" placeholder="รายละเอียดต่างๆ ของสินค้า"
                @input="adjustTextareaHeight($event.target)"></textarea>
        </div>

        <div>
            <p id="form-selling1-error" class="error-message" v-show="formError">
                กรุณากรอกข้อมูลให้ครบถ้วน
            </p>
        </div>

        <div class="btn-container">
            <router-link to="/">
                <button type="button" class="btn-back">ยกเลิก</button>
            </router-link>
            <!-- <router-link :to="{ path: '/store/storepage', query: { productId: product.id } }"> -->
            <button type="button" class="btn" @click="saveProductData">ถัดไป</button>
            <!-- </router-link> -->
        </div>
    </div>
    <footerComponent></footerComponent>
</template>

<script>
import axios from "axios";
import Pica from "pica";

export default {
    data() {
        return {
            images: [],
            isDraggingMain: false,
            isDraggingExample: false,
            imageList: [],
            nextImageId: 1,
            photoProductImagesError: false,
            nameProduct: "",
            category: "",
            otherCategory: "",
            productDetails: "",
            productTypes: [
                {
                    productType1: "",
                    inputProductType1: [""],
                    productType2: "",
                    inputProductType2: [],
                },
            ],
            price: "",
            numberProducts: "",
            formError: false,
        };
    },
    methods: {
        addInputField(index) {
            this.productTypes[index].inputProductType1.push("");
        },
        deleteInput(index, inputIndex) {
            this.productTypes[index].inputProductType1.splice(inputIndex, 1);
        },
        handleDrop(type, event) {
            event.preventDefault();
            const files = event.dataTransfer.files;

            let isValidFile = true;

            // ตรวจสอบไฟล์ใน drop
            for (const file of files) {
                if (!["image/jpeg", "image/png", "image/jfif"].includes(file.type)) {
                    isValidFile = false; // ถ้าหากไม่ใช่ประเภทไฟล์ที่ถูกต้อง
                    break;
                }
            }

            // เปลี่ยนสีพื้นหลังถ้าไฟล์ไม่ถูกต้อง
            if (type === "main") {
                this.isDraggingMain = false;
                this.$refs.imgView.style.backgroundColor = isValidFile
                    ? ""
                    : "#ef5a6e72";
                this.$refs.imgView.style.borderRadius = isValidFile ? "" : "20px";
            } else if (type === "example") {
                this.isDraggingExample = false;
                this.$refs.imgViewExample.style.backgroundColor = isValidFile
                    ? ""
                    : "#ef5a6e72";
                this.$refs.imgViewExample.style.borderRadius = isValidFile
                    ? ""
                    : "20px";
            }

            if (isValidFile) {
                if (type === "main") {
                    this.previewImage({ target: { files } }, "images");
                } else if (type === "example") {
                    this.previewImage({ target: { files } }, "imageList");
                }
            }
        },
        handleDragOver(type) {
            if (type === "main") {
                this.isDraggingMain = true;
            } else if (type === "example") {
                this.isDraggingExample = true;
            }
        },
        handleDragLeave(type) {
            if (type === "main") {
                this.isDraggingMain = false;
            } else if (type === "example") {
                this.isDraggingExample = false;
            }
        },
        handleFileChange(event) {
            const files = event.target.files;
            if (files.length) {
                this.previewImage({ target: { files } }, "images");
            }
        },
        handleFileChangeAdditional(event) {
            const files = Array.from(event.target.files);
            // ตรวจสอบจำนวนรูปภาพไม่ให้เกิน 10
            const availableSpace = 10 - this.imageList.length;

            const validFiles = files.filter(
                (file) => file.size <= 10 * 1024 * 1024 * 1024
            );

            if (files.length && availableSpace > 0) {
                const filesToUpload = validFiles.slice(0, availableSpace); // จำกัดจำนวนรูปที่จะอัปโหลด
                filesToUpload.forEach((file) => {
                    this.previewImage(file); // เรียกใช้ฟังก์ชัน previewImage
                });
            } else if (validFiles.length === 0) {
                alert("กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 10 MB");
            } else {
                alert("ไม่สามารถอัปโหลดรูปภาพได้มากกว่า 10 รูป");
            }
            // เคลียร์ค่า input เพื่ออนุญาตให้เลือกไฟล์ซ้ำ
            event.target.value = "";
        },
        triggerFileInput(inputName) {
            const refMap = {
                product: "productImageInput",
                example: "exampleImageInput",
            };
            const refName = refMap[inputName];
            const input = this.$refs[refName];
            if (input) {
                input.click();
            }
        },
        async previewImage(fileOrEvent, type) {
            const pica = Pica();
            let files;

            if (fileOrEvent.target && fileOrEvent.target.files) {
                files = fileOrEvent.target.files;
            } else if (fileOrEvent instanceof File) {
                files = [fileOrEvent];
            } else {
                console.error("Invalid argument passed to previewImage");
                return;
            }

            const targetArray = type === "images" ? this.images : this.imageList;
            if (type === "images") {
                this.images.length = 0;
            } else if (type === "imageList") {
                if (this.imageList.length + files.length > 10) {
                    alert("สามารถอัพโหลดรูปภาพตัวอย่างสินค้าได้สูงสุด 10 รูปเท่านั้น");
                    return;
                }
            }

            for (const file of files) {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = async (e) => {
                        const img = new Image();
                        img.src = e.target.result;

                        img.onload = async () => {
                            const originalCanvas = document.createElement("canvas");
                            originalCanvas.width = img.width;
                            originalCanvas.height = img.height;
                            const originalCtx = originalCanvas.getContext("2d");
                            originalCtx.drawImage(img, 0, 0, img.width, img.height);

                            const resizedCanvas = document.createElement("canvas");
                            const max_width = 300;
                            const max_height = 250;
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
                            pica.toBlob(resizedCanvas, "image/jpeg", 0.3).then((blob) => {
                                const readerBlob = new FileReader();
                                readerBlob.onloadend = () => {
                                    targetArray.push({
                                        id:
                                            type === "images"
                                                ? `image${this.nextImageId++}`
                                                : `example${this.nextImageId++}`,
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
            if (fileOrEvent.target) {
                fileOrEvent.target.value = "";
            }
        },
        removeExampleImage(index) {
            this.imageList.splice(index, 1);
        },
        addInputSet() {
            this.productTypes.push({
                productType1: "",
                inputProductType1: [],
                productType2: "",
                inputProductType2: [],
                imageList: [],
                shopname: "",
                price: "",
                numberProducts: "",
            });
        },
        deleteInputSet(index) {
            this.productTypes.splice(index, 1);
        },
        handleCategoryChange() {
            if (this.category !== "อื่นๆ") {
                this.otherCategory = ""; // Clear the input if not 'อื่นๆ'
            }
        },
        adjustTextareaHeight(textarea) {
            textarea.style.height = "auto"; // ตั้งให้เป็น auto ก่อน เพื่อรีเซ็ตขนาดความสูง
            textarea.style.height = textarea.scrollHeight + "px"; // ปรับความสูงตาม scrollHeight
        },
        prepareData() {
            return {
                images: JSON.stringify(
                    this.images.map((img) => ({
                        id: img.id,
                        src: img.src,
                    }))
                ),
                nameProduct: this.nameProduct,
                category: this.category,
                otherCategory: this.otherCategory,
                productDetails: this.productDetails,
                price: this.price,
                shopname: this.shopname,
                imageList: JSON.stringify(
                    this.imageList.map((img) => ({
                        id: img.id,
                        src: img.src,
                    }))
                ),
                numberProducts: this.numberProducts,
                productTypes: JSON.stringify(
                    this.productTypes
                        .map((pt) => ({
                            productType1: pt.productType1.trim(),
                            inputProductType1: pt.inputProductType1.filter(
                                (input) => input.trim() !== ""
                            ),
                            productType2: pt.productType2.trim(),
                            inputProductType2: pt.inputProductType2.filter(
                                (input) => input.trim() !== ""
                            ),
                        }))
                        .filter(
                            (pt) =>
                                pt.productType1 ||
                                pt.inputProductType1.length ||
                                pt.productType2 ||
                                pt.inputProductType2.length
                        )
                ),
                shopId: localStorage.getItem("shopId"),
            };
        },
        async saveProductData() {
            if (this.images.length === 0) {
                this.photoProductImagesError = true;
                return;
            } else {
                this.photoProductImagesError = false;
            }

            // ดึงอีเมลจาก localStorage
            const email = JSON.parse(localStorage.getItem("user")).email;

            // ดึงข้อมูลร้านค้าเพื่อตรวจสอบ shopId โดยอีเมล
            let shopId = null;
            try {
                const response = await axios.get("http://localhost:8081/shop/shops");
                const shops = response.data.data;

                // หา shop ที่มีอีเมลตรงกัน
                const shop = shops.find((shop) => shop.email === email);
                if (shop) {
                    shopId = shop.shopId;
                } else {
                    console.error("ไม่พบร้านค้าที่ตรงกับอีเมลที่ให้มา");
                    return;
                }
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูลร้านค้า:", error);
                return;
            }

            const formData = {
                ...this.prepareData(),
                shopId: shopId,
            };

            console.log("ข้อมูลที่เตรียมสำหรับการร้องขอ API:", formData);

            try {
                const response = await axios.post(
                    "http://localhost:8081/selling/save-product-data",
                    formData
                );
                if (response.status === 200) {
                    console.log(response.data.message);
                    // เมื่อบันทึกข้อมูลสำเร็จ นำทางไปยังหน้าถัดไป
                    this.$router.push("/");
                } else {
                    console.error("สถานะการตอบกลับที่ไม่คาดคิด:", response.status);
                }
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", error);
            }
        },
        resetForm() {
            this.images = [];
            this.nextImageId = 1;
            this.nameProduct = "";
            this.category = "";
            this.otherCategory = "";
            this.productDetails = "";
            this.productTypes = [
                {
                    productType1: "",
                    inputProductType1: "",
                    productType2: "",
                    inputProductType2: "",
                },
            ];
            (this.price = ""), (this.numberProducts = ""), (this.formError = false);
            this.photoProductImagesError = false;
        },
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap");

* {
    font-family: "Noto Sans Thai", sans-serif;
    font-weight: 500;
    font-style: normal;
}

#form-container {
    display: flex;
    justify-content: space-between;
    position: relative;
    /* min-height: 100vh; */
    flex-wrap: wrap;
    padding-bottom: 60px;
    gap: 20px;
}

@media (max-width: 768px) {
    #form-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 20px;
        padding: 20px;
    }

    .product-container,
    .details {
        width: 100%;
        /* ให้คอนเทนเนอร์กว้าง 90% ของหน้าจอ */
        max-width: 600px;
        /* จำกัดความกว้างสูงสุด เพื่อไม่ให้กว้างเกินไป */
        flex-direction: column;
    }

    .btn-container {
        position: static;
        transform: none;
        margin-top: 40px;
        justify-content: center;
    }
}

.product-container {
    flex: 2;
    min-width: 700px;
    /* กำหนดขนาดขั้นต่ำ */
}

.details {
    flex: 1;
    min-width: 300px;
}

.product-form-section,
.product-images-and-types {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding-left: 10%;
    /* justify-content: flex-end; */
    flex-wrap: wrap;
    margin: 20px 0;
}

.upload-container {
    width: 300px;
    height: 350px;
    padding: 20px;
    background: #ffffff;
    text-align: center;
    border-radius: 20px;
    overflow: hidden;
    /* ป้องกันไม่ให้ภาพล้นออกจากกรอบ */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* position: absolute;
    left: 40px; */
}

#drop-area {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    border: 2px dashed #939393;
    background: #f7f8ff;
    display: flex;
    position: relative;
    transition: background-color 0.3s, border-color 0.3s;
    overflow: hidden;
    /* ป้องกันไม่ให้เนื้อหาล้นออกจากกรอบ */
}

#drop-area span,
.additional-drop-area span {
    font-size: 13px;
    padding: 0 10px;
}

#img-view {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

#preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* ทำให้ภาพเต็มกรอบ โดยไม่บิดเบือน */
}

#img-view.dragging {
    background-color: #ffe4a544;
    border-color: #e5ca8c;
}

#icon-up {
    font-size: 40px;
    color: #e5ca8c;
    cursor: pointer;
    transition: 0.3s;
}

#icon-up:hover {
    color: #d6b464;
}

.name-product,
.details,
.Name-category-price-num-container,
.category-name,
.additional-input,
.price-input,
.number-products-input,
.input-container {
    margin-bottom: 5px;
    padding: 5px 15px;
    display: flex;
    flex-direction: column;
}

.name-product span,
.Name-category-price-num-container span,
.input-container span,
.details span {
    font-size: 18px;
    color: #000000;
    /* margin-bottom: 5px; */
}

.name-product textarea,
.details textarea {
    width: 300px;
    height: 30px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #878787;
    font-size: 15px;
    margin-top: 5px;
    resize: vertical;
    /* อนุญาตให้ปรับความสูง textarea ได้ */
}

.details textarea {
    height: 300px;
}

#category {
    width: 200px;
    height: 50px;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid #878787;
    margin-top: 5px;
}

input {
    width: 200px;
    height: 30px;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid #878787;
    font-size: 15px;
    margin-top: 5px;
}

.example-images-container {
    width: 55%;
    max-height: 100%;
    padding: 20px;
    background: #ffffff;
    text-align: center;
    border-radius: 20px;
    overflow: hidden;
    /* ป้องกันไม่ให้ภาพล้นออกจากกรอบ */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.additional-upload-container {
    width: 100%;
    margin-top: 20px;
}

.additional-drop-area {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    border: 2px dashed #939393;
    background: #f7f8ff;
    display: flex;
    position: relative;
    transition: background-color 0.3s, border-color 0.3s;
    /* overflow: hidden; */
}

.uploaded-images {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
}

.uploaded-image {
    width: 100px;
    height: 100px;
    position: relative;
}

.uploaded-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* ทำให้ภาพไม่บิดเบี้ยว */
    border-radius: 10px;
    /* เพิ่มความมนให้กับภาพ */
    box-shadow: 0 0 5px rgba(33, 33, 33, 0.3);
}

.remove-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 20px;
    color: #ffb0b0;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(33, 33, 33, 0.3);
    cursor: pointer;
}

.remove-btn:hover {
    color: #f95454;
}

.additional-img-view {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 20px;
}

.additional-img-view.dragging {
    border-radius: 20px;
    background-color: #a5d6ff44;
    border-color: #8cd5e5;
}

.icon-up-example {
    font-size: 40px;
    color: #8cd0e5;
    cursor: pointer;
    transition: 0.3s;
}

.icon-up-example:hover {
    color: #649dd6;
}

.deleteInput {
    transform: translateY(20%);
    font-size: 30px;
    padding: 0 5px;
    cursor: pointer;
    color: #f95454;
    transition: 0.3s;
}

.deleteInput:hover {
    color: #fb3434;
}

.input-container i {
    padding: 10px;
    cursor: pointer;
    color: #ffd5ab;
    font-size: 30px;
    transition: 0.3s;
}

.input-container i:hover {
    color: #ffbe7c;
}

.btn-container {
    position: absolute;
    bottom: -50px;
    padding: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.btn-container button {
    font-size: 17px;
    width: 80px;
    border-radius: 10px;
    border: none;
    padding: 10px;
    cursor: pointer;
}

.btn-back {
    background: #fd9e9e;
    transition: 0.3s;
}

.btn-back:hover {
    background: #ef5a6f;
    color: white;
}

.btn {
    background: #ffe77e;
    transition: 0.3s;
}

.btn:hover {
    background: #f0b917;
    color: white;
}

.upload-container,
.name-product textarea,
.details textarea,
#category,
input,
.example-images-container,
.btn-container button {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}
</style>