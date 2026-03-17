<template>
  <layout-base>
    <navigation-drawer />

    <template #main>
      <v-main class="grey lighten-3">
        <router-view name="appBar" />

        <router-view name="filters" />

        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-main>
    </template>
  </layout-base>
</template>

<script>
import LayoutBase from '../base/Index.vue';
import NavigationDrawer from './NavigationDrawer.vue';

export default {
  name: 'LayoutDefault',

  components: {
    LayoutBase,
    NavigationDrawer,
  },
};
</script>
