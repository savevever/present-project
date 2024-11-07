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
                            text: 'Category',
                            font: {
                                size: 14,
                                weight: 'bold',
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'ยอดขาย',
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
            const { labels, data } = this.calculateTotalSellByCategory();
            return {
                labels,
                datasets: [{
                    label: 'ยอดขายตามหมวดหมู่ของสินค้า',
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
        calculateTotalSellByCategory() {
            const categoryData = {};

            // สะสมยอดขายตามหมวดหมู่
            this.filteredProducts.forEach(product => {
                const { category, totalSell } = product;
                if (!categoryData[category]) {
                    categoryData[category] = 0;
                }
                categoryData[category] += totalSell; // บวกยอดขายเข้ากับหมวดหมู่
            });

            // แปลงข้อมูลให้เป็นอาร์เรย์และจัดเรียง
            const sortedCategories = Object.entries(categoryData)
                .map(([category, totalSell]) => ({ category, totalSell }))
                .sort((a, b) => b.totalSell - a.totalSell); // เรียงจากมากไปน้อย

            const labels = sortedCategories.map(item => item.category);
            const data = sortedCategories.map(item => item.totalSell);

            return { labels, data };
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