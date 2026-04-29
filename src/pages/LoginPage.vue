<template>
  <div
    class="min-h-screen flex items-center justify-center p-4"
    style="background-color: #03202e"
  >
    <div class="w-full max-w-sm">
      <div class="flex items-center justify-center gap-3 mb-8">
        <div
          class="w-10 h-10 rounded-xl flex items-center justify-center"
          style="background-color: #00a5e7"
        >
          <i class="pi pi-building text-white" />
        </div>
        <span class="text-white text-xl font-semibold">AdminPanel</span>
      </div>

      <div class="bg-white rounded-2xl p-8">
        <h1 class="text-lg font-semibold mb-1" style="color: #2a2626">
          Bem-vindo de volta
        </h1>
        <p class="text-sm mb-6 text-gray-500">Faça login para continuar</p>

        <form class="space-y-4" @submit.prevent="onSubmit">
          <AppInput
            v-model="email"
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            :invalid="!!errors.email"
            :error-message="errors.email"
            required
          />

          <AppInput
            v-model="password"
            label="Senha"
            type="password"
            placeholder="••••••••"
            :invalid="!!errors.password"
            :error-message="errors.password"
            required
          />

          <small v-if="loginError" class="text-red-500 text-xs block">{{
            loginError
          }}</small>

          <Button
            label="Entrar"
            type="submit"
            class="w-full mt-2"
            :loading="loading"
            style="background-color: #00a5e7; border-color: #00a5e7"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";
import Button from "primevue/button";
import AppInput from "@/shared/components/layout/AppInput.vue";

const router = useRouter();
const showPassword = ref(false);
const loading = ref(false);
const loginError = ref("");

const schema = yup.object({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
});

const [email] = defineField("email");
const [password] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  loginError.value = "";

  await new Promise((r) => setTimeout(r, 800));

  if (values.email === "admin@email.com" && values.password === "admin123") {
    localStorage.setItem("authenticated", "true");
    router.push("/customers");
  } else {
    loginError.value = "E-mail ou senha incorretos";
    loading.value = false;
  }
});
</script>
