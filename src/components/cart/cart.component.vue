<template>
<!-- <v-flex xs12 sm12 offset-sm3 >
        <v-card>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">{{cartData.Name}}</h3>
                    <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                    </div>
            </v-card-title>

            <v-card-actions>
                <v-btn flat color="orange">Share</v-btn>
                <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex> -->
<v-flex xs12 sm12>
    <v-card @click.native="nav(cartData)" >
        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{cartData.Name}}</h3>
            </div>
        </v-card-title>

        <v-card-actions>
            <v-btn flat color="orange" >Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>

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
