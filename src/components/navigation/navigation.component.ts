import angular from 'angular'

class NavigationController {
  constructor () {}
}

class NavigationComponent {
  template = require('./navigation.view.html')
  controller = NavigationController

  constructor () {}
}

export default angular
  .module('nav', [])
  .component('navigation', new NavigationComponent())

