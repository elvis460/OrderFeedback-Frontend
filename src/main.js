// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// for http request
import axios from 'axios';
// toastr
import toastr from './setup/toastr'

// bootstrap
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap'
import 'font-awesome/css/font-awesome.css' 

// setup toastr
toastr();

Vue.config.productionTip = false

// axios settings here
Vue.prototype.axios = axios
// dev api url
axios.defaults.baseURL = 'http://localhost:3000'
// production api url
// axios.defaults.baseURL = 'https://grain-tech-test-backend.herokuapp.com'
// add request header in each request
axios.defaults.headers.common['Auth-Token'] = 'Auth-Token'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
