import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import UserRegistrationComponent from './../components/user-registration/user-registration.component.vue';
import CartComponent from './../components/cart/cart-component.vue';

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: UserRegistrationComponent,
            icon: 'dashboard'
        },
        {
            path: '/carts',
            component: CartComponent,
            name: 'Carts',
            icon: 'question_answer'
        },
        
    ]
})