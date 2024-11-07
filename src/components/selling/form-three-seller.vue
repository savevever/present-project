<template>
    <div>
        <ul id="menu-form">
            <li class="form1">ข้อมูลร้านค้า</li>
            <li class="form2">ยืนยันตัวตน</li>
            <li class="form3">ข้อมูลเพิ่มเติม</li>
            <li class="form4">ส่งแบบฟอร์ม</li>
        </ul>

        <div id="form3">
            <div class="formbox">
                <!-- <p>corporateType: {{ data.corporateType }}</p> -->
                <label class="section">จดทะเบียนภาษีมูลค่าเพิ่ม :</label>
                <input type="radio" id="VAT-option1" name="VAT" value="VAT-No" v-model="VAT"
                    @click="showVAToffice(false)" />
                <label for="VAT-option1" class="section">ไม่</label>
                <input type="radio" id="VAT-option2" name="VAT" value="VAT-Yes" v-model="VAT"
                    @click="showVAToffice(true)" />
                <label for="VAT-option2" class="section">ใช่</label>
                <p id="error-VAT" v-if="VATError" style="color: red">กรุณาเลือกการจดทะเบียนภาษีมูลค่าเพิ่ม</p>

                <div id="VAT-office" ref="VATOffice" v-show="isVATOfficeVisible">
                    <label class="section">สำนักงานของบริษัท :</label>
                    <input type="radio" id="office" name="office" value="head-office" v-model="office"
                        @click="handleInput()" />
                    <label for="office" class="section">สำนักงานใหญ่</label>
                    <p id="error-section" v-if="sectionError" style="color: red">กรุณาคลิก</p>
                    <br>
                    <div class="formbox-img">
                        <label class="section-img">ใบทะเบียนภาษีมูลค่าเพิ่ม(ภ.พ.20) :</label>
                        <div class="upload-container" @drop="handleDrop($event, 'VATImages', 'isDraggingVATImages')"
                            @dragover="handleDragOver($event, 'isDraggingVATImages')"
                            @dragleave="handleDragLeave('isDraggingVATImages')"
                            :class="{ 'dragging': isDraggingVATImages }">
                            <div class="images-container" id="container-VAT">
                                <div v-for="(image, index) in VATImages" :key="index" class="image-wrapper">
                                    <img :src="image" alt="VAT ID Card" class="uploaded-image" />
                                    <font-awesome-icon :icon="['fas', 'circle-xmark']" class="delete-icon"
                                        @click="removeImage(index, 'VATImages')" />
                                    <!-- <span class="delete-icon" @click="removeImage(index, 'VATImages')">x</span> -->
                                </div>
                            </div>
                            <font-awesome-icon v-if="VATImages.length === 0" :icon="['fas', 'image']"
                                @click="triggerFileInput('VAT-certificate')" class="upload-icon" />
                            <input type="file" name="image" ref="VATInput" class="image-upload" accept="image/*"
                                @change="previewImage($event, 'VATImages')" />
                            <p id="photo-VAT-error" v-if="photoVATError" style="color: red">กรุณาอัพโหลดรูปภาพ</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="formbox">
                <input type="checkbox" id="checkbox" v-model="acceptedTerms" @click="handleInput()" />
                <label for="checkbox"> ฉันยอมรับ เงื่อนไขการใช้บริการ และ นโยบายความเป็นส่วนตัว</label>
                <p v-show="checkboxError" style="color: red">กรุณากดยอมรับเงื่อนไข</p>
            </div>

            <p v-if="form3Error" class="error-message" style="color: red">กรุณากรอกข้อมูลให้ครบถ้วน</p>

            <router-link to="/selling/FormTwoSeller">
                <button type="button" class="btn-back" @click="redirectToFormTwoSeller">ย้อนกลับ</button>
            </router-link>
            <button type="button" class="btn" @click="redirectToSellingPage()">ยืนยัน</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            VAT: '',
            isVATOfficeVisible: false,
            office: '',
            VATImages: [],
            acceptedTerms: false, // Fixed variable name from 'acceptTerms'
            VATError: false,
            sectionError: false,
            photoVATError: false,
            checkboxError: false,
            form3Error: false,
            formData: null,
            isDraggingVATImages: false,
            data: {
                shopName: '',
                email: '',
                phoneNumber: '',
                sellerType: '',
                prefix: '',
                otherPrefix: '',
                firstName: '',
                lastname: '',
                idCardNumber: '',
                birthDay: '',
                province: '',
                amphoe: '',
                district: '',
                zipcode: '',
                addressDetails: '',
                corporateType: '',
                corporateName: '',
                corporateRegistrationNumber: '',
                provinceCorporate: '',
                amphoeCorporate: '',
                districtCorporate: '',
                zipcodeCorporate: '',
                detailsCorporate: '',
                idCardImages: [],
                pairIdCardImages: [],
                companyCertificateImages: [],
                directorIdCardImages: [],
            }
        };
    },
    // async mounted() {
    //     try {
    //         const response = await fetch('http://localhost:8081/selling/view-data');
    //         const seller = await response.json();
    //         Object.assign(this, seller); // Spread the fetched seller data into the component
    //     } catch (error) {
    //         console.error('Error fetching seller data:', error);
    //     }
    // },
    // created() {
    //     // Retrieve data from localStorage or state
    //     const savedData = localStorage.getItem('data');
    //     if (savedData) {
    //         this.data = JSON.parse(savedData);
    //     } else if (this.$router.state && this.$router.state.data) {
    //         this.data = this.$router.state.data;
    //     } else {
    //         console.error('No shop data found');
    //     }
    // },
    created() {
        const savedData = localStorage.getItem('data');
        if (savedData) {
            this.data = JSON.parse(savedData); // Assuming you have a data property in your component
            console.log("Retrieved data:", this.data);
        } else {
            console.warn('No data found in localStorage');
            // Optionally, initialize default values or handle the absence of data
        }
    },
    methods: {
        validateForm3() {
            let isValid = true;
            this.resetErrors();

            if (!this.VAT) {
                this.VATError = true;
                isValid = false;
            }
            if (!this.acceptedTerms) {
                this.checkboxError = true;
                isValid = false;
            }
            if (this.VAT === 'VAT-Yes') {
                if (!this.office) {
                    this.sectionError = true;
                    isValid = false;
                }
                if (this.VATImages.length === 0) {
                    this.photoVATError = true;
                    isValid = false;
                }
            }

            if (!isValid) {
                this.form3Error = true;
            }
            return isValid;
        },
        resetErrors() {
            this.VATError = false;
            this.sectionError = false;
            this.photoVATError = false;
            this.checkboxError = false;
            this.form3Error = false;
        },
        showVAToffice(isVAT) {
            this.isVATOfficeVisible = isVAT;
            this.handleInput();
        },
        handleInput() {
            this.resetErrors();
        },
        triggerFileInput(inputName) {
            const refMap = {
                'VAT-certificate': 'VATInput',
            };
            const refName = refMap[inputName];
            const input = this.$refs[refName];
            if (input) {
                input.click();
                this.handleInput();
            } else {
                console.error('File input not found');
            }
        },
        previewImage(event, imageArray) {
            const file = event.target.files[0];
            if (file) {
                this.readFile(file, imageArray);
            }
        },
        readFile(file, imageArray) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const max_width = 800;
                    const max_height = 600;
                    let width = img.width;
                    let height = img.height;

                    // Resize logic
                    if (width > height) {
                        if (width > max_width) {
                            height *= max_width / width;
                            width = max_width;
                        }
                    } else {
                        if (height > max_height) {
                            width *= max_height / height;
                            height = max_height;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    const dataUrl = canvas.toDataURL('image/jpeg', 0.75);

                    // Clear existing images and add the new one
                    this[imageArray].splice(0, this[imageArray].length);
                    this[imageArray].push(dataUrl);
                };
            };
            reader.readAsDataURL(file);
        },
        handleDragOver(event, container) {
            event.preventDefault();
            this[container] = true;
        },
        handleDragLeave(container) {
            this[container] = false;
        },
        handleDrop(event, imageArray, container) {
            event.preventDefault();
            this[container] = false;
            const file = event.dataTransfer.files[0];
            const allowedTypes = ["image/jpeg", "image/png", "image/jfif"];

            if (file) {
                if (!allowedTypes.includes(file.type)) {
                    alert("กรุณาอัพโหลดไฟล์รูปภาพที่มีนามสกุล .jpeg, .png หรือ .jfif เท่านั้น");
                    return;
                }
                this.readFile(file, imageArray);
            }
        },
        removeImage(index, imageList) {
            this[imageList].splice(index, 1);
        },
        redirectToSellingPage() {
            if (this.validateForm3()) {
                this.saveData();
                this.currentForm = 4;
                this.$router.push("/selling/FormFourSeller");
            } else {
                this.form3Error = true;
            }
        },
        saveData() {
            const saveData = {
                shopName: this.data.shopName,
                email: this.data.email,
                phoneNumber: this.data.phoneNumber,
                sellerType: this.data.sellerType,
                prefix: this.data.prefix || null,
                otherPrefix: this.data.otherPrefix || null,
                firstName: this.data.firstName || null,
                lastName: this.data.lastName || null,
                idCardNumber: this.data.idCardNumber || null,
                birthDay: this.data.birthDay || null,
                province: this.data.province || null,
                amphoe: this.data.amphoe || null,
                district: this.data.district || null,
                zipcode: this.data.zipcode || null,
                addressDetail: this.data.addressDetails || null,
                idCardImages: this.data.idCardImages || null,
                pairIdCardImages: this.data.pairIdCardImages || null,

                corporateType: this.data.corporateType || null,
                corporateName: this.data.corporateName || null,
                corporateRegistrationNumber: this.data.corporateRegistrationNumber || null,
                provinceCorporate: this.data.provinceCorporate || null,
                amphoeCorporate: this.data.amphoeCorporate || null,
                districtCorporate: this.data.districtCorporate || null,
                zipcodeCorporate: this.data.zipcodeCorporate || null,
                detailsCorporate: this.data.detailsCorporate || null,
                companyCertificateImages: this.data.companyCertificateImages || null,
                directorIdCardImages: this.data.directorIdCardImages || null,

                VAT: this.VAT,
                office: this.office || null,
                VATImages: this.VATImages || null,
                // acceptedTerms: this.acceptedTerms,
            };
            console.log('saveData : ', saveData);

            axios.post('http://localhost:8081/selling/createSeller', saveData)
                .then(response => {
                    console.log('Data saved successfully:',response.data);
                })
                .catch(error => {
                    console.error('Error saving data:', error.response ? error.response.data : error.message);
                });
        },
        redirectToFormTwoSeller() {
            this.$router.push("/selling/FormTwoSeller");
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

#menu-form {
    padding: 15px;
    list-style-type: none;
    overflow: hidden;
    justify-content: space-around;
    display: flex;
    color: #a9a9a9;
}

.form1,
.form2,
.form3 {
    color: rgb(255, 107, 107);
}

.red-text {
    color: red;
}

#form3,
#form4 {
    margin: auto;
    width: 80%;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 10px;
    border-radius: 5px;
}

#email {
    font-size: 20px;
}

.formbox {
    margin: 2% auto;
}

.input-form {
    width: 180px;
    height: 30px;
    padding: 5px;
    color: #383838;
}

input[type="radio"] {
    width: 15px;
    height: 15px;
}

input[type="checkbox"] {
    padding-right: 10px;
    margin: 0.5% auto;
}

.section {
    padding-right: 10px;
    margin: 0.5% auto;
}

.VAT,
#office,
#checkbox {
    cursor: pointer;
}

.btn {
    padding: 7px;
    width: 100px;
    font-size: 17px;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0.2, 0.3);
    cursor: pointer;
    border: none;
    background-color: #ac8b6b;
    color: white;
    margin: 1.5% auto;
    margin-left: 20px;
}

.btn:hover {
    background-color: #e9caab;
    color: black;
}

.btn-back {
    padding: 7px;
    width: 100px;
    font-size: 17px;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0.2, 0.3);
    cursor: pointer;
    border: none;
    background-color: #dfdfdf;
    color: rgb(0, 0, 0);
    margin: 1.5% auto;
}

.btn-back:hover {
    color: #ffffff;
    background-color: #eda4ab;
}

#address-details,
#address-details1 {
    height: 100px;
    box-sizing: border-box;
    width: 60%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    overflow-wrap: auto;
}

.section {
    font-size: 15px;
    margin-bottom: 10px;
}

.start {
    font-size: 15px;
}

.error-message {
    color: red;
}

/*---up photo-----*/
.upload-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;
    position: relative;
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
    /* Adjust the size as needed */
    height: 200px;
    /* Adjust the size as needed */
}

.upload-icon {
    font-size: 70px;
    /* Increased font size for the icon */
    color: #888;
    cursor: pointer;
    margin-bottom: 20px;
}

.upload-icon:hover {
    color: #555;
}

.image-upload {
    display: none;
}

.delete-icon {
    position: absolute;
    top: 0;
    right: 0;
    color: red;
    cursor: pointer;
    padding: 2px 5px;
    border-radius: 50%;
    font-size: 25px;
}

.images-container {
    display: flex;
    flex-wrap: wrap;
}

.upload-icon {
    font-size: 50px;
    color: #888;
    cursor: pointer;
    margin-bottom: 20px;
    /* เพิ่มช่องว่างด้านล่าง */
    display: flex;
    /* ใช้ Flexbox */
    align-items: center;
    /* จัดแนวกลางในแนวนอน */
    justify-content: center;
    /* จัดแนวกลางในแนวตั้ง */
    margin-top: 15px;
}

.upload-icon:hover {
    color: #555;
}

.section-img {
    padding: 20px;
}

.formbox-img {
    max-width: 350px;
    /* ตั้งความกว้างสูงสุดที่ 300px */
    width: auto;
    /* ปรับให้กว้างตามเนื้อหา */
    height: auto;
    /* ปรับให้สูงตามเนื้อหา */
    padding: 20px;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
    border-radius: 8px;
    display: inline-block;
    /* ให้บล็อกแสดงตามขนาดของเนื้อหา */
    margin-top: 20px;
}

.upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: auto;
    /* ปรับให้เป็น auto */
    max-width: 350px;
    /* ขนาดสูงสุด */
    background-color: #fff;
    /* padding: 20px; */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    border: 2px dashed #888;
    transition: border 0.3s ease;
}

.images-container {
    display: flex;
    /* ทำให้ image-wrapper อยู่ในแถว */
    align-items: center;
    /* จัดแนวกลางในแนวตั้ง */
    justify-content: center;
    /* จัดแนวกลางในแนวนอน */
    flex-wrap: wrap;
    /* ให้ wrap หากมีรูปหลายรูป */
}

.image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    /* จำกัดขนาดของภาพ */
    max-height: 200px;
    /* จำกัดความสูงของภาพ */
}

.uploaded-image {
    max-width: 100%;
    /* ขยายภาพให้เต็มพื้นที่ */
    max-height: 100%;
    /* จำกัดความสูง */
    object-fit: contain;
    /* ให้ภาพแสดงในกรอบโดยไม่ตัด */
}

.upload-container:hover {
    border-color: #555;
}

.upload-container.dragging {
    background-color: rgba(255, 0, 0, 0.2);
    border: 2px dashed red;
}
</style>