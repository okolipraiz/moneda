<template>
  <div>
    <router-link to="/">
      <div class="inline-flex items-center gap-1 text-monedaOrange">
        <i class="iconsax text-xl" icon-name="arrow-left"></i>
        <span class="font-semibold">Back</span>
      </div>
    </router-link>

    <div class="mt-10">
      <h1 class="font-semibold text-lg md:text-[32px]">
        New Procurement Transaction
      </h1>

      <div class="mt-16 max-w-[700px] mx-auto">
        <div class="rounded-[18px] bg-white shadow-md overflow-hidden">
          <div class="bg-[#EFEFEF]">
            <div class="flex items-center space-x-10 gap-8">
              <button
                type="button"
                class="py-4 text-sm font-medium border-b-2 w-full"
                :class="
                  currentStep === 1
                    ? 'text-gray-900 border-monedaOrange'
                    : 'text-gray-500 border-transparent'
                "
              >
                <div class="px-4 gap-2 flex items-center justify-center">
                  <span
                    :class="[
                      'inline-flex rounded-full items-center justify-center',
                      currentStep === 1 ? 'border border-black h-4 w-4' : '',
                    ]"
                  >
                    <span
                      v-if="currentStep === 1"
                      class="h-3 w-3 rounded-full bg-white border"
                    ></span>

                    <img
                      src="/images/icons/check.svg"
                      v-if="currentStep === 2"
                      class="w-5 h-5"
                      alt="check icon"
                    />
                  </span>
                  <span>Awarding Company</span>
                </div>
              </button>

              <button
                type="button"
                class="gap-2 py-4 text-sm font-medium border-b-2 w-full"
                :class="
                  currentStep === 2
                    ? 'text-gray-900 border-monedaOrange'
                    : 'text-gray-500 border-transparent'
                "
              >
                <div class="px-4 gap-2 flex items-center justify-center">
                  <span
                    class="inline-flex h-4 w-4 rounded-full bg-white border border-gray-400 items-center justify-center"
                  >
                    <span
                      v-if="currentStep === 2"
                      class="h-3 w-3 rounded-full border border-black"
                    ></span>
                  </span>
                  <span>Suppliers</span>
                </div>
              </button>
            </div>
          </div>

          <div class="px-6 py-6">
            <form v-if="currentStep === 1" @submit.prevent="goNext">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Awarding Company</label
                  >
                  <select
                    v-model="awarding.awarding_company_id"
                    class="w-full border rounded-md px-3 py-2 text-sm"
                    :disabled="loadingCompanies"
                  >
                    <option value="">Select</option>
                    <option
                      v-for="(item, index) in companies?.data || []"
                      :value="item.id"
                      :key="index"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >No. of previous contracts</label
                  >
                  <select
                    v-model="awarding.previous_transaction"
                    class="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    <option v-for="n in 10" :key="n" :value="n - 1">
                      {{ n - 1 }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Value of contract</label
                  >
                  <div class="grid grid-cols-3 gap-2">
                    <select
                      v-model="awarding.estimated_value_currency"
                      class="border rounded-md px-3 py-2 text-sm text-black"
                    >
                      <option value="usd" selected>USD</option>
                      <option value="eur">EUR</option>
                      <option value="gbp">GBP</option>
                      <option value="ngn">NGN</option>
                    </select>

                    <input
                      v-model.number="awarding.estimated_value"
                      type="number"
                      min="0"
                      class="col-span-2 border rounded-md px-3 py-2 text-sm"
                      placeholder="50000"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Payment Terms</label
                  >
                  <select
                    v-model="awarding.awarding_payment_terms"
                    class="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    <option value="milestone_payment">Milestone Payment</option>
                    <option value="bullet_payment">Bullet Payment</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Incoterms</label
                  >
                  <select
                    v-model="awarding.incoterms"
                    class="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    <option value="Ex-works">Ex-works</option>
                    <option value="FCA">FCA</option>
                    <option value="CPT">CPT</option>
                    <option value="DAT">DAT</option>
                    <option value="FAS">FAS</option>
                    <option value="FOB">FOB</option>
                    <option value="CFR">CFR</option>
                    <option value="CIP">CIP</option>
                    <option value="CIF">CIF</option>
                    <option value="DAP">DAP</option>
                    <option value="DDP">DDP</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Execution Time (days)</label
                  >
                  <input
                    v-model.number="awarding.executionDays"
                    type="number"
                    min="0"
                    class="w-full border rounded-md px-3 py-2 text-sm"
                    placeholder="90"
                  />
                </div>

                <div class="md:col-span-2 md:w-1/2">
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Payment after Invoice (days)</label
                  >
                  <input
                    v-model.number="awarding.payment_after_invoice"
                    type="number"
                    min="0"
                    class="w-full border rounded-md px-3 py-2 text-sm"
                    placeholder="90"
                  />
                </div>
              </div>

              <div class="mt-6">
                <div class="text-[12px] text-gray-600 mb-1">
                  Purchase Order<span class="text-red-700">*</span>
                </div>

                <label for="po-upload" class="block">
                  <div
                    class="md:w-1/3 rounded-[8px] border border-gray-300 bg-white hover:border-monedaOrange transition-colors cursor-pointer"
                  >
                    <div class="px-6 py-5 flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        class="h-6 w-6 text-gray-700"
                        v-if="!awarding.purchase_order"
                      >
                        <path
                          d="M7 18a4 4 0 0 1 0-8c.3-3.4 3-6 6.4-6 3.6 0 6.6 3 6.6 6.6v.2A4.5 4.5 0 0 1 18 18H7z"
                        />
                        <path
                          d="M12 14V9m0 0-2.5 2.5M12 9l2.5 2.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span
                        v-if="!awarding.purchase_order"
                        class="text-[16px] font-medium text-gray-800"
                        >Upload file</span
                      >
                      <span
                        v-if="awarding.purchase_order"
                        class="text-sm text-gray-500 truncate"
                        >{{ awarding.purchase_order?.name }}</span
                      >
                    </div>
                  </div>
                </label>
                <input
                  id="po-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  @change="onFileChange($event, 'purchase_order')"
                  class="sr-only"
                />

                <div class="mt-2 text-[12px] text-gray-500">
                  Max file size <span class="font-semibold">2MB</span> (pdf,
                  docx, pptx, xlsx)
                </div>
                <div
                  v-if="purchaseOrderError"
                  class="mt-1 text-[12px] text-red-600"
                >
                  {{ purchaseOrderError }}
                </div>
              </div>

              <div class="mt-6">
                <div class="text-[12px] text-gray-600 mb-2">
                  Previous Contracts Information
                </div>
                <div
                  class="md:flex items-center gap-4 md:w-[80%] space-y-3 md:space-y-0"
                >
                  <div>
                    <div class="text-[12px] text-gray-600 mb-1">
                      Previous Invoice <span class="text-red-700">*</span>
                    </div>
                    <label for="prev-inv-upload" class="block">
                      <div
                        class="w-full rounded-[8px] border border-gray-300 bg-white hover:border-monedaOrange transition-colors cursor-pointer"
                      >
                        <div class="px-6 py-5 flex items-center gap-3">
                          <svg
                            v-if="!awarding.previous_invoice"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            class="h-6 w-6 text-gray-700"
                          >
                            <path
                              d="M7 18a4 4 0 0 1 0-8c.3-3.4 3-6 6.4-6 3.6 0 6.6 3 6.6 6.6v.2A4.5 4.5 0 0 1 18 18H7z"
                            />
                            <path
                              d="M12 14V9m0 0-2.5 2.5M12 9l2.5 2.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <span
                            v-if="!awarding.previous_invoice"
                            class="text-[16px] font-medium text-gray-800"
                            >Upload file</span
                          >
                          <span
                            v-if="awarding.previous_invoice"
                            class="text-sm text-gray-500 truncate"
                            >{{ awarding.previous_invoice?.name }}</span
                          >
                        </div>
                      </div>
                    </label>
                    <input
                      id="prev-inv-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      @change="onFileChange($event, 'previous_invoice')"
                      class="sr-only"
                    />

                    <div class="mt-2 text-[12px] text-gray-500">
                      Max file size <span class="font-semibold">2MB</span> (pdf,
                      docx, pptx, xlsx)
                    </div>

                    <div
                      v-if="previousInvoiceError"
                      class="mt-1 text-[12px] text-red-600"
                    >
                      {{ previousInvoiceError }}
                    </div>
                  </div>

                  <div>
                    <div class="text-[12px] text-gray-600 mb-1">
                      Bank Statement <span class="text-red-700">*</span>
                    </div>
                    <label for="bank-statement-upload" class="block">
                      <div
                        class="w-full rounded-[8px] border border-gray-300 bg-white hover:border-monedaOrange transition-colors cursor-pointer"
                      >
                        <div class="px-6 py-5 flex items-center gap-3">
                          <svg
                            v-if="!awarding.bank_statement"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            class="h-6 w-6 text-gray-700"
                          >
                            <path
                              d="M7 18a4 4 0 0 1 0-8c.3-3.4 3-6 6.4-6 3.6 0 6.6 3 6.6 6.6v.2A4.5 4.5 0 0 1 18 18H7z"
                            />
                            <path
                              d="M12 14V9m0 0-2.5 2.5M12 9l2.5 2.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <span
                            v-if="!awarding.bank_statement"
                            class="text-[16px] font-medium text-gray-800"
                            >Upload file</span
                          >
                          <span
                            v-if="awarding.bank_statement"
                            class="text-sm text-gray-500 truncate"
                            >{{ awarding.bank_statement?.name }}</span
                          >
                        </div>
                      </div>
                    </label>
                    <input
                      id="bank-statement-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      @change="onFileChange($event, 'bank_statement')"
                      class="sr-only"
                    />
                    <div class="mt-2 text-[12px] text-gray-500">
                      Max file size <span class="font-semibold">2MB</span> (pdf,
                      docx, pptx, xlsx)
                    </div>
                    <div
                      v-if="bankStatementError"
                      class="mt-1 text-[12px] text-red-600"
                    >
                      {{ bankStatementError }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-8 flex items-center justify-center gap-3">
                <button
                  type="button"
                  class="px-4 py-2 rounded-md text-sm"
                  @click="saveDraft"
                >
                  Save
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 rounded-md bg-monedaOrange text-white text-sm disabled:opacity-50"
                  :disabled="!isStep1Valid"
                >
                  Next
                </button>
              </div>
            </form>

            <form v-else @submit.prevent="onSubmit">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Name of Supplier [1]</label
                  >
                  <select
                    v-model="suppliers.soc_name"
                    class="w-full border rounded-md px-3 py-2 text-sm"
                    :disabled="loadingCompanies"
                  >
                    <option value="">Select</option>
                    <option
                      v-for="(item, index) in companies?.data || []"
                      :value="item.name"
                      :key="index"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >No. of previous purchases</label
                  >
                  <select
                    v-model="suppliers.previous_purchase"
                    class="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    <option v-for="n in 20" :key="n" :value="n - 1">
                      {{ n - 1 }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Payment Terms</label
                  >
                  <select
                    v-model="suppliers.payment_terms"
                    class="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    <option value=" upfront_payment">Upfront Payment</option>
                    <option value="milestone_payment">Milestone Payment</option>
                    <option value="deferred_payment">Deferred Payment</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Basis of selection of supplier (Choice)</label
                  >
                  <select
                    v-model="suppliers.basis_of_selection"
                    class="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    <option value="Contractor’s Choice">
                      Contractor’s Choice
                    </option>
                    <option value="Awarding Company’s Choice">
                      Awarding Company’s Choice
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Country</label
                  >
                  <select
                    v-model="suppliers.country"
                    class="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    <option>Nigeria</option>
                    <option>Ghana</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Continent</label
                  >
                  <select
                    v-model="suppliers.continent"
                    class="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    <option>Africa</option>
                    <option>Europe</option>
                    <option>Asia</option>
                    <option>North America</option>
                    <option>South America</option>
                    <option>Oceania</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Supplier's Incoterms</label
                  >
                  <select
                    v-model="suppliers.incoterms"
                    class="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    <option value="ex-works">Ex-Works</option>
                    <option value="fca">FCA</option>
                    <option value="cpt">CPT</option>
                    <option value="dat">DAT</option>
                    <option value="fas">FAS</option>
                    <option value="fob">FOB</option>
                    <option value="cfr">CFR</option>
                    <option value="cip">CIP</option>
                    <option value="cif">CIF</option>
                    <option value="dap">DAP</option>
                    <option value="ddp">DDP</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Procurement Type</label
                  >
                  <select
                    v-model="suppliers.procurement_type"
                    class="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    <option value="bespoke">Bespoke</option>
                    <option value="off_the_shelf">Off-the-shelf</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Delivery Time</label
                  >
                  <input
                    v-model.number="suppliers.delivery_time"
                    type="number"
                    min="0"
                    class="w-full border rounded-md px-3 py-2 text-sm"
                    placeholder="e.g. 4"
                  />
                </div>
              </div>

              <div class="mt-6 text-gray-800 font-semibold">Cost</div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Cost of items</label
                  >
                  <div class="grid grid-cols-3 gap-2">
                    <select
                      v-model="suppliers.item_cost_currency"
                      class="border rounded-md px-3 py-2 text-sm"
                    >
                      <option value="usd">USD</option>
                      <option value="eur">EUR</option>
                      <option value="gbp">GBP</option>
                      <option value="ngn">NGN</option>
                    </select>
                    <input
                      v-model.number="suppliers.item_cost"
                      type="number"
                      min="0"
                      class="col-span-2 border rounded-md px-3 py-2 text-sm"
                      placeholder="50000"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Logistics cost</label
                  >
                  <div class="grid grid-cols-3 gap-2">
                    <select
                      v-model="suppliers.logistics_cost_currency"
                      class="border rounded-md px-3 py-2 text-sm"
                    >
                      <option value="usd">USD</option>
                      <option value="eur">EUR</option>
                      <option value="gbp">GBP</option>
                      <option value="ngn">NGN</option>
                    </select>
                    <input
                      v-model.number="suppliers.logistics_cost"
                      type="number"
                      min="0"
                      class="col-span-2 border rounded-md px-3 py-2 text-sm"
                      placeholder="50000"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Others</label
                  >
                  <div class="grid grid-cols-3 gap-2">
                    <select
                      v-model="suppliers.other_cost_currency"
                      class="border rounded-md px-3 py-2 text-sm"
                    >
                      <option value="usd">USD</option>
                      <option value="eur">EUR</option>
                      <option value="gbp">GBP</option>
                      <option value="ngn">NGN</option>
                    </select>
                    <input
                      v-model.number="suppliers.other_cost"
                      type="number"
                      min="0"
                      class="col-span-2 border rounded-md px-3 py-2 text-sm"
                      placeholder="50000"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-[12px] text-gray-600 mb-1"
                    >Funding Request</label
                  >
                  <div class="grid grid-cols-3 gap-2">
                    <select
                      v-model="suppliers.funding_request_currency"
                      class="border rounded-md px-3 py-2 text-sm"
                    >
                      <option value="usd">USD</option>
                      <option value="eur">EUR</option>
                      <option value="gbp">GBP</option>
                      <option value="ngn">NGN</option>
                    </select>
                    <input
                      v-model.number="suppliers.funding_request"
                      type="number"
                      min="0"
                      class="col-span-2 border rounded-md px-3 py-2 text-sm"
                      placeholder="50000"
                    />
                  </div>
                </div>
              </div>

              <div class="mt-6">
                <div class="text-[12px] text-gray-600 mb-1">
                  Pro-Forma Invoice
                </div>
                <label for="pro-forma-upload" class="block">
                  <div
                    class="md:w-1/3 rounded-[8px] border border-gray-300 bg-white hover:border-monedaOrange transition-colors cursor-pointer"
                  >
                    <div class="px-6 py-5 flex items-center gap-3">
                      <svg
                        v-if="!suppliers.pro_forma_invoice"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        class="h-6 w-6 text-gray-700"
                      >
                        <path
                          d="M7 18a4 4 0 0 1 0-8c.3-3.4 3-6 6.4-6 3.6 0 6.6 3 6.6 6.6v.2A4.5 4.5 0 0 1 18 18H7z"
                        />
                        <path
                          d="M12 14V9m0 0-2.5 2.5M12 9l2.5 2.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span
                        v-if="!suppliers.pro_forma_invoice"
                        class="text-[16px] font-medium text-gray-800"
                        >Upload file</span
                      >
                      <span
                        v-if="suppliers.pro_forma_invoice"
                        class="text-sm text-gray-500 truncate"
                        >{{ suppliers.pro_forma_invoice?.name }}</span
                      >
                    </div>
                  </div>
                </label>
                <input
                  id="pro-forma-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  @change="onFileChange($event, 'pro_forma_invoice')"
                  class="sr-only"
                />
                <div class="mt-2 text-[12px] text-gray-500">
                  Max file size <span class="font-semibold">2MB</span> (pdf,
                  docx, pptx, xlsx)
                </div>
                <div v-if="proFormaError" class="mt-1 text-[12px] text-red-600">
                  {{ proFormaError }}
                </div>
              </div>

              <div class="mt-8 flex items-center justify-center gap-3">
                <button
                  type="button"
                  class="px-4 py-2 rounded-md border text-sm"
                  @click="goBack"
                >
                  Back
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 rounded-md bg-monedaOrange text-white text-sm disabled:opacity-50"
                  :disabled="!isStep2Valid || submitting"
                >
                  {{ submitting ? "Submitting..." : "Submit" }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { baseUrl } from "@/utils";
import { ref, computed, onMounted } from "vue";
import { toast } from "vue-sonner";

const currentStep = ref(1);
const companies = ref({ data: [] });

const loadingCompanies = ref(true);
const companiesError = ref(null);
const purchaseOrderError = ref("");
const previousInvoiceError = ref("");
const bankStatementError = ref("");
const proFormaError = ref("");
const submitting = ref(false);

const awarding = ref({
  awarding_company_id: "",
  previous_transaction: "",
  estimated_value_currency: "usd",
  estimated_value: "",
  awarding_payment_terms: "",
  incoterms: "",
  executionDays: "",
  payment_after_invoice: "",
  purchase_order: null,
  previous_invoice: null,
  bank_statement: null,
});

const suppliers = ref({
  soc_name: "",
  country: "",
  continent: "",
  basis_of_selection: "",
  incoterms: "",
  previous_purchase: "",
  delivery_time: "",
  procurement_type: "",
  payment_terms: "",
  item_cost_currency: "usd",
  item_cost: "",
  logistics_cost_currency: "usd",
  logistics_cost: "",
  other_cost_currency: "usd",
  other_cost: "",
  funding_request_currency: "usd",
  funding_request: "",
  pro_forma_invoice: null,
});

const onFileChange = (event, key) => {
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const file =
    event.target.files && event.target.files[0] ? event.target.files[0] : null;
  if (key === "purchase_order") {
    purchaseOrderError.value = "";
    // 2MB limit and allowed types
    const maxBytes = 2 * 1024 * 1024;

    if (file && file.size > maxBytes) {
      purchaseOrderError.value = "File exceeds 2MB.";
      return;
    }
    if (file && !allowed.includes(file.type)) {
      purchaseOrderError.value = "Unsupported file type.";
      return;
    }
  }
  if (key === "previous_invoice") {
    previousInvoiceError.value = "";
    const maxBytes = 2 * 1024 * 1024;
    if (file && file.size > maxBytes) {
      previousInvoiceError.value = "File exceeds 2MB.";
      return;
    }
    if (file && !allowed.includes(file.type)) {
      previousInvoiceError.value = "Unsupported file type.";
      return;
    }
  }
  if (key === "bank_statement") {
    bankStatementError.value = "";
    const maxBytes = 2 * 1024 * 1024;
    if (file && file.size > maxBytes) {
      bankStatementError.value = "File exceeds 2MB.";
      return;
    }
    if (file && !allowed.includes(file.type)) {
      bankStatementError.value = "Unsupported file type.";
      return;
    }
  }
  if (currentStep.value === 1) {
    awarding.value[key] = file;
  } else {
    // 2MB validation for supplier uploads as well
    if (key === "pro_forma_invoice") {
      proFormaError.value = "";
      const maxBytes = 2 * 1024 * 1024;
      const allowed = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (file && file.size > maxBytes) {
        proFormaError.value = "File exceeds 2MB.";
        return;
      }
      if (file && !allowed.includes(file.type)) {
        proFormaError.value = "Unsupported file type.";
        return;
      }
    }
    suppliers.value[key] = file;
  }
};

const isStep1Valid = computed(() => {
  const a = awarding.value;
  return (
    !!a.awarding_company_id &&
    a.previous_transaction !== "" &&
    a.estimated_value !== "" &&
    !!a.awarding_payment_terms &&
    !!a.incoterms &&
    a.executionDays !== "" &&
    a.payment_after_invoice !== "" &&
    !!a.purchase_order &&
    !!a.previous_invoice &&
    !!a.bank_statement
  );
});

const isStep2Valid = computed(() => {
  const s = suppliers.value;
  return (
    !!s.soc_name &&
    !!s.country &&
    !!s.continent &&
    !!s.basis_of_selection &&
    !!s.incoterms &&
    s.previous_purchase !== "" &&
    s.delivery_time !== "" &&
    !!s.procurement_type &&
    !!s.payment_terms &&
    s.item_cost !== "" &&
    s.logistics_cost !== "" &&
    s.other_cost !== "" &&
    s.funding_request !== "" &&
    !!s.pro_forma_invoice
  );
});

const goNext = () => {
  if (isStep1Valid.value) currentStep.value = 2;
};

const goBack = () => {
  currentStep.value = 1;
};

const saveDraft = () => {
  console.log("Saving draft…", {
    awarding: awarding.value,
    suppliers: suppliers.value,
  });
};

const clearAllInputs = () => {
  // Reset awarding step
  awarding.value = {
    awarding_company_id: "",
    previous_transaction: "",
    estimated_value_currency: "usd",
    estimated_value: "",
    awarding_payment_terms: "",
    incoterms: "",
    executionDays: "",
    payment_after_invoice: "",
    purchase_order: null,
    previous_invoice: null,
    bank_statement: null,
  };

  // Reset suppliers step
  suppliers.value = {
    soc_name: "",
    country: "",
    continent: "",
    basis_of_selection: "",
    incoterms: "",
    previous_purchase: "",
    delivery_time: "",
    procurement_type: "",
    payment_terms: "",
    item_cost_currency: "usd",
    item_cost: "",
    logistics_cost_currency: "usd",
    logistics_cost: "",
    other_cost_currency: "usd",
    other_cost: "",
    funding_request_currency: "usd",
    funding_request: "",
    pro_forma_invoice: null,
  };

  // Reset step to 1
  currentStep.value = 1;

  // Clear any file input errors
  purchaseOrderError.value = "";
  previousInvoiceError.value = "";
  bankStatementError.value = "";
  proFormaError.value = "";
};

const onSubmit = async () => {
  if (!isStep2Valid.value) return;

  const supplierPayload = {
    soc_name: suppliers.value.soc_name,
    country: suppliers.value.country,
    continent: suppliers.value.continent,
    basis_of_selection: suppliers.value.basis_of_selection,
    incoterms: suppliers.value.incoterms,
    previous_purchase: Number(suppliers.value.previous_purchase || 0),
    delivery_time: Number(suppliers.value.delivery_time || 0),
    procurement_type: suppliers.value.procurement_type,
    payment_terms: suppliers.value.payment_terms,
    item_cost_currency: suppliers.value.item_cost_currency,
    item_cost: Number(suppliers.value.item_cost || 0),
    logistics_cost_currency: suppliers.value.logistics_cost_currency,
    logistics_cost: Number(suppliers.value.logistics_cost || 0),
    other_cost_currency: suppliers.value.other_cost_currency,
    other_cost: Number(suppliers.value.other_cost || 0),
    funding_request_currency: suppliers.value.funding_request_currency,
    funding_request: Number(suppliers.value.funding_request || 0),
  };

  const combinedPayload = {
    transaction_type: "procurement",
    estimated_value: Number(awarding.value.estimated_value || 0),
    estimated_value_currency: awarding.value.estimated_value_currency,
    awarding_payment_terms: awarding.value.awarding_payment_terms,
    previous_transaction: Number(awarding.value.previous_transaction || 0),
    awarding_company_id: awarding.value.awarding_company_id,
    duration: Number(awarding.value.executionDays || 0),
    payment_after_invoice: Number(awarding.value.payment_after_invoice || 0),
    incoterms: awarding.value.incoterms,
    supplier_oem_subcontractors: [supplierPayload],
  };

  const formData = new FormData();
  Object.entries(combinedPayload).forEach(([key, value]) => {
    if (Array.isArray(value) || typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value ?? ""));
    }
  });

  if (awarding.value.purchase_order)
    formData.append("purchase_order", awarding.value.purchase_order);
  if (awarding.value.previous_invoice)
    formData.append("previous_invoice", awarding.value.previous_invoice);
  if (awarding.value.bank_statement)
    formData.append("bank_statement", awarding.value.bank_statement);
  if (suppliers.value.pro_forma_invoice) {
    formData.append(
      suppliers.value.soc_name,
      suppliers.value.pro_forma_invoice
    );
  }

  try {
    submitting.value = true;
    const res = await fetch(`${baseUrl}/transaction`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to submit");
    }
    toast.success("Transaction submitted");
    clearAllInputs(); // Call the new function here
  } catch (err) {
    console.error("Submit failed", err);
    toast.error("Submit failed");
  } finally {
    submitting.value = false;
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

onMounted(() => {
  fetchCompanies();
});
</script>
