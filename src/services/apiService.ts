export default class ApiService {
  static $inject = ['$http']

  constructor (private $http) {}

  getItems () {
    // return this.$http.get('https://www.gbchip.com/api/v1/games?lang=en')
    return this.$http.get('games.json')
  }

  getItem (id: string) {
    console.log(id)
    return new Promise((done) => {
      this.$http.get('games.json').then((res) => {
        const game = res.data.games.find(item => item.ID === id)
        done(game)
      })
    })

  }
}
