<template>

    <Head title="Checkout" />
    <AuthenticatedLayout>
        <div class="relative mx-auto w-full bg-white dark:bg-gray-800">
            <div class="grid grid-cols-10">
                <div class="col-span-full py-6 px-4 lg:col-span-6 ">
                    <div class="mx-auto w-full max-w-lg">
                        <CheckoutForm></CheckoutForm>
                        <p class="mt-10 text-center text-sm font-semibold text-gray-500">
                            By placing this order you agree to the
                            <a href="#" class="whitespace-nowrap text-teal-400 underline hover:text-teal-600">
                                Terms and Conditions</a>
                        </p>
                        <button type="submit"
                            class="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">
                            Place Order</button>
                    </div>
                </div>
                <div class="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-9">
                    <h2 class="sr-only">Order summary</h2>
                    <div>
                        <div
                            class="absolute inset-0 h-full w-full bg-teal-800 opacity-95">
                        </div>
                    </div>
                    <Orders></Orders>
                    <div class="relative mt-10 text-white">
                        <h3 class="mb-5 text-lg font-bold">Support</h3>
                        <p class="text-sm font-semibold">+01 653 235 211 <span class="font-light">(International)</span>
                        </p>
                        <p class="mt-1 text-sm font-semibold">support@nanohair.com <span
                                class="font-light">(Email)</span>
                        </p>
                        <p class="mt-2 text-xs font-medium">Call us now for payment related issues</p>
                    </div>
                    <div class="relative mt-10 flex">
                        <p class="flex flex-col">
                            <span class="text-sm font-bold text-white">
                                Money Back Guarantee
                            </span>
                            <span class="text-xs font-medium text-white">
                                within 30 days of purchase
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>

</template>
<script>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import CheckoutForm from './CheckoutForm.vue';
import Orders from './Orders.vue';
import { Head } from '@inertiajs/vue3';
export default {
    props: {
        cartItems: Object,
        products: Object,
    },
    components: {
        Head,
        AuthenticatedLayout,
        CheckoutForm,
        Orders,
    },
};
</script>