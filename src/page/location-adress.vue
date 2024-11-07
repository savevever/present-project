<template>
  <div id="container">
      <div id="Purchase-history-container">
          <menuComponent></menuComponent>
          <div id="location-right">
              <h1>ที่อยู่</h1>
              <div id="form">
                  <form v-if="!isSaved" action="">
                      <div class="row">
                          <div class="row-item">
                              <label for="">ชื่อ-นามสกุล</label>
                              <input type="text" v-model="name">
                          </div>
                          <div class="row-item">
                              <label for="">เขต/อำเภอ</label>
                              <input type="text" v-model="district">
                          </div>
                      </div>
                      <div class="row">
                          <div class="row-item">
                              <label for="">รหัสไปรษณีย์</label>
                              <input type="text" v-model="postalCode">
                          </div>
                          <div class="row-item">
                              <label for="">จังหวัด</label>
                              <input type="text" v-model="province">
                          </div>
                      </div>
                      <div class="row">
                          <div class="row-item">
                              <label for="">บ้านเลขที่,ซอย,หมู่, ถนน,แขวง/ตำบล</label>
                              <input type="text" v-model="address">
                          </div>
                          <div class="row-item">
                              <label for="">เบอร์</label>
                              <input type="text" v-model="number">
                          </div>
                      </div>
                  </form>

                  <div v-else>
                      <!-- Display saved address data -->
                      <div class="row">
                          <div class="row-item2">
                              <strong>ชื่อ-นามสกุล: </strong>{{ name }}
                          </div>
                          <div class="row-item2">
                              <strong>เขต/อำเภอ: </strong>{{ district }}
                          </div>
                      </div>
                      <div class="row">
                          <div class="row-item2">
                              <strong>รหัสไปรษณีย์: </strong>{{ postalCode }}
                          </div>
                          <div class="row-item2">
                              <strong>จังหวัด: </strong>{{ province }}
                          </div>
                      </div>
                      <div class="row">
                          <div class="row-item2">
                              <strong>บ้านเลขที่,ซอย,หมู่,ถนน,แขวง/ตำบล: </strong>{{ address }}
                          </div>
                          <div class="row-item2">
                              <strong>เบอร์โทร: </strong>{{ number }}
                          </div>
                      </div>
                  </div>
              </div>
              <div id="map-container">
                  <mapAdress></mapAdress>
              </div>
              <div id="location-button">
                  <button v-if="!isSaved && !hasAddress" @click="createAddress">บันทึก</button>
                  <button v-if="!isSaved && hasAddress" @click="updateAddress">อัปเดต</button>
                  <button v-if="isSaved" @click="editAddress">แก้ไข</button>
              </div>
          </div>
      </div>
  </div>
  <footerComponent></footerComponent>
</template>

<script>
import mapAdress from '../components/account/map-adress.vue';
import axios from 'axios';

export default {
  components: {
      mapAdress
  },
  data() {
      return {
          name: "",
          district: "",
          postalCode: "",
          province: "",
          number:"",
          address: "",
          userEmail: '',
          // ispost: false,
          isSaved: false,
          hasAddress: false
      }
  },
  mounted() {
      this.getAddress();
  },
  methods: {
      createAddress() {
          const user = JSON.parse(localStorage.getItem('user'));
          const userEmail = user.email;
          const addressData = {
              name: this.name,
              district: this.district,
              postalCode: this.postalCode,
              province: this.province,
              address: this.address,
              email: userEmail,
              number:this.number
          };

          axios.post('http://localhost:8081/users/address', addressData)
              .then(response => {
                  console.log("Address created:", response.data);
                  this.isSaved = true;
                  this.hasAddress = true;
              })
              .catch(error => {
                  console.error("Error creating address:", error.response ? error.response.data : error);
              });
      },

      updateAddress() {
          const user = JSON.parse(localStorage.getItem('user'));
          const userEmail = user.email;
          const addressData = {
              name: this.name,
              district: this.district,
              postalCode: this.postalCode,
              province: this.province,
              address: this.address,
              email: userEmail,
              number:this.number
          };
          console.log("hasAddress", this.hasAddress);

          axios.put('http://localhost:8081/users/address', addressData)
              .then(response => {
                  console.log("Address updated:", response.data);
                  this.isSaved = true;
              })
              .catch(error => {
                  console.error("Error updating address:", error.response ? error.response.data : error);
              });
      },

      getAddress() {
          const user = JSON.parse(localStorage.getItem('user'));
          const userEmail = user.email;

          axios.get(`http://localhost:8081/users/address?email=${userEmail}`)
              .then(response => {
                  if (response.data) {
                      const addressData = response.data;
                      this.name = addressData.name;
                      this.district = addressData.district;
                      this.postalCode = addressData.postalCode;
                      this.province = addressData.province;
                      this.address = addressData.address;
                      this.number = addressData.number;
                      this.isSaved = true;
                      if (addressData.name !== undefined && addressData.email ===userEmail) {
                          this.hasAddress = true;
                      }
                  } else {
                      this.hasAddress = false;
                  }
                  console.log("hasAddress", this.hasAddress);
              })

              .catch(error => {
                  console.error("Error retrieving address:", error.response ? error.response.data : error);
              });
      },

      editAddress() {
          this.isSaved = false;
      }
  }

};
</script>




<style scoped>
#Purchase-history-container {
  width: 1200px;
  height: 690px;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  display: flex;
}

#container {
  height: auto;
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  /* margin-bottom: 30px; */
}



#location-button {
  margin-top: 1.5rem;
  width: 900px;
  display: flex;
  gap: 1rem;
  /* justify-content: flex-end; */
}

#location-button button {
  padding: 7px 10px 7px 10px;
  font-size: 17px;

}


#item-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
}

.row {
  display: flex;
  gap: 40px;
  /* justify-content: flex-end; */
}

.row-item {
  display: flex;
  flex-direction: column;
}

.row-item2 {
  margin-top: 40px;
}

.row-item label {
  font-size: 18px;
}

.row-item input {
  width: 360px;
  height: 28px;
}

.icon {
  font-size: 30px;

}

#location-right {
  padding: 20px;
  width: 1000px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#map-container {
  width: 700px;
  display: flex;
  justify-content: flex-start;
}
</style>