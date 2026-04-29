import type {
  Customer,
  CustomerFilters,
  CreateCustomerPayload,
  UpdateCustomerPayload,
  AddressResponse,
} from "../types/customer.types";

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

const STORAGE_KEY = "customers_data";

const defaultCustomers: Customer[] = [
  {
    id: "1",
    name: "Vanessa Aquino",
    personType: "individual",
    document: "123.456.789-00",
    email: "vanessa@email.com",
    phone: "(11) 91234-5678",
    zipCode: "01310-100",
    street: "Av. Paulista",
    number: "1000",
    complement: "Apto 42",
    district: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    status: "active",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "2",
    name: "Tech Solutions Ltda",
    personType: "company",
    document: "12.345.678/0001-90",
    email: "contato@techsolutions.com",
    phone: "(21) 3456-7890",
    zipCode: "20040-020",
    street: "Rua da Assembleia",
    number: "55",
    district: "Centro",
    city: "Rio de Janeiro",
    state: "RJ",
    status: "active",
    createdAt: "2024-02-15T09:00:00Z",
    updatedAt: "2024-02-15T09:00:00Z",
  },
  {
    id: "3",
    name: "Luciano Alves",
    personType: "individual",
    document: "987.654.321-00",
    email: "Luciano@email.com",
    phone: "(31) 98765-4321",
    zipCode: "30112-000",
    street: "Av. Afonso Pena",
    number: "200",
    district: "Centro",
    city: "Belo Horizonte",
    state: "MG",
    status: "inactive",
    createdAt: "2024-03-01T14:00:00Z",
    updatedAt: "2024-03-01T14:00:00Z",
  },
  {
    id: "4",
    name: "Ana Paula",
    personType: "individual",
    document: "111.222.333-44",
    email: "ana@email.com",
    phone: "(41) 99887-6655",
    zipCode: "80010-010",
    street: "Rua XV de Novembro",
    number: "800",
    district: "Centro",
    city: "Curitiba",
    state: "PR",
    status: "blocked",
    createdAt: "2024-03-20T08:30:00Z",
    updatedAt: "2024-03-20T08:30:00Z",
  },
];

function loadStore(): Customer[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultCustomers;
  } catch {
    return defaultCustomers;
  }
}

function saveStore(data: Customer[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const store: Customer[] = loadStore();

export async function listCustomers(
  filters?: CustomerFilters,
): Promise<Customer[]> {
  await delay();
  let result = [...store];

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.document.includes(q) ||
        c.email.toLowerCase().includes(q),
    );
  }

  if (filters?.status) {
    result = result.filter((c) => c.status === filters.status);
  }

  return result;
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  await delay();
  return store.find((c) => c.id === id) ?? null;
}

export async function createCustomer(
  payload: CreateCustomerPayload,
): Promise<Customer> {
  await delay();
  const customer: Customer = {
    ...payload,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.push(customer);
  saveStore(store);
  return customer;
}

export async function updateCustomer(
  id: string,
  payload: UpdateCustomerPayload,
): Promise<Customer> {
  await delay();
  const index = store.findIndex((c) => c.id === id);
  if (index === -1) throw new Error("Cliente não encontrado");
  store[index] = {
    ...store[index],
    ...payload,
    updatedAt: new Date().toISOString(),
  };
  saveStore(store);
  return store[index];
}

export async function deleteCustomer(id: string): Promise<void> {
  await delay();
  const index = store.findIndex((c) => c.id === id);
  if (index === -1) throw new Error("Cliente não encontrado");
  store.splice(index, 1);
  saveStore(store);
}

export async function searchZipCode(zipCode: string): Promise<AddressResponse> {
  const digits = zipCode.replace(/\D/g, "");
  const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
  const data = await response.json();
  if (data.erro) throw new Error("CEP não encontrado");
  return {
    street: data.logradouro,
    district: data.bairro,
    city: data.localidade,
    state: data.uf,
  };
}
