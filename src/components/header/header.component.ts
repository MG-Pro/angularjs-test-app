import angular from 'angular'
import IGame from '../../types/IGame'

export default class HeaderComponent {
  template = require('./header.view.html')
  controller = class {
    static $inject = ['dataService']
    totalItems: number = 0
    showedItems: number = 0

    constructor (private dataService) {
      dataService.registerObserverCallback(this.listUpdateHandler.bind(this))
    }

    listUpdateHandler(currentlist: IGame[], filteredList, fullList) {
      this.showedItems = filteredList.length
      this.totalItems = fullList.length
    }
  }
}

