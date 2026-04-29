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
          Detalhes do cliente
        </h1>
        <p class="text-sm" :style="{ color: 'var(--text-secondary)' }">
          Informações cadastradas
        </p>
      </div>
    </div>

    <div v-if="store.loading" class="space-y-4">
      <Skeleton
        v-for="i in 4"
        :key="i"
        height="4rem"
        class="w-full rounded-xl"
      />
    </div>

    <div
      v-else-if="!store.selectedCustomer"
      class="text-center py-16"
      :style="{ color: 'var(--text-secondary)' }"
    >
      <i class="pi pi-exclamation-circle text-4xl mb-3 block" />
      <p class="font-medium" :style="{ color: 'var(--text-primary)' }">
        Cliente não encontrado
      </p>
    </div>

    <template v-else>
      <Card class="mb-4">
        <template #content>
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-4">
              <div
                class="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center"
              >
                <i class="pi pi-user text-indigo-600 text-2xl" />
              </div>
              <div>
                <h2
                  class="text-lg font-bold"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  {{ store.selectedCustomer.name }}
                </h2>
                <p class="text-sm" :style="{ color: 'var(--text-secondary)' }">
                  {{ store.selectedCustomer.email }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <Tag
                :value="statusLabel[store.selectedCustomer.status]"
                :severity="statusSeverity[store.selectedCustomer.status]"
                rounded
              />
              <Button
                icon="pi pi-pencil"
                label="Editar"
                size="small"
                outlined
                @click="
                  router.push(`/customers/${store.selectedCustomer.id}/edit`)
                "
              />
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="field in personalFields" :key="field.label">
              <p
                class="text-xs font-medium uppercase tracking-wider"
                :style="{ color: 'var(--text-secondary)' }"
              >
                {{ field.label }}
              </p>
              <p
                class="text-sm font-medium mt-0.5"
                :style="{ color: 'var(--text-primary)' }"
              >
                {{ field.value }}
              </p>
            </div>
          </div>
        </template>
      </Card>

      <Card>
        <template #title>
          <span
            class="text-base font-semibold"
            :style="{ color: 'var(--text-primary)' }"
          >
            Endereço
          </span>
        </template>
        <template #content>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="field in addressFields" :key="field.label">
              <p
                class="text-xs font-medium uppercase tracking-wider"
                :style="{ color: 'var(--text-secondary)' }"
              >
                {{ field.label }}
              </p>
              <p
                class="text-sm font-medium mt-0.5"
                :style="{ color: 'var(--text-primary)' }"
              >
                {{ field.value || "—" }}
              </p>
            </div>
          </div>
        </template>
      </Card>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "primevue/button";
import Card from "primevue/card";
import Tag from "primevue/tag";
import Skeleton from "primevue/skeleton";
import { useCustomerStore } from "../stores/customer.store";
import type { CustomerStatus } from "../types/customer.types";

const route = useRoute();
const router = useRouter();
const store = useCustomerStore();

const statusLabel: Record<CustomerStatus, string> = {
  active: "Ativo",
  inactive: "Inativo",
  blocked: "Bloqueado",
};

const statusSeverity: Record<CustomerStatus, string> = {
  active: "success",
  inactive: "secondary",
  blocked: "danger",
};

const personalFields = computed(() => {
  const c = store.selectedCustomer;
  if (!c) return [];
  return [
    {
      label: "Tipo",
      value:
        c.personType === "individual" ? "Pessoa Física" : "Pessoa Jurídica",
    },
    {
      label: c.personType === "individual" ? "CPF" : "CNPJ",
      value: c.document,
    },
    { label: "Telefone", value: c.phone },
    {
      label: "Cadastro",
      value: new Date(c.createdAt).toLocaleDateString("pt-BR"),
    },
    {
      label: "Atualização",
      value: new Date(c.updatedAt).toLocaleDateString("pt-BR"),
    },
  ];
});

const addressFields = computed(() => {
  const c = store.selectedCustomer;
  if (!c) return [];
  return [
    { label: "CEP", value: c.zipCode },
    { label: "Rua", value: c.street },
    { label: "Número", value: c.number },
    { label: "Complemento", value: c.complement },
    { label: "Bairro", value: c.district },
    { label: "Cidade", value: c.city },
    { label: "Estado", value: c.state },
  ];
});

onMounted(() => store.fetchCustomerById(route.params.id as string));
</script>
