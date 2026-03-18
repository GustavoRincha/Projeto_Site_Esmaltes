<template>
  <v-app>
    <v-app-bar color="white" density="comfortable" elevation="1" class="border-b" >
      <v-app-bar-title class="font-weight-bold text-primary-darken">Meus Esmaltes <span class="text-primary-lighten">💅</span></v-app-bar-title>
    </v-app-bar>

    <v-main class="bg-background">
      <v-container fluid class="fill-height align-start">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  store.dispatch('loadFromStorage');
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
