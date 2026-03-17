<template>
  <v-app-bar :color="$_color" :dark="$_dark" app>
    <template v-if="!$_isMobile || !showSearch">
      <template v-if="$_isMobile">
        <v-btn v-if="backTo" :to="backTo" exact icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-app-bar-nav-icon v-else @click="$_onClickNavIcon" />
      </template>

      <v-toolbar-title>
        <slot />
      </v-toolbar-title>

      <v-spacer />
    </template>

    <template v-if="searchable && (!$_isMobile || showSearch)">
      <v-btn v-if="$_isMobile" @click="$_onClickCloseSearch" icon>
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>

      <v-text-field clearable hide-details solo flat autofocus
        v-model="search"
        :placeholder="$t('labels.search')"
        :rounded="!$_isMobile"
        :light="!$_isMobile"
        :dense="!$_isMobile"
      />

      <v-spacer v-if="!$_isMobile" />
    </template>

    <slot name="actions" v-if="!$_isMobile || !showSearch" />

    <div>
      <v-badge dot
        v-if="searchable && ($_isMobile && !showSearch)"
        color="red"
        offset-x="16"
        offset-y="16"
        :value="!!search"
      >
        <v-btn @click="$_onClickOpenSearch" icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-badge>
    </div>

    <div>
      <v-tooltip v-if="filterable && (!$_isMobile || !showSearch)" bottom>
        <template #activator="{ attrs, on }">
          <v-badge dot
            color="red"
            offset-x="16"
            offset-y="16"
            :value="isFiltered"
          >
            <v-btn icon
              v-bind="attrs"
              v-on="on"
              @click="$_onClickFiltersBtn"
            >
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
          </v-badge>
        </template>

        <span>{{ $t('labels.filters') }}</span>
      </v-tooltip>
    </div>

    <span class="mr-n3" />
  </v-app-bar>
</template>

<script>
import { GENERIC_QUERIES } from '@/constants/QUERY_FILTERS';

import { getQueryValue, setQueryValue } from '@/services/query-string';

import ToggleFiltersEvent from '@/events/ToggleFiltersEvent';
import ToggleNavigationDrawerEvent from '@/events/ToggleNavigationDrawerEvent';

export default {
  name: 'LayoutDefaultAppbar',

  props: {
    searchable: Boolean,
    filterable: Boolean,
    filters: Array,
    backTo: [String, Object],
  },

  data() {
    return {
      search: null,
      showSearch: false,
      isFiltered: false,
    };
  },

  computed: {
    $_isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },

    $_dark() {
      return !(this.$_isMobile && this.showSearch);
    },

    $_color() {
      return this.$_dark ? 'primary' : 'white';
    },
  },

  methods: {
    $_onClickNavIcon() {
      ToggleNavigationDrawerEvent.emit();
    },

    $_onClickOpenSearch() {
      this.showSearch = true;
    },

    $_onClickCloseSearch() {
      this.showSearch = false;
    },

    $_onClickFiltersBtn() {
      ToggleFiltersEvent.emit();
    },
  },

  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler() {
        this.search = getQueryValue(GENERIC_QUERIES.search, null);

        if (!this.filters?.length) return;

        this.isFiltered = this.filters
          .some((filter) => getQueryValue(filter, false));
      },
    },

    search(search) {
      clearTimeout(this.$_searchTimeout);
      this.$_searchTimeout = setTimeout(() => {
        setQueryValue(GENERIC_QUERIES.search, search);
      }, 1000);
    },
  },
};
</script>
