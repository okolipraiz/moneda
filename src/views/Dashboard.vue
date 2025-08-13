<template>
  <div class="flex items-center justify-between">
    <h1 class="font-semibold text-[32px]">Dashboard</h1>
    <button
      class="flex items-center bg-monedaOrange px-3 py-2 rounded-md text-white gap-x-1 font-medium"
      @click="isNewTxnModalOpen = true"
    >
      <i class="iconsax text-sm" icon-name="add-circle"></i>
      <span>New Transaction</span>
    </button>
  </div>

  <div class="mt-20">
    <div class="grid grid-cols-1 gap-6 text-start lg:grid-cols-4 items-stretch">
      <div class="lg:col-span-1">
        <div
          class="py-6 px-6 rounded-[18px] h-full bg-gradient-to-b from-[#140800] to-[#7A3100]"
        >
          <div class="text-white font-semibold mb-4">Top OEMs/Suppliers</div>

          <div
            class="space-y-4 h-[200px] overflow-y-auto"
            v-if="!loadingSummary"
          >
            <div
              v-for="(soc, index) in summary.data.soc_summary?.slice(0, 3)"
              :key="index"
              class="bg-white rounded-full px-4 py-3 flex items-center justify-between text-[12px]"
            >
              <div class="text-gray-800">{{ soc.name }}</div>
              <div class="text-orange-600 font-semibold">
                ${{ soc.value_usd }}0
              </div>
            </div>
          </div>

          <div v-if="loadingSummary" class="flex justify-center my-20 md:mt-24">
            <LoaderIcon color="white" />
          </div>
        </div>
      </div>

      <div class="lg:col-span-3 h-full">
        <div class="grid grid-cols-1 gap-4 text-start lg:grid-cols-3">
          <DashboardCard
            title="Total Transaction"
            :amount="summary.data.total_transaction"
            icon="/images/icons/icon_1.svg"
          />
          <DashboardCard
            title="Transactions value"
            :amount="`$${Math.round(
              (summary.data?.transaction_value ?? 0) / 1000
            )}k`"
            icon="/images/icons/icon_2.svg"
          />
          <DashboardCard
            title="Transactions costs"
            :amount="`$${Math.round(
              (summary.data?.transaction_cost ?? 0) / 1000
            )}k`"
            icon="/images/icons/icon_3.svg"
          />
          <DashboardCard
            title="Disburstments"
            :amount="`$${Math.round(
              (summary.data?.total_disbursement ?? 0) / 1000
            )}k`"
            icon="/images/icons/icon_4.svg"
          />
          <DashboardCard
            title="Gross profitability"
            :amount="`$${Number(summary.data?.gross_profitability ?? 0).toFixed(
              1
            )}k`"
            icon="/images/icons/icon_5.svg"
          />
          <DashboardCard
            title="Avg. Execution time"
            :amount="`${Math.round(
              Number(summary.data?.avg_execution_time ?? 0)
            )}`"
            icon="/images/icons/icon_6.svg"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="mt-10">
    <div class="grid grid-cols-1 gap-6 text-start lg:grid-cols-6 items-stretch">
      <div class="md:col-span-2 h-full">
        <div class="border rounded-lg p-4">
          <DashboardChart
            :items="summary.data.transaction_type_summary || []"
          />
        </div>
      </div>

      <div class="md:col-span-4 h-full">
        <div class="font-medium text-lg mb-2">
          Transaction by awarding companies
        </div>
        <div class="border rounded-lg p-2">
          <DashboardCompanies :companies="companies" />
        </div>
      </div>
    </div>
  </div>

  <NewTransactionModal v-model="isNewTxnModalOpen" @submit="handleNewTxn" />
</template>


<script setup>
import { ref, onMounted } from "vue";
import DashboardCard from "@/components/DashboardCard.vue";
import DashboardCompanies from "@/components/DashboardCompanies.vue";
import DashboardChart from "@/components/DashboardChart.vue";
import NewTransactionModal from "@/components/NewTransactionModal.vue";
import LoaderIcon from "@/components/icons/LoaderIcon.vue";
import { baseUrl } from "@/utils";

const summary = ref({ data: {} });
const companies = ref({ data: [] });

const loadingSummary = ref(true);
const loadingCompanies = ref(true);

const summaryError = ref(null);
const companiesError = ref(null);

const fetchSummary = async () => {
  try {
    loadingSummary.value = true;
    const res = await fetch(`${baseUrl}/summary`);
    if (!res.ok) throw new Error("Failed to fetch");
    summary.value = await res.json();

    console.log("Fetched companies:", companies.value);
  } catch (err) {
    summaryError.value = err.message;
  } finally {
    loadingSummary.value = false;
  }
};

const fetchCompanies = async () => {
  try {
    loadingCompanies.value = true;
    const res = await fetch(`${baseUrl}/awarding-company`);
    if (!res.ok) throw new Error("Failed to fetch");
    companies.value = await res.json();
    
    console.log("Fetched companies:", companies.value);
  } catch (err) {
    companiesError.value = err.message;
  } finally {
    loadingCompanies.value = false;
  }
};

const isNewTxnModalOpen = ref(false);

const handleNewTxn = (type) => {
  if (type === "procurement") {
    isNewTxnModalOpen.value = false;
  }
};

onMounted(() => {
  fetchSummary();
  fetchCompanies();
});
</script>


