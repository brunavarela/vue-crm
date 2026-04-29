<template>
  <div
    class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
  >
    <div>
      <h1 class="text-3xl font-bold text-slate-900">
        {{ title }}
      </h1>

      <p class="text-sm text-slate-500 mt-1">
        {{ description }}
      </p>
    </div>

    <div class="flex items-center gap-3">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>
