<template>
  <v-navigation-drawer app right temporary
    v-model="isActive"
    width="320"
    class='newfilter-navigator'
  >
    <template #prepend>
      <v-toolbar color="transparent" flat>
      <v-toolbar-title>Filtro</v-toolbar-title>
      </v-toolbar>

      <v-divider />
    </template>

    <v-container class="filtro_a">
      <slot slot name='filtro_a'>
      </slot>
    </v-container>

    <v-container class="trigger">
      <core-text-field clearable class='txt-filter'
        @click='$_elevated'
        label='Pessoa'
        :type='inputType'
        />
    </v-container>

    <v-container class="filtro_b">
      <slot slot name='filtro_b'>
      </slot>
    </v-container>

    <template #append>
      <v-divider />

      <div class="pa-3" v-if='!elevated'>
        <v-btn color="primary" @click="$_onToggleApply" block depressed rounded>
          Aplicar
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import ToggleFiltersEvent from '@/events/ToggleFiltersEvent';
import CoreTextField from '@/components/core/text-field/Index.vue';

export default {
  name: 'LayoutDefaultNewFilters',

  components: {
    CoreTextField,
  },

  props: {
    top: Number,
  },

  data() {
    return {
      elevated: false,
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

    $_elevated() {
      console.log(this.$props.top);
      console.log(this.elevated);
      const filtroA = document.querySelector('.filtro_a');
      const filtroB = document.querySelector('.filtro_b');
      const trigger = document.querySelector('.trigger');
      if (this.elevated) {
        console.log('filtro_b');
        filtroA.style.opacity = '0';
        filtroA.style.zIndex = '-1';
        filtroB.style.opacity = '1';
        filtroB.style.top = this.$props.top;
        trigger.style.top = this.$props.top;
      } else {
        console.log('filtro_a');
        filtroA.style.opacity = '1';
        filtroA.style.zIndex = '2';
        filtroB.style.opacity = '0';
        filtroB.style.top = '0px';
        trigger.style.top = '0px';
      }
      console.log(this.elevated);
      this.elevated = !this.elevated;
      console.log(this.elevated);
    },
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

.filtro_a {
  transition: 1s;
  opacity: 1;
  z-index: 1;
  position: relative;
}

.filtro_b {
  transition: 1s;
  opacity: 0;
  z-index: 0;
  position: relative;
}

.trigger {
  transition: 1s;
  position: relative;
}

// .filtro_a {
//   transition: top 0.4s;
//   z-index: 1;
//   position: relative;
// }

// .filtro_b  {
//   transition: top 0.4s;
//   z-index: 0;
//   position: relative;
// }

#close {
  left: 44%
}

</style>
