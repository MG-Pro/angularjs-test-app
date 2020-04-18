import angular from 'angular'



class HeaderComponent {
  template = require('./header.view.html')
  controller = class {
    constructor () {}
  }
}

export default angular
  .module('header', [])
  .component('headerComponent', new HeaderComponent())
