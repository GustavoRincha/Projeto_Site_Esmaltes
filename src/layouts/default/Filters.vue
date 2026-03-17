<template>
  <v-navigation-drawer app right temporary
    v-model="isActive"
    width="320"
  >
    <template #prepend>
      <v-toolbar color="transparent" flat>
        <v-toolbar-title>Filtros</v-toolbar-title>
      </v-toolbar>

      <v-divider />
    </template>

    <v-container>
      <slot />
    </v-container>

    <template #append>
      <v-divider />

      <div class="pa-3">
        <v-btn color="primary" @click="$_onToggleApply" block depressed rounded>
          Aplicar
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import ToggleFiltersEvent from '@/events/ToggleFiltersEvent';

export default {
  name: 'LayoutDefaultFilters',

  data() {
    return {
      isActive: false,
    };
  },

  methods: {
    $_onToggleActive() {
      this.$emit('open');
      this.isActive = !this.isActive;
    },

    $_onToggleApply() {
      this.isActive = !this.isActive;
      this.$emit('apply');
    },
  },

  watch: {
    // isActive(active) {
    //   if (active) return;
    //   this.$emit('apply');
    // },
  },

  created() {
    ToggleFiltersEvent.on(this.$_onToggleActive);
  },

  beforeDestroy() {
    ToggleFiltersEvent.off(this.$_onToggleActive);
  },
};
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  max-width: calc(100% - 64px);
  max-height: 100%;
}
</style>
