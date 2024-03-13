<template>

    <Head title="Cart" />

    <AuthenticatedLayout>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <CartItems></CartItems>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import CartItems from './CartItems.vue';
import Products from './Products.vue';
import store from '../store';
export default {
    props: {
        cartItems: Object,
        products: Object,
    },
    mounted() {
        store.dispatch('setCartItems', { cartItems: this.cartItems, products: this.products });
    },
    components: {
        Head,
        AuthenticatedLayout,
        CartItems,
    },
};
</script>