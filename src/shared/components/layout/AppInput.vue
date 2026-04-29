<template>
  <div class="flex flex-col gap-1">
    <label
      v-if="label"
      class="text-sm font-medium"
      :style="{ color: 'var(--text-primary)' }"
    >
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <input
        v-bind="$attrs"
        :value="modelValue"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all border"
        :class="[
          invalid
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
            : 'focus:border-[#00A5E7] focus:ring-[rgba(0,165,231,0.2)]',
          disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white',
          'focus:ring-2',
        ]"
        :style="
          invalid
            ? 'color: var(--text-primary); background-color: var(--bg-surface);'
            : 'border-color: #E5E7EB; color: var(--text-primary); background-color: var(--bg-surface);'
        "
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        @blur="emit('blur')"
      />

      <button
        v-if="type === 'password'"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        @click="togglePassword"
      >
        <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" />
      </button>
    </div>

    <small v-if="errorMessage" class="text-red-500 text-xs">{{
      errorMessage
    }}</small>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  invalid?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  invalid: false,
  disabled: false,
  required: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  blur: [];
}>();

const showPassword = ref(false);

const inputType = computed(() => {
  if (props.type !== "password") return props.type;
  return showPassword.value ? "text" : "password";
});

function togglePassword() {
  showPassword.value = !showPassword.value;
}
</script>
