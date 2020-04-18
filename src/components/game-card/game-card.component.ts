import angular from 'angular'

class GameCardComponent {
  template = require('./game-card.view.html')
  bindings = {
    gameItem: '<',
  }
  controller = class {
    gameItem

  }
}

export default angular
  .module('gameCard', [])
  .component('gameCardComponent', new GameCardComponent())
