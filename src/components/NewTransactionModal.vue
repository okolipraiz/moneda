<template>
  <teleport to="body">
     <Transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[100] flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black/60"
      ></div>

      <div
        class="relative mx-4 w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl md:px-16 md:py-28"
         @click.stop
      >
        <button
          class="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
          @click="close"
          aria-label="Close"
        >
          <i class="iconsax text-2xl" icon-name="x"></i>
        </button>

        <div class="text-center px-4 pt-4 pb-6">
          <div class="text-[18px] font-medium text-[#140800]">
            Our products were made just for you, select <br class="hidden md:block"> an option below to get started.
          </div>
        
        </div>

        <div class="grid grid-cols-1 gap-4 px-2 sm:grid-cols-3">
          <button
            v-for="opt in options"
            :key="opt.key"
            type="button"
            class="rounded-xl border py-6  text-center transition hover:shadow-sm"
            :class="selected === opt.key ? 'border-black ring-transparent ' : 'border-gray-200'"
            @click="selected = opt.key"
          >
            <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-monedaOrange">
              <img class=" text-xl" :src="opt.icon" />
            </div>
            <div class="font-semibold text-[#140800]">{{ opt.label }}</div>
            <div class="hidden md:block mt-2 text-xs leading-relaxed text-[#A6A6A6]" v-html="opt.description"></div>
          </button>
        </div>

        <div class="mt-8 flex justify-center">
          <button
            class="rounded-md bg-monedaOrange px-6 py-2 font-medium text-white disabled:opacity-60"
            :disabled="!selected"
            @click="next"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </Transition>
  </teleport>
  
</template>

<script setup>
import { toast } from "vue-sonner";
import { ref, watch, computed } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  initial: { type: String, default: null },
});

const emit = defineEmits(["update:modelValue", "submit"]);

const selected = ref(props.initial);

watch(
  () => props.modelValue,
  (open) => {
    if (open && !selected.value) selected.value = props.initial;
  }
);

const options = computed(() => [
  {
    key: "commodities",
    label: "Commodities",
    icon: "/images/icons/commodites.svg",
    description:
      "Support to traders of <br/> essential commodities in <br/> the energy industry.",
  },
  {
    key: "procurement",
    label: "Procurement",
    icon: "/images/icons/pro.svg",
    description:
      "Supply of equipments <br/> with funding and <br/> execution capacity.",
  },
  {
    key: "services",
    label: "Services",
    icon: "/images/icons/service.svg",
    description:
      "Support operation,<br/> installation and <br/> maintenance contracts.",
  },
]);

function close() {
  emit("update:modelValue", false);
}

function next() {
  if (selected.value === "commodities") {
    toast.warning("Commodities page coming soon...")
  } else if (selected.value === "procurement") {
     close(); 
    router.push("/transactions")
  } else if (selected.value === "services") {
     toast.warning("Serivce page coming soon...")
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.scale-enter-from,
.scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>

