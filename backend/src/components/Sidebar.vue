<template>
    <div class="min-w-[160px] w-[160px] min-h-max transition-all bg-teal-800 text-white py-4 px-2">
      <router-link :to="{name: 'app.dashboard'}"
                   class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
        <span class="mr-2 text-gray-300">
          <HomeIcon class="w-5"/>
        </span>
        <span class="text-xs">
          Dashboard
        </span>
      </router-link>
      <!-- Products -->
      <router-link :to="{name: 'app.products'}"
                   class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
        <span class="mr-2 text-gray-300">
          <Bars3Icon class="w-5"/>
        </span>
        <span class="text-xs">
          Products
        </span>
      </router-link>
     
     <!-- Categories -->
     <router-link :to="{name: 'app.categories'}"
                   class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
        <span class="mr-2 text-gray-300">
          <TagIcon class="w-5"/>
        </span>
        <span class="text-xs">
          Categories
        </span>
      </router-link>
      
     
    </div>
  </template>
  
  <script setup>
    
    import {HomeIcon, UserGroupIcon, UsersIcon,Bars3Icon,TagIcon} from '@heroicons/vue/24/outline'
  </script>
  
  <style scoped>
  
  </style>