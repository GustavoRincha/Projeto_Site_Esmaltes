<template>
  <v-app>
    <v-app-bar color="surface" density="comfortable" elevation="1" :class="isDark ? 'border-b-0' : 'border-b'">
      <v-app-bar-title class="font-weight-bold text-primary-darken">Meus Esmaltes <span class="text-primary-lighten">💅</span></v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleTheme" color="primary" class="mr-2">
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="bg-background pb-14">
      <v-container fluid class="fill-height align-start">
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-bottom-navigation color="primary" grow shift app>
      <v-btn to="/" value="catalog">
        <v-icon>mdi-palette</v-icon>
        <span>Coleção</span>
      </v-btn>
      <v-btn to="/gallery" value="gallery">
        <v-icon>mdi-camera-party-mode</v-icon>
        <span>Inspirações</span>
      </v-btn>
      <v-btn to="/dashboard" value="dashboard">
        <v-icon>mdi-chart-bar</v-icon>
        <span>Painel</span>
      </v-btn>
      <v-btn to="/wishlist" value="wishlist">
        <v-icon>mdi-heart</v-icon>
        <span>Desejos</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useTheme } from 'vuetify';

const store = useStore();
const theme = useTheme();
const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  theme.global.name.value = isDark.value ? 'premiumDark' : 'premiumTheme';
  localStorage.setItem('appTheme', theme.global.name.value);
};

onMounted(() => {
  store.dispatch('loadFromStorage');
  const savedTheme = localStorage.getItem('appTheme');
  if (savedTheme) {
    theme.global.name.value = savedTheme;
    isDark.value = savedTheme === 'premiumDark';
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Check user system preference
    theme.global.name.value = 'premiumDark';
    isDark.value = true;
  }
});
</script>

<style>
/* Reset base */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Outfit', sans-serif;
}
</style>
