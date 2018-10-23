<template>
<v-flex xs12 sm12>
    <v-card @click.native="nav(cartData)" style="white-space: nowrap;">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{cartData.Name}} <span class="subheading">Shopping Cart</span></h3>
            </div>
        </v-card-title>

    </v-card>
</v-flex>
</template>

<script>
import Vue from 'vue';
import { serverBus } from './../../main.js';
export default Vue.component('CartComponent', {
  props: {
    cartData: Object
  },
  methods: {
    nav(cartData) {
      serverBus.$emit('cart-details-event', cartData);
    }
  }
});
</script>
