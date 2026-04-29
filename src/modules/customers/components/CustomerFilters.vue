<template>
  <div class="flex flex-col lg:flex-row gap-3">
    <Select
      :model-value="status"
      :options="statusOptions"
      option-label="label"
      option-value="value"
      placeholder="Status"
      class="w-full lg:w-52"
      show-clear
      @update:model-value="emit('update:status', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import Select from "primevue/select";

import type { CustomerStatus } from "../types/customer.types";

defineProps<{
  status: CustomerStatus | null;
}>();

const emit = defineEmits<{
  (e: "update:status", value: CustomerStatus | null): void;
}>();

const statusOptions = [
  { label: "Ativo", value: "active" },
  { label: "Inativo", value: "inactive" },
  { label: "Bloqueado", value: "blocked" },
];
</script>
