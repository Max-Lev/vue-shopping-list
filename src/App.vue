/* eslint-disable */
<template>
<section id="app">
    <!-- <v-app> -->
        <!-- <v-content> -->
            <LayoutContainer :shoppingList="shoppingList"></LayoutContainer>
        <!-- </v-content> -->
    <!-- </v-app> -->
</section>
</template>

<script>
import LayoutContainer from './layout/layout.container';
import firebaseApp from './firebase/config.js';
const fireStoreApp = firebaseApp.firestore();
import Vue from 'vue';
import { serverBus } from './main.js';
export default {
  name: 'app',
  props: {},
  components: {
    LayoutContainer
  },

  created() {
    this.getShoppingCartsApi$();
  },
  mounted() {
    this.$root.$on('cart-submit-event', val => {
      fireStoreApp.collection('Shopping').add({
        Name: val
      });
    });
  },

  data() {
    return {
      shoppingList: []
    };
  },

  methods: {
    getShoppingCartsApi$() {
      fireStoreApp.collection('Shopping').onSnapshot(snapshot => {
        this.shoppingList = [];
        snapshot.docs.map(item => {
          this.shoppingList.push({
            Id: item.id,
            ...item.data()
          });
          this.$root.shoppingList = this.shoppingList;
          // serverBus.$emit('set-shopping-list-event', this.shoppingList);
        });
      });
    }
  },
  watch: {
    $route(to, from) {
      if (to.fullPath === '/') {
        this.getShoppingCartsApi$();
      }
    },
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
