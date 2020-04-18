import angular from 'angular'

interface IGame {
  '[string]': string
}

class HomeComponent {
  template = require('./home.view.html')
  controller = class {
    static $inject = ['$scope', 'apiService']

    itemOnPage: number = 25
    currentPage: number = 1
    pageList: IGame[] = []
    categoryList: object[] = []
    private fullList: IGame[] = []

    constructor($scope, private apiService) {
    }

    $onInit() {
      this.apiService.getItems().then((res) => {
        console.log(res.data)
        this.categoryList = res.data.categories
        this.fullList = res.data.games
        this.pageList = this.getPageList(this.fullList)
      })
    }

    getPageList(list: IGame[]): IGame[] {
      return list.slice(this.currentPage - 1, this.itemOnPage)
    }

  }
}

export default angular
  .module('home', [])
  .component('homeComponent', new HomeComponent())
