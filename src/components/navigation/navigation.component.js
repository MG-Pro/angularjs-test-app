import angular from 'angular'

class NavigationController {
  constructor () {

  }
}

class NavigationComponent {
  constructor () {
    this.template = require('./navigation.view.html')
    this.controller = NavigationController
  }
}

export default angular
  .module('nav', [])
  .component('navigation', new NavigationComponent())

