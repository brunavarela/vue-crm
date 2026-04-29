<template>
  <div class="flex flex-col gap-6">
    <AppPageHeader
      title="Clientes"
      description="Gerencie os clientes cadastrados"
    >
      <Button
        label="Novo cliente"
        icon="pi pi-plus"
        class="w-full lg:w-auto"
        @click="router.push('/customers/create')"
      />
    </AppPageHeader>

    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div class="p-4 border-b border-slate-200">
        <CustomerFilters :status="statusFilter" @update:status="handleStatus" />
      </div>

      <DataTable
        :value="store.loading ? skeletonRows : store.customers"
        paginator
        :rows="10"
        responsiveLayout="scroll"
        :rows-per-page-options="[10, 25, 50]"
        removable-sort
        class="text-sm"
      >
        <template #empty>
          <div
            class="flex flex-col items-center justify-center py-16 text-slate-400"
          >
            <i class="pi pi-users text-4xl mb-3" />

            <p class="font-medium text-slate-600">Nenhum cliente encontrado</p>

            <p class="text-sm mt-1">Tente ajustar os filtros</p>
          </div>
        </template>

        <Column field="name" header="Nome" sortable>
          <template #body="{ data }">
            <Skeleton v-if="store.loading" width="10rem" height="1rem" />

            <span v-else class="font-medium text-slate-900 whitespace-nowrap">
              {{ data.name }}
            </span>
          </template>
        </Column>

        <Column field="document" header="CPF/CNPJ" sortable>
          <template #body="{ data }">
            <Skeleton v-if="store.loading" width="8rem" height="1rem" />

            <span v-else class="text-slate-600 whitespace-nowrap">
              {{ data.document }}
            </span>
          </template>
        </Column>

        <Column field="email" header="E-mail" sortable>
          <template #body="{ data }">
            <Skeleton v-if="store.loading" width="12rem" height="1rem" />

            <span v-else class="text-slate-600 whitespace-nowrap">
              {{ data.email }}
            </span>
          </template>
        </Column>

        <Column field="phone" header="Telefone">
          <template #body="{ data }">
            <Skeleton v-if="store.loading" width="8rem" height="1rem" />

            <span v-else class="text-slate-600 whitespace-nowrap">
              {{ data.phone }}
            </span>
          </template>
        </Column>

        <Column field="city" header="Cidade">
          <template #body="{ data }">
            <Skeleton v-if="store.loading" width="7rem" height="1rem" />

            <span v-else class="text-slate-600 whitespace-nowrap">
              {{ data.city }} - {{ data.state }}
            </span>
          </template>
        </Column>

        <Column field="status" header="Status" sortable>
          <template #body="{ data }">
            <Tag
              :value="statusLabel[data.status]"
              :severity="statusSeverity[data.status]"
              rounded
            />
          </template>
        </Column>

        <Column field="createdAt" header="Cadastro" sortable>
          <template #body="{ data }">
            <span class="text-slate-500 text-xs whitespace-nowrap">
              {{ formatDate(data.createdAt) }}
            </span>
          </template>
        </Column>

        <Column header="Ações">
          <template #body="{ data }">
            <div class="flex items-center gap-1">
              <Button
                icon="pi pi-eye"
                size="small"
                text
                rounded
                severity="secondary"
                @click="router.push(`/customers/${data.id}`)"
              />

              <Button
                icon="pi pi-pencil"
                size="small"
                text
                rounded
                severity="secondary"
                @click="router.push(`/customers/${data.id}/edit`)"
              />

              <Button
                icon="pi pi-trash"
                size="small"
                text
                rounded
                severity="danger"
                @click="confirmDelete(data)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";

import { useRouter, useRoute } from "vue-router";

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Tag from "primevue/tag";
import Skeleton from "primevue/skeleton";

import AppPageHeader from "@/shared/components/layout/AppPageHeader.vue";

import CustomerFilters from "../components/CustomerFilters.vue";

import { useCustomerStore } from "../stores/customer.store";

import type { Customer, CustomerStatus } from "../types/customer.types";

const router = useRouter();
const route = useRoute();

const confirm = useConfirm();
const toast = useToast();

const store = useCustomerStore();

const statusFilter = ref<CustomerStatus | null>(null);

const searchQuery = computed(() => {
  return route.query.search?.toString() || "";
});

const skeletonRows = Array(5).fill({});

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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR");
}

function handleStatus(value: CustomerStatus | null) {
  statusFilter.value = value;
}

watch(
  [searchQuery, statusFilter],
  () => {
    store.setFilters({
      search: searchQuery.value,
      status: statusFilter.value,
    });

    store.fetchCustomers();
  },
  {
    immediate: true,
  },
);

function confirmDelete(customer: Customer) {
  confirm.require({
    message: `Deseja excluir o cliente "${customer.name}"?`,
    header: "Confirmar exclusão",
    icon: "pi pi-trash",

    rejectLabel: "Cancelar",
    acceptLabel: "Excluir",

    acceptClass: "p-button-danger",

    accept: async () => {
      try {
        await store.deleteCustomer(customer.id);

        toast.add({
          severity: "success",
          summary: "Cliente excluído",
          life: 3000,
        });
      } catch {
        toast.add({
          severity: "error",
          summary: "Erro ao excluir cliente",
          life: 3000,
        });
      }
    },
  });
}
</script>
