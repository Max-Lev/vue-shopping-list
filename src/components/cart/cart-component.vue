<template>
<v-container>

    <v-layout justify-center>

        <v-form ref="form" v-model="valid" lazy-validation>

            <v-text-field v-model="cartName" :rules="cartRules" label="Cart Name" required></v-text-field>

            <v-select v-model="select" :items="items" label="Item"></v-select>

            <v-btn :disabled="!valid" @click="submit">Add Cart</v-btn>

        </v-form>

    </v-layout>

</v-container>
</template>

<script>
import Vue from 'vue';
var CartComponent = Vue.component('CartComponent', {
  props: {},
  data() {
    return {
      valid: false,
      cartName: 'Work Cart List',
      cartRules: [v => (v !== null && v !== '') || 'Name is Required'],
      shoppingItem: '',
      select: '',
      items: []
    };
  },
  methods: {
    submit() {
      console.log(this);
      if (this.$refs.form.validate()) {
        this.$root.$emit('clickedSomething', this.cartName);
        console.log('submit');
      } else {
        console.log('!!submit');
      }
    }
  }
});
export default CartComponent;
</script>
