export default class ApiService {
  static $inject = ['$http']

  constructor (private $http) {}

  getItems () {
    // return this.$http.get('https://www.gbchip.com/api/v1/games?lang=en')
    return this.$http.get('games.json')
  }


}
