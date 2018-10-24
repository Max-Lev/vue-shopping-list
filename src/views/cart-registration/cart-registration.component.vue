<template>
<!-- <v-container> -->

    <v-layout justify-center style="flex:.8">

        <v-form ref="form" v-model="valid" lazy-validation noValidate >

            <v-text-field  v-model="cartName" :rules="cartRules" label="Category Name" required></v-text-field>

            <v-btn :disabled="!valid" @click="submit">Add Category</v-btn>
            
        </v-form>

    </v-layout>

<!--</v-container> -->
</template>

<script>
import Vue from 'vue';
export default Vue.component('CartRegistrationComponent', {
  data() {
    return {
      valid: false,
      cartName: '',
      cartRules: [v => (v !== null && v !== '') || 'Category Name is Required']
    };
  },
  methods: {
    submit(event) {
      event.preventDefault();
      if (this.$refs.form.validate()) {
        this.$root.$emit('cart-submit-event', this.cartName);
        this.$refs.form.reset();
      } 
    }
  }
});
</script>
