<template >
    <div class="min-h-full bg-gray-200 flex">
      <Sidebar v-if="showSidebar" />
      <div class="flex-1">
        <Navbar @toggle-sidebar="toggleSidebar" />
        <main class="p-6">
        <router-view></router-view>
      </main>
      </div>
    </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';
export default {
  components: {
    Navbar,
    Sidebar,

  },
  data() {
    return {
      showSidebar: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
  },
};

</script>
<style >
    
</style>