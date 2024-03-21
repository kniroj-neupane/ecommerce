<template>
    <div class="bg-gray-100 dark:bg-gray-800 mb-4 sm:rounded-lg">
        <h2 class="dark:text-gray-100 px-10 py-10 text-3xl">{{category.name}}</h2>
        <Products></Products>
    </div>
</template>
<script setup>
    import Products from './Products.vue';
    const props = defineProps({
    category: Object 
});
</script>