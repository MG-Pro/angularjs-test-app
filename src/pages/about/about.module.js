import angular from 'angular'

class AboutController {
  constructor () {
    this.title = 'HomeComponent'
    this.msg = 'TEST'
  }
}

class AboutComponent {
  constructor () {
    this.template = require('./about.view.html')
    this.controller = AboutController
  }
}

export default angular
  .module('about.module', [])
  .component('aboutComponent', new AboutComponent())
