<template>
    <div class="relative">
        <ul class="space-y-5">
            <li v-for="product in cartItems" :key="product.id" class="flex justify-between">
                <div class="inline-flex">
                    <img src="https://images.unsplash.com/photo-1620331311520-246422fd82f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGhhaXIlMjBkcnllcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                        alt="" class="max-h-16" />
                    <div class="ml-3">
                        <p class="text-base font-semibold text-white">Nano Titanium Hair Dryer</p>
                        <p class="text-sm font-medium text-white text-opacity-80">Pdf, doc Kindle</p>
                    </div>
                </div>
                <p class="text-sm font-semibold text-white">$260.00</p>
            </li>
        </ul>
        <div class="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
        <div class="space-y-2">
            <p class="flex justify-between text-lg font-bold text-white"><span>Total
                    price:</span><span>$510.00</span></p>
            <p class="flex justify-between text-sm font-medium text-white"><span>Vat:
                    10%</span><span>$55.00</span></p>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import store from '../../store';

const cartItems = computed(() => store.state.cartItems);

const calculateSubtotal = () => {
    let total = 0;
    store.state.cartItems.data.forEach(item => {
        total += item.price * item.quantity;

    });
    return total;
};
</script>