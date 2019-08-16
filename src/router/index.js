import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/pages/Login'
import Products from '@/components/pages/Products'
import CustomOrders from '@/components/pages/CustomOrders'
import Coupon from '@/components/pages/Coupon'
import CustomerCheckout from '@/components/pages/CustomerCheckout'
import Order from '@/components/pages/Order'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login'
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      // meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          name: 'products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: Coupon,
          meta: { requiresAuth: true }
        },
        {
          path: 'order',
          name: 'Order',
          component: Order,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/',
      name: 'Dashboard_customer',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'customer_orders',
          name: 'CustomOrders',
          component: CustomOrders,
        },
        {
          path: 'customer_checkout/:orderID',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        }

      ]
    },
  ]
})
