<template>
  <v-dialog v-model="internalValue" max-width="500px" persistent>
    <v-card class="rounded-xl">
      <v-card-title class="text-h5 bg-pink-lighten-5 text-pink-darken-4 font-weight-bold pa-5">
        <v-icon class="mr-2 pb-1">mdi-plus-circle</v-icon>
        Adicionar Novo Esmalte
      </v-card-title>
      
      <v-card-text class="pt-6">
        <v-form ref="form" v-model="valid">
          
          <div class="d-flex justify-center mb-6">
            <v-avatar size="100" class="bg-grey-lighten-4 elevation-2 cursor-pointer" @click="triggerFileInput">
              <v-img v-if="previewUrl" :src="previewUrl" cover></v-img>
              <v-icon v-else size="40" color="grey">mdi-camera-plus</v-icon>
            </v-avatar>
          </div>
          
          <v-file-input
            v-show="false"
            ref="fileInput"
            accept="image/png, image/jpeg, image/jpg"
            @change="onFileSelected"
          ></v-file-input>

          <v-text-field
            v-model="fields.name"
            label="Nome do Esmalte"
            variant="outlined"
            density="comfortable"
            color="pink-darken-1"
            :rules="[v => !!v || 'Nome é obrigatório']"
            required
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="fields.brand"
            label="Marca"
            variant="outlined"
            density="comfortable"
            color="pink-darken-1"
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="fields.color"
            label="Cor / Tom"
            variant="outlined"
            density="comfortable"
            color="pink-darken-1"
          ></v-text-field>

        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4 bg-grey-lighten-5">
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-2" variant="text" @click="close" rounded="pill" class="px-4 text-capitalize">
          Cancelar
        </v-btn>
        <v-btn color="pink-darken-1" variant="flat" :loading="loading" @click="save" rounded="pill" class="px-6 text-capitalize">
          Salvar
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
const fileInput = ref(null);
const loading = ref(false);
const previewUrl = ref(null);

const fields = reactive({
  name: '',
  brand: '',
  color: '',
  file: null
});

const triggerFileInput = () => {
  fileInput.value.$el.querySelector('input').click();
};

const onFileSelected = (event) => {
  const files = event.target.files || event.dataTransfer?.files;
  if (!files || !files.length) return;
  
  const file = files[0];
  fields.file = file;
  
  // Create preview
  previewUrl.value = URL.createObjectURL(file);
};

const resetForm = () => {
  fields.name = '';
  fields.brand = '';
  fields.color = '';
  fields.file = null;
  previewUrl.value = null;
  if (form.value) form.value.resetValidation();
};

// Reset on open
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
    await store.dispatch('addNailPolish', {
      name: fields.name,
      brand: fields.brand,
      color: fields.color,
      imageFile: fields.file
    });
    close();
  } catch (err) {
    console.error(err);
    alert('Erro ao salvar o esmalte.');
  } finally {
    loading.value = false;
  }
};
</script>
