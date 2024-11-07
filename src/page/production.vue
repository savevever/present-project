<template>
    <div class="container">
        <!-- <CategoryComponent></CategoryComponent> -->
        <ProductItem></ProductItem>
        <store></store>
        <detail></detail>
        <comment></comment>
    </div>
</template>
<script>

import ProductItem from "../components/production/Product-Item.vue";
import store from "../components/production/store-component.vue"
import detail from "../components/production/details-component.vue"
import comment from "../components/production/commemt-component.vue"
export default {
    name: "App",
    components: {
        ProductItem,
        store,
        detail,
        comment
    },
};
</script>
<style scoped>
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
}
</style>