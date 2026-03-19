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
    <v-row class="mb-6">
      <v-col cols="12" sm="8" md="6" lg="5">
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
    </v-row>

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
            <div class="text-h6 font-weight-bold mb-2 text-secondary">{{ polish.name }}</div>
            <div class="d-flex align-center">
              <v-icon size="small" color="grey-darken-1" class="mr-2">mdi-palette</v-icon>
              <span class="text-body-2 text-grey-darken-3 font-weight-medium">{{ polish.color || 'Sem cor' }}</span>
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

const allPolishes = computed(() => store.getters.allPolishes);

const filteredPolishes = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return allPolishes.value;
  
  return allPolishes.value.filter(p => {
    const nameMatch = p.name?.toLowerCase().includes(query);
    const colorMatch = p.color?.toLowerCase().includes(query);
    return nameMatch || colorMatch;
  });
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
