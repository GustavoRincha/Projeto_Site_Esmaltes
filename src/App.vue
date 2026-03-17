<template>
  <v-app>
    <v-app-bar color="pink-lighten-2" density="compact" elevation="2">
      <v-app-bar-title>Meus Esmaltes 💅</v-app-bar-title>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
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
</style>
