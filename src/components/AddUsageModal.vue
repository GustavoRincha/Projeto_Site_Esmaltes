<template>
  <v-dialog v-model="internalValue" max-width="500px" persistent>
    <v-card class="rounded-xl">
      <v-card-title class="text-h5 bg-primary-lighten text-white font-weight-bold pa-5">
        <v-icon class="mr-2 pb-1">{{ editData ? 'mdi-pencil' : 'mdi-camera-plus' }}</v-icon>
        {{ editData ? 'Editar Resultado' : 'Registrar Resultado' }}
      </v-card-title>
      
      <v-card-text class="pt-6">
        <v-form ref="form" v-model="valid">
          
          <div class="d-flex justify-center mb-6">
            <v-card width="100%" max-width="300" border class="bg-grey-lighten-4 rounded-lg cursor-pointer d-flex align-center justify-center" min-height="180" @click="triggerFileInput">
              <v-img v-if="previewUrl" :src="previewUrl" cover height="180"></v-img>
              <div v-else class="text-center pa-4">
                 <v-icon size="48" color="grey">mdi-camera-plus</v-icon>
                 <div class="text-body-2 text-grey-darken-1 mt-2">Clique para carregar a foto do resultado</div>
              </div>
            </v-card>
          </div>
          
          <v-file-input
            v-show="false"
            ref="fileInput"
            accept="image/png, image/jpeg, image/jpg"
            @change="onFileSelected"
          ></v-file-input>

          <v-autocomplete
            v-model="fields.polishIds"
            :items="polishList"
            item-title="name"
            item-value="id"
            label="Quais esmaltes você usou?"
            variant="outlined"
            density="comfortable"
            color="primary"
            :rules="[v => v && v.length > 0 || 'Você precisa selecionar pelo menos um esmalte']"
            required
            class="mb-2"
            multiple
            chips
            closable-chips
            clearable
          >
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props" :subtitle="item.raw.brand">
                <template v-slot:prepend>
                  <v-avatar size="32" class="mr-3" color="grey-lighten-3">
                    <v-img v-if="item.raw.image" :src="item.raw.image" cover></v-img>
                    <v-icon v-else size="20">mdi-bottle-tonic</v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
            </template>
          </v-autocomplete>

          <v-textarea
            v-model="fields.notes"
            label="Anotações / Como Ficou?"
            variant="outlined"
            density="comfortable"
            color="primary"
            rows="2"
            auto-grow
            class="mb-2"
          ></v-textarea>

          <div class="d-flex flex-column mb-2">
            <span class="text-caption text-grey-darken-1 mb-1">Avaliação do Esmalte</span>
            <v-rating
              v-model="fields.rating"
              hover
              color="amber"
              active-color="amber-darken-1"
              half-increments
              density="compact"
              size="large"
            ></v-rating>
          </div>
          
          <div class="d-flex flex-column mb-0">
            <span class="text-caption text-grey-darken-1 mb-1">Onde foi usado? (Para controle de consumo)</span>
            <v-btn-toggle
              v-model="fields.usageType"
              color="primary"
              variant="outlined"
              mandatory
              class="w-100 flex-wrap"
            >
              <v-btn value="hands" class="flex-grow-1 text-none">Nas Mãos</v-btn>
              <v-btn value="feet" class="flex-grow-1 text-none">Nos Pés</v-btn>
              <v-btn value="both" class="flex-grow-1 text-none">Ambos</v-btn>
            </v-btn-toggle>
          </div>

        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4 bg-grey-lighten-5">
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-2" variant="text" @click="close" rounded="pill" class="px-4 text-capitalize font-weight-medium">
          Cancelar
        </v-btn>
        <v-btn color="primary" variant="flat" :loading="loading" @click="save" rounded="pill" class="px-6 text-capitalize font-weight-bold shadow-soft">
          Salvar Registro
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  modelValue: Boolean,
  editData: {
    type: Object,
    default: null
  }
});
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

const polishList = computed(() => store.getters.allPolishes);

const fields = reactive({
  polishIds: [],
  notes: '',
  rating: 0,
  usageType: 'hands',
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
  
  previewUrl.value = URL.createObjectURL(file);
};

const resetForm = () => {
  fields.polishIds = [];
  fields.notes = '';
  fields.rating = 0;
  fields.usageType = 'hands';
  fields.file = null;
  previewUrl.value = null;
  if (form.value) form.value.resetValidation();
};

watch(internalValue, (newVal) => {
  if (newVal) {
    if (props.editData && Object.keys(props.editData).length > 0) {
      // Suporte para versão velha (polishId) e nova (polishIds)
      const idsToSet = props.editData.polishIds && props.editData.polishIds.length > 0 
        ? [...props.editData.polishIds] 
        : (props.editData.polishId ? [props.editData.polishId] : []);
        
      fields.polishIds = idsToSet;
      fields.notes = props.editData.notes || '';
      fields.rating = props.editData.rating || 0;
      fields.usageType = props.editData.usageType || 'hands';
      fields.file = props.editData.photo ? 'keep' : null;
      previewUrl.value = props.editData.photo || null;
      if (form.value) form.value.resetValidation();
    } else {
      resetForm();
    }
  }
});

const close = () => {
  internalValue.value = false;
};

const save = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;
  
  loading.value = true;
  try {
    if (props.editData && Object.keys(props.editData).length > 0) {
      await store.dispatch('updateUsage', {
        id: props.editData.id,
        polishIds: fields.polishIds,
        notes: fields.notes,
        rating: fields.rating,
        usageType: fields.usageType,
        imageFile: fields.file
      });
    } else {
      await store.dispatch('addUsage', {
        polishIds: fields.polishIds,
        notes: fields.notes,
        rating: fields.rating,
        usageType: fields.usageType,
        imageFile: fields.file
      });
    }
    close();
  } catch (err) {
    console.error(err);
    alert('Erro ao salvar o resultado.');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.shadow-soft {
  box-shadow: 0 4px 12px rgba(216, 27, 96, 0.3) !important;
}
</style>
