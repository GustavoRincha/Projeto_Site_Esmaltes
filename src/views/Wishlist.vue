<template>
  <v-container class="px-md-8 py-md-8">
    
    <div class="d-flex align-center justify-space-between mb-8 mt-4">
      <h1 class="text-h4 font-weight-bold text-secondary-darken d-flex align-center">
        <v-icon color="secondary" class="mr-3" size="40">mdi-heart-multiple</v-icon>
        Lista de Desejos
      </h1>
      <v-btn 
        color="secondary" 
        prepend-icon="mdi-plus" 
        rounded="pill" 
        elevation="4"
        class="text-none font-weight-bold shadow-soft"
        @click="isModalOpen = true"
      >
        Novo Desejo
      </v-btn>
    </div>

    <!-- Empty State -->
    <v-row v-if="wishlistItems.length === 0" justify="center" class="mt-8">
      <v-col cols="12" sm="8" md="6" class="text-center">
        <v-icon size="80" color="grey-lighten-2" class="mb-4">mdi-heart-outline</v-icon>
        <h3 class="text-h5 text-grey-darken-1 font-weight-bold mb-2">Sua lista está vazia</h3>
        <p class="text-body-1 text-grey">Hora de pesquisar novidades! Quais esmaltes você planeja comprar futuramente?</p>
      </v-col>
    </v-row>

    <!-- Lista de Desejos -->
    <v-row v-else>
      <v-col 
        v-for="item in wishlistItems" 
        :key="item.id" 
        cols="12" 
        sm="6" 
        md="4" 
        lg="3"
      >
        <v-card class="mx-auto rounded-xl wishlist-card d-flex flex-column h-100" elevation="2">
          <!-- Decorator bar -->
          <div class="bg-secondary px-6 py-2 d-flex justify-space-between align-center text-white rounded-t-xl">
             <span class="text-caption font-weight-bold shadow-text"><v-icon size="small" class="mr-1">mdi-clock-outline</v-icon> 
               Adicionado em {{ formatDate(item.dateAdded) }}
             </span>
             <v-btn variant="text" icon="mdi-delete" size="small" color="white" @click="deleteWishlist(item.id)"></v-btn>
          </div>
          
          <v-card-text class="flex-grow-1 pt-6 pb-2 text-center d-flex flex-column align-center justify-center">
            <v-icon size="48" color="secondary-lighten-2" class="mb-3">mdi-bottle-tonic-outline</v-icon>
            <div class="text-overline mb-0 text-primary">{{ item.brand || 'Sem marca' }}</div>
            <div class="text-h6 font-weight-bold text-secondary mb-2">{{ item.name }}</div>
            
            <div class="d-flex align-center justify-center mt-1" v-if="item.color">
              <v-icon size="small" color="grey-darken-1" class="mr-2">mdi-palette</v-icon>
              <span class="text-body-2 text-grey-darken-3 font-weight-medium">{{ item.color }}</span>
            </div>
          </v-card-text>

          <v-card-actions class="px-5 pb-5 pt-2 d-flex justify-center">
            <v-btn
              color="success"
              variant="flat"
              prepend-icon="mdi-check-circle"
              class="rounded-pill text-none font-weight-bold px-6 buy-btn w-100"
              @click="buyItem(item)"
            >
              Comprei!
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal Adição -->
    <AddWishlistModal v-model="isModalOpen" />

    <!-- Modal Delete -->
    <ConfirmDeleteModal 
      v-model="isDeleteDialogOpen"
      title="Apagar Desejo?"
      text="Tem certeza que não quer mais este esmalte e deseja retirá-lo da lista?"
      @confirm="executeDelete"
    />
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment';
import AddWishlistModal from '../components/AddWishlistModal.vue';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.vue';

const store = useStore();
const isModalOpen = ref(false);

const wishlistItems = computed(() => store.getters.wishlistItems);

const formatDate = (dateString) => {
  return moment(dateString).format('DD/MM/YYYY');
};

const isDeleteDialogOpen = ref(false);
const itemToDelete = ref(null);

const deleteWishlist = (id) => {
  itemToDelete.value = id;
  isDeleteDialogOpen.value = true;
};

const executeDelete = () => {
  if (itemToDelete.value) {
    store.dispatch('removeWishlistItem', itemToDelete.value);
    itemToDelete.value = null;
  }
};

const buyItem = async (item) => {
  try {
    // Insere o produto no catálogo geral usando a action original (já que é novo ele não tem imagem do frasco ainda)
    await store.dispatch('addNailPolish', {
      name: item.name,
      brand: item.brand,
      color: item.color,
      finish: null,
      colorFamily: null,
      imageFile: null
    });
    // Limpa da Wishlist
    store.dispatch('removeWishlistItem', item.id);
  } catch(e) {
    console.error("Failed handling buy event", e);
  }
};
</script>

<style scoped>
.wishlist-card {
  transition: transform 0.3s ease, border-color 0.3s ease;
  border-top: 4px solid transparent;
}
.wishlist-card:hover {
  transform: translateY(-5px);
  border-top-color: #9C27B0; /* Secondary color (purple) */
}
.shadow-soft {
  box-shadow: 0 4px 12px rgba(156, 39, 176, 0.3) !important;
}
.shadow-text {
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
}
.buy-btn {
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2) !important;
  transition: all 0.2s ease;
}
.buy-btn:hover {
  transform: scale(1.02);
}
</style>
