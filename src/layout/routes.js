import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import UserRegistrationComponent from './../components/user-registration/user-registration.component.vue';
import CartRegistrationComponent from './../components/cart-registration/cart-registration.component.vue';

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Cart Registration',
            component: CartRegistrationComponent,
            icon: 'dashboard',
            cartsAmount: undefined
        },
        {
            path: '/carts',
            component: UserRegistrationComponent,
            name: 'Carts',
            icon: 'question_answer',
            cartsAmount: undefined
        },

    ]
})