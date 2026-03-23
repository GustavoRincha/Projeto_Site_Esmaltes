<template>
  <v-dialog v-model="internalValue" max-width="500px" persistent>
    <v-card class="rounded-xl">
      <v-card-title class="text-h5 bg-primary-lighten text-white font-weight-bold pa-5">
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
            color="primary"
            :rules="[v => !!v || 'Nome é obrigatório']"
            required
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="fields.brand"
            label="Marca"
            variant="outlined"
            density="comfortable"
            color="primary"
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="fields.color"
            label="Nome da Cor (Ex: Vermelho Escuro)"
            variant="outlined"
            density="comfortable"
            color="primary"
            class="mb-2"
          ></v-text-field>

          <v-menu v-model="colorMenu" :close-on-content-click="false" location="bottom">
            <template v-slot:activator="{ props }">
               <v-text-field
                 v-model="fields.hexColor"
                 v-bind="props"
                 label="Tom Visual Exato (Opcional)"
                 variant="outlined"
                 density="comfortable"
                 color="primary"
                 prepend-inner-icon="mdi-palette-swatch"
                 readonly
                 class="mb-2"
                 clearable
               >
                 <template v-slot:append>
                    <v-avatar :color="fields.hexColor || 'transparent'" size="30" class="border"></v-avatar>
                 </template>
               </v-text-field>
            </template>
            <v-card>
               <v-card-text class="pa-0">
                  <v-color-picker v-model="fields.hexColor" mode="hex" hide-inputs elevation="0"></v-color-picker>
               </v-card-text>
               <v-card-actions>
                 <v-spacer></v-spacer>
                 <v-btn color="primary" variant="text" @click="colorMenu = false">Pronto</v-btn>
               </v-card-actions>
            </v-card>
          </v-menu>

          <v-row class="mb-2 mt-0">
            <v-col cols="12" sm="6" class="py-0">
               <v-select
                 v-model="fields.finish"
                 :items="finishOptions"
                 label="Acabamento"
                 variant="outlined"
                 density="comfortable"
                 color="primary"
                 clearable
               ></v-select>
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
               <v-select
                 v-model="fields.colorFamily"
                 :items="colorFamilyOptions"
                 label="Família de Cor"
                 variant="outlined"
                 density="comfortable"
                 color="primary"
                 clearable
               ></v-select>
            </v-col>
          </v-row>

          <v-divider class="mb-4 mt-2"></v-divider>
          <div class="text-subtitle-2 text-grey-darken-1 font-weight-bold mb-3">Ciclo de Vida (Opcional)</div>
          
          <v-row class="mb-2">
            <v-col cols="12" sm="6" class="py-0">
               <v-text-field
                 v-model="fields.expirationDate"
                 label="Data de Validade"
                 type="date"
                 variant="outlined"
                 density="comfortable"
                 color="primary"
                 clearable
               ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
               <v-text-field
                 v-model="fields.volume"
                 label="Volume Total"
                 type="number"
                 suffix="ml"
                 variant="outlined"
                 density="comfortable"
                 color="primary"
                 clearable
               ></v-text-field>
            </v-col>
          </v-row>

        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4 bg-grey-lighten-5">
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-2" variant="text" @click="close" rounded="pill" class="px-4 text-capitalize font-weight-medium">
          Cancelar
        </v-btn>
        <v-btn color="primary" variant="flat" :loading="loading" @click="save" rounded="pill" class="px-6 text-capitalize font-weight-bold shadow-soft">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.shadow-soft {
  box-shadow: 0 4px 12px rgba(216, 27, 96, 0.3) !important;
}
</style>

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
const colorMenu = ref(false);

const fields = reactive({
  name: '',
  brand: '',
  color: '',
  hexColor: null,
  finish: null,
  colorFamily: null,
  expirationDate: null,
  volume: null,
  file: null
});

const finishOptions = [
  'Cremoso', 'Cintilante', 'Fosco', 'Glitter', 'Metálico', 'Translúcido', 'Efeito Gel'
];

const colorFamilyOptions = [
  'Tons de Vermelho/Rosa', 'Nudes/Marrons', 'Escuros/Pretos', 'Tons Frios (Azul/Verde)', 'Vibrantes/Neons', 'Claros/Brancos', 'Outros'
];

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
  fields.hexColor = null;
  fields.finish = null;
  fields.colorFamily = null;
  fields.expirationDate = null;
  fields.volume = null;
  fields.file = null;
  previewUrl.value = null;
  colorMenu.value = false;
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
      hexColor: fields.hexColor,
      finish: fields.finish,
      colorFamily: fields.colorFamily,
      expirationDate: fields.expirationDate,
      volume: fields.volume,
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
