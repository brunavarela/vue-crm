<template>
  <div
    class="flex h-screen overflow-hidden"
    :style="{ backgroundColor: 'var(--bg-main)' }"
  >
    <AppSidebar
      :mobile-open="mobileSidebarOpen"
      @close-mobile="mobileSidebarOpen = false"
    />

    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <header
        class="flex items-center px-6 py-4 border-b shrink-0 gap-3 transition-colors"
        :style="{
          backgroundColor: 'var(--header-bg)',
          borderColor: 'var(--border-color)',
        }"
      >
        <button
          class="lg:hidden p-2 rounded-md transition-colors"
          :style="{ color: 'var(--text-primary)' }"
          @click="mobileSidebarOpen = !mobileSidebarOpen"
        >
          <i class="pi pi-bars" />
        </button>
        <span
          class="text-sm ml-auto"
          :style="{ color: 'var(--text-secondary)' }"
          >Bem-vindo, Admin</span
        >
      </header>

      <main
        class="flex-1 overflow-y-auto p-6 transition-colors"
        :style="{ backgroundColor: 'var(--bg-main)' }"
      >
        <router-view />
      </main>
    </div>

    <Toast position="top-right" />
    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import AppSidebar from "@/shared/components/layout/AppSidebar.vue";

const mobileSidebarOpen = ref(false);
</script>
