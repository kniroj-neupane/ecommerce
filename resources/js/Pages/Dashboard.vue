<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import Sections from './Sections.vue';
import store from '../store';

// Use ref instead of computed
const categories = ref([]);

onMounted(async () => {
    // Dispatch action to get categories and wait for it to complete
    await store.dispatch('getCategories');
    
    // After the action is completed, update the categories
    categories.value = store.state.categories;
});

</script>

<template>
    <Head title="Dashboard" />
    <AuthenticatedLayout>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-900 overflow-hidden shadow-sm sm:rounded-lg">
                    <Sections v-for="category in categories.data" :key="category.id" :category="category">
                    </Sections>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
