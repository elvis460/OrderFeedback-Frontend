import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Orders from '@/components/Orders'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Orders
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    },
  ]
})
