<template>
  <header
    class="fixed top-0 left-0 right-0 z-40 h-16 bg-white border-b border-slate-200 px-4 lg:px-6 flex items-center gap-4"
  >
    <button
      class="lg:hidden w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition"
      @click="$emit('toggle-sidebar')"
    >
      <i class="pi pi-bars text-slate-600" />
    </button>

    <div class="flex-1 max-w-2xl">
      <IconField class="w-full">
        <InputIcon class="pi pi-search" />

        <InputText
          :model-value="search"
          placeholder="Buscar..."
          class="w-full"
          @update:model-value="handleSearch"
        />
      </IconField>
    </div>
  </header>
</template>

<script setup lang="ts">
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";

defineProps<{
  search: string;
}>();

const emit = defineEmits<{
  (e: "toggle-sidebar"): void;
  (e: "update:search", value: string): void;
}>();

function handleSearch(value: string) {
  emit("update:search", value);
}
</script>
