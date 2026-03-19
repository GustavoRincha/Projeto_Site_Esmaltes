<template>
  <v-dialog v-model="internalValue" max-width="400px" persistent>
    <v-card class="rounded-xl text-center pb-4 pt-6 px-4">
      <v-icon size="64" color="error" class="mb-4">mdi-alert-circle-outline</v-icon>
      <v-card-title class="text-h6 font-weight-bold pt-0">
        {{ title }}
      </v-card-title>
      <v-card-text class="text-body-1 text-grey-darken-1 mb-4">
        {{ text }}
      </v-card-text>
      
      <v-card-actions class="justify-center">
        <v-btn color="grey-darken-2" variant="text" rounded="pill" class="px-5 text-capitalize font-weight-medium" @click="close">
          Cancelar
        </v-btn>
        <v-btn color="error" variant="flat" rounded="pill" class="px-6 text-capitalize font-weight-bold shadow-soft-error" @click="confirm">
          Apagar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    default: 'Atenção'
  },
  text: {
    type: String,
    default: 'Você tem certeza que deseja apagar?'
  }
});

const emit = defineEmits(['update:modelValue', 'confirm']);

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const close = () => {
  internalValue.value = false;
};

const confirm = () => {
  emit('confirm');
  internalValue.value = false;
};
</script>

<style scoped>
.shadow-soft-error {
  box-shadow: 0 4px 12px rgba(176, 0, 32, 0.25) !important;
}
</style>
