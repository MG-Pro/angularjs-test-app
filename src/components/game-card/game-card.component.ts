export default class GameCardComponent {
  template = require('./game-card.view.html')
  bindings = {
    gameItem: '<',
  }
  controller = class {
    gameItem

  }
}

