import angular from 'angular'

class AboutController {
  title = 'HomeComponent'
  msg = 'TEST'
  constructor () {}
}

class AboutComponent {
  template = require('./about.view.html')
  controller = AboutController

  constructor () {}
}

export default angular
  .module('about', [])
  .component('aboutComponent', new AboutComponent())
