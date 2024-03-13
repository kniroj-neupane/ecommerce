<template>
    <div class="container mx-auto my-8 px-10">
        <h1 class="text-lg font-medium text-teal-900 dark:text-gray-200">Your Shopping Cart</h1>

        <!-- Display Cart Items -->
        <div v-if="cartItems.data.length === 0">
            <p>Your cart is empty.</p>
        </div>
        <div v-else class="mt-8">
                <ul role="list" class="-my-6 divide-y divide-gray-300">
                    <li v-for="product in cartItems.data" :key="product.id" class="flex justify-around py-6">
                        <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img :src="product.imageUrl" :alt="product.title"
                                class="h-full w-full object-cover object-center" />
                        </div>

                        <div class="ml-4 flex justify-center flex-1 flex-col">
                            <div class="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
                                <h3>
                                    <a>{{ product.title }}</a>
                                </h3>
                                <p class="ml-4">$ {{ product.price }}</p>
                            </div>
                            <div class="flex flex-1 items-center justify-between">
                                <p class="text-gray-500">Qty {{ product.quantity }}</p>
                                <div class="flex">
                                    <button type="button" @click="removeCartItem(product)"
                                        class="font-medium text-teal-600 hover:text-teal-500">Remove</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
        </div>
    </div>
    <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div class="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
            <p>Subtotal</p>
            <p>$ {{ calculateSubtotal() }}</p>
        </div>
        <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div class="mt-6">
            <a href="#"
                class="flex items-center justify-center rounded-md border border-transparent bg-teal-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700">Checkout</a>
        </div>
        <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
                or{{ ' ' }}
                <a :href="route('dashboard')" class="font-medium text-teal-600 hover:text-teal-500">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                </a>
            </p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import store from '../../store';

const cartItems = computed(() => store.state.cartItems);

// Calculate total cost of items in the cart not working
const calculateSubtotal = () => {
    let total = 0;
    store.state.cartItems.data.forEach(item => {
        total += item.price * item.quantity;

    });
    return total;
};
function removeCartItem(cartItem){
    store.dispatch('removeCartItem',cartItem)
}
</script>