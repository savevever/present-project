<template>
    <div>
        <ul id="menu-form">
            <li class="form1">ข้อมูลร้านค้า</li>
            <li class="form2">ยืนยันตัวตน</li>
            <li class="form3">ข้อมูลเพิ่มเติม</li>
            <li class="form4">ส่งแบบฟอร์ม</li>
        </ul>

        <div id="form1">
            <div class="formbox">
                <label class="section">ชื่อร้านค้า :</label>
                <input type="text" id="shop-name" name="shop-name" class="input-form" placeholder="Name" :value="user.name">
            </div>
            <div class="formbox">
                <label class="section">อีเมล :</label>
                <a id="email"><!--{{ user.email }}--></a> 
            </div>
            <div class="formbox">
                <label class="section">หมายเลขโทรศัพท์ :</label>
                <input type="tel" id="phone-number" name="phone-number" class="input-form" placeholder="Phone Number" minlength="10" maxlength="10" v-model="phoneNumber" @input="validatePhoneNumber" />
                <p id="phone-error" v-if="phoneError" style="color: red;">หมายเลขโทรศัพท์ต้องมี 10 หลักและเป็นตัวเลขเท่านั้น</p>
            </div>
            <p id="form1-error" class="error-message" v-if="form1Error">กรุณากรอกข้อมูลให้ครบถ้วน</p>
            <button type="button" class="btn" @click="validateForm1">ถัดไป</button>
        </div>

        <div id="form2" v-show="isForm2Visible">
            <div class="formbox">
                <label class="section">ประเภทผู้ขาย :</label>
                <input type="radio" id="individual-option" class="seller-type" name="seller-type" value="individual" v-model="sellerType" @click="showSellerType('individual')" />
                <label for="individual-option" class="section">บุคคลธรรมดา</label>
                <input type="radio" id="corporate-option" class="seller-type" name="seller-type" value="corporate" v-model="sellerType" @click="showSellerType('corporate')" />
                <label for="corporate-option" class="section">นิติบุคคล</label>
                <p id="error-sellertype" v-if="sellerTypeError" style="color: red;"></p>
            </div>
            <!-- บุคคลธรรมดา -->
            <div id="individual-container" v-show="sellerType === 'individual'">
                <div class="formbox">
                    <label class="section">คำนำหน้า :</label>
                    <input type="radio" id="prefix-option1" name="prefix" value="Ms" v-model="prefix" @click="showOtherPrefixInput(false)"/>
                    <label for="prefix-option1" class="section">นางสาว</label>
                    <input type="radio" id="prefix-option2" name="prefix" value="Mr" v-model="prefix" @click="showOtherPrefixInput(false)"/>
                    <label for="prefix-option2" class="section">นาย</label>
                    <input type="radio" id="prefix-option3" name="prefix" value="Mrs" v-model="prefix" @click="showOtherPrefixInput(false)"/>
                    <label for="prefix-option3" class="section">นาง</label>
                    <input type="radio" id="prefix-option4" name="prefix" value="Other" v-model="prefix" @click="showOtherPrefixInput(true)"/>
                    <label for="prefix-option4" class="section">อื่นๆ โปรดระบุ</label>
                    <div id="other-prefix-container" v-show="prefix === 'Other'">
                        <input type="text" name="other-prefix" id="other-prefix" class="input-form" placeholder="Other..." v-model="otherPrefix"/>
                        <p id="error-prefix-other" v-if="prefixErrorOther" style="color: red;"></p>
                    </div>
                    <p id="error-prefix" v-if="prefixError" style="color: red;"></p>
                </div>
                <div class="formbox">
                    <label class="section">ชื่อ :</label>
                    <input type="text" name="firstname" id="firstname" class="input-form" placeholder="Firstname" v-model="firstname" />
                </div>
                <div class="formbox">
                    <label class="section">นามสกุล :</label>
                    <input type="text" name="lastname" id="lastname" class="input-form" placeholder="Lastname" v-model="lastname" />
                </div>
                <div class="formbox">
                    <label class="section">หมายเลขบัตรประชาชน :</label>
                    <input type="text" name="id-card-number" id="id-card-number" class="input-form" placeholder="ID Card Number" minlength="13" maxlength="13" v-model="idCardNumber" @input="validateIDCardNumber"/>
                <p id="id-card-error" v-if="idCardError" style="color: red;">หมายเลขบัตรประชาชนต้องมี 13 หลักและเป็นตัวเลขเท่านั้น</p>
                </div>
                <div class="formbox">
                    <label class="section">วันเดือนปีเกิด :</label>
                    <input type="date" name="birthday" id="birthday" class="input-form" placeholder="Birthday" v-model="birthday" />
                    <span id="error-message" v-if="ageError" style="color: red;">คุณต้องมีอายุเกิน 20 ปีขึ้นไป</span>
                </div>
                <div class="formbox">
                    <label class="section">ที่อยู่ :</label>
                    <div class="formbox">
                        <label class="section">จังหวัด :</label>
                        <input type="text" id="province" name="province" class="input-form" placeholder="จังหวัด" v-model="province" />
                    </div>
                    <div class="formbox">
                        <label class="section">อำเภอ :</label>
                        <input type="text" id="amphoe" name="amphoe" class="input-form" placeholder="อำเภอ" v-model="amphoe" />
                    </div>
                    <div class="formbox">
                        <label class="section">ตำบล :</label>
                        <input type="text" id="district" name="district" class="input-form" placeholder="ตำบล" v-model="district" />
                    </div>
                    <div class="formbox">
                        <label class="section">รหัสไปรษณีย์ :</label>
                        <input type="text" id="zipcode" name="zipcode" class="input-form" placeholder="รหัสไปรษณีย์" v-model="zipcode" />
                    </div>
                    <div class="formbox">
                        <textarea name="address-details" id="address-details" class="input-form" placeholder="รายละเอียดที่อยู่ ระบุตามที่อยู่ตามบัตรประชาชน" v-model="addressDetails"></textarea>
                    </div>
                </div>
                <div class="formbox">
                    <label class="section">หนังสือรับรองบริษัท :</label>
                    <input type="file" @change="handleFileUpload($event, 'companyCertificate')" />
                </div>
                <div class="formbox">
                    <label class="section">สำเนาบัตรประชาชนกรรมการผู้ลงนาม :</label>
                    <input type="file" @change="handleFileUpload($event, 'directorIDCard')" />
                </div>
            </div>
            <!-- นิติบุคคล -->
            <div id="corporate-container" v-show="isCorporateContainerVisible">
                <div class="formbox">
                    <label class="section">ประเภทนิติบุคคล :</label>
                    <input type="radio" id="corporate-option1" v-model="corporateType" value="Limited">
                    <label for="corporate-option1" class="section">บริษัทจำกัด</label>
                    <input type="radio" id="corporate-option2" v-model="corporateType" value="PublicLimited">
                    <label for="corporate-option2" class="section">บริษัทจำกัดมหาชน</label>
                    <input type="radio" id="corporate-option3" v-model="corporateType" value="Partnership">
                    <label for="corporate-option3" class="section">ห้างหุ้นส่วนสามัญนิติบุคคล</label>
                    <input type="radio" id="corporate-option4" v-model="corporateType" value="LimitedPartnership">
                    <label for="corporate-option4" class="section">ห้างหุ้นส่วนจำกัด</label>
                    <input type="radio" id="corporate-option5" v-model="corporateType" value="Foundation">
                    <label for="corporate-option5" class="section">มูลนิธิ</label>
                    <input type="radio" id="corporate-option6" v-model="corporateType" value="Association">
                    <label for="corporate-option6" class="section">สมาคม</label>
                </div>
                <div class="formbox">
                    <label class="section">ชื่อบริษัท :</label>
                    <input type="text" v-model="corporateName" class="input-form" placeholder="Corporate Name">
                </div>
                <div class="formbox">
                    <label class="section">เลขจดทะเบียนนิติบุคคล :</label>
                    <input type="text" v-model="corporateRegistrationNumber" class="input-form" placeholder="Corporate Registration Number" minlength="13" maxlength="13" @input="validateCorporateRegistrationNumber">
                    <p v-show="corporateRegistrationNumberError" style="color: red;">หมายเลขเลขจดทะเบียนนิติบุคคล 13 หลักและเป็นตัวเลขเท่านั้น</p>
                </div>
                <div class="formbox">
                    <label class="section">ที่อยู่จดทะเบียนบริษัท :</label>
                    <div class="formbox">
                        <label class="section">จังหวัด :</label>
                        <input type="text" v-model="province" class="input-form" placeholder="จังหวัด">
                    </div>
                    <div class="formbox">
                        <label class="section">อำเภอ :</label>
                        <input type="text" v-model="amphoe" class="input-form" placeholder="อำเภอ">
                    </div>
                    <div class="formbox">
                        <label class="section">ตำบล :</label>
                        <input type="text" v-model="district" class="input-form" placeholder="ตำบล">
                    </div>
                    <div class="formbox">
                        <label class="section">รหัสไปรษณีย์ :</label>
                        <input type="text" v-model="zipcode" class="input-form" placeholder="รหัสไปรษณีย์">
                    </div>
                    <div class="formbox">
                        <textarea v-model="addressDetails" class="input-form" placeholder="ที่อยู่จดทะเบียนบริษัท กรอกที่อยู่ตามหนังสือรับรอง/ภ.พ.20 ฉบับล่าสุด"></textarea>
                    </div>
                </div>
                <div class="formbox">
                    <label class="section">หนังสือรับรองบริษัท :</label>
                    <input type="file" @change="onFileChange('companyCertificate')">
                </div>
                <div class="formbox">
                    <label class="section">สำเนาบัตรประชาชนกรรมการผู้ลงนาม :</label>
                    <input type="file" @change="onFileChange('copyDirectorIDCard')">
                </div>
                <p id="form2-error" class="error-message" v-if="form2Error">กรุณากรอกข้อมูลให้ครบถ้วน</p>
                <button type="button" class="btn-back" @click="showForm1">ย้อนกลับ</button>
                <button type="button" class="btn" @click="validateAge">ถัดไป</button>
            </div>
        </div>

        <div id="form3" v-show="isForm3Visible">
            <div class="formbox">
                <label class="section">จดทะเบียนภาษีมูลค่าเพิ่ม :</label>
                <input type="radio" id="VAT-option1" name="VAT" value="VAT-No" v-model="VAT" @click="showVAToffice(false)">
                <label for="VAT-option1" class="section">ไม่</label>
                <input type="radio" id="VAT-option2" name="VAT" value="VAT-Yes" v-model="VAT" @click="showVAToffice(true)">
                <label for="VAT-option2" class="section">ใช่</label>
                <div id="VAT-office" v-show="isVATOfficeVisible">
                    <label class="section">สำนักงานของบริษัท :</label>
                    <input type="radio" id="office" name="office" value="office" v-model="office">
                    <label for="office" class="section">สำนักงานใหญ่</label>
                    <p v-show="officeError" style="color: red;"></p>
                    <div class="formbox">
                        <label class="section">ใบทะเบียนภาษีมูลค่าเพิ่ม(ภ.พ.20) :</label>
                        <input type="file" id="VAT-certificate" @change="onFileChange('VATCertificate')">
                    </div>
                </div>
                <p v-show="vatError" style="color: red;"></p>
            </div>
            <div class="formbox">
                <input type="checkbox" id="checkbox" v-model="acceptTerms">
                <label for="checkbox">ฉันยอมรับ เงื่อนไขการใช้บริการ และ นโยบายความเป็นส่วนตัว</label>
                <p v-show="checkboxError" style="color: red;"></p>
            </div>
            <p v-show="form3Error" class="error-message">กรุณากรอกข้อมูลให้ครบถ้วน</p>
            <button type="button" class="btn-back" @click="showForm2">ย้อนกลับ</button>
            <button type="button" class="btn" @click="handleButtonClick">ยืนยัน</button>
        </div>

        <div id="form4" v-show="isForm4Visible">
            <div class="formbox">
                <label class="section">ยืนยันสำเร็จแล้ว</label>
            </div>
            <div class="formbox">
                <label class="start">เริ่มต้นขายของกันเลย</label>
            </div>
            <router-link to="/selling">
                <button type="button" class="btn" @click="redirectToSellingPage">เริ่มเลย</button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeForm: 1,
            shopName: '',
            phoneNumber: '',
            phoneError: false,
            form1Error: false,
            sellerType: '',
            sellerTypeError: false,
            prefix: '',
            otherPrefix: '',
            prefixError: false,
            prefixErrorOther: false,
            firstname: '',
            lastname: '',
            idCardNumber: '',
            idCardError: false,
            birthday: '',
            ageError: false,
            province: '',
            amphoe: '',
            district: '',
            zipcode: '',
            addressDetails: '',
            form2Error: false,
            corporateType: '',
            otherCorporateType: '',
            corporateTypeError: false,
            corporateTypeErrorOther: false,
            companyName: '',
            corporateRegistrationNumber: '',
            corporateRegistrationError: false,

            companyCertificate: '',
            directorIDCard: '',
            idCardImage: '',
            form3Error: false,
            checkboxError: false,
            acceptTerms: false,
        };
    },
    methods: {
        validatePhoneNumber() {
            const phoneNumber = this.phoneNumber;
            const phoneNumberError = document.getElementById('phone-error');

            if (phoneNumber.trim() !== '' && !isNaN(phoneNumber) && phoneNumber.length === 10) {
                phoneNumberError.style.display = 'none';
                return true;
            } else {
                phoneNumberError.style.display = 'block';
                return false;
            }
        },
        validateIDCardNumber() {
            const idCardNumber = this.$refs.idCardNumber.value;
            const idCardError = this.$refs.idCardError;

            if (idCardNumber.trim() !== '' && !isNaN(idCardNumber) && idCardNumber.length === 13) {
                idCardError.style.display = 'none';
                return true;
            } else {
                idCardError.style.display = 'block';
                return false;
            }
        },
        validateCorporateRegistrationNumber() {
            const corporateRegistrationNumber = this.$refs.corporateRegistrationNumber.value;
            const corporateRegistrationError = this.$refs.corporateRegistrationError;

            if (corporateRegistrationNumber.trim() !== '' && !isNaN(corporateRegistrationNumber) && corporateRegistrationNumber.length === 13) {
                corporateRegistrationError.style.display = 'none';
                return true;
            } else {
                corporateRegistrationError.style.display = 'block';
                return false;
            }
        },
        validateForm1() {
            let isValid = true;

            // Validate shop name
            if (this.shopName.trim() === '') {
                isValid = false;
                document.getElementById('shop-name').classList.add('input-error');
            } else {
                document.getElementById('shop-name').classList.remove('input-error');
            }

            // Validate phone number
            if (this.phoneNumber.trim() === '' || this.phoneNumber.length !== 10 || isNaN(this.phoneNumber)) {
                isValid = false;
                this.phoneError = true;
            } else {
                this.phoneError = false;
            }

            // Display form error message if not valid
            if (!isValid) {
                this.form1Error = true;
            } else {
                this.form1Error = false;
                // Proceed to next step (e.g., showForm2())
                // Example: this.showForm2();
            }

            return isValid;
        },
        validateAge() {
            const birthdayInput = this.birthday;
            const errorMessage = document.getElementById('error-message');

            if (birthdayInput) {
                const today = new Date();
                const birthDate = new Date(birthdayInput);
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDifference = today.getMonth() - birthDate.getMonth();

                if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }

                if (age < 20) {
                    this.ageError = true;
                } else {
                    this.ageError = false;
                    if (this.validateForm2()) {
                        this.showForm3(); // เรียกฟังก์ชัน showForm3 เมื่ออายุเกิน 20 ปี และ validateForm2() ผ่าน
                    }
                }
            } else {
                this.ageError = true;
                errorMessage.innerText = 'กรุณากรอกวันเดือนปีเกิด';
            }
        },
        validateForm2() {
            let isValid = true;

            // ตรวจสอบว่ามี sellerType ที่ถูกเลือกหรือไม่
            if (!this.sellerType) {
                this.sellerTypeValid = false;
                isValid = false;
            }

            // ตรวจสอบและปรับเปลี่ยนตามประเภทผู้ขายที่เลือก
            if (this.sellerType === 'individual') {
                const requiredFields = ['firstname', 'lastname', 'id-card-number', 'birthday', 'province', 'amphoe', 'district', 'zipcode', 'address-details', 'photo-IDcard', 'photo-rair-IDCard'];
                requiredFields.forEach(field => {
                if (!this[field]) {
                    isValid = false;
                    this[`${field}Valid`] = false;
                }
                });

                // เพิ่มเงื่อนไขการตรวจสอบอื่นๆ ตามที่ต้องการ

                // ตรวจสอบคำนำหน้า
                if (!this.prefix) {
                this.prefixValid = false;
                isValid = false;
                } else {
                if (this.prefix === 'Other' && !this.otherPrefix) {
                    this.otherPrefixValid = false;
                    isValid = false;
                }
                }
            } else if (this.sellerType === 'corporate') {
                const requiredFields = ['corporateName', 'corporateRegistrationNumber', 'province1', 'amphoe1', 'district1', 'zipcode1', 'address-details1', 'companyCertificate', 'copyDirectorIDCard'];
                requiredFields.forEach(field => {
                if (!this[field]) {
                    isValid = false;
                    this[`${field}Valid`] = false;
                }
                });

                // เพิ่มเงื่อนไขการตรวจสอบอื่นๆ ตามที่ต้องการ

                // ตรวจสอบประเภทนิติบุคคล
                if (!this.corporateType) {
                isValid = false;
                // form2Error.innerText = "กรุณาเลือกประเภทนิติบุคคล";
                }
            }

            // แสดงข้อความแจ้งเตือนหากข้อมูลไม่ครบถ้วน
            if (!isValid) {
                this.formValid = false;
            } else {
                this.formValid = true;
            }

            return isValid;
        },
        validateForm3() {
            let isValid = true;

            // ตรวจสอบว่ามีค่า VAT ที่ถูกเลือกหรือไม่
            if (!this.VAT) {
                this.VATValid = false;
                isValid = false;
            }

            // ตรวจสอบว่า checkbox ได้ถูกติ๊กหรือไม่
            if (!this.acceptedTerms) {
                this.acceptedTermsValid = false;
                isValid = false;
            }

            // เพิ่มเงื่อนไขการตรวจสอบอื่นๆ ตามที่ต้องการ เช่น การตรวจสอบสำนักงานบริษัทและการอัปโหลดหนังสือรับรองบริษัท

            // แสดงข้อความแจ้งเตือนหากข้อมูลไม่ครบถ้วน
            if (!isValid) {
                this.formValid = false;
            } else {
                this.formValid = true;
            }

            return isValid;
        },
        showForm1() {
            this.resetForms(); // Optional: Reset any form-specific states
            this.$refs.form1.style.display = 'block';
            this.$refs.form2.style.display = 'none';
            this.$refs.form3.style.display = 'none';
        },
        showForm2() {
            if (this.validateForm1()) {
                this.$refs.form2.style.display = 'block';
                this.$refs.form1.style.display = 'none';
                this.$refs.form3.style.display = 'none';
                
                // Handle menu highlighting
                this.resetMenu();
                this.$refs.menuForm.querySelector(".form2").classList.add("red-text");
            }
        },
        showForm3() {
            if (this.validateForm2()) {
                this.$refs.form2.style.display = 'none';
                this.$refs.form3.style.display = 'block';
                
                // Handle menu highlighting
                this.resetMenu();
                this.$refs.menuForm.querySelector(".form3").classList.add("red-text");
            }
        },
        handleButtonClick() {
            if (this.validateForm3()) {
                this.showForm4();
            }
        },
        showForm4() {
            // Call gatherFormData() to ensure the latest data is collected into formData
            const formData = this.gatherFormData();

            // Assuming saveFormDataToFile() is an asynchronous operation, handle it appropriately
            this.saveFormDataToFile(formData).then(() => {
            if (this.validateForm3()) {
                this.$refs.form2.style.display = 'none';
                this.$refs.form3.style.display = 'none';
                this.$refs.form4.style.display = 'block';

                // Reset menu highlighting and highlight Form 4
                this.resetMenu();
                this.$refs.menuForm.querySelector(".form4").classList.add("red-text");
            }
            }).catch(error => {
            console.error('Failed to save form data:', error);
            // Handle error if needed
            });
        },
        showSellerType(type) {
            // Assuming you have reactive data for controlling visibility
            if (type === 'individual') {
            this.showIndividualContainer = true;
            this.showCorporateContainer = false;
            } else if (type === 'corporate') {
            this.showIndividualContainer = false;
            this.showCorporateContainer = true;
            }
        },
        showOtherPrefixInput(show) {
            this.showOtherPrefix = show;
        },
        showVAToffice(show) {
            this.showVATOffice = show;
        },
        gatherFormData() {
            const formData = {};

            // ข้อมูลจากฟอร์ม 1
            formData.shopName = this.shopName;
            formData.email = this.user.email;
            formData.phoneNumber = this.phoneNumber;

            // ข้อมูลจากฟอร์ม 2
            formData.sellerType = this.sellerType;
            
            if (formData.sellerType === 'individual') {
                formData.individual = {
                    prefix: this.prefix,
                    otherPrefix: this.otherPrefix,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    idCardNumber: this.idCardNumber,
                    birthday: this.birthday,
                    address: {
                        province: this.province,
                        amphoe: this.amphoe,
                        district: this.district,
                        zipcode: this.zipcode,
                        details: this.addressDetails
                    },
                    photoIDCard: this.photoIDCardName,
                    photoWithIDCard: this.photoRairIDCardName
                };
            } else if (formData.sellerType === 'corporate') {
                formData.corporate = {
                    corporateType: this.corporateType,
                    corporateName: this.corporateName,
                    corporateRegistrationNumber: this.corporateRegistrationNumber,
                    address: {
                        province: this.province1,
                        amphoe: this.amphoe1,
                        district: this.district1,
                        zipcode: this.zipcode1,
                        details: this.addressDetails1
                    },
                    companyCertificate: this.companyCertificateName,
                    copyDirectorIDCard: this.copyDirectorIDCardName
                };
            }

            // ข้อมูลจากฟอร์ม 3
            formData.VAT = this.VAT;
            if (formData.VAT === 'VAT-Yes') {
                formData.VATDetails = {
                    office: this.office,
                    VATCertificate: this.VATCertificateName
                };
            }
            formData.termsAccepted = this.termsAccepted;
            return formData;
        },
        saveFormDataToFile(formData) {
            const jsonData = JSON.stringify(formData);
            console.log('JSON data:', jsonData); // Log the JSON data to the console

            fetch('/save-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                // Optionally, you can show a success message to the user
                // alert('Data saved successfully!');
            })
            .catch((error) => {
                console.error('Error:', error);
                // Optionally, you can show an error message to the user
                // alert('Failed to save data.');
            });
        },
        redirectToSellingPage() {
            this.$router.push('/selling'); // Assuming '/selling' is the route path for selling.ejs
        },
    }
};
</script>

<style scoped>
#menu-form {
    padding: 15px;
    list-style-type: none;
    overflow: hidden;
    justify-content: space-around;
    display: flex;
    color: #A9A9A9;
}

.form1 {
    color: red;
}

.red-text {
    color: red;
}

/* .square{
    top: 100px;
    padding: 2px;
    width: 20px;
    height: 0.2px;
    background-color: #6C22A6;
    display: flex;
    align-items: center;
} */

#form1,
#form2,
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

.formbox{
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

input[type="checkbox"]{
    padding-right: 10px;
    margin: .5% auto;
}

.section {
    padding-right: 10px;
    margin: .5% auto;
}

.btn {
    padding: 7px;
    width: 100px;
    font-size: 17px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border: none;
    background-color: #B99470;
    color: white;
    margin: 1.5% auto;
}
.btn-back {
    padding: 7px;
    width: 100px;
    font-size: 17px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border: none;
    background-color: #dfdfdf;
    color: rgb(0, 0, 0);
    margin: 1.5% auto;
}

#address-details ,
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
    font-family: 'Times New Roman', Times, serif;
    font-size: 15px;
    margin-bottom: 10px;
}

.start {
    font-size: 15px;
}

.error-message {
    color: red;
    display: none;
}

/*---up photo-----*/

.upload-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;
}

.image-wrapper {
    position: relative;
    display: inline-block;
    margin: 10px;
    width: 150px;
    height: 150px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border-radius: 8px;
}

#image-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.remove-icon {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}

.remove-icon:hover {
    background: rgba(255, 72, 72, 0.5);
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

.image-upload {
    display: none;
}
</style>