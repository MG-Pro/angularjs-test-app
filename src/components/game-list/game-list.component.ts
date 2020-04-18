import angular from 'angular'

class GameListComponent {
  template = require('./game-list.view.html')
  bindings = {
    list: '<',
  }
  constructor() {
    console.log(this)
  }
  controller = class {
    list: object[]

  }
}

export default angular
  .module('gameList', [])
  .component('gameListComponent', new GameListComponent())
