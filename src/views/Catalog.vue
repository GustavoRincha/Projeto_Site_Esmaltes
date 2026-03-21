<template>
  <v-container class="px-md-8 py-md-8">
    
    <div class="d-flex align-center justify-space-between mb-4 mt-4">
      <h1 class="text-h4 font-weight-bold text-primary-darken">Coleção</h1>
      <v-btn 
        color="primary" 
        prepend-icon="mdi-plus" 
        rounded="pill" 
        elevation="4"
        class="text-none font-weight-bold shadow-soft"
        @click="isModalOpen = true"
      >
        Novo Esmalte
      </v-btn>
    </div>

    <!-- Filtro de Busca -->
    <v-row class="mb-2">
      <v-col cols="12" md="8" lg="6">
        <v-text-field
          v-model="searchQuery"
          label="Buscar por nome ou cor..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          color="primary"
          hide-details
          clearable
          bg-color="white"
          class="rounded-lg shadow-sm"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4" lg="6" class="d-flex align-center">
        <v-btn variant="tonal" color="primary" class="rounded-lg text-none px-4" @click="showAdvancedFilters = !showAdvancedFilters">
          <v-icon left class="mr-2">mdi-filter-variant</v-icon> {{ showAdvancedFilters ? 'Ocultar Filtros' : 'Filtros Avançados' }}
        </v-btn>
      </v-col>
    </v-row>

    <!-- Filtros Avançados Expansíveis -->
    <v-expand-transition>
      <v-row v-show="showAdvancedFilters" class="mb-6">
         <v-col cols="12" lg="8">
           <v-card class="pa-5 bg-primary-lighten-4 rounded-xl shadow-sm border" elevation="0">
             <div class="text-subtitle-2 font-weight-bold text-primary-darken mb-3">Refinar Busca</div>
             <v-row>
                <v-col cols="12" sm="6">
                   <v-select
                     v-model="filterFinish"
                     :items="finishOptions"
                     label="Filtrar por Acabamento"
                     variant="outlined"
                     density="compact"
                     bg-color="white"
                     hide-details
                     clearable
                   ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                   <v-select
                     v-model="filterColorFamily"
                     :items="colorFamilyOptions"
                     label="Filtrar por Família de Cor"
                     variant="outlined"
                     density="compact"
                     bg-color="white"
                     hide-details
                     clearable
                   ></v-select>
                </v-col>
             </v-row>
           </v-card>
         </v-col>
      </v-row>
    </v-expand-transition>

    <!-- Empty State -->
    <v-row v-if="filteredPolishes.length === 0" justify="center" class="mt-6">
      <v-col cols="12" sm="8" md="6" class="text-center">
        <v-icon size="80" color="grey-lighten-1" class="mb-4">
          {{ allPolishes.length === 0 ? 'mdi-flask-empty-outline' : 'mdi-magnify-remove-outline' }}
        </v-icon>
        <h3 class="text-h6 text-grey-darken-1">
          {{ allPolishes.length === 0 ? 'Nenhum esmalte cadastrado.' : 'Nenhum esmalte encontrado.' }}
        </h3>
        <p class="text-body-1 text-grey" v-if="allPolishes.length === 0">Clique em "Novo Esmalte" para começar sua coleção!</p>
        <p class="text-body-1 text-grey" v-else>Tente buscar por outro termo.</p>
      </v-col>
    </v-row>

    <!-- Galeria -->
    <v-row v-else>
      <v-col 
        v-for="polish in paginatedPolishes" 
        :key="polish.id" 
        cols="12" 
        sm="6" 
        md="4" 
        lg="3"
      >
        <v-card class="mx-auto rounded-xl hover-card d-flex flex-column h-100" elevation="2" hover>
          <v-img
            v-if="polish.image"
            :src="polish.image"
            height="220"
            class="bg-transparent"
          ></v-img>
          
          <v-sheet v-else height="220" class="d-flex align-center justify-center bg-transparent">
             <v-icon size="64" color="grey-lighten-2">mdi-image-off-outline</v-icon>
          </v-sheet>

          <v-card-text class="flex-grow-1 pt-4 pb-2">
            <div class="text-overline mb-1 text-primary">{{ polish.brand || 'Sem marca' }}</div>
            <div class="text-h6 font-weight-bold mb-0 text-secondary">{{ polish.name }}</div>
            
            <div class="d-flex align-center justify-space-between mt-2">
              <div class="d-flex align-center">
                <v-icon size="small" color="grey-darken-1" class="mr-2">mdi-palette</v-icon>
                <span class="text-body-2 text-grey-darken-3 font-weight-medium">{{ polish.color || 'Sem cor' }}</span>
              </div>
              <v-rating
                v-if="getRating(polish.id) > 0"
                :model-value="getRating(polish.id)"
                readonly
                color="amber"
                density="compact"
                size="small"
                half-increments
              ></v-rating>
            </div>
            <div class="mt-3 d-flex flex-wrap gap-1" v-if="polish.finish || polish.colorFamily">
               <v-chip v-if="polish.finish" size="small" color="primary" variant="tonal" class="mr-1 mt-1 font-weight-medium text-caption">{{ polish.finish }}</v-chip>
               <v-chip v-if="polish.colorFamily" size="small" color="secondary" variant="tonal" class="mt-1 font-weight-medium text-caption">{{ polish.colorFamily }}</v-chip>
            </div>
            
            <!-- Lifecycle & Volume Alerts -->
            <div class="mt-4 w-100" v-if="getMetrics(polish.id)">
              <!-- Expiration Alert -->
              <div v-if="getMetrics(polish.id).isExpired" class="text-caption text-error font-weight-bold d-flex align-center justify-center mb-1">
                <v-icon size="small" color="error" class="mr-1">mdi-alert-circle</v-icon> Vencido!
              </div>
              <div v-else-if="getMetrics(polish.id).expiresSoon" class="text-caption text-warning font-weight-bold d-flex align-center justify-center mb-1">
                <v-icon size="small" color="warning" class="mr-1">mdi-clock-alert</v-icon> Vence em {{ getMetrics(polish.id).daysToExpiration }} dias
              </div>
              
              <!-- Volume Alert / Progress -->
              <div v-if="getMetrics(polish.id).totalVolume" class="mt-3 w-100 text-left">
                 <div class="text-caption text-grey-darken-1 mb-1 d-flex justify-space-between" style="font-size: 0.70rem !important;">
                   <span>Restam {{ getMetrics(polish.id).remainingVolume.toFixed(1) }}ml de {{ getMetrics(polish.id).totalVolume }}ml</span>
                   <span class="font-weight-bold">{{ getMetrics(polish.id).volumePercentage }}%</span>
                 </div>
                 <v-progress-linear
                   :model-value="getMetrics(polish.id).volumePercentage"
                   height="6"
                   rounded
                   :color="getMetrics(polish.id).volumePercentage < 15 ? 'error' : 'primary-lighten'"
                 ></v-progress-linear>
              </div>
            </div>
          </v-card-text>

          <v-card-actions class="px-4 pb-4 pt-0">
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              variant="text"
              icon="mdi-delete"
              @click="deletePolish(polish.id)"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Paginação -->
    <v-row v-if="pageCount > 1" justify="center" class="mt-8 mb-4">
      <v-pagination
        v-model="page"
        :length="pageCount"
        color="primary"
        rounded="circle"
        :total-visible="5"
        elevation="2"
      ></v-pagination>
    </v-row>

    <!-- Modal Adição -->
    <AddNailPolishModal 
      v-model="isModalOpen" 
    />

    <!-- Modal Confirmação de Exclusão -->
    <ConfirmDeleteModal 
      v-model="isDeleteDialogOpen"
      title="Apagar Esmalte?"
      text="Esta ação não pode ser desfeita. Tem certeza que deseja excluir?"
      @confirm="executeDelete"
    />
    
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import AddNailPolishModal from '../components/AddNailPolishModal.vue';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.vue';

const store = useStore();
const isModalOpen = ref(false);

const searchQuery = ref('');
const showAdvancedFilters = ref(false);
const filterFinish = ref(null);
const filterColorFamily = ref(null);

const finishOptions = [
  'Cremoso', 'Cintilante', 'Fosco', 'Glitter', 'Metálico', 'Translúcido', 'Efeito Gel'
];
const colorFamilyOptions = [
  'Tons de Vermelho/Rosa', 'Nudes/Marrons', 'Escuros/Pretos', 'Tons Frios (Azul/Verde)', 'Vibrantes/Neons', 'Claros/Brancos', 'Outros'
];

const getRating = (id) => store.getters.getPolishRating(id);
const getMetrics = (id) => store.getters.polishMetrics(id);

const allPolishes = computed(() => store.getters.allPolishes);

const filteredPolishes = computed(() => {
  let result = allPolishes.value;

  // 1. Filtro por Acabamento
  if (filterFinish.value) {
    result = result.filter(p => p.finish === filterFinish.value);
  }

  // 2. Filtro por Família de Cor
  if (filterColorFamily.value) {
    result = result.filter(p => p.colorFamily === filterColorFamily.value);
  }

  // 3. Busca de Texto (Nome / Cor principal)
  const query = searchQuery.value?.toLowerCase().trim();
  if (query) {
    result = result.filter(p => {
      const nameMatch = p.name?.toLowerCase().includes(query);
      const colorMatch = p.color?.toLowerCase().includes(query);
      return nameMatch || colorMatch;
    });
  }
  
  return result;
});

// Lógica de Paginação
const page = ref(1);
const itemsPerPage = 8; // Defina o limite de esmaltes por página aqui

const pageCount = computed(() => Math.ceil(filteredPolishes.value.length / itemsPerPage));

const paginatedPolishes = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredPolishes.value.slice(start, end);
});

// Reseta a página se a quantidade de páginas diminuir (ex: apagou o último item da página atual)
watch(pageCount, (newVal) => {
  if (page.value > newVal && newVal > 0) {
    page.value = newVal;
  }
});

const isDeleteDialogOpen = ref(false);
const polishToDelete = ref(null);

const deletePolish = (id) => {
  polishToDelete.value = id;
  isDeleteDialogOpen.value = true;
};

const executeDelete = () => {
  if (polishToDelete.value) {
    store.dispatch('deletePolish', polishToDelete.value);
    polishToDelete.value = null;
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
.shadow-sm {
  box-shadow: 0 2px 8px rgba(0,0,0,0.05) !important;
}
</style>
