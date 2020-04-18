import angular from 'angular'

class HomeController {
  title = 'Welcome!'
  list = []

  constructor ($scope, private apiService) {}

  $onInit() {
    this.apiService.getItems().then((res) => {
      this.list = res.data
    })
  }

  static $inject = ["$scope", 'apiService']
}

class HomeComponent {
  template = require('./home.view.html')
  controller = HomeController
  constructor () {}
}

export default angular
  .module('home', [])
  .component('homeComponent', new HomeComponent())
