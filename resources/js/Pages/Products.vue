<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->

<template>
  <div class="bg-white dark:bg-gray-800">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Products</h2>
      <h2 v-if="products.data.length==0" class="text-teal-900">There are no products</h2>
      <div v-else class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <a v-for="product in products.data" :key="product.id" class="group">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img :src="product.image_url" :alt="product.title"
              class="h-full w-full object-cover object-center group-hover:opacity-75" />
          </div>
          <div class="flex justify-around items-center">
            <div>
              <h3 class="mt-4 text-sm text-gray-700 dark:text-gray-100">{{ product.title }}</h3>
              <p class="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">$ {{ product.price }}</p>
            </div>
            <div>
              <PrimaryButton @click="addToCart(product)">Add to cart</PrimaryButton>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import PrimaryButton from '../Components/PrimaryButton.vue';
import store from '../store';
const products = computed(() => store.state.products);
const products1 = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
]

onMounted(() => {
  getProducts()
})
function getProducts(){
  store.dispatch("getProducts")
}
function addToCart(product) {
  state.cartItems.push(product);
  console.log(state.cartItems);

}
</script>