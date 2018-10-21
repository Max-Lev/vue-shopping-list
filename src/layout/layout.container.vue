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
            <v-list-tile v-for="item in items" :key="item.title" @click="selectedItem(item)">

                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>
                        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                        <!-- <router-link :to="item.path">{{item.name}}</router-link> -->
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <!-- <v-list-tile>
                <v-list-tile-content>
                    <router-link to="/foo">Go to Foo</router-link>
                </v-list-tile-content>
            </v-list-tile> -->

        </v-list>

    </v-navigation-drawer>

    <CartComponent></CartComponent>
    <router-view></router-view>

</v-card>
</template>

<script>
import Vue from 'vue';
import UserRegistrationComponent from './../components/user-registration/user-registration.component.vue';
import CartComponent from './../components/cart/cart-component.vue';
// import routes from './routes.js';
import router from './routes.js';
export default Vue.component('LayoutContainer', {
  components: {
    UserRegistrationComponent,
    CartComponent
  },
  created() {
    console.log('LayoutContainer');
  },
  methods: {
    selectedItem(item) {
      console.log('selectedItem: ', item);
      router.push(item.path);
    }
  },
  mounted() {
    this.$root.$on('clickedSomething', val => {
      console.log('on click root', val);
    });
  },
  data() {
    return {
      drawer: true,
      right: null,
      items: router.options.routes
    };
  }
});
</script>
