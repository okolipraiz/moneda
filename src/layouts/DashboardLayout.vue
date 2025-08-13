<script setup>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <Navbar />
  <Sidebar />
  <main
    class="lg:py-30 h-full min-h-screen w-full text-sm pl-5 pr-5 py-32 transition-all lg:min-h-screen lg:pl-80 lg:pr-10"
  >
    <slot />
  </main>
</template>