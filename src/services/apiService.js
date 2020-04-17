import angular from 'angular'

class ApiService {
  constructor ($http) {
    this.$http = $http
  }

  getItems () {

    return this.$http.get('https://jsonplaceholder.typicode.com/posts')
  }

  static $inject = ['$http']
}

export default angular
  .module('apiServiceModule', [])
  .service('apiService', ApiService)
