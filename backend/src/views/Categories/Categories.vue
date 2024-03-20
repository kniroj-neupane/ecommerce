<template >
    <div class="flex justify-between">
        <h1 class="text-2xl font-bold text-gray-900">Categories</h1>
        <router-link class="border-solid bg-teal-600 px-3 py-1.5 rounded-md text-white"
                :to="{name: 'app.categories.create'}" >
            Add new Category
        </router-link>
    </div>
    <!-- products table -->
    <CategoriesTable></CategoriesTable>
    
</template>
<script>
import CategoriesTable from './CategoriesTable.vue';
export default {
    components:{
        CategoriesTable,
    }
}
</script>
<style></style>