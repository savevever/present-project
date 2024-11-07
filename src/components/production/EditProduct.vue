<template>
    <div class="edit-product-container">
        <h2 class="title">แก้ไขสินค้า</h2>
        <div v-if="product" class="product-details">
            <label for="nameProduct">รูปภาพสินค้า:</label>
            <div class="product-image">
                <img :src="product.images[0]?.src" v-if="!isEditing.images" />
                <div>
                    <input type="file" ref="productImageInput" class="input-field" accept="image/*"
                        @change="previewImage($event, 'images')" multiple style="display: none" />
                    <button @click="triggerFileInput('product')" class="upload-button">เลือกภาพใหม่</button>
                    <div class="selected-images">
                        <div v-for="(image, index) in images" :key="image.id" class="image-wrapper">
                            <img :src="image.src" alt="Product Image" class="uploaded-image" />
                            <span class="delete-icon" @click="removeImage(index)">x</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-field">
                <label for="nameProduct">ชื่อสินค้า:</label>
                <div class="product-info">
                    <span v-if="!isEditing.nameProduct">{{ product.nameProduct }}</span>
                    <input v-else id="nameProduct" v-model="editProduct.nameProduct" type="text" class="input-field" />
                </div>
                <button @click="toggleEdit('nameProduct')" class="edit-button">
                    {{ isEditing.nameProduct ? 'ยกเลิก' : 'แก้ไข' }}
                </button>
            </div>

            <div class="product-field">
                <label for="price">ราคา:</label>
                <div class="product-info">
                    <span v-if="!isEditing.price">{{ product.price }}</span>
                    <input v-else id="price" v-model="editProduct.price" type="number" class="input-field" />
                </div>
                <button @click="toggleEdit('price')" class="edit-button">
                    {{ isEditing.price ? 'ยกเลิก' : 'แก้ไข' }}
                </button>
            </div>

            <div class="product-field">
                <label for="numberProducts">จำนวนสินค้า:</label>
                <div class="product-info">
                    <span v-if="!isEditing.numberProducts">{{ product.numberProducts }}</span>
                    <input v-else id="numberProducts" v-model="editProduct.numberProducts" type="number"
                        class="input-field" />
                </div>
                <button @click="toggleEdit('numberProducts')" class="edit-button">
                    {{ isEditing.numberProducts ? 'ยกเลิก' : 'แก้ไข' }}
                </button>
            </div>

            <div class="product-field">
                <label for="category">หมวดหมู่:</label>
                <div class="product-info">
                    <span v-if="!isEditing.category">{{ product.category }}</span>
                    <input v-else id="category" v-model="editProduct.category" type="text" class="input-field" />
                </div>
                <button @click="toggleEdit('category')" class="edit-button">
                    {{ isEditing.category ? 'ยกเลิก' : 'แก้ไข' }}
                </button>
            </div>
            <div class="product-field">
                <label>ประเภทสินค้า</label>
                <div v-for="(set, index) in productTypes" :key="index" class="input-group">
                    <div class="input-with-icon">
                        <input v-model="set.productType1" type="text" class="product-type"
                            placeholder="ประเภท เช่น สี ขนาด" />
                        <div v-for="(input, inputIndex) in set.inputProductType1" :key="inputIndex">
                            <input v-model="set.inputProductType1[inputIndex]" type="text" class="input-product-type"
                                placeholder="ขาว XXL" />
                        </div>

                    </div>
                </div>
                <button @click="toggleEdit('productTypes')" class="edit-button">
                    {{ isEditing.productTypes ? 'ยกเลิก' : 'แก้ไข' }}
                </button>
            </div>


            <label for="exampleImages">รูปภาพตัวอย่างสินค้า:</label>
            <div class="product-info">
                <div>
                    <input type="file" ref="exampleImageInput" class="input-field" accept="image/*"
                        @change="previewImageList($event)" multiple style="display: none" />

                    <div class="selected-images">
                        <div v-if="imageList.length === 0">
                            <p>ยังไม่มีรูปภาพตัวอย่าง</p>
                        </div>
                        <div v-for="(image, index) in imageList" :key="image.id" class="image-wrapper">
                            <img :src="image.src" alt="Example Image" class="uploaded-image" />
                            <span class="delete-icon" @click="removeimageList(index)">x</span>
                        </div>
                        <button @click="triggerImageListInput" class="upload-button">เลือกภาพใหม่</button>
                    </div>
                </div>
                <div class="product-field" style="margin-top: 3em;">
                    <label for="productDetails">รายละเอียดสินค้า:</label>
                    <div class="product-info">
                        <span v-if="!isEditing.productDetails">{{ product.productDetails }}</span>
                        <textarea v-else id="productDetails" v-model="editProduct.productDetails"
                            class="input-field"></textarea>
                    </div>
                    <button @click="toggleEdit('productDetails')" class="edit-button">
                        {{ isEditing.productDetails ? 'ยกเลิก' : 'แก้ไข' }}
                    </button>
                </div>
            </div>
            <div class="button-group">
                <button @click="saveProductEdit" class="save-button">บันทึก</button>
                <button @click="cancelEdit" class="cancel-button">ยกเลิก</button>
            </div>
        </div>
        <div v-else class="loading">
            <p>กำลังโหลดข้อมูล...</p>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import Pica from 'pica';
export default {
    data() {
        return {
            product: null,
            editProduct: {
                nameProduct: '',
                price: 0,
                numberProducts: 0,
                category: '',
                productDetails: '',
            },
            images: [],
            productTypes: [],
            imageList: [],
            nextImageId: 1,
            isEditing: {
                nameProduct: false,
                price: false,
                numberProducts: false,
                category: false,
                productDetails: false,
            },
        };
    },
    mounted() {
        const productId = new URLSearchParams(window.location.search).get('productId');
        if (productId) {
            this.fetchProductDetails(productId);
        }
    },
    async created() {
        const productId = this.$route.query.productId;
        this.fetchProductDetails(productId);
    },
    methods: {
        previewImageList(event) {
            const pica = Pica();
            const files = event.target.files;

            // Clear the current imageList before adding new images
            this.imageList.splice(0, this.imageList.length);

            const imagePromises = Array.from(files).map((file) => {
                return new Promise((resolve) => {
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

                                pica.toBlob(resizedCanvas, 'image/jpeg', 0.75).then((blob) => {
                                    const readerBlob = new FileReader();
                                    readerBlob.onloadend = () => {
                                        // Resolve the promise with the new image object
                                        resolve({
                                            id: `example${this.nextImageId++}`,
                                            src: readerBlob.result,
                                        });
                                    };
                                    readerBlob.readAsDataURL(blob);
                                });
                            };
                        };
                        reader.readAsDataURL(file);
                    } else {
                        resolve(null); // Resolve with null if no file
                    }
                });
            });

            // Wait for all image processing to finish and then update the imageList
            Promise.all(imagePromises).then((newImages) => {
                // Filter out null results (in case of no file) and push to imageList
                this.imageList.push(...newImages.filter(image => image));
            });

            // Reset the file input
            event.target.value = '';
        },


        triggerimageList() {
            this.$refs.productImageInput.click();
        },
        removeimageList(index) {
            this.imageList.splice(index, 1);
        },
        //************************ */
        previewImage(event, type) {
            const pica = Pica();
            const files = event.target.files;
            const targetArray = type === 'images' ? this.images : this.imageList;

            // Clear the targetArray before adding new images
            targetArray.splice(0, targetArray.length);

            Array.from(files).forEach((file) => {
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

                            pica.toBlob(resizedCanvas, 'image/jpeg', 0.75).then((blob) => {
                                const readerBlob = new FileReader();
                                readerBlob.onloadend = () => {
                                    targetArray.push({
                                        id: type === 'images' ? `image${this.nextImageId++}` : `example${this.nextImageId++}`,
                                        src: readerBlob.result,
                                    });
                                };
                                readerBlob.readAsDataURL(blob);
                            });
                        };
                    };
                    reader.readAsDataURL(file);
                }
            });

            event.target.value = "";
        },
        toggleEdit(field) {
            this.isEditing[field] = !this.isEditing[field];
            if (!this.isEditing[field]) {
                this.editProduct[field] = this.product[field];
            }
        }, addInputField(index, type) {
            this.productTypes[index][type].push("");
        }, triggerFileInput(inputName) {
            const refMap = {
                product: 'productImageInput',
                example: 'exampleImageInput',
            };
            const refName = refMap[inputName];
            const input = this.$refs[refName];
            if (input) {
                input.click();
            }
        },
        removeImage(index) {
            this.images.splice(index, 1);
        },
        fetchProductDetails(productId) {
            console.log('Fetching product details for ID:', productId);
            axios.get('http://localhost:8081/selling/productss')
                .then(response => {
                    console.log('Response Data:', response.data);

                    if (response.data && response.data.length > 0) {
                        this.product = response.data.find(product => product.id == productId);
                        this.productTypes = this.product.productTypes || [];
                        this.imageList = this.product.imageList || [];
                    } else {
                        console.log('ไม่พบข้อมูลสินค้า');
                    }
                })
                .catch(error => {
                    console.error('ข้อผิดพลาดในการดึงข้อมูล:', error);
                });
        },
        triggerImageListInput() {
            this.$refs.exampleImageInput.click();
        },
        async saveProductEdit() {
            console.log('Images:', this.images);
            console.log('ImageList:', this.imageList);
            try {
                const updateData = {
                    nameProduct: this.isEditing.nameProduct ? this.editProduct.nameProduct : this.product.nameProduct,
                    price: this.isEditing.price ? this.editProduct.price : this.product.price,
                    numberProducts: this.isEditing.numberProducts ? this.editProduct.numberProducts : this.product.numberProducts,
                    category: this.isEditing.category ? this.editProduct.category : this.product.category,
                    productDetails: this.isEditing.productDetails ? this.editProduct.productDetails : this.product.productDetails,
                    images: Array.from(this.images),
                    imageList: this.imageList,
                };
                console.log('Update Data:', updateData);
                await axios.put(`http://localhost:8081/selling/products/${this.product.id}`, updateData);
                alert('บันทึกสำเร็จ');
                this.$router.push('/selling/myStore');
            } catch (error) {
                console.error('Error updating product:', error);
                alert('เกิดข้อผิดพลาดในการบันทึกสินค้า');
            }
        },
        cancelEdit() {
            this.$router.push('/');
        }
    }
};
</script>

<style scoped>
.edit-product-container {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-family: Arial, sans-serif;
}

.title {
    font-size: 28px;
    font-weight: bold;
    color: #343a40;
    margin-bottom: 20px;
}

.product-details {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.product-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
}

label {
    font-weight: bold;
    color: #495057;
    margin-bottom: 6px;
    display: inline-block;
}

.upload-button,
.edit-button {
    background-color: #fdc78c;
    color: #000000;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.upload-button:hover,
.edit-button:hover {
    color: white;
    background-color: #ff5653;
}

.edit-button {
    height: 30px;
    width: 65px;
}

.product-image img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 6px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.selected-images {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 10px;
}

.image-wrapper {
    position: relative;
}

.uploaded-image {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 6px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.delete-icon {
    position: absolute;
    top: 4px;
    right: 4px;
    background-color: rgba(220, 53, 69, 0.9);
    color: white;
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 50%;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

.delete-icon:hover {
    background-color: #dc3545;
}

.input-field {
    flex: 1;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    width: 100%;
    margin-top: 4px;
}

.product-info {
    margin-left: 8px;
    font-size: 16px;
    color: #343a40;
}

.button-group {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 30px;
}

.save-button,
.cancel-button {
    padding: 10px 24px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.save-button {
    background-color: #28a745;
    color: #fff;
}

.save-button:hover {
    background-color: #218838;
}

.cancel-button {
    background-color: #dc3545;
    color: #fff;
}

.cancel-button:hover {
    background-color: #c82333;
}

.loading {
    text-align: center;
    font-size: 18px;
    color: #6c757d;
}

.product-type,
.input-product-type {
    font-size: 15px;
    padding: 7px;

}

</style>