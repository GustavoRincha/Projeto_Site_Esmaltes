<template>
  <v-container class="px-md-8 py-md-8">
    <div class="d-flex align-center justify-space-between mb-4 mt-4">
      <h1 class="text-h4 font-weight-bold text-primary-darken">Minhas Unhas</h1>
      <v-btn 
        color="primary" 
        prepend-icon="mdi-camera-plus" 
        rounded="pill" 
        elevation="4"
        class="text-none font-weight-bold shadow-soft"
        @click="isModalOpen = true"
      >
        Nova Foto
      </v-btn>
    </div>

    <!-- Dashboard Statistics -->
    <v-row class="mb-6">
      <!-- Last Used Polish -->
      <v-col cols="12" md="5">
        <v-card class="rounded-xl h-100" elevation="2">
          <v-card-title class="bg-primary-lighten text-white font-weight-bold py-3 px-4">
            <v-icon left>mdi-history</v-icon> Último Utilizado
          </v-card-title>
          <v-card-text class="pt-6 d-flex flex-column align-center text-center" v-if="lastUsed">
            <v-avatar size="80" class="mb-3 bg-grey-lighten-3 elevation-2">
              <v-img v-if="lastUsed.polish && lastUsed.polish.image" :src="lastUsed.polish.image" cover></v-img>
              <v-icon v-else size="40" color="grey">mdi-bottle-tonic</v-icon>
            </v-avatar>
            <div class="text-h6 font-weight-bold text-secondary">{{ lastUsed.polish ? lastUsed.polish.name : 'Apagado' }}</div>
            <div class="text-body-2 text-grey-darken-1">{{ lastUsed.polish ? lastUsed.polish.brand : '' }}</div>
            <div class="text-caption mt-2 text-primary font-weight-bold">{{ formatDate(lastUsed.usageDate) }}</div>
          </v-card-text>
          <v-card-text class="pt-6 text-center text-grey" v-else>
            Nenhum esmalte utilizado ainda.
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Top Used Polishes Chart -->
      <v-col cols="12" md="7">
        <v-card class="rounded-xl h-100" elevation="2">
          <v-card-title class="bg-secondary text-white font-weight-bold py-3 px-4">
            <v-icon left>mdi-chart-bar</v-icon> Mais Utilizados
          </v-card-title>
          <v-card-text class="pt-4 px-2 px-sm-6">
            <template v-if="stats.length > 0">
              <div v-for="(stat, idx) in stats.slice(0, 5)" :key="stat.polishId" class="mb-4">
                <div class="d-flex justify-space-between mb-1">
                  <span class="text-body-2 font-weight-medium truncate">{{ stat.polishName }}</span>
                  <span class="text-caption font-weight-bold text-primary">{{ stat.count }} uso(s)</span>
                </div>
                <v-progress-linear
                  :model-value="maxUses > 0 ? (stat.count / maxUses) * 100 : 0"
                  color="primary-lighten"
                  height="10"
                  rounded
                ></v-progress-linear>
              </div>
            </template>
            <div v-else class="text-center text-grey py-6">
              Registre suas fotos para ver as estatísticas!
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Gallery Grid -->
    <h2 class="text-h5 font-weight-bold text-primary-darken mb-4 mt-8">Galeria</h2>
    <v-row v-if="usages.length === 0" justify="center" class="mt-4">
      <v-col cols="12" class="text-center">
        <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-image-off-outline</v-icon>
        <h3 class="text-h6 text-grey-darken-1">Nenhuma foto salva.</h3>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="usage in usages" :key="usage.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="mx-auto rounded-xl hover-card h-100 d-flex flex-column" elevation="2" hover>
          <v-img
            v-if="usage.photo"
            :src="usage.photo"
            height="250"
            cover
            class="bg-grey-lighten-4"
          ></v-img>
          
          <v-sheet v-else height="250" class="d-flex align-center justify-center bg-grey-lighten-4">
             <v-icon size="64" color="grey-lighten-2">mdi-camera-off-outline</v-icon>
          </v-sheet>

          <v-card-text class="flex-grow-1 pt-4 pb-2">
             <div class="text-caption text-grey-darken-1 mb-1">{{ formatDate(usage.date) }}</div>
             <div class="text-body-1 font-weight-bold text-secondary mb-1">
               Esmalte: {{ getPolishName(usage.polishId) }}
             </div>
             <p v-if="usage.notes" class="text-body-2 text-grey-darken-3 mt-2 font-italic border-s-sm pl-2">
               {{ usage.notes }}
             </p>
          </v-card-text>
          
          <v-card-actions class="px-4 pb-4 pt-0">
            <v-spacer></v-spacer>
            <v-btn color="error" variant="text" icon="mdi-delete" @click="deleteUsage(usage.id)"></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal Adição -->
    <AddUsageModal v-model="isModalOpen" />

    <!-- Modal Confirmação de Exclusão -->
    <ConfirmDeleteModal 
      v-model="isDeleteDialogOpen"
      title="Apagar Registro?"
      text="A foto e o registro deste uso serão apagados para sempre. Quer continuar?"
      @confirm="executeDelete"
    />
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment';
import AddUsageModal from '../components/AddUsageModal.vue';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.vue';

const store = useStore();
const isModalOpen = ref(false);

const usages = computed(() => store.getters.allUsages);
const stats = computed(() => store.getters.usageStats);
const lastUsed = computed(() => store.getters.lastUsedPolish);

const maxUses = computed(() => {
  if (stats.value.length === 0) return 1;
  return stats.value[0].count; // Already sorted
});

const getPolishName = (id) => {
  const polish = store.getters.allPolishes.find(p => p.id === id);
  return polish ? polish.name : 'Misterioso';
};

const formatDate = (dateString) => {
  return moment(dateString).format('DD/MM/YYYY');
};

const isDeleteDialogOpen = ref(false);
const usageToDelete = ref(null);

const deleteUsage = (id) => {
  usageToDelete.value = id;
  isDeleteDialogOpen.value = true;
};

const executeDelete = () => {
  if (usageToDelete.value) {
    store.dispatch('deleteUsage', usageToDelete.value);
    usageToDelete.value = null;
  }
};
</script>

<style scoped>
.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}
.hover-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.12) !important;
}
.shadow-soft {
  box-shadow: 0 8px 16px rgba(216, 27, 96, 0.25) !important;
}
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;
}
</style>
