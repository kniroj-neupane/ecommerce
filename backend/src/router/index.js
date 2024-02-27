// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '../components/AppLayout.vue';
import Products from '../views/Products/Products.vue';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import RequestPassword from '../views/RequestPassword.vue';
import ResetPassword from '../views/ResetPassword.vue';
import ProductForm from '../views/Products/ProductForm.vue';
import store from '../store';

const routes = [
  { 
    path: '/app', 
    name: 'app',
    redirect: '/app/dashboard',
    component: AppLayout,
    meta:{
      requiresAuth: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'app.dashboard',
        component: Dashboard
      },
      {
        path: 'products',
        name: 'app.products',
        component: Products
      },
      {
        path: 'products/:id',
        name: 'app.products.edit',
        component: ProductForm,
        props: {
          id: (value) => /^\d+$/.test(value)
        }
      },
      {
        path: 'products/create',
        name: 'app.products.create',
        component: ProductForm,
        beforeEnter: (to, from, next) => {
          // Reset any necessary state in the 'ProductForm' component
          next();
        },
      },
      
    ]
  },
  { 
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresGuest: true
    }
   },
  { path: '/request-password',
    component: RequestPassword,
    meta: {
      requiresGuest: true
    }
  },
  { path: '/reset-password/:token',
    component: ResetPassword,
    meta: {
      requiresGuest: true
    }
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({name: 'login'})
  } else if (to.meta.requiresGuest && store.state.user.token) {
    next({name: 'app.dashboard'})
  } else {
    next();
  }

})

export default router;
