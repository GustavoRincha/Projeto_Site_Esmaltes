<template>
  <v-container class="px-md-8 py-md-8 pb-16 mb-4">
    <div class="d-flex align-center justify-space-between mb-8 mt-4">
      <h1 class="text-h4 font-weight-bold text-primary-darken d-flex align-center">
        <v-icon color="primary" class="mr-3" size="40">mdi-chart-arc</v-icon>
        Estatísticas
      </h1>
    </div>

    <v-row class="mb-4">
      <!-- Favorite Brands -->
      <v-col cols="12" md="6">
        <v-card class="rounded-xl h-100" elevation="2">
          <v-card-title class="bg-primary-lighten text-white font-weight-bold pa-4 text-subtitle-1">
             <v-icon left size="small" class="mr-1">mdi-crown</v-icon> Marcas Favoritas (Por Quantidade)
          </v-card-title>
          <v-card-text class="pt-4">
             <v-list v-if="topBrands.length > 0" lines="one" bg-color="transparent">
               <v-list-item v-for="(brand, index) in topBrands" :key="index" class="mb-2">
                 <template v-slot:prepend>
                   <v-avatar :color="index === 0 ? 'amber-darken-2' : 'primary-lighten'" size="36" class="text-white font-weight-bold mr-3">{{ index + 1 }}º</v-avatar>
                 </template>
                 <v-list-item-title class="font-weight-bold text-secondary">{{ brand.name || 'Sem Marca' }}</v-list-item-title>
                 <v-list-item-subtitle>{{ brand.count }} esmalte(s) na coleção</v-list-item-subtitle>
               </v-list-item>
             </v-list>
             <div v-else class="text-center text-grey mt-4">Sua coleção de esmaltes está vazia.</div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Most used color families -->
      <v-col cols="12" md="6">
        <v-card class="rounded-xl h-100" elevation="2">
          <v-card-title class="bg-secondary text-white font-weight-bold pa-4 text-subtitle-1">
             <v-icon left size="small" class="mr-1">mdi-palette</v-icon> Famílias de Cor Mais Usadas
          </v-card-title>
          <v-card-text class="pt-4">
             <v-list v-if="topColors.length > 0" lines="one" bg-color="transparent">
               <v-list-item v-for="(color, index) in topColors" :key="index" class="mb-2">
                 <template v-slot:prepend>
                   <v-avatar :color="index === 0 ? 'amber-darken-2' : 'secondary-lighten'" size="36" class="text-white font-weight-bold mr-3">{{ index + 1 }}º</v-avatar>
                 </template>
                 <v-list-item-title class="font-weight-bold text-primary">{{ color.name || 'Sem Família Definida' }}</v-list-item-title>
                 <v-list-item-subtitle>{{ color.count }} uso(s) registrado(s)</v-list-item-subtitle>
               </v-list-item>
             </v-list>
             <div v-else class="text-center text-grey mt-4">Você ainda não registrou inspirações suficientes para montar o ranking.</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Forgotten Polishes -->
    <v-row class="mb-10">
      <v-col cols="12">
        <v-card class="rounded-xl border" elevation="0">
          <v-card-title class="bg-grey-lighten-4 text-grey-darken-3 font-weight-bold pa-4 border-b">
             <v-icon left color="grey-darken-1" class="mr-1">mdi-spider-web</v-icon> Esquecidos na Gaveta (Nunca Usados)
          </v-card-title>
          <v-card-text class="pt-6 pb-6 bg-white">
             <div v-if="forgottenPolishes.length > 0" class="d-flex flex-wrap gap-2 justify-center">
                 <v-chip 
                   v-for="polish in forgottenPolishes" 
                   :key="polish.id" 
                   size="large" 
                   variant="outlined"
                   color="grey-darken-1"
                   class="ma-1 font-weight-bold bg-white" 
                   elevation="0"
                 >
                    <v-icon start color="grey-lighten-1">mdi-bottle-tonic-outline</v-icon>
                    {{ polish.name }} 
                    <span class="text-grey-lighten-1 ml-2 text-caption font-weight-regular">({{ polish.brand }})</span>
                 </v-chip>
             </div>
             <div v-else class="text-center text-success font-weight-bold my-4 d-flex align-center justify-center">
                <v-icon color="success" class="mr-2" size="large">mdi-check-decagram</v-icon>
                Parabéns! Você não tem esmaltes esquecidos. Já usou todos pelo menos uma vez!
             </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Algoritmo: Marca Favorita
const topBrands = computed(() => {
  const allPolishes = store.getters.allPolishes;
  const brandCounts = {};
  
  allPolishes.forEach(polish => {
    let brandName = polish.brand ? polish.brand.trim() : 'Sem Marca';
    if (!brandCounts[brandName]) brandCounts[brandName] = 0;
    brandCounts[brandName]++;
  });

  const sortedBrands = Object.keys(brandCounts).map(brand => {
    return { name: brand, count: brandCounts[brand] };
  }).sort((a, b) => b.count - a.count);

  return sortedBrands.slice(0, 5); // Retorna Top 5
});

// Algoritmo: Cores Mais Usadas
const topColors = computed(() => {
  const usages = store.getters.allUsages;
  const allPolishes = store.getters.allPolishes;
  const colorCounts = {};

  usages.forEach(usage => {
    const ids = usage.polishIds && usage.polishIds.length > 0 ? usage.polishIds : (usage.polishId ? [usage.polishId] : []);
    
    ids.forEach(id => {
       const polish = allPolishes.find(p => p.id === id);
       if (polish) {
         let familyName = polish.colorFamily || 'Sem Categoria de Cor';
         if (!colorCounts[familyName]) colorCounts[familyName] = 0;
         colorCounts[familyName]++;
       }
    });
  });

  const sortedColors = Object.keys(colorCounts).map(col => {
    return { name: col, count: colorCounts[col] };
  }).sort((a, b) => b.count - a.count);

  return sortedColors.slice(0, 5); // Retorna Top 5
});

// Algoritmo: Esquecidos na Gaveta
const forgottenPolishes = computed(() => {
  const stats = store.getters.usageStats;
  const allIdsWithUses = stats.map(s => s.polishId);
  
  // Esmaltes que o ID não está presente na tabela de usos
  return store.getters.allPolishes.filter(p => !allIdsWithUses.includes(p.id));
});

</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>
