<template>
  <v-navigation-drawer app
    v-model="isActive"
    :width="$_width"
  >

    <template #prepend>
      <v-list color="primary" dark>
        <v-list-item>
          <v-list-item-avatar :color="$_avatar ? 'white' : 'primary'" size="32">
            <v-img :src="$_avatar">
              <v-icon color="white" x-large>mdi-account-circle-outline</v-icon>
            </v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item>
          <v-list-item-content class="content">
            <v-list-item-title class="title">
              {{empresa}}
            </v-list-item-title>
            <div class="subtitle" v-if="dataatt">
              Atualizado: {{dataatt}}
              <v-icon v-if="icon" small class="aviso" color="error">{{icon}}</v-icon>
            </div>

            <!-- <v-list-item-subtitle>{{ $_user.email }}</v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>

    <!-- <base-dialog>
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Acesso Negado
          </v-card-title>

          <v-card-text>
              Você não possui permissão para acessar.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </base-dialog> -->

    <v-list  dense :shaped="!minVariant" >
      <template v-for="(item) in menu" >
        <v-list-item @click="$_getEmpresa" color="primary" :key="item.label" :to="item.route">
          <v-list-item-icon>
            <v-icon >{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content >
            <v-list-item-title style='color:rgb(50,50,50)'>{{ item.label }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <template>
        <v-list-item color="primary" class="sair">
          <v-list-item-icon>
            <v-icon>{{'mdi-exit-run'}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
            @click='$_getLogout'
            >
            {{ 'Sair' }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MENU, { menuMapper } from '@/constants/MENUS';
import ToggleNavigationDrawerEvent from '@/events/ToggleNavigationDrawerEvent';
import moment from 'moment';

// import BaseDialog from '@/components/core/dialog/Index.vue';

export default {
  name: 'LayoutDefaultNavigarionDrawer',

  components: {
    // BaseDialog,
  },

  data() {
    return {
      isActive: false,
      minVariant: false,
      empresa: null,
      menuArray: [],
      newMenu: [],
      dataatt: null,
      icon: null,
    };
  },

  computed: {
    ...mapGetters({
      $_user: 'auth/user',
    }),

    $_isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },

    $_width() {
      return this.$_isMobile ? null : 320;
    },

    $_avatar() {
      return this.$_user?.person?.avatar;
    },

    $_userName() {
      return this.$_user?.person?.name;
    },
  },

  methods: {
    ...mapActions({
      $_logout: 'auth/logout',
      $_empresa: 'empresa/find',
      $_Acesso: 'modulos/metodoAcesso',
    }),

    $_onClickResumo() {
      window.close();
    },

    $_toggleMinVariant() {
      this.minVariant = !this.minVariant;
    },

    $_toggleNavigationDrawerHandler() {
      this.$_getEmpresa();
      this.isActive = !this.isActive;
    },

    async $_getLogout() {
      await sessionStorage.clear();
      await this.$_logout();
      return window.location.reload();
    },

    async $_getEmpresa() {
      this.empresa = await this.$_empresa();
      const data = this?.empresa[0]?.empdataatualizacao;
      this.empresa = this.empresa[0].empnome;
      if (data) {
        this.dataatt = moment(data).format('DD/MM/YYYY - HH:mm:ss');
        const ultimoAcesso = Date.parse(data);
        const now = Date.parse(moment(new Date()));
        console.log(now - ultimoAcesso);
        if (now - ultimoAcesso >= 1800000) {
          this.icon = 'mdi-alert-circle';
        }
      }
    },

    async $_criaModulosMenu() {
      const menuArray = [];
      for (let i = 1; i < this.menu.length; i += 1) {
        menuArray.push(this.$_Acesso({
          nomeDescricao: `LIBERA ${(this.menu[i].label).toUpperCase()} NO MENU`,
          nomeRotina: `MENU_${(this.menu[i].label).toUpperCase()}`,
          nomePrograma: 'MENU',
          nomeModulo: 'APP',
        }));
      }
      this.$_geraMenu((await Promise.all(menuArray)));
    },

    async $_geraMenu(tempMenu) {
      let newMenu = [];
      let liberar = true;
      let temAPagar = false;
      let temAReceber = false;
      newMenu.push(this.menu[0]);
      setTimeout(() => {
        for (let i = 0; i < tempMenu.length; i += 1) {
          if (!tempMenu[i]) {
            if (this.menu[i + 1].label === 'Financeiro Pagar') {
              temAPagar = true;
            } else if (this.menu[i + 1].label === 'Financeiro Receber') {
              temAReceber = true;
            } else {
              liberar = false;
            }
          }
        }

        // Bloqueios
        if (temAPagar && temAReceber && liberar) {
          // POSSUI AMBOS OS FINANCEIROS LIBERADOS APENAS
          newMenu = this.menu;
        } else if (temAPagar && liberar) {
          // SÓ POSSUI O APAGAR LIBERADO
          for (let i = 0; i < tempMenu.length; i += 1) {
            if (this.menu[i + 1].label !== 'Financeiro Receber') {
              newMenu.push(this.menu[i + 1]);
            }
          }
        } else if (temAReceber && liberar) {
          // SÓ POSSUI O RECEBER LIBERADO
          for (let i = 0; i < tempMenu.length; i += 1) {
            if (this.menu[i + 1].label !== 'Financeiro Pagar') {
              newMenu.push(this.menu[i + 1]);
            }
          }
        } else if (!liberar) {
          // MANUAL
          for (let i = 0; i < tempMenu.length; i += 1) {
            if (!tempMenu[i]) {
              newMenu.push(this.menu[i + 1]);
            }
          }
        } else {
          // NÃO POSSUI NENHUM FINANCEIRO MARCADO
          for (let i = 0; i < tempMenu.length; i += 1) {
            if ((this.menu[i + 1].label !== 'Financeiro Pagar') && (this.menu[i + 1].label !== 'Financeiro Receber')) {
              newMenu.push(this.menu[i + 1]);
            }
          }
        }
        this.menu = newMenu;
        this.isActive = !this.$_isMobile; // Penultima linha do created, deve ter uma solução melhor
      }, 0);
    },
  },

  created() {
    this.$_getEmpresa();
    this.menu = menuMapper(this, MENU);
    this.$_criaModulosMenu();

    ToggleNavigationDrawerEvent.on(this.$_toggleNavigationDrawerHandler);
  },

  beforeDestroy() {
    ToggleNavigationDrawerEvent.off(this.$_toggleNavigationDrawerHandler);
  },

};
</script>

<style scoped>
    .content {
      width: 60vw;
      text-align: center;
    }

    .subtitle {
      font-size: 10px;
      margin-top: 10px;
    }

    .sair {
      cursor: pointer;
      transition: 0.2s;
    }

    .sair:hover {
      background-color: rgb(245, 245, 245);
    }

    .aviso {
      position: absolute;
      transform: translate(10px,-2px);
      background-color: white;
      border-radius: 100%;
    }
</style>
