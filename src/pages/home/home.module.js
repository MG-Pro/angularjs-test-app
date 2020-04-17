import angular from 'angular'
import apiServiceModule from '../../services/apiService'

class HomeController {
  constructor ($scope, $http, apiService) {
    this.apiService = apiService
    this.title = 'Welcome!'
    this.list = []
  }

  $onInit() {
    this.apiService.getItems().then((res) => {
      this.list = res.data
    })
  }

  static $inject = ["$scope", "$http", 'apiService']
}

class HomeComponent {
  constructor () {
    this.template = require('./home.view.html')
    this.controller = HomeController
  }
}

export default angular
  .module('home.module', [apiServiceModule.name])
  .component('homeComponent', new HomeComponent())
