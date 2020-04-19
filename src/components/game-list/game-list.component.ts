export default class GameListComponent {
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
