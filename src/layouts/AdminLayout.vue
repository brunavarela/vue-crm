<!-- layouts/AdminLayout.vue -->

<template>
  <div class="h-screen bg-slate-50 overflow-hidden">
    <!-- HEADER -->
    <AppHeader
      :search="search"
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @update:search="handleSearch"
    />

    <!-- BODY -->
    <div class="flex h-[calc(100vh-64px)] pt-16">
      <!-- SIDEBAR -->
      <AppSidebar :open="sidebarOpen" @close="sidebarOpen = false" />

      <!-- CONTENT -->
      <main
        class="flex-1 overflow-y-auto p-4 lg:p-6 transition-all duration-300"
      >
        <router-view />
      </main>
    </div>

    <Toast position="top-right" />
    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { useRoute, useRouter } from "vue-router";

import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";

import AppSidebar from "@/shared/components/layout/AppSidebar.vue";
import AppHeader from "@/shared/components/layout/AppHeader.vue";

const route = useRoute();
const router = useRouter();

const sidebarOpen = ref(false);

const search = computed({
  get: () => route.query.search?.toString() || "",

  set: (value: string) => {
    router.replace({
      query: {
        ...route.query,
        search: value || undefined,
      },
    });
  },
});

function handleSearch(value: string) {
  search.value = value;
}
</script>
