<template>

<section class="carts-layout-container">
    <div class="cart-container" v-for="(item,index) in cartItems" :key="index">
        <CartComponent :cartData="item"></CartComponent>
    </div>
</section>

</template>

<script>
import Vue from 'vue';
import {
    serverBus
} from './../../main.js';
import CartComponent from './../../components/cart/cart.component';
import firebaseApp from './../../firebase/config.js';
const fireStoreApp = firebaseApp.firestore();
export default Vue.component('ShoppingCartComponent', {
    components: {
        CartComponent
    },
    props: {},
    data() {
        return {
            cartItems: []
        };
    },
    created() {
        this.cartItems = this.$root.shoppingList;
        this.getShoppingCartsApi$();
    },
    watch: {
        cartItems() {
            this.cartItems = this.$root.shoppingList;
        }
    },
    methods: {
        getShoppingCartsApi$() {
            fireStoreApp.collection('Shopping').onSnapshot(snapshot => {
                this.cartItems = [];
                snapshot.docs.map(item => {
                    this.cartItems.push({
                        id: item.id,
                        ...item.data()
                    });
                });
            });
        }
    }
});
</script>

<style>
.carts-layout-container {
    display: inline-flex;
    flex: 0.8;
    flex-direction: row;
    flex-wrap: wrap;
    place-content: space-evenly;
}

.cart-container {
    display: flex;
    flex: 1;
    padding: 1%;
}
</style>
