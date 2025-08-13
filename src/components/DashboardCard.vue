<template>
  <div class="px-6 py-9 rounded-[18px] border-[7px] border-[#E6E6E6]">
    <div class="flex items-center gap-x-3">
      <div>
       <img :src="icon" alt="dashboard icon">
      </div>

      <div>
        <div class="font-medium text-[12px] text-[#665E59]">{{ title }}</div>
        <div class="text-[30px] mt-2 font-medium text-[#140800]">{{ amount || 0 }}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ["title", 'icon', 'amount', 'currency'],

};
</script>