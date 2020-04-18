import angular from 'angular'

class ApiService {
  static $inject = ['$http']

  constructor (private $http) {}

  getItems () {
    return this.$http.get('https://jsonplaceholder.typicode.com/posts')
  }


}

export default angular
  .module('apiServiceModule', [])
  .service('apiService', ApiService)
