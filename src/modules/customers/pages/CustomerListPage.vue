<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-xl font-bold text-gray-900">Clientes</h1>
        <p class="text-sm text-gray-500 mt-0.5">
          Gerencie os clientes cadastrados
        </p>
      </div>
      <Button
        label="Novo cliente"
        icon="pi pi-plus"
        @click="router.push('/customers/create')"
      />
    </div>

    <div class="bg-b rounded-xl border border-gray-200 shadow-sm">
      <div class="flex flex-col sm:flex-row gap-3 p-4 border-b border-gray-100">
        <div class="flex-1">
          <AppInput
            v-model="searchQuery"
            placeholder="Buscar por nome, documento ou e-mail..."
            @input="onSearch"
          />
        </div>
        <Select
          v-model="statusFilter"
          :options="statusOptions"
          option-label="label"
          option-value="value"
          placeholder="Todos os status"
          class="w-full sm:w-48"
          show-clear
          @change="onFilterChange"
        />
      </div>

      <DataTable
        :value="store.loading ? skeletonRows : store.customers"
        paginator
        :rows="10"
        :rows-per-page-options="[10, 25, 50]"
        removable-sort
        class="text-sm"
      >
        <template #empty>
          <div
            class="flex flex-col items-center justify-center py-16 text-gray-400"
          >
            <i class="pi pi-users text-4xl mb-3" />
            <p class="font-medium text-gray-600">Nenhum cliente encontrado</p>
            <p class="text-sm mt-1">
              Tente ajustar os filtros ou cadastre um novo cliente
            </p>
          </div>
        </template>

        <Column field="name" header="Nome" sortable>
          <template #body="{ data }">
            <Skeleton v-if="store.loading" width="10rem" height="1rem" />
            <span
              v-else
              class="font-medium"
              :style="{ color: 'var(--text-primary)' }"
              >{{ data.name }}</span
            >
          </template>
        </Column>

        <Column field="document" header="CPF/CNPJ" sortable>
          <template #body="{ data }">
            <Skeleton v-if="store.loading" width="8rem" height="1rem" />
            <span v-else :style="{ color: 'var(--text-primary)' }">{{
              data.document
            }}</span>
          </template>
        </Column>

        <Column field="email" header="E-mail" sortable>
          <template #body="{ data }">
            <Skeleton v-if="store.loading" width="12rem" height="1rem" />
            <span v-else :style="{ color: 'var(--text-primary)' }">{{
              data.email
            }}</span>
          </template>
        </Column>

        <Column field="phone" header="Telefone">
          <template #body="{ data }">
            <Skeleton v-if="store.loading" width="8rem" height="1rem" />
            <span v-else :style="{ color: 'var(--text-primary)' }">{{
              data.phone
            }}</span>
          </template>
        </Column>

        <Column field="city" header="Cidade">
          <template #body="{ data }">
            <Skeleton v-if="store.loading" width="7rem" height="1rem" />
            <span v-else :style="{ color: 'var(--text-primary)' }"
              >{{ data.city }} - {{ data.state }}</span
            >
          </template>
        </Column>

        <Column field="status" header="Status" sortable>
          <template #body="{ data }">
            <Skeleton
              v-if="store.loading"
              width="5rem"
              height="1.5rem"
              border-radius="9999px"
            />
            <Tag
              v-else
              :value="statusLabel[data.status as CustomerStatus]"
              :severity="statusSeverity[data.status as CustomerStatus]"
              rounded
            />
          </template>
        </Column>

        <Column field="createdAt" header="Cadastro" sortable>
          <template #body="{ data }">
            <Skeleton v-if="store.loading" width="6rem" height="1rem" />
            <span
              v-else
              class="text-xs"
              :style="{ color: 'var(--text-secondary)' }"
              >{{ formatDate(data.createdAt) }}</span
            >
          </template>
        </Column>

        <Column header="Ações" style="width: 120px">
          <template #body="{ data }">
            <Skeleton v-if="store.loading" width="5rem" height="1.5rem" />
            <div v-else class="flex items-center gap-1">
              <Button
                icon="pi pi-eye"
                size="small"
                text
                rounded
                severity="secondary"
                v-tooltip.top="'Detalhes'"
                @click="router.push(`/customers/${data.id}`)"
              />
              <Button
                icon="pi pi-pencil"
                size="small"
                text
                rounded
                severity="secondary"
                v-tooltip.top="'Editar'"
                @click="router.push(`/customers/${data.id}/edit`)"
              />
              <Button
                icon="pi pi-trash"
                size="small"
                text
                rounded
                severity="danger"
                v-tooltip.top="'Excluir'"
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Select from "primevue/select";
import Tag from "primevue/tag";
import Skeleton from "primevue/skeleton";
import AppInput from "@/shared/components/layout/AppInput.vue";
import { useCustomerStore } from "../stores/customer.store";
import type { Customer, CustomerStatus } from "../types/customer.types";

const router = useRouter();
const confirm = useConfirm();
const toast = useToast();
const store = useCustomerStore();

const searchQuery = ref("");
const statusFilter = ref<CustomerStatus | null>(null);
let searchTimeout: ReturnType<typeof setTimeout>;

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

const statusOptions = [
  { label: "Ativo", value: "active" },
  { label: "Inativo", value: "inactive" },
  { label: "Bloqueado", value: "blocked" },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR");
}

function onSearch() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    store.setFilters({ search: searchQuery.value, status: statusFilter.value });
    store.fetchCustomers();
  }, 400);
}

function onFilterChange() {
  store.setFilters({ search: searchQuery.value, status: statusFilter.value });
  store.fetchCustomers();
}

function confirmDelete(customer: Customer) {
  confirm.require({
    message: `Deseja excluir o cliente "${customer.name}"? Esta ação não pode ser desfeita.`,
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
          summary: "Cliente excluído com sucesso",
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

onMounted(() => store.fetchCustomers());
</script>
