import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Transactions from "@/views/Transactions.vue"
import NotFound from "@/views/NotFound.vue";

const routes = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/transactions", name: "Transactions", component: Transactions },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
