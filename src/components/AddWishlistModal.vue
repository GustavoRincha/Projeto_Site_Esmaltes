<template>
  <v-dialog v-model="internalValue" max-width="500px" persistent>
    <v-card class="rounded-xl">
      <v-card-title class="text-h5 bg-secondary text-white font-weight-bold pa-5">
        <v-icon class="mr-2 pb-1">mdi-heart-plus</v-icon>
        Novo Desejo
      </v-card-title>
      
      <v-card-text class="pt-6">
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="fields.name"
            label="Nome do Esmalte"
            variant="outlined"
            density="comfortable"
            color="secondary"
            :rules="[v => !!v || 'Nome é obrigatório']"
            required
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="fields.brand"
            label="Marca"
            variant="outlined"
            density="comfortable"
            color="secondary"
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="fields.color"
            label="Cor / Tom (Opcional)"
            variant="outlined"
            density="comfortable"
            color="secondary"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4 bg-grey-lighten-5">
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-2" variant="text" @click="close" rounded="pill" class="px-4 text-capitalize font-weight-medium">
          Cancelar
        </v-btn>
        <v-btn color="secondary" variant="flat" :loading="loading" @click="save" rounded="pill" class="px-6 text-capitalize font-weight-bold shadow-soft">
          Adicionar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useStore } from 'vuex';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
const store = useStore();

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const valid = ref(false);
const form = ref(null);
const loading = ref(false);

const fields = reactive({
  name: '',
  brand: '',
  color: ''
});

const resetForm = () => {
  fields.name = '';
  fields.brand = '';
  fields.color = '';
  if (form.value) form.value.resetValidation();
};

watch(internalValue, (newVal) => {
  if(newVal) resetForm();
});

const close = () => {
  internalValue.value = false;
};

const save = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;
  
  loading.value = true;
  try {
    await store.dispatch('addWishlistItem', {
      name: fields.name,
      brand: fields.brand,
      color: fields.color
    });
    close();
  } catch (err) {
    console.error(err);
    alert('Erro ao salvar o desejo.');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.shadow-soft {
  box-shadow: 0 4px 12px rgba(156, 39, 176, 0.3) !important;
}
</style>
