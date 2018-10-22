import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import ShoppingCartComponent from './../views/shopping-cart/shopping-cart.component.vue';
import CartRegistrationComponent from './../views/cart-registration/cart-registration.component.vue';
import CartDetailsComponent from './../components/cart-details/cart-details.component.vue';
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Cart Registration',
            component: CartRegistrationComponent,
            icon: 'dashboard',
            cartsAmount: undefined,
            sidebar: true
        },
        {
            path: '/carts',
            component: ShoppingCartComponent,
            name: 'Shopping Carts',
            icon: 'question_answer',
            cartsAmount: undefined,
            sidebar: true
        },
        {
            path: '/cart/:id',
            component: CartDetailsComponent,
            name: 'Cart Details',
            icon: 'question_answer',
            cartsAmount: undefined,
            sidebar: false
            // props: { default: true, sidebar: false }
        },

    ]
})