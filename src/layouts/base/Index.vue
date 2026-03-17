<template>
  <v-app>
    <slot />

    <slot name="main">
      <v-main>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-main>
    </slot>

    <pwa-install-dialog />
    <pwa-snackbar />

    <app-dialog-remove />
  </v-app>
</template>

<script>
import PwaInstallDialog from '@/components/pwa/install-dialog/pwa-install-dialog.vue';
import PwaSnackbar from '@/components/pwa/snackbar/pwa-snackbar.vue';

import AppDialogRemove from '@/components/app/dialog/remove/Index.vue';

export default {
  name: 'LayoutBase',

  components: {
    PwaInstallDialog,
    PwaSnackbar,

    AppDialogRemove,
  },
};
</script>
