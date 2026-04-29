<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="md:col-span-2">
        <AppInput
          v-model="name"
          label="Nome completo"
          placeholder="Nome do cliente"
          :invalid="!!errors.name"
          :error-message="errors.name"
          required
        />
      </div>

      <div>
        <label
          class="block text-sm font-medium mb-1"
          :style="{ color: 'var(--text-primary)' }"
          >Tipo de pessoa <span class="text-red-500">*</span></label
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
        <AppInput
          v-model="document"
          :label="personType === 'company' ? 'CNPJ' : 'CPF'"
          :placeholder="
            personType === 'company' ? '00.000.000/0001-00' : '000.000.000-00'
          "
          :invalid="!!errors.document"
          :error-message="errors.document"
          required
          @input="onDocumentInput"
        />
      </div>

      <div>
        <AppInput
          v-model="email"
          label="E-mail"
          type="email"
          placeholder="email@exemplo.com"
          :invalid="!!errors.email"
          :error-message="errors.email"
          required
        />
      </div>

      <div>
        <AppInput
          v-model="phone"
          label="Telefone"
          placeholder="(00) 00000-0000"
          :invalid="!!errors.phone"
          :error-message="errors.phone"
          required
          @input="onPhoneInput"
        />
      </div>

      <div>
        <label
          class="block text-sm font-medium mb-1"
          :style="{ color: 'var(--text-primary)' }"
          >Status <span class="text-red-500">*</span></label
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
      <p
        class="text-sm font-semibold mb-3 border-b pb-2 border-[#E5E7EB]"
        :style="{ color: 'var(--text-primary)' }"
      >
        Endereço
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            class="block text-sm font-medium mb-1"
            :style="{ color: 'var(--text-primary)' }"
            >CEP <span class="text-red-500">*</span></label
          >
          <div class="flex gap-2">
            <small
              v-if="zipCodeNotFound"
              class="text-red-500 text-xs mt-1 block"
            >
              CEP não encontrado
            </small>
            <AppInput
              v-model="zipCode"
              placeholder="00000-000"
              :invalid="!!errors.zipCode"
              :error-message="errors.zipCode"
              class="flex-1"
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
        </div>

        <AppInput
          v-model="state"
          label="Estado"
          placeholder="SP"
          :invalid="!!errors.state"
          :error-message="errors.state"
          maxlength="2"
          required
        />

        <AppInput
          v-model="city"
          label="Cidade"
          placeholder="Cidade"
          :invalid="!!errors.city"
          :error-message="errors.city"
          required
        />

        <AppInput
          v-model="district"
          label="Bairro"
          placeholder="Bairro"
          :invalid="!!errors.district"
          :error-message="errors.district"
          required
        />

        <div class="md:col-span-2">
          <AppInput
            v-model="street"
            label="Rua"
            placeholder="Rua / Av."
            :invalid="!!errors.street"
            :error-message="errors.street"
            required
          />
        </div>

        <AppInput
          v-model="number"
          label="Número"
          placeholder="Nº"
          :invalid="!!errors.number"
          :error-message="errors.number"
          required
        />

        <AppInput
          v-model="complement"
          label="Complemento"
          placeholder="Apto, sala, etc."
        />
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
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useToast } from "primevue/usetoast";
import Select from "primevue/select";
import Button from "primevue/button";
import AppInput from "@/shared/components/layout/AppInput.vue";
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
const zipCodeNotFound = ref(false);
const zipCodeChanged = ref(!props.initial?.id);
const zipCodeValidated = ref(false);

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
  zipCodeNotFound.value = false;
  zipCodeValidated.value = false;
  zipCodeChanged.value = true;
}

async function fetchAddress() {
  const digits = (zipCode.value ?? "").replace(/\D/g, "");
  if (digits.length !== 8) return;
  loadingZip.value = true;
  zipCodeNotFound.value = false;
  try {
    const addr = await searchZipCode(digits);
    setValues({
      street: addr.street,
      district: addr.district,
      city: addr.city,
      state: addr.state,
    });
    zipCodeValidated.value = true;
    toast.add({ severity: "success", summary: "CEP encontrado", life: 3000 });
  } catch {
    zipCodeNotFound.value = true;
    zipCodeValidated.value = false;
    toast.add({ severity: "error", summary: "CEP não encontrado", life: 3000 });
  } finally {
    loadingZip.value = false;
  }
}

const handleSubmit = validate((values) => {
  if (zipCodeNotFound.value) {
    toast.add({
      severity: "error",
      summary: "Corrija o CEP antes de salvar",
      life: 3000,
    });
    return;
  }

  if (zipCodeChanged.value && !zipCodeValidated.value) {
    toast.add({
      severity: "error",
      summary: "Busque o CEP antes de salvar",
      life: 3000,
    });
    return;
  }

  emit("submit", values as CreateCustomerPayload);
});
</script>
