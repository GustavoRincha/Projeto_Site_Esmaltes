<template>
  <v-container class="px-md-8 py-md-8 pb-16 mb-4">
    <div class="d-flex align-center justify-space-between mb-8 mt-4">
      <h1 class="text-h4 font-weight-bold text-primary-darken d-flex align-center">
        <v-icon color="primary" class="mr-3" size="40">mdi-chart-arc</v-icon>
        Estatísticas
      </h1>
    </div>

    <!-- Abstinence Timer (Hero Block) -->
    <v-row class="mb-6">
       <v-col cols="12">
          <v-card class="rounded-xl border" elevation="0" :color="daysWithoutPainting > 14 ? 'error' : (daysWithoutPainting > 7 ? 'warning' : 'primary-lighten')">
             <v-card-text class="d-flex align-center py-6 px-6 text-white justify-space-between flex-wrap">
                <div>
                   <h2 class="text-h6 font-weight-bold mb-1">
                      <v-icon start>mdi-clock-fast</v-icon>
                      Tempo sem esmaltar
                   </h2>
                   <p class="text-body-2 opacity-80" v-if="daysWithoutPainting === null">Você ainda não registrou nenhuma esmaltação nas suas inspirações!</p>
                   <p class="text-body-2 opacity-80" v-else-if="daysWithoutPainting === 0">Uau! Suas unhas estão fresquinhas (Feitas hoje).</p>
                   <p class="text-body-2 opacity-80" v-else>Há exatamente {{ daysWithoutPainting }} dias você não registra um momento especial com suas unhas.</p>
                </div>
                <div v-if="daysWithoutPainting !== null" class="text-h3 font-weight-black mt-4 mt-sm-0">
                   {{ daysWithoutPainting }} <span class="text-h6 font-weight-medium">dias</span>
                </div>
             </v-card-text>
          </v-card>
       </v-col>
    </v-row>

    <v-row class="mb-4">
      <!-- Most Used Colors Year (Bar Chart) -->
      <v-col cols="12" md="6">
        <v-card class="rounded-xl h-100" elevation="2">
          <v-card-title class="bg-secondary text-white font-weight-bold pa-4 text-subtitle-1">
             <v-icon left size="small" class="mr-1">mdi-podium-silver</v-icon> Top 3 Cores do Ano ({{ currentYear }})
          </v-card-title>
          <v-card-text class="pt-6 pb-6">
             <div v-if="topYearColors.labels.length > 0" style="height: 250px; position: relative;">
                <Bar :data="topYearColors" :options="barOptions" />
             </div>
             <div v-else class="text-center text-grey mt-4 d-flex flex-column align-center">
                <v-icon size="40" class="mb-2 opacity-50">mdi-sleep</v-icon>
                Você ainda não usou nenhum esmalte neste ano.
             </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Pie Chart of Brands -->
      <v-col cols="12" md="6">
        <v-card class="rounded-xl h-100" elevation="2">
          <v-card-title class="bg-primary-lighten text-white font-weight-bold pa-4 text-subtitle-1">
             <v-icon left size="small" class="mr-1">mdi-chart-pie</v-icon> Domínio de Marcas na Coleção
          </v-card-title>
          <v-card-text class="pt-6 pb-6 d-flex align-center justify-center">
             <div v-if="brandChartData.labels.length > 0" style="height: 250px; width: 100%; position: relative;">
               <Pie :data="brandChartData" :options="pieOptions" />
             </div>
             <div v-else class="text-center text-grey mt-4">Sua coleção de esmaltes está vazia.</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Forgotten Polishes -->
    <v-row class="mb-10">
      <v-col cols="12">
        <v-card class="rounded-xl border" elevation="0">
          <v-card-title class="bg-grey-lighten-4 text-grey-darken-3 font-weight-bold pa-4 border-b">
             <v-icon left color="grey-darken-1" class="mr-1">mdi-spider-web</v-icon> Cores Encalhadas
          </v-card-title>
          <v-card-text class="pt-6 pb-6 bg-white">
             <div class="mb-4 text-body-2 text-grey-darken-1 text-center">Esmaltes registrados que nunca sentiram o brilho de um pincel nas suas unhas. Dê atenção a eles!</div>
             
             <div v-if="strandedPolishes.length > 0" class="d-flex flex-wrap gap-2 justify-center">
                 <v-tooltip 
                   v-for="polish in strandedPolishes" 
                   :key="polish.id"
                   location="top"
                 >
                    <template v-slot:activator="{ props }">
                      <v-chip 
                        v-bind="props"
                        size="large" 
                        variant="outlined"
                        :color="polish.monthsForgotten > 6 ? 'error' : 'grey-darken-1'"
                        class="ma-1 font-weight-bold bg-white" 
                        elevation="1"
                      >
                          <v-icon start color="grey-lighten-1">mdi-bottle-tonic-outline</v-icon>
                          {{ polish.name }} 
                          <span class="text-grey-lighten-1 ml-2 text-caption font-weight-regular">({{ polish.brand }})</span>
                          <v-badge v-if="polish.monthsForgotten > 0" color="error" class="ml-2" :content="polish.monthsForgotten + 'm'"></v-badge>
                      </v-chip>
                    </template>
                    <span>Há {{ polish.monthsForgotten }} meses encostado na gaveta.</span>
                 </v-tooltip>
             </div>
             <div v-else class="text-center text-success font-weight-bold my-4 d-flex align-center justify-center">
                <v-icon color="success" class="mr-2" size="large">mdi-check-decagram</v-icon>
                Parabéns! Você não tem esmaltes encalhados na gaveta.
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
import moment from 'moment';

// Chart.js imports
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Pie, Bar } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const store = useStore();
const currentYear = moment().year();

// ==========================================
// Métrica 1: Contador de Dias Sem Pintar
// ==========================================
const daysWithoutPainting = computed(() => {
  const usages = store.getters.allUsages;
  if (!usages || usages.length === 0) return null;
  // Assumes usages is already sorted newest-first (from loadFromStorage config)
  const lastUsageDate = moment(usages[0].date);
  const diffInDays = moment().startOf('day').diff(lastUsageDate.startOf('day'), 'days');
  return Math.abs(diffInDays); // absolute just in case of weird timezone bounds
});

// ==========================================
// Métrica 2: Domínio de Marcas (Gráfico de Pizza)
// ==========================================
const brandChartData = computed(() => {
  const allPolishes = store.getters.allPolishes;
  const brandCounts = {};
  
  allPolishes.forEach(polish => {
    let brandName = polish.brand ? polish.brand.trim() : 'Outros';
    if (!brandCounts[brandName]) brandCounts[brandName] = 0;
    brandCounts[brandName]++;
  });

  const labels = Object.keys(brandCounts);
  const data = Object.values(brandCounts);

  // Paleta premium de rosa, roxo e tons frios
  const modernPalette = ['#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];

  return {
    labels,
    datasets: [
      {
        backgroundColor: modernPalette.slice(0, labels.length),
        data
      }
    ]
  };
});

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'right' }
  }
};

// ==========================================
// Métrica 3: Top Cores do Ano (Gráfico de Barras)
// ==========================================
const topYearColors = computed(() => {
  const usagesThisYear = store.getters.allUsages.filter(u => moment(u.date).year() === currentYear);
  const colorCounts = {};
  const allPolishes = store.getters.allPolishes;

  usagesThisYear.forEach(usage => {
    const ids = usage.polishIds && usage.polishIds.length > 0 ? usage.polishIds : (usage.polishId ? [usage.polishId] : []);
    
    ids.forEach(id => {
       const polish = allPolishes.find(p => p.id === id);
       if (polish) {
         let familyName = polish.colorFamily || 'Outros';
         if (!colorCounts[familyName]) colorCounts[familyName] = 0;
         colorCounts[familyName]++;
       }
    });
  });

  const sortedPairs = Object.entries(colorCounts)
     .sort((a, b) => b[1] - a[1])
     .slice(0, 3); // Apenas TOP 3

  return {
    labels: sortedPairs.map(pair => pair[0]),
    datasets: [
      {
        label: 'Vezes usadas em ' + currentYear,
        backgroundColor: '#FF4081',
        borderRadius: 4,
        data: sortedPairs.map(pair => pair[1])
      }
    ]
  };
});

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1, precision: 0 }
    }
  }
};

// ==========================================
// Métrica 4: Cores Encalhadas & Meses na Gaveta
// ==========================================
const strandedPolishes = computed(() => {
  const stats = store.getters.usageStats;
  const allIdsWithUses = stats.map(s => s.polishId);
  const stranded = store.getters.allPolishes.filter(p => !allIdsWithUses.includes(p.id));
  
  // Injeta meses esquecidos baseado no TimeStamp (id é gerado como Date.now().toString())
  return stranded.map(p => {
     let monthsForgotten = 0;
     const idParsed = parseInt(p.id);
     
     // Verifica se é um Custom Polish cujo ID é uma data exata
     if (!isNaN(idParsed) && p.id.length > 10) {
        const addedDate = moment(idParsed);
        monthsForgotten = moment().diff(addedDate, 'months');
     }
     return { ...p, monthsForgotten };
  }).sort((a,b) => b.monthsForgotten - a.monthsForgotten);
});

</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
.opacity-80 {
  opacity: 0.8;
}
.opacity-50 {
  opacity: 0.5;
}
</style>
