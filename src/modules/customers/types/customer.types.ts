export type CustomerStatus = "active" | "inactive" | "blocked";

export type PersonType = "individual" | "company";

export interface Customer {
  id: string;
  name: string;
  personType: PersonType;
  document: string;
  email: string;
  phone: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  status: CustomerStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerFilters {
  search?: string;
  status?: CustomerStatus | null;
}

export type CreateCustomerPayload = Omit<
  Customer,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateCustomerPayload = Partial<CreateCustomerPayload>;

export interface AddressResponse {
  street: string;
  district: string;
  city: string;
  state: string;
}
