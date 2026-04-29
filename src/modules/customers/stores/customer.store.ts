import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  Customer,
  CustomerFilters,
  CreateCustomerPayload,
  UpdateCustomerPayload,
} from "../types/customer.types";
import * as service from "../services/customer.service";

export const useCustomerStore = defineStore("customers", () => {
  const customers = ref<Customer[]>([]);
  const selectedCustomer = ref<Customer | null>(null);
  const loading = ref(false);
  const saving = ref(false);
  const filters = ref<CustomerFilters>({});

  async function fetchCustomers() {
    loading.value = true;
    try {
      customers.value = await service.listCustomers(filters.value);
    } finally {
      loading.value = false;
    }
  }

  async function fetchCustomerById(id: string) {
    loading.value = true;
    try {
      selectedCustomer.value = await service.getCustomerById(id);
    } finally {
      loading.value = false;
    }
  }

  async function createCustomer(payload: CreateCustomerPayload) {
    saving.value = true;
    try {
      const customer = await service.createCustomer(payload);
      customers.value.unshift(customer);
      return customer;
    } finally {
      saving.value = false;
    }
  }

  async function updateCustomer(id: string, payload: UpdateCustomerPayload) {
    saving.value = true;
    try {
      const updated = await service.updateCustomer(id, payload);
      const index = customers.value.findIndex((c) => c.id === id);
      if (index !== -1) customers.value[index] = updated;
      return updated;
    } finally {
      saving.value = false;
    }
  }

  async function deleteCustomer(id: string) {
    await service.deleteCustomer(id);
    customers.value = customers.value.filter((c) => c.id !== id);
  }

  function setFilters(f: CustomerFilters) {
    filters.value = f;
  }

  return {
    customers,
    selectedCustomer,
    loading,
    saving,
    filters,
    fetchCustomers,
    fetchCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    setFilters,
  };
});
