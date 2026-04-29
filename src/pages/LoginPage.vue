<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-4">
    <div class="w-full max-w-sm">
      <div class="flex items-center justify-center gap-3 mb-8">
        <div
          class="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center"
        >
          <i class="pi pi-building text-white" />
        </div>
        <span class="text-white text-xl font-semibold">AdminPanel</span>
      </div>

      <div class="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h1 class="text-white text-lg font-semibold mb-1">
          Bem-vindo de volta
        </h1>
        <p class="text-slate-400 text-sm mb-6">Faça login para continuar</p>

        <form class="space-y-4" @submit.prevent="onSubmit">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1.5"
              >E-mail</label
            >
            <InputText
              v-model="email"
              type="email"
              class="w-full"
              placeholder="seu@email.com"
              :invalid="!!errors.email"
            />
            <small
              v-if="errors.email"
              class="text-red-400 text-xs mt-1 block"
              >{{ errors.email }}</small
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1.5"
              >Senha</label
            >
            <div class="relative">
              <InputText
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full pr-10"
                placeholder="••••••••"
                :invalid="!!errors.password"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" />
              </button>
            </div>
            <small
              v-if="errors.password"
              class="text-red-400 text-xs mt-1 block"
              >{{ errors.password }}</small
            >
          </div>

          <small v-if="loginError" class="text-red-400 text-xs block -mt-1">{{
            loginError
          }}</small>

          <Button
            label="Entrar"
            type="submit"
            class="w-full mt-2"
            :loading="loading"
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
import InputText from "primevue/inputtext";
import Button from "primevue/button";

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
