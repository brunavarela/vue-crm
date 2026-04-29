<template>
  <aside
    :class="[
      'hidden lg:flex flex-col transition-all duration-400 shrink-0 overflow-hidden min-w-0',
      expanded ? 'w-64' : 'w-16',
    ]"
    style="background-color: #03202e"
    @mouseenter="expanded = true"
    @mouseleave="expanded = false"
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
          expanded ? 'opacity-100 w-auto' : 'opacity-0 w-0',
        ]"
      >
        Painel Administrativo
      </span>
    </div>

    <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
      <router-link
        to="/customers"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
        style="color: rgba(255, 255, 255, 0.6)"
        active-class="!text-white !bg-[#00A5E7]"
      >
        <i class="pi pi-users text-base shrink-0" />
        <span
          :class="[
            'text-sm font-medium whitespace-nowrap transition-all duration-300',
            expanded ? 'opacity-100 w-auto' : 'opacity-0 w-0',
          ]"
        >
          Clientes
        </span>
      </router-link>
    </nav>

    <div
      class="px-2 py-4 space-y-1 overflow-hidden"
      style="border-top: 1px solid rgba(255, 255, 255, 0.08)"
    >
      <div class="flex items-center gap-3 px-2 py-2">
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style="background-color: rgba(255, 255, 255, 0.1)"
        >
          <i class="pi pi-user text-white text-sm" />
        </div>
        <div
          :class="[
            'transition-all duration-300 overflow-hidden',
            expanded ? 'opacity-100 w-auto' : 'opacity-0 w-0',
          ]"
        >
          <p class="text-white text-sm font-medium whitespace-nowrap">Admin</p>
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
          'flex cursor-pointer items-center gap-3 px-3 py-2 w-full rounded-lg transition-colors',
          expanded ? 'justify-start' : 'justify-center',
        ]"
        style="color: rgba(255, 255, 255, 0.4)"
        @mouseenter="
          (e) => ((e.currentTarget as HTMLElement).style.color = '#00A5E7')
        "
        @mouseleave="
          (e) =>
            ((e.currentTarget as HTMLElement).style.color =
              'rgba(255,255,255,0.4)')
        "
        @click="toggleDark"
      >
        <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" class="shrink-0" />
        <span
          :class="[
            'text-sm whitespace-nowrap transition-all duration-300',
            expanded ? 'opacity-100 w-auto' : 'opacity-0 w-0',
          ]"
        >
          {{ isDark ? "Modo claro" : "Modo escuro" }}
        </span>
      </button>

      <button
        :class="[
          'flex items-center gap-3 px-3 py-2 w-full rounded-lg transition-colors cursor-pointer',
          expanded ? 'justify-start' : 'justify-center',
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
            expanded ? 'opacity-100 w-auto' : 'opacity-0 w-0',
          ]"
        >
          Sair
        </span>
      </button>
    </div>
  </aside>

  <div
    v-if="mobileOpen"
    class="fixed inset-0 z-40 bg-black/50 lg:hidden"
    @click="emit('close-mobile')"
  />

  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 shrink-0 overflow-hidden min-w-0 lg:hidden',
      mobileOpen ? 'w-64' : 'w-0',
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
        @click="emit('close-mobile')"
      >
        <i class="pi pi-users text-base shrink-0" />
        <span class="text-sm font-medium whitespace-nowrap">Clientes</span>
      </router-link>
    </nav>

    <div
      class="px-2 py-4 space-y-1"
      style="border-top: 1px solid rgba(255, 255, 255, 0.08)"
    >
      <div class="flex items-center gap-3 px-2 py-2">
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style="background-color: rgba(255, 255, 255, 0.1)"
        >
          <i class="pi pi-user text-white text-sm" />
        </div>
        <div>
          <p class="text-white text-sm font-medium whitespace-nowrap">Admin</p>
          <p
            class="text-xs whitespace-nowrap"
            style="color: rgba(255, 255, 255, 0.4)"
          >
            admin@email.com
          </p>
        </div>
      </div>

      <button
        class="flex items-center gap-3 px-3 py-2 w-full rounded-lg transition-colors justify-start"
        style="color: rgba(255, 255, 255, 0.4)"
        @click="toggleDark"
      >
        <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" class="shrink-0" />
        <span class="text-sm whitespace-nowrap">{{
          isDark ? "Modo claro" : "Modo escuro"
        }}</span>
      </button>

      <button
        class="flex items-center gap-3 px-3 py-2 w-full rounded-lg transition-colors justify-start"
        style="color: rgba(255, 255, 255, 0.4)"
        @click="logout"
      >
        <i class="pi pi-sign-out shrink-0" />
        <span class="text-sm whitespace-nowrap">Sair</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

defineProps<{ mobileOpen: boolean }>();

const emit = defineEmits<{
  "close-mobile": [];
}>();

const router = useRouter();
const expanded = ref(false);
const isDark = ref(localStorage.getItem("theme") === "dark");

if (isDark.value) {
  document.documentElement.classList.add("dark");
}

function toggleDark() {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

function logout() {
  localStorage.removeItem("authenticated");
  router.push("/login");
}
</script>
