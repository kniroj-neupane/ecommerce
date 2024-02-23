<template >
    <div class="flex justify-between">
        <h1 class="text-2xl font-bold text-gray-900">Products</h1>
        <button class="border-solid bg-indigo-600 px-3 py-1.5 rounded-md text-white">Add new Product</button>
    </div>
    <!-- products table -->
    <ProductsTable></ProductsTable>
    
</template>
<script>
import ProductsTable from './ProductsTable.vue';
export default {
    components:{
        ProductsTable
    }
}
</script>
<style></style>