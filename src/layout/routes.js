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
            name: '/',
            title: 'Cart Registration',
            component: CartRegistrationComponent,
            icon: 'dashboard',
            cartsAmount: undefined,
            sidebarDisplay: true
        },
        {
            path: '/carts',
            component: ShoppingCartComponent,
            title: 'Shopping Carts',
            name: 'carts',
            icon: 'question_answer',
            cartsAmount: undefined,
            sidebarDisplay: true
        },
        {
            path: '/cart/:categoryID',
            name: 'cart-details',
            component: CartDetailsComponent,
            title: 'Cart Details',
            icon: 'question_answer',
            cartsAmount: undefined,
            sidebarDisplay: false,
            props: {
                categoryID: '',
                cart: {}
            },
        },

    ]
})