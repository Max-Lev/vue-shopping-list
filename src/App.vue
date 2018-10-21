/* eslint-disable */
<template>
<section id="app">
    <v-app>
        <v-content>
            <LayoutContainer></LayoutContainer>
        </v-content>
    </v-app>
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
  data() {
    return {
      shoppingList: []
    };
  },

  created() {
    this.getCarts();
    this.getShoppingApi$();
  },
  mounted() {
    this.$root.$on('cart-submit', val => {
      console.log('cart-submit emitHandler', val);
      fireStoreApp.collection('Shopping').add({
        Name: val
      });
    });
  },
  watch: {
    $route(to, from) {
      if (to.fullPath === '/') {
        this.getShoppingApi$();
      }
    }
  },

  methods: {
    saveHandler(data) {
      console.log('saveHandler: ', data);
    },
    getCarts() {
      fireStoreApp
        .collection('Cart')
        .get()
        .then(snapshot => {
          snapshot.docs.map(item => {
            console.log(item.data());
          });
        });
    },

    getShoppingApi$() {
      console.log('action getShoppingApi$: ');

      this.shoppingList = [];

      fireStoreApp.collection('Shopping').onSnapshot(snapshot => {
        snapshot.docs.map(item => {
          this.shoppingList.push({
            id: item.id,
            ...item.data()
          });

          serverBus.$emit('shoppingList', this.shoppingList);

          this.$root.shoppingList = this.shoppingList;
        });
      });
    }
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
