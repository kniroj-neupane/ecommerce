<template>
    <!-- per page,search -->
    <div class="bg-white rounded-lg p-4 mt-2 animate-fade-in-down">
        <div class="flex justify-between pb-2 border-b-2">
            <div class="flex items-center">
                <span class="whitespace-nowrap mr-2">Per Page</span>
                <select
                    class="appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value='100'>100</option>
                </select>
                <span class="ml-3">Found 0 products</span>
            </div>
            <div>
                <input
                    class="appearance-none relative block w-48 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Type to Search products">
            </div>
        </div>
    </div>
    <!-- table -->
    <table class="w-full table-auto">
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
    </table>
</template>

<script setup>
import {ref} from 'vue';
import TableHeaderCell from '../../components/core/Tables/TableHeaderCell.vue';
const sortDirection = ref('desc');
const sortField = ref('id');
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
}

</script>

<style lang="scss" scoped></style>