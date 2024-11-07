<template>
    <header>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap" rel="stylesheet">
    </header>
    <div class="container">
        <Bar id="my-chart-id" :options="chartOptions" :data="computedChartData" />
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        filteredProducts: {
            type: Array,
            required: true
        }
    },
    computed: {
        // Using computed property for chartData
        computedChartData() {
            const sortedProducts = [...JSON.parse(JSON.stringify(this.filteredProducts))].sort((a, b) => b.totalSell - a.totalSell);
            const top5Products = sortedProducts.slice(0, 5);
            // console.log("sssss",sortedProducts);
            
            const labels = top5Products.map(product => product.nameProduct);
            const data = top5Products.map(product => product.totalSell);

            // console.log('Chart Labels:', labels);
            // console.log('Chart Data:', data);

            return {
                labels,
                datasets: [{
                    label: 'สินค้าขายดีที่สุด 5 รายการ',
                    backgroundColor: '#f87979',
                    data
                }]
            };
        }
    },
    data() {
        return {
            chartOptions: {
                responsive: true,
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
                            text: 'สินค้า',
                            font: {
                                size: 14,
                                weight: 'bold',
                            }
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'ยอดขายทั้งหมด',
                            font: {
                                size: 14,
                                weight: 'bold',
                            }
                        }
                    }
                }
            }
        };
    }
};
</script>

<style scoped>
* {
    font-family: "Noto Sans Thai", sans-serif;
    font-weight: 500;
    font-style: normal;
}

.container {
    width: 700px;
    height: 270px;
}

#my-chart-id {
    width: 700px;
    height: 100%;
    padding: 15px;
}
</style>