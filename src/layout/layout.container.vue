<template>
<v-card style="display:flex;flex:1">

    <v-navigation-drawer v-model="drawer" permanent width="200" style="display:inline-flex;flex-direction:column;flex:.2;max-width:350px">

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
            <v-list-tile v-for="route in routes" :key="route.title" @click="nav(route)">

                <v-list-tile-action>
                    <v-icon>{{ route.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{ route.title }}</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action v-if="route.cartsAmount > 0">
                    {{route.cartsAmount}}
                </v-list-tile-action>

            </v-list-tile>
        </v-list>

    </v-navigation-drawer>
    <section class="router-view-container">
        <router-view></router-view>
    </section>

</v-card>
</template>

<script>
import Vue from 'vue';
import ShoppingCartComponent from './../views/shopping-cart/shopping-cart.component';
import CartRegistrationComponent from './../views/cart-registration/cart-registration.component';
import router from './routes.js';
import {
    serverBus
} from './../main.js';
export default Vue.component('LayoutContainer', {
    props: {
        shoppingList: Array
    },
    components: {
        ShoppingCartComponent,
        CartRegistrationComponent
    },
    created() {
        this.cartDetailsRouting();
    },
    data() {
        return {
            drawer: true,
            right: null,
            routes: router.options.routes.filter(route => route.sidebarDisplay)
        };
    },
    watch: {
        shoppingList: {
            handler: 'setShoppingCartsCounter'
        }
    },

    methods: {
        setShoppingCartsCounter() {
            this.routes[1].cartsAmount = this.shoppingList.length;
        },
        nav(item) {
            router.push(item.path);
        },
        cartDetailsRouting() {
            serverBus.$on('cart-details-event', cart => {
                router.push({
                    name: `cart-details`,
                    params: {
                        categoryID: cart.categoryID,
                        cart: cart
                    }
                });
            });
        }
    }
});
</script>

<style>
.router-view-container {
    display: inline-flex;
    flex: 0.8;
    flex-direction: row;
    flex-wrap: wrap;
    place-content: space-evenly;
}
</style>
