// main.js
var Vue = require('vue')
var App = require('./test-d3.vue')

new Vue({
  el: '#app',
  render: function (createElement) {
    return createElement(App)
  }
})