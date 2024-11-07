<template>
    <div class="pagination">
        <button @click="prevPage" :disabled="currentPage <= 1">Previous</button>
        <button v-for="page in totalPages" :key="page" @click="gotoPage(page)"
            :class="{ active: currentPage === page }">
            {{ page }}
        </button>
        <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
    </div>
</template>
<script>
export default {
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    methods: {
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.$emit('update:page', this.currentPage + 1);
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.$emit('update:page', this.currentPage - 1);
            }
        },
        gotoPage(page) {
            this.$emit('update:page', page);
        }
    }
};
</script>
<style scoped>
.container {
    width: 100vw;

}

.pagination {
    display: flex;
    justify-content: flex-end;
    width: 1300px;
    gap: 0.5rem;
    margin: 1rem 0 1.5rem 0;
}

.pagination button {
    padding: 0.5rem 1rem;
    border: 1px solid #3953a1;
    background: #f9f9f9;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
}

.pagination button:hover {
    background: #b6c8ff;
}

.pagination button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.pagination button.active {
    background: #3953a1;
    color: #fff;
    border-color: #3953a1;
}
</style>
