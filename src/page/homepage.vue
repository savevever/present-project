<template>
    <div class="container">
        <div class="item">
            <CategoryComponent></CategoryComponent>
            <productsrecommend></productsrecommend>
            <footerComponent></footerComponent>
        </div>

    </div>
</template>

<script>
import productsrecommend from "../components/homepage/Product-reccomment.vue";
export default {
    name: "App",
    components: {
        productsrecommend,
    },
};
</script>
<style scoped>
.continaer {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.item{
    /* width: 1300px; */
    width: 100%;
}
</style>