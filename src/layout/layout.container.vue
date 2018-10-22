<template>
<v-card height="350px">

    <v-navigation-drawer v-model="drawer" permanent absolute>

        <v-toolbar flat class="transparent">
            <v-list class="pa-0">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="https://randomuser.me/api/portraits/men/85.jpg">
                    </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>John Leider</v-list-tile-title>
                        </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-toolbar>

        <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <v-list-tile v-for="item in routes" :key="item.title" @click="nav(item)">

                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                    {{item.cartsAmount}}
                </v-list-tile-action>

            </v-list-tile>

        </v-list>

    </v-navigation-drawer>

    <router-view></router-view>

</v-card>
</template>

<script>
import Vue from 'vue';
import UserRegistrationComponent from './../components/user-registration/user-registration.component.vue';
import CartRegistrationComponent from './../components/cart-registration/cart-registration.component';

import router from './routes.js';
export default Vue.component('LayoutContainer', {
  props: {
    shoppingList: Array
  },
  components: {
    UserRegistrationComponent,
    CartRegistrationComponent
  },

  data() {
    return {
      drawer: true,
      right: null,
      routes: router.options.routes
      //   cartsCounter: this.shoppingList.length
    };
  },
  watch: {
    shoppingList: (newVal, oldVal) => {
      console.log('$watch: ', newVal.length);
    },
    shoppingList: {
      handler: 'setCounter'
    }
  },

  methods: {
    setCounter() {
      this.routes[1].cartsAmount = this.shoppingList.length;
      console.log('setCounter');
    },
    nav(item) {
      router.push(item.path);
    },
    getAmount(amount) {
      console.log('getAmount: ', amount);
    }
  }
});
</script>
