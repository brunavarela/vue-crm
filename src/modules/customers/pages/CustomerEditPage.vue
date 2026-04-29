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
          Editar cliente
        </h1>
        <p class="text-sm mt-0.5" :style="{ color: 'var(--text-secondary)' }">
          Atualize os dados do cliente
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
      <div v-if="store.loading" class="space-y-4">
        <Skeleton v-for="i in 6" :key="i" height="2.5rem" class="w-full" />
      </div>

      <div
        v-else-if="!store.selectedCustomer"
        class="text-center py-12"
        :style="{ color: 'var(--text-secondary)' }"
      >
        <i class="pi pi-exclamation-circle text-4xl mb-3 block" />
        <p class="font-medium">Cliente não encontrado</p>
      </div>

      <CustomerForm
        v-else
        :initial="store.selectedCustomer"
        :saving="store.saving"
        @submit="handleSubmit"
        @cancel="router.push('/customers')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import CustomerForm from "../components/CustomerForm.vue";
import { useCustomerStore } from "../stores/customer.store";
import type { UpdateCustomerPayload } from "../types/customer.types";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const store = useCustomerStore();

const id = route.params.id as string;

async function handleSubmit(payload: UpdateCustomerPayload) {
  try {
    await store.updateCustomer(id, payload);
    toast.add({
      severity: "success",
      summary: "Cliente atualizado com sucesso",
      life: 3000,
    });
    router.push("/customers");
  } catch {
    toast.add({
      severity: "error",
      summary: "Erro ao atualizar cliente",
      life: 3000,
    });
  }
}

onMounted(() => store.fetchCustomerById(id));
</script>
