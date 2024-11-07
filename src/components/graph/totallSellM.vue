<template>
  <div class="container">
    <Line :data="computedChartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default {
  name: 'App',
  components: {
    Line
  },
  props: {
    filteredProducts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#333',
              font: {
                size: 16
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month',
              font: {
                size: 14,
                weight: 'bold',
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Total Sales',
              font: {
                size: 14,
                weight: 'bold',
              },
              beginAtZero: true
            }
          }
        },
      }
    }
  },
  computed: {
    computedChartData() {
      const labels = this.months;
      const data = this.calculateMonthlyNetRevenue();
      return {
        labels,
        datasets: [{
          label: 'รายได้ต่อปี',
          backgroundColor: '#00cc00',
          borderColor: '#00cc00',
          pointRadius: 1,
          fill: true,
          data
        }]
      };
    }
  },
  methods: {
    calculateMonthlyNetRevenue() {
        const monthlyNetRevenue = Array(12).fill(0);
        console.log(this.filteredProducts);
        
        if (this.filteredProducts && Array.isArray(this.filteredProducts)) { // ตรวจสอบว่า filteredProducts มีค่า
            this.filteredProducts.forEach(product => {
                const { totalPrice, createdAt } = product;
                const month = new Date(createdAt).getMonth(); // ดึงเดือนจาก createdAt
                if (month !== -1) {
                    monthlyNetRevenue[month] += totalPrice; // ใช้ totalPrice เป็นค่าที่ต้องการ
                }
            });
        }

        console.log(monthlyNetRevenue);
        return monthlyNetRevenue;
    }
}

};
</script>




<style scoped>
.container {
  width: 700px;
  height: 250px;
}
</style>
