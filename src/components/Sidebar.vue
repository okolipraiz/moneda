<template>
  <div class="relative text-sm">
    <!-- Dashboard view -->
    <aside
      class="shadow-xs z-50 hidden h-screen bg-monedaBlack text-white transition-all lg:fixed lg:flex lg:w-72 lg:flex-col"
    >
      <div class="pt-16">
        <div class="flex justify-center items-center">
          <img src="/logo.svg" alt="Logo" />
        </div>
      </div>

      <ul
        class="h-[35rem] overflow-y-auto pb-[1rem] pt-[4.5rem] font-medium text-[#666666] px-10"
      >
        <!-- Dashboard Link -->
        <router-link to="/">
          <li
            @mouseenter="hoveredMenu = 'dashboard'"
            @mouseleave="hoveredMenu = null"
            :class="[
              'flex rounded-lg px-4 py-3 items-center justify-center',
              $route.path === '/'
                ? 'bg-monedaOrange text-white'
                : 'hover:bg-monedaOrange hover:text-white',
            ]"
          >
            <div class="mr-3 overflow-hidden transition-all">
              <DashboardIcon
                :color="
                  $route.path === '/' || hoveredMenu === 'dashboard'
                    ? '#ffffff'
                    : '#666666'
                "
              />
            </div>
            <span class="w-32 overflow-hidden transition-all"> Dashboard </span>
          </li>
        </router-link>

        <!-- Transactions Link -->
        <router-link to="/transactions">
          <li
            @mouseenter="hoveredMenu = 'transactions'"
            @mouseleave="hoveredMenu = null"
            :class="[
              'mt-3 flex items-center justify-center rounded-lg px-4 py-3',
              $route.path === '/transactions'
                ? 'bg-monedaOrange text-white'
                : 'hover:bg-monedaOrange hover:text-white',
            ]"
          >
            <div class="mr-3 overflow-hidden transition-all">
              <TransactionIcon
                :color="
                  $route.path === '/transactions' ||
                  hoveredMenu === 'transactions'
                    ? '#ffffff'
                    : '#666666'
                "
              />
            </div>
            <span class="w-32 overflow-hidden transition-all">
              Transactions
            </span>
          </li>
        </router-link>
      </ul>

      <div class="fixed bottom-5 left-14">
        <div class="text-[#666666]">
          <button class="w-full flex items-center justify-center gap-4">
            <img src="/images/icons/logout.svg" alt="transaction icon" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Mobile View -->
    <aside
      class="fixed z-40 flex h-full bg-black transition-all duration-300 ease-in-out lg:hidden"
      :class="isSidebarOpen ? 'w-60' : 'w-0'"
    >
      <div
        class="h-screen pt-16 text-[#374151] transition-all duration-300 ease-in-out"
        :class="isSidebarOpen ? 'mx-6' : 'mx-0'"
        v-if="isSidebarOpen"
      >
        <div class="flex justify-center items-center pt-[6rem]">
          <img src="/logo.svg" alt="Logo" />
        </div>
        <ul class="space-y-5 pt-[3rem] text-start">
          <!-- Dashboard Link -->
          <router-link to="/" @click="closeSidebar">
            <li
              @mouseenter="hoveredMenu = 'dashboard'"
              @mouseleave="hoveredMenu = null"
              :class="[
                'flex rounded-lg px-4 py-3 items-center justify-center',
                $route.path === '/'
                  ? 'bg-monedaOrange text-white'
                  : 'hover:bg-monedaOrange hover:text-white',
              ]"
            >
              <div class="mr-3 overflow-hidden transition-all">
                <DashboardIcon
                  :color="
                    $route.path === '/' || hoveredMenu === 'dashboard'
                      ? '#ffffff'
                      : '#666666'
                  "
                />
              </div>
              <span class="w-32 overflow-hidden transition-all">
                Dashboard
              </span>
            </li>
          </router-link>

          <!-- Transactions Link -->
          <router-link to="/transactions" @click="closeSidebar">
            <li
              @mouseenter="hoveredMenu = 'transactions'"
              @mouseleave="hoveredMenu = null"
              :class="[
                'mt-3 flex items-center justify-center rounded-lg px-4 py-3',
                $route.path === '/transactions'
                  ? 'bg-monedaOrange text-white'
                  : 'hover:bg-monedaOrange hover:text-white',
              ]"
            >
              <div class="mr-3 overflow-hidden transition-all">
                <TransactionIcon
                  :color="
                    $route.path === '/transactions' ||
                    hoveredMenu === 'transactions'
                      ? '#ffffff'
                      : '#666666'
                  "
                />
              </div>
              <span class="w-32 overflow-hidden transition-all">
                Transactions
              </span>
            </li>
          </router-link>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import DashboardIcon from "./icons/DashboardIcon.vue";
import TransactionIcon from "./icons/TransactionIcon.vue";
import { useSidebar } from "@/composables/useSidebar";

const $route = useRoute();
const hoveredMenu = ref(null);
const { isSidebarOpen, closeSidebar } = useSidebar();
</script>
