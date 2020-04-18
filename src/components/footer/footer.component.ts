import angular from 'angular'

class FooterComponent {
  template = require('./footer.view.html')
  controller = class FooterController {
    constructor () {}
  }
}

export default angular
  .module('footer', [])
  .component('footerComponent', new FooterComponent())

