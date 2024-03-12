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
export default {
    props: {
        cartItems: Object,
    },
    mounted() {
        console.log(this.cartItems);
    },
    components: {
        Head,
        CartItems,
        AuthenticatedLayout,
    },
};
</script>