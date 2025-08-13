<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <!-- Logo -->
        <div class="flex justify-center">
          <div class="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
        
        <!-- 404 Text -->
        <h1 class="mt-6 text-9xl font-bold text-gray-900">404</h1>
        <h2 class="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h2>
        
        <!-- Description -->
        <p class="mt-4 text-lg text-gray-600 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
        </p>
      </div>
      
      <!-- Action Buttons -->
      <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/"
          class="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Go to Dashboard
        </router-link>
        
        <button
          @click="goBack"
          class="flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go Back
        </button>
      </div>
      
      <!-- Additional Help -->
      <div class="mt-12 text-center">
        <p class="text-sm text-gray-500">
          Need help? Contact our support team or check out our
          <router-link to="/" class="text-orange-600 hover:text-orange-500 font-medium">
            documentation
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push('/');
  }
};
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.min-h-screen {
  animation: fadeInUp 0.6s ease-out;
}
</style>
