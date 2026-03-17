<template>
  <v-container class="px-md-8 py-md-8">
    
    <div class="d-flex align-center justify-space-between mb-6">
      <h1 class="text-h4 font-weight-bold text-pink-darken-3">Catalog</h1>
      <v-btn 
        color="pink-darken-1" 
        prepend-icon="mdi-plus" 
        rounded="pill" 
        elevation="3"
        @click="isModalOpen = true"
      >
        Novo Esmalte
      </v-btn>
    </div>

    <!-- Empty State -->
    <v-row v-if="polishes.length === 0" justify="center" class="mt-12">
      <v-col cols="12" sm="8" md="6" class="text-center">
        <v-icon size="80" color="grey-lighten-1" class="mb-4">mdi-flask-empty-outline</v-icon>
        <h3 class="text-h6 text-grey-darken-1">Nenhum esmalte cadastrado.</h3>
        <p class="text-body-1 text-grey">Clique em "Novo Esmalte" para começar sua coleção!</p>
      </v-col>
    </v-row>

    <!-- Galeria -->
    <v-row v-else>
      <v-col 
        v-for="polish in polishes" 
        :key="polish.id" 
        cols="12" 
        sm="6" 
        md="4" 
        lg="3"
      >
        <v-card class="mx-auto rounded-xl" hover elevation="3" max-width="400">
          <v-img
            v-if="polish.image"
            :src="polish.image"
            height="250"
            class="bg-grey-lighten-2 align-end"
          ></v-img>
          
          <v-sheet v-else height="250" class="d-flex align-center justify-center bg-grey-lighten-3">
             <v-icon size="64" color="grey-lighten-1">mdi-image-off-outline</v-icon>
          </v-sheet>

          <v-card-text>
            <div class="text-overline mb-1 text-pink-darken-1">{{ polish.brand || 'Sem marca' }}</div>
            <div class="text-h6 font-weight-bold mb-2">{{ polish.name }}</div>
            <div class="d-flex align-center">
              <v-icon size="small" color="grey-darken-1" class="mr-1">mdi-palette</v-icon>
              <span class="text-body-2 text-grey-darken-2">{{ polish.color || 'Sem cor' }}</span>
            </div>
          </v-card-text>

          <v-card-actions>
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

    <!-- Modal Adição -->
    <AddNailPolishModal 
      v-model="isModalOpen" 
    />
    
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import AddNailPolishModal from '../components/AddNailPolishModal.vue';

const store = useStore();
const isModalOpen = ref(false);

const polishes = computed(() => store.getters.allPolishes);

const deletePolish = (id) => {
  if (confirm("Tem certeza que deseja apagar este esmalte?")) {
    store.dispatch('deletePolish', id);
  }
};
</script>
