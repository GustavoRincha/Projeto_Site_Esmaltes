<template>
  <v-container class="fill-height d-flex align-center justify-center bg-background" fluid>
    <v-card class="elevation-4 rounded-xl px-2 py-6 w-100" max-width="450">
      <div class="text-center mb-6">
         <v-icon size="64" color="primary">mdi-nail</v-icon>
         <h1 class="text-h4 font-weight-bold text-primary-darken mt-2">NailVibe</h1>
         <p class="text-grey-darken-1 text-subtitle-1">Sua coleção inteligente e compartilhada</p>
      </div>

      <v-card-text>
        <v-alert v-if="errorMsg" type="error" variant="tonal" class="mb-4" closable @click:close="errorMsg = ''">
          {{ errorMsg }}
        </v-alert>
        
        <v-alert v-if="successMsg" type="success" variant="tonal" class="mb-4">
          {{ successMsg }}
        </v-alert>

        <v-form @submit.prevent="handleSubmit" v-model="isFormValid">
          
          <template v-if="isRegistering">
            <v-text-field
              v-model="username"
              label="Nome de Usuário"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              color="primary"
              :rules="[v => !!v || 'Nome de usuário obrigatório', v => !v.includes(' ') || 'Não pode conter espaços']"
              required
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="email"
              label="E-mail"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              type="email"
              color="primary"
              :rules="[v => !!v || 'E-mail é obrigatório', v => /.+@.+\..+/.test(v) || 'E-mail inválido']"
              required
              class="mb-2"
            ></v-text-field>
          </template>

          <template v-else>
            <v-text-field
              v-model="loginIdentifier"
              label="E-mail ou Nome de Usuário"
              prepend-inner-icon="mdi-account-circle"
              variant="outlined"
              color="primary"
              :rules="[v => !!v || 'Preencha seu login']"
              required
              class="mb-2"
            ></v-text-field>
          </template>

          <v-text-field
            v-model="password"
            label="Senha"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            type="password"
            color="primary"
            :rules="passwordRules"
            required
            class="mb-6"
          ></v-text-field>

          <v-btn
            type="submit"
            color="primary"
            size="x-large"
            block
            class="text-none font-weight-bold rounded-lg mb-4"
            :loading="isLoading"
            :disabled="!isFormValid"
            elevation="2"
          >
            {{ isRegistering ? 'Criar minha Conta' : 'Entrar' }}
          </v-btn>
        </v-form>

        <v-divider class="my-4"></v-divider>

        <div class="text-center">
          <span class="text-grey-darken-1">{{ isRegistering ? 'Já possui uma conta?' : 'Primeira vez aqui?' }}</span>
          <v-btn variant="plain" color="secondary" class="text-none font-weight-bold px-1" @click="toggleMode" :ripple="false">
            {{ isRegistering ? 'Faça Login' : 'Cadastre-se' }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const isRegistering = ref(false);
const isFormValid = ref(false);
const isLoading = ref(false);
const username = ref('');
const email = ref('');
const loginIdentifier = ref('');
const password = ref('');
const errorMsg = ref('');
const successMsg = ref('');

const passwordRules = computed(() => {
  if (!isRegistering.value) {
    return [ v => !!v || 'Senha é obrigatória' ];
  }
  return [
    v => !!v || 'Senha é obrigatória',
    v => (v && v.length >= 6) || 'Mínimo de 6 caracteres',
    v => /(?=.*[A-Z])/.test(v) || 'Pelo menos 1 letra maiúscula',
    v => /(?=.*[0-9])/.test(v) || 'Pelo menos 1 número',
    v => /(?=.*[!@#$%^&*])/.test(v) || 'Símbolo especial (!@#$%)'
  ];
});

const toggleMode = () => {
  isRegistering.value = !isRegistering.value;
  errorMsg.value = '';
  successMsg.value = '';
};

const handleSubmit = async () => {
  if (!isFormValid.value) return;
  isLoading.value = true;
  errorMsg.value = '';
  successMsg.value = '';

  try {
    if (isRegistering.value) {
      await store.dispatch('signUp', { email: email.value, password: password.value, username: username.value });
      successMsg.value = 'Conta criada com sucesso! Você já pode entrar usando seu Nome ou E-mail.';
      isRegistering.value = false;
      loginIdentifier.value = username.value;
      password.value = '';
    } else {
      await store.dispatch('signIn', { identifier: loginIdentifier.value, password: password.value });
      router.push('/');
    }
  } catch (error) {
    if (error.message.includes('Invalid login credentials')) {
       errorMsg.value = 'Dados incorretos. A senha está certa?';
    } else if (error.message.includes('already registered')) {
       errorMsg.value = 'Este e-mail já está em uso.';
    } else if (error.message.includes('indisponível')) {
       errorMsg.value = 'Este nome de usuário já foi pego por outra pessoa.';
    } else if (error.message.includes('não encontrado')) {
       errorMsg.value = 'Nenhum perfil encontrado com esse Nome ou E-mail.';
    } else {
       errorMsg.value = error.message || 'Ocorreu um erro inesperado.';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.v-card {
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
}
</style>
