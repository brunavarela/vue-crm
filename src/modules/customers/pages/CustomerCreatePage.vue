<template>
  <div class="max-w-3xl mx-auto">
    <div class="flex items-center gap-3 mb-6">
      <Button
        icon="pi pi-arrow-left"
        text
        rounded
        severity="secondary"
        @click="router.push('/customers')"
      />
      <div>
        <h1 class="text-xl font-bold" :style="{ color: 'var(--text-primary)' }">
          Novo cliente
        </h1>
        <p class="text-sm mt-0.5" :style="{ color: 'var(--text-secondary)' }">
          Preencha os dados para cadastrar
        </p>
      </div>
    </div>

    <div
      class="rounded-xl border shadow-sm p-6"
      :style="{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }"
    >
      <CustomerForm
        :saving="store.saving"
        @submit="handleSubmit"
        @cancel="router.push('/customers')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import CustomerForm from "../components/CustomerForm.vue";
import { useCustomerStore } from "../stores/customer.store";
import type {
  CreateCustomerPayload,
  UpdateCustomerPayload,
} from "../types/customer.types";

const router = useRouter();
const toast = useToast();
const store = useCustomerStore();

async function handleSubmit(
  payload: CreateCustomerPayload | UpdateCustomerPayload,
) {
  try {
    await store.createCustomer(payload as CreateCustomerPayload);
    toast.add({
      severity: "success",
      summary: "Cliente cadastrado com sucesso",
      life: 3000,
    });
    router.push("/customers");
  } catch {
    toast.add({
      severity: "error",
      summary: "Erro ao cadastrar cliente",
      life: 3000,
    });
  }
}
</script>
