<template>
  <div id="container">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      markers: []
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://api.longdo.com/map/?key=42d63fb3325dc8cf3207245f038ff561';

      script.onload = () => {
        this.createMap();
      };

      document.head.appendChild(script);
    },
    createMap() {
      window.longdo = window.longdo || {};
      this.map = new window.longdo.Map({
        placeholder: document.getElementById('map')
      });

      this.map.bound({
        minLon: 97.345,
        minLat: 5.625,
        maxLon: 105.639,
        maxLat: 20.464
      });

      this.getCurrentLocation();
    },
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { longitude, latitude } = position.coords;
          this.addMarker(longitude, latitude);
        }, (error) => {
          console.error(error);
          alert('ไม่สามารถหาตำแหน่งปัจจุบันได้');
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    },
    addMarker(lon, lat) {
      if (this.map) {
        // ลบ marker เก่าทั้งหมด
        this.markers.forEach((marker) => {
          this.map.Overlays.remove(marker);
        });

        // เพิ่ม marker ที่ตำแหน่งปัจจุบัน
        const marker = new window.longdo.Marker({ lon, lat });
        this.map.Overlays.add(marker);

        this.markers = [marker];

        this.map.location({ lon, lat }, true);
      }
    }
  }
};
</script>


<style scoped>
#container {

  display: flex;
  align-items: flex-start;
  flex-direction: column;

  margin-top:30px ;
  width: 700px;
}

#location-button {
  display: flex;
  gap: 10px;
}

#location-button input {
  margin-top: 8px;
  height: 25px;
  width: 150px;
}

#location-button button {
  margin-top: 8px;
  padding: 5px 10px 5px 10px;
}

#location-button button:nth-child(3) {
  background-color: rgb(82, 161, 235);
}

#location-button button:nth-child(4) {
  background-color: #ff6565;
}

#location-button button:nth-child(5) {
  background-color: rgb(100, 243, 119);
}

#map {
  
  height: 200px;
  width: 705px;
  cursor: crosshair;
}
</style>
