<template>
  <div class="flex h-screen bg-white overflow-hidden">
    <aside
      :class="[
        'hidden lg:flex flex-col transition-all duration-300 shrink-0 overflow-hidden min-w-0',
        sidebarExpanded ? 'w-64' : 'w-16',
      ]"
      style="background-color: #03202e"
      @mouseenter="sidebarExpanded = true"
      @mouseleave="sidebarExpanded = false"
    >
      <div
        class="flex items-center gap-3 px-4 py-5 overflow-hidden"
        style="border-bottom: 1px solid rgba(255, 255, 255, 0.08)"
      >
        <div
          class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style="background-color: #00a5e7"
        >
          <i class="pi pi-building text-white text-sm" />
        </div>
        <span
          :class="[
            'font-semibold text-base whitespace-nowrap transition-all duration-300 text-white',
            sidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0',
          ]"
        >
          AdminPanel
        </span>
      </div>

      <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
        <router-link
          to="/customers"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
          style="color: rgba(255, 255, 255, 0.6)"
          active-class="!text-white"
          :style-active="{ backgroundColor: '#00A5E7' }"
        >
          <i class="pi pi-users text-base shrink-0" />
          <span
            :class="[
              'text-sm font-medium whitespace-nowrap transition-all duration-300',
              sidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0',
            ]"
          >
            Clientes
          </span>
        </router-link>
      </nav>

      <div
        class="px-2 py-4 overflow-hidden"
        style="border-top: 1px solid rgba(255, 255, 255, 0.08)"
      >
        <div class="flex items-center gap-3 px-2">
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style="background-color: rgba(255, 255, 255, 0.1)"
          >
            <i class="pi pi-user text-white text-sm" />
          </div>
          <div
            :class="[
              'transition-all duration-300 overflow-hidden',
              sidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0',
            ]"
          >
            <p class="text-white text-sm font-medium whitespace-nowrap">
              Admin
            </p>
            <p
              class="text-xs whitespace-nowrap"
              style="color: rgba(255, 255, 255, 0.4)"
            >
              admin@email.com
            </p>
          </div>
        </div>
        <button
          :class="[
            'mt-3 flex items-center gap-3 px-3 py-2 w-full rounded-lg transition-colors',
            sidebarExpanded ? 'justify-start' : 'justify-center',
          ]"
          style="color: rgba(255, 255, 255, 0.4)"
          @mouseenter="
            (e) => ((e.currentTarget as HTMLElement).style.color = '#f87171')
          "
          @mouseleave="
            (e) =>
              ((e.currentTarget as HTMLElement).style.color =
                'rgba(255,255,255,0.4)')
          "
          @click="logout"
        >
          <i class="pi pi-sign-out shrink-0" />
          <span
            :class="[
              'text-sm whitespace-nowrap transition-all duration-300',
              sidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0',
            ]"
          >
            Sair
          </span>
        </button>
      </div>
    </aside>

    <div
      v-if="mobileSidebarOpen"
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      @click="mobileSidebarOpen = false"
    />

    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 shrink-0 overflow-hidden min-w-0 lg:hidden',
        mobileSidebarOpen ? 'w-64' : 'w-0',
      ]"
      style="background-color: #03202e"
    >
      <div
        class="flex items-center gap-3 px-4 py-5"
        style="border-bottom: 1px solid rgba(255, 255, 255, 0.08)"
      >
        <div
          class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style="background-color: #00a5e7"
        >
          <i class="pi pi-building text-white text-sm" />
        </div>
        <span class="text-white font-semibold text-base whitespace-nowrap"
          >AdminPanel</span
        >
      </div>

      <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
        <router-link
          to="/customers"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
          style="color: rgba(255, 255, 255, 0.6)"
          active-class="!text-white !bg-[#00A5E7]"
          @click="mobileSidebarOpen = false"
        >
          <i class="pi pi-users text-base shrink-0" />
          <span class="text-sm font-medium whitespace-nowrap">Clientes</span>
        </router-link>
      </nav>

      <div
        class="px-2 py-4"
        style="border-top: 1px solid rgba(255, 255, 255, 0.08)"
      >
        <div class="flex items-center gap-3 px-2">
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style="background-color: rgba(255, 255, 255, 0.1)"
          >
            <i class="pi pi-user text-white text-sm" />
          </div>
          <div>
            <p class="text-white text-sm font-medium whitespace-nowrap">
              Admin
            </p>
            <p
              class="text-xs whitespace-nowrap"
              style="color: rgba(255, 255, 255, 0.4)"
            >
              admin@email.com
            </p>
          </div>
        </div>
        <button
          class="mt-3 flex items-center gap-3 px-3 py-2 w-full rounded-lg transition-colors"
          style="color: rgba(255, 255, 255, 0.4)"
          @click="logout"
        >
          <i class="pi pi-sign-out shrink-0" />
          <span class="text-sm whitespace-nowrap">Sair</span>
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <header
        class="flex items-center px-6 py-4 bg-white border-b border-gray-100 shrink-0 gap-3"
      >
        <button
          class="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          style="color: #2a2626"
          @click="mobileSidebarOpen = !mobileSidebarOpen"
        >
          <i class="pi pi-bars" />
        </button>
        <span class="text-sm ml-auto" style="color: #2a2626"
          >Bem-vindo, Admin</span
        >
      </header>

      <main class="flex-1 overflow-y-auto p-6 bg-gray-50">
        <router-view />
      </main>
    </div>

    <Toast position="top-right" />
    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";

const router = useRouter();
const sidebarExpanded = ref(false);
const mobileSidebarOpen = ref(false);

function logout() {
  localStorage.removeItem("authenticated");
  router.push("/login");
}
</script>
