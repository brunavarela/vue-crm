<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Nome completo *</label
        >
        <InputText
          v-model="name"
          class="w-full"
          :invalid="!!errors.name"
          placeholder="Nome do cliente"
        />
        <small v-if="errors.name" class="text-red-500 text-xs mt-1 block">{{
          errors.name
        }}</small>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Tipo de pessoa *</label
        >
        <Select
          v-model="personType"
          :options="personTypeOptions"
          option-label="label"
          option-value="value"
          class="w-full"
          :invalid="!!errors.personType"
          placeholder="Selecione"
          @change="onPersonTypeChange"
        />
        <small
          v-if="errors.personType"
          class="text-red-500 text-xs mt-1 block"
          >{{ errors.personType }}</small
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ personType === "company" ? "CNPJ" : "CPF" }} *
        </label>
        <InputText
          v-model="document"
          class="w-full"
          :invalid="!!errors.document"
          :placeholder="
            personType === 'company' ? '00.000.000/0001-00' : '000.000.000-00'
          "
          @input="onDocumentInput"
        />
        <small v-if="errors.document" class="text-red-500 text-xs mt-1 block">{{
          errors.document
        }}</small>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >E-mail *</label
        >
        <InputText
          v-model="email"
          class="w-full"
          :invalid="!!errors.email"
          placeholder="email@exemplo.com"
          type="email"
        />
        <small v-if="errors.email" class="text-red-500 text-xs mt-1 block">{{
          errors.email
        }}</small>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Telefone *</label
        >
        <InputText
          v-model="phone"
          class="w-full"
          :invalid="!!errors.phone"
          placeholder="(00) 00000-0000"
          @input="onPhoneInput"
        />
        <small v-if="errors.phone" class="text-red-500 text-xs mt-1 block">{{
          errors.phone
        }}</small>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Status *</label
        >
        <Select
          v-model="status"
          :options="statusOptions"
          option-label="label"
          option-value="value"
          class="w-full"
          :invalid="!!errors.status"
          placeholder="Selecione"
        />
        <small v-if="errors.status" class="text-red-500 text-xs mt-1 block">{{
          errors.status
        }}</small>
      </div>
    </div>

    <div>
      <p class="text-sm font-semibold text-gray-800 mb-3 border-b pb-2">
        Endereço
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >CEP *</label
          >
          <div class="flex gap-2">
            <InputText
              v-model="zipCode"
              class="w-full"
              :invalid="!!errors.zipCode"
              placeholder="00000-000"
              @input="onZipCodeInput"
              @blur="fetchAddress"
            />
            <Button
              icon="pi pi-search"
              :loading="loadingZip"
              outlined
              @click="fetchAddress"
            />
          </div>
          <small
            v-if="errors.zipCode"
            class="text-red-500 text-xs mt-1 block"
            >{{ errors.zipCode }}</small
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Estado *</label
          >
          <InputText
            v-model="state"
            class="w-full"
            :invalid="!!errors.state"
            placeholder="SP"
            maxlength="2"
          />
          <small v-if="errors.state" class="text-red-500 text-xs mt-1 block">{{
            errors.state
          }}</small>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Cidade *</label
          >
          <InputText
            v-model="city"
            class="w-full"
            :invalid="!!errors.city"
            placeholder="Cidade"
          />
          <small v-if="errors.city" class="text-red-500 text-xs mt-1 block">{{
            errors.city
          }}</small>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Bairro *</label
          >
          <InputText
            v-model="district"
            class="w-full"
            :invalid="!!errors.district"
            placeholder="Bairro"
          />
          <small
            v-if="errors.district"
            class="text-red-500 text-xs mt-1 block"
            >{{ errors.district }}</small
          >
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Rua *</label
          >
          <InputText
            v-model="street"
            class="w-full"
            :invalid="!!errors.street"
            placeholder="Rua / Av."
          />
          <small v-if="errors.street" class="text-red-500 text-xs mt-1 block">{{
            errors.street
          }}</small>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Número *</label
          >
          <InputText
            v-model="number"
            class="w-full"
            :invalid="!!errors.number"
            placeholder="Nº"
          />
          <small v-if="errors.number" class="text-red-500 text-xs mt-1 block">{{
            errors.number
          }}</small>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Complemento</label
          >
          <InputText
            v-model="complement"
            class="w-full"
            placeholder="Apto, sala, etc."
          />
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-3 pt-2">
      <Button
        label="Cancelar"
        severity="secondary"
        outlined
        @click="$emit('cancel')"
      />
      <Button
        :label="isEditing ? 'Salvar alterações' : 'Cadastrar cliente'"
        type="submit"
        :loading="saving"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Button from "primevue/button";
import {
  maskCpf,
  maskCnpj,
  maskPhone,
  maskZipCode,
} from "@/shared/utils/masks";
import { searchZipCode } from "../services/customer.service";
import type {
  Customer,
  CreateCustomerPayload,
  UpdateCustomerPayload,
} from "../types/customer.types";

interface Props {
  initial?: Partial<Customer>;
  saving?: boolean;
}

const props = withDefaults(defineProps<Props>(), { saving: false });
const emit = defineEmits<{
  submit: [payload: CreateCustomerPayload | UpdateCustomerPayload];
  cancel: [];
}>();

const toast = useToast();
const loadingZip = ref(false);
const isEditing = ref(!!props.initial?.id);

const schema = yup.object({
  name: yup.string().required("Nome obrigatório").min(3, "Mínimo 3 caracteres"),
  personType: yup
    .string()
    .oneOf(["individual", "company"])
    .required("Tipo obrigatório"),
  document: yup.string().required("Documento obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  phone: yup.string().required("Telefone obrigatório"),
  zipCode: yup.string().required("CEP obrigatório"),
  street: yup.string().required("Rua obrigatória"),
  number: yup.string().required("Número obrigatório"),
  district: yup.string().required("Bairro obrigatório"),
  city: yup.string().required("Cidade obrigatória"),
  state: yup
    .string()
    .required("Estado obrigatório")
    .length(2, "Use a sigla do estado (ex: SP)"),
  status: yup
    .string()
    .oneOf(["active", "inactive", "blocked"])
    .required("Status obrigatório"),
});

const {
  errors,
  handleSubmit: validate,
  defineField,
  setValues,
} = useForm({ validationSchema: schema });

const [name] = defineField("name");
const [personType] = defineField("personType");
const [document] = defineField("document");
const [email] = defineField("email");
const [phone] = defineField("phone");
const [zipCode] = defineField("zipCode");
const [street] = defineField("street");
const [number] = defineField("number");
const [complement] = defineField("complement");
const [district] = defineField("district");
const [city] = defineField("city");
const [state] = defineField("state");
const [status] = defineField("status");

if (props.initial) {
  setValues({
    name: props.initial.name ?? "",
    personType: props.initial.personType ?? "individual",
    document: props.initial.document ?? "",
    email: props.initial.email ?? "",
    phone: props.initial.phone ?? "",
    zipCode: props.initial.zipCode ?? "",
    street: props.initial.street ?? "",
    number: props.initial.number ?? "",
    complement: props.initial.complement ?? "",
    district: props.initial.district ?? "",
    city: props.initial.city ?? "",
    state: props.initial.state ?? "",
    status: props.initial.status ?? "active",
  });
}

const personTypeOptions = [
  { label: "Pessoa Física", value: "individual" },
  { label: "Pessoa Jurídica", value: "company" },
];

const statusOptions = [
  { label: "Ativo", value: "active" },
  { label: "Inativo", value: "inactive" },
  { label: "Bloqueado", value: "blocked" },
];

function onPersonTypeChange() {
  document.value = "";
}

function onDocumentInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value;
  document.value =
    personType.value === "company" ? maskCnpj(raw) : maskCpf(raw);
}

function onPhoneInput(e: Event) {
  phone.value = maskPhone((e.target as HTMLInputElement).value);
}

function onZipCodeInput(e: Event) {
  zipCode.value = maskZipCode((e.target as HTMLInputElement).value);
}

async function fetchAddress() {
  const digits = (zipCode.value ?? "").replace(/\D/g, "");
  if (digits.length !== 8) return;
  loadingZip.value = true;
  try {
    const addr = await searchZipCode(digits);
    setValues({
      street: addr.street,
      district: addr.district,
      city: addr.city,
      state: addr.state,
    });
    toast.add({ severity: "success", summary: "CEP encontrado", life: 3000 });
  } catch {
    toast.add({ severity: "error", summary: "CEP não encontrado", life: 3000 });
  } finally {
    loadingZip.value = false;
  }
}

const handleSubmit = validate((values) => {
  emit("submit", values as CreateCustomerPayload);
});
</script>
