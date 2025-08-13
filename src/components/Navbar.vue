<template>
  <nav
    class="lg:ml-72 drop-shadow-xs fixed top-0 z-50 w-full border-b bg-white border-[#E6E6E6] px-5 py-6 md:px-10 lg:py-5"
  >
    <div class="flex items-center lg:mr-72 justify-between lg:justify-end">
      <div class="block lg:hidden">
        <button
          class="rounded-lg bg-gray-50 p-1.5 text-black hover:bg-gray-100"
          @click="toggleSidebar()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chevron-last-icon lucide-chevron-last"
          >
            <path d="m7 18 6-6-6-6" />
            <path d="M17 6v12" />
          </svg>
        </button>
      </div>

      <div class="flex lg:justify-end">
        <ul class="flex items-center space-x-4 md:space-x-8">
          <li><i class="iconsax text-2xl" icon-name="bell-1"></i></li>
          <li>
            <span
              class="inline-flex items-center justify-center bg-[#F5F5F5] rounded-full w-10 h-10"
            >
              <i class="iconsax text-2xl" icon-name="user-2"></i>
            </span>
          </li>
          <li class="text-sm font-medium">Company name</li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useSidebar } from '@/composables/useSidebar';

const { toggleSidebar } = useSidebar();
</script>