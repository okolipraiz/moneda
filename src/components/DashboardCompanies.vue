<template>
  <!-- Fixed layout treemap matching the provided grid -->
  <div class="w-full h-[385px]">
    <div
      v-if="normalizedItems.length > 0"
      class="grid h-full w-full gap-2 overflow-x-auto md:overflow-visible grid-cols-[repeat(28,48px)] md:grid-cols-[repeat(28,minmax(0,1fr))] grid-rows-[repeat(12,32px)] md:grid-rows-[repeat(12,minmax(0,1fr))]"
    >
      <div
        v-for="(item, idx) in normalizedItems"
        :key="idx + '-' + item.name"
        :class="[
          'text-white text-start leading-snug overflow-hidden min-w-0',
          paddingClass(idx),
          colorClasses[idx % colorClasses.length],
        ]"
        :style="tileStyle(idx)"
      >
        <span :class="labelClass(idx)" :title="item.name">
          {{ item.name }}
        </span>
      </div>
    </div>
    <div v-else class="h-full w-full flex items-center justify-center">
      <LoaderIcon color="black" />
    </div>
  </div>
</template>

<script setup>
import { computed, toRef } from "vue";
import LoaderIcon from "@/components/icons/LoaderIcon.vue";

const props = defineProps({
  companies: {
    type: [Array, Object],
    required: true,
  },
});

const companiesRef = toRef(props, "companies");

// Normalize incoming data and keep top 10 by value (if present)
const normalizedItems = computed(() => {
  const raw = Array.isArray(companiesRef.value)
    ? companiesRef.value
    : companiesRef.value?.data ?? [];

  const items = raw
    .map((c) => ({
      name: c?.name ?? c?.title ?? "Unknown",
      value: Number(c?.value ?? c?.amount ?? c?.total ?? c?.count ?? 1) || 1,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 11);

  return items;
});

const colorClasses = [
  "bg-purple-400",
  "bg-rose-400",
  "bg-purple-800",
  "bg-teal-400",
  "bg-sky-600",
  "bg-orange-600",
  "bg-blue-900",
  "bg-orange-500",
  "bg-sky-500",
  "bg-indigo-500",
];

function tileStyle(index) {
  const layouts = [
    // 0 - very large (top-left)
    { colStart: 1, colEnd: 16, rowStart: 1, rowEnd: 7 },
    // 1 - very large (bottom-left)
    { colStart: 1, colEnd: 16, rowStart: 7, rowEnd: 13 },
    // 2 - tall purple block (right side, left segment)
    { colStart: 16, colEnd: 22, rowStart: 1, rowEnd: 9 },
    // 3 - short wide block under tall purple
    { colStart: 16, colEnd: 22, rowStart: 9, rowEnd: 13 },
    // 3 - teal block (top right, first of three equal columns)
    { colStart: 22, colEnd: 26, rowStart: 1, rowEnd: 6 },
    // 4 - small blue (top far right)
    { colStart: 26, colEnd: 29, rowStart: 1, rowEnd: 6 },
    // 5 - orange block (middle right)
    { colStart: 22, colEnd: 26, rowStart: 6, rowEnd: 10 },
    // 6 - dark blue (middle far right)
    { colStart: 26, colEnd: 29, rowStart: 6, rowEnd: 10 },
    // 7 - orange (bottom right left)
    { colStart: 22, colEnd: 24, rowStart: 10, rowEnd: 13 },
    // 8 - light blue (bottom right middle)
    { colStart: 24, colEnd: 26, rowStart: 10, rowEnd: 13 },
    // 9 - blue (bottom right far)
    { colStart: 26, colEnd: 29, rowStart: 10, rowEnd: 13 },
  ];

  const l = layouts[Math.min(index, layouts.length - 1)];
  return {
    gridColumn: `${l.colStart} / ${l.colEnd}`,
    gridRow: `${l.rowStart} / ${l.rowEnd}`,
  };
}

function labelClass(index) {
  if (index === 0 || index === 1) {
    return "block font-semibold text-white text-2xl md:text-[15px] whitespace-normal break-words leading-tight text-start px-6 hyphens-auto";
  }
  if (index === 2) {
    return "block font-semibold text-white text-xl md:text-[15px] whitespace-normal break-words leading-tight text-start px-5 hyphens-auto";
  }
  if (index === 3) {
    return "block font-medium text-white text-[15px] whitespace-normal break-words leading-tight text-start px-4 hyphens-auto";
  }
  return "block font-medium text-white text-[15px] truncate whitespace-nowrap px-3 w-full";
}

function paddingClass(index) {
  if (index === 0 || index === 1) return "px-6 py-8";
  if (index === 2) return "px-5 py-6";
  if (index === 3) return "px-4 py-4";
  return "px-3 py-4";
}
</script>

<style scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>