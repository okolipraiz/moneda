<template>
  <DefaultLayout>
     <Toaster position="bottom-right" richColors/>
    <router-view />
  </DefaultLayout>
  
</template>

<script setup>
import { Toaster } from 'vue-sonner'
import DefaultLayout from "@/layouts/DashboardLayout.vue";
</script>

<style scoped></style>
