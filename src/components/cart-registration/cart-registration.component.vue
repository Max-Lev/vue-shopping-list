<template>
<v-container>

    <v-layout justify-center>

        <v-form ref="form" v-model="valid" lazy-validation>

            <v-text-field v-model="cartName" :rules="cartRules" label="Cart Name" required></v-text-field>

            <!-- <v-select v-model="select" :cartItems="cartItems" label="Item"></v-select> -->

            <v-btn :disabled="!valid" @click="submit">Add Cart</v-btn>
            
              <div v-for="(item,index) in cartItems" :key="index">
                {{item}}
              </div>
            
        </v-form>

    </v-layout>

</v-container>
</template>

<script>
import Vue from 'vue';
import { serverBus } from './../../main.js';
export default Vue.component('CartRegistrationComponent', {
  props: {},
  created() {
    this.getShoppingListData();
  },
  data() {
    return {
      valid: false,
      cartName: '',
      cartRules: [v => (v !== null && v !== '') || 'Name is Required'],
      shoppingItem: '',
      cartItems: []
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$root.$emit('cart-submit', this.cartName);
      } else {
        console.log('!!submit');
      }
    },
    getShoppingListData() {
      serverBus.$on('shoppingList', data => {
        console.log(data);
        this.cartItems = data;
      });
    }
  }
});
</script>
