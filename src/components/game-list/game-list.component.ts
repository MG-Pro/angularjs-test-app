import angular from 'angular'

class GameListComponent {
  template = require('./game-list.view.html')
  bindings = {
    list: '<',
    isLastPage: '<',
    onMoreItems: '&'
  }
  controller = class {
    onMoreItems: Function

    moreItemsHandler() {
      this.onMoreItems()
    }
  }
}

export default angular
  .module('gameList', [])
  .component('gameListComponent', new GameListComponent())
