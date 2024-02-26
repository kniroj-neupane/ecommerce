<template>
    <!-- per page,search -->
    <div class="bg-white rounded-lg p-4 mt-2 animate-fade-in-down">
        <div class="flex justify-between pb-2 border-b-2">
            <div class="flex items-center">
                <span class="whitespace-nowrap mr-2">Per Page</span>
                <select @change="getProducts(null)" v-model="perPage"
                    class="appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value='100'>100</option>
                </select>
                <span class="ml-3">Found {{ products.total }} products</span>
            </div>
            <div>
                <input @change="getProducts(null)" v-model="search"
                    class="appearance-none relative block w-48 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                    placeholder="Type to Search products">
            </div>
        </div>
    </div>
    <!-- table -->
    <table class="w-full table-auto">
        <!-- table head -->
        <thead>
            <tr>
                <TableHeaderCell field="id" :sort-field="sortField" :sort-direction="sortDirection"
                    @click="sortProducts('id')">
                    ID
                </TableHeaderCell>
                <TableHeaderCell field="image" :sort-field="sortField" :sort-direction="sortDirection">
                    Image
                </TableHeaderCell>
                <TableHeaderCell field="title" :sort-field="sortField" :sort-direction="sortDirection"
                    @click="sortProducts('title')">
                    Title
                </TableHeaderCell>
                <TableHeaderCell field="price" :sort-field="sortField" :sort-direction="sortDirection"
                    @click="sortProducts('price')">
                    Price
                </TableHeaderCell>
                <TableHeaderCell field="quantity" :sort-field="sortField" :sort-direction="sortDirection"
                    @click="sortProducts('quantity')">
                    Quantity
                </TableHeaderCell>
                <TableHeaderCell field="updated_at" :sort-field="sortField" :sort-direction="sortDirection"
                    @click="sortProducts('updated_at')">
                    Last Updated At
                </TableHeaderCell>
                <TableHeaderCell field="actions" :sort-field="sortField" :sort-direction="sortDirection">
                    Actions</TableHeaderCell>
            </tr>
        </thead>
        <!-- table body -->
        <tbody v-if="products.data.length == 0">
            <tr>
                <td colspan="6">
                    <Spinner v-if="products.loading" text="Looking For Products" />
                    <p v-else class="text-center">
                        There are no products.
                    </p>
                </td>
            </tr>
        </tbody>
        <tbody v-else>

            <tr v-for="(product, index) of products.data" :key="index">
                <td class="border-b p-2">{{ product.id }}</td>
                <td class="border-b p-2">
                    <img v-if="product.image_url" class="w-16 h-16 object-cover" :src="product.image_url"
                        :alt="product.title">
                    <img v-else class="w-16 h-16 object-cover" src="../../assets/no_img.png">
                </td>
                <td class="border-b p-2">{{ product.title }}</td>
                <td class="border-b p-2">{{ product.price }}</td>
                <td class="border-b p-2">10 </td>
                <td class="border-b p-2">{{ product.updated_at }}</td>
                <td class="border-b p-2">
                    <Menu as="div" class="relative inline-block text-left">
                        <MenuButton
                            class="inline-flex items-center justify-center w-10 h-10 bg-black bg-opacity-0 text-sm font-medium text-white hover:bg-opacity-5 focus:bg-opacity-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <EllipsisVerticalIcon class="h-5 w-5 text-indigo-500" aria-hidden="true" />
                        </MenuButton>

                        <transition enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0">
                            <MenuItems
                                class="absolute z-10 right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div class="px-1 py-1">
                                    <MenuItem v-slot="{ active }">
                                    <router-link :to="{ name: 'app.products.edit', params: { id: product.id } }" :class="[
                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]">
                                        <PencilIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400"
                                            aria-hidden="true" />
                                        Edit
                                    </router-link>
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                    <button :class="[
                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]" @click="deleteProduct(product)">
                                        <TrashIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400"
                                            aria-hidden="true" />
                                        Delete
                                    </button>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </transition>
                    </Menu>
                </td>


            </tr>

        </tbody>

        <!-- pagination -->

    </table>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import TableHeaderCell from '../../components/core/Tables/TableHeaderCell.vue';
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import Spinner from "../../components/core/Spinner.vue";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
const PRODUCTS_PER_PAGE = 10;

const perPage = ref(PRODUCTS_PER_PAGE);
const search = ref('');
const sortDirection = ref('desc');
const sortField = ref('id');
import store from "../../store";
const product = ref({})

const products = computed(() => store.state.products);

onMounted(() => {
    getProducts();
})
function sortProducts(field) {
    if (field === sortField.value) {
        if (sortDirection.value === 'asc') {
            sortDirection.value = 'desc'
        } else {
            sortDirection.value = 'asc'
        }
    }
    else {
        sortField.value = field;
        sortDirection.value = 'desc';
    }
    getProducts();
}

function getProducts(url = null) {
    store.dispatch("getProducts", {
        url,
        search: search.value,
        per_page: perPage.value,
        sort_field: sortField.value,
        sort_direction: sortDirection.value
    });

}
function deleteProduct(product) {
    if (!confirm(`Are you sure you want to delete the product?`)) {
        return
    }
    store.dispatch('deleteProduct', product.id)
        .then(res => {
            store.commit('showToast', 'Product was successfully deleted');
            store.dispatch('getProducts')
        })
}


</script>

<style lang="scss" scoped></style>