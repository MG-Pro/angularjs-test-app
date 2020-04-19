import IGame from '../../types/IGame'

export default class GameCardComponent {
  template = require('./game-card.view.html')
  bindings = {
    gameItem: '<',
  }
  controller = class {
    static $inject = ['storageService']

    gameItem: IGame

    constructor(private storageService) {}

    likeHandler() {
      // this.gameItem.isFav = !this.gameItem.isFav
      this.storageService.addRemoveFav(this.gameItem)
    }
  }
}

