<template>
  <div class="bg-white dark:bg-gray-800">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Products</h2>
      <div class="flex items-center justify-center">
        <h2 v-if="message" :class="{ 'text-teal-600': success, 'text-red-600': !success }">
        {{ message }}
      </h2>
      </div>
      <h2 v-if="products.data.length == 0" class="text-teal-900">There are no products</h2>
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
import { onMounted, computed, ref } from 'vue';
import PrimaryButton from '../Components/PrimaryButton.vue';
import store from '../store';
const products = computed(() => store.state.products);
const quantity = 1;
const message = ref('');
const success = ref(false);
onMounted(() => {
  getProducts()
})
function getProducts() {
  store.dispatch("getProducts")
}
function addToCart(product) {
  store.dispatch('createCart', { product, quantity })
  .then(response => {
      if (response.status === 201) {
        success.value = true;
        message.value = response.data.message;
        setTimeout(() => {
          message.value = '';
        }, 3000);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      success.value = false;
      message.value = response.data.message;
    });
}

</script>
