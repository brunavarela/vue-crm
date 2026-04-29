import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "@/layouts/AdminLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      component: () => import("@/pages/LoginPage.vue"),
    },
    {
      path: "/",
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "customers",
          component: () =>
            import("@/modules/customers/pages/CustomerListPage.vue"),
        },
        {
          path: "customers/create",
          component: () =>
            import("@/modules/customers/pages/CustomerCreatePage.vue"),
        },
        {
          path: "customers/:id",
          component: () =>
            import("@/modules/customers/pages/CustomerDetailsPage.vue"),
        },
        {
          path: "customers/:id/edit",
          component: () =>
            import("@/modules/customers/pages/CustomerEditPage.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  if (to.meta.requiresAuth && !isAuthenticated) {
    return "/login";
  }

  if (to.path === "/login" && isAuthenticated) {
    return "/customers";
  }
});

export default router;
