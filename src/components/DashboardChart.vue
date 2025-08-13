<template>
  <div class="w-full h-full">
    <div class="font-medium text-lg mb-4">Transaction by product</div>
    <div class="flex flex-col items-center justify-center">
      <div class="relative" :style="{ width: `${size}px`, height: `${size}px` }">
        <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
          <g :transform="`rotate(-90 ${center} ${center})`">
            <circle
              :cx="center"
              :cy="center"
              :r="radius"
              :stroke-width="thickness"
              class="text-gray-100"
              fill="transparent"
              stroke="currentColor"
            />
            <circle
              v-for="(seg, i) in segments"
              :key="i"
              :cx="center"
              :cy="center"
              :r="radius"
              fill="transparent"
              :stroke="seg.color"
              :stroke-width="thickness"
              :stroke-dasharray="`${seg.length} ${circumference - seg.length}`"
              :stroke-dashoffset="-seg.offset"
              stroke-linecap="butt"
            />
          </g>
        </svg>
      </div>

      <div class="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
        <div v-for="legend in legendItems" :key="legend.key" class="flex items-center gap-3">
          <span class="inline-block rounded w-4 h-4" :style="{ backgroundColor: legend.color }"></span>
          <div class="text-[#4B4B4B]">
            <div class="font-medium capitalize">{{ legend.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
 </template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  size: {
    type: Number,
    default: 280,
  },
  thickness: {
    type: Number,
    default: 50,
  },
});

const size = computed(() => props.size);
const thickness = computed(() => props.thickness);
const center = computed(() => size.value / 2);
const radius = computed(() => (size.value - thickness.value) / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);

const colorMap = {
  procurement: "#CC5500",
  commodities: "#007ACC",
  services: "#4D3626",
};

const normalized = computed(() => {
  const values = (props.items || []).map((i) => ({
    key: String(i?.transaction_type || "unknown").toLowerCase(),
    label: String(i?.transaction_type || "Unknown"),
    value: Number.parseFloat(i?.count ?? 0) || 0,
  }));
  return values.filter((v) => v.value > 0);
});

const totalValue = computed(() => normalized.value.reduce((s, v) => s + v.value, 0));

const segments = computed(() => {
  if (totalValue.value <= 0) return [];
  let offset = 0;
  return normalized.value.map((n, idx) => {
    const length = (n.value / totalValue.value) * circumference.value;
    const seg = {
      length,
      offset,
      color: colorMap[n.key] || ["#FF8A00", "#0A78CC", "#4B362C"][idx % 3],
    };
    offset += length;
    return seg;
  });
});

function formatCurrency(n) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
  } catch (e) {
    return `$${Math.round(n).toLocaleString()}`;
  }
}

const legendItems = computed(() =>
  normalized.value.map((n, idx) => ({
    key: n.key,
    label: n.label,
    value: n.value,
    formatted: formatCurrency(n.value),
    color: colorMap[n.key] || ["#FF8A00", "#0A78CC", "#4B362C"][idx % 3],
  }))
);
</script>

<style scoped>
svg text { user-select: none; }
</style>


