<template>
  <div
    v-if="open"
    class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
    @click="$emit('close')"
  />

  <aside
    :class="[
      'fixed top-16 left-0 bottom-0 z-50 flex flex-col border-r border-slate-800 bg-[#0f172a] transition-all duration-300',
      open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      collapsed ? 'w-24' : 'w-72',
    ]"
  >
    <div
      class="h-16 min-h-16 px-4 border-b border-slate-800 flex items-center justify-between"
    >
      <div class="flex items-center gap-3 overflow-hidden">
        <div
          class="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shrink-0"
        >
          <i class="pi pi-users text-white text-sm" />
        </div>

        <div v-if="!collapsed" class="overflow-hidden">
          <h1 class="text-white font-bold text-base truncate">CustomerHub</h1>

          <p class="text-slate-400 text-xs truncate">Painel Administrativo</p>
        </div>
      </div>

      <button
        class="hidden lg:flex w-9 h-9 rounded-xl items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition shrink-0"
        @click="toggleCollapse"
      >
        <i :class="collapsed ? 'pi pi-angle-right' : 'pi pi-angle-left'" />
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto p-4">
      <p
        v-if="!collapsed"
        class="mb-4 px-3 text-[11px] uppercase tracking-[0.2em] text-slate-500"
      >
        Gestão
      </p>

      <router-link
        to="/customers"
        class="group flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-300 transition-all duration-200 hover:bg-slate-800"
        active-class="bg-indigo-600 text-white shadow-lg"
      >
        <i class="pi pi-users shrink-0 text-base" />

        <span v-if="!collapsed" class="text-sm font-medium"> Clientes </span>
      </router-link>
    </nav>

    <div class="border-t border-slate-800 p-4">
      <div class="flex items-center gap-3">
        <div
          class="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0"
        >
          <i class="pi pi-user text-white text-sm" />
        </div>

        <div v-if="!collapsed" class="flex-1 overflow-hidden">
          <p class="truncate text-sm font-semibold text-white">Admin</p>

          <p class="truncate text-xs text-slate-400">admin@email.com</p>
        </div>

        <button
          class="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 transition hover:bg-red-500/20 hover:text-red-400 shrink-0"
          @click="logout"
        >
          <i class="pi pi-sign-out" />
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "toggle-collapse", value: boolean): void;
}>();

const router = useRouter();

const collapsed = ref(false);

function toggleCollapse() {
  collapsed.value = !collapsed.value;

  emit("toggle-collapse", collapsed.value);
}

function logout() {
  localStorage.removeItem("authenticated");

  router.push("/login");
}
</script>
