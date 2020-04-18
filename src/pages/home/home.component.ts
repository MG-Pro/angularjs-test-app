import angular from 'angular'
import IGame from '../../types/IGame'
import ICategory from '../../types/ICategory'


class HomeComponent {
  template = require('./home.view.html')
  controller = class {
    static $inject = ['$scope', 'apiService']

    private fullList: IGame[] = []
    private currentPage: number = 1
    isLastPage: boolean = false
    itemOnPage: number = 25
    pageList: IGame[] = []
    categoryList: ICategory[] = [{
      ID: '',
      Name: {
        en: 'All'
      }
    }]


    constructor($scope, private apiService, private dataService) {
      console.log(dataService)
    }

    $onInit() {
      this.apiService.getItems().then((res) => {
        console.log(res.data)
        this.categoryList.push(...res.data.categories)
        this.dataService.list = res.data.games.slice(0, 78)
        this.pageList = this.getPageList()
      })
    }

    getPageList(startIndex: number = 0): IGame[] {
      return this.dataService.list.slice(startIndex, startIndex + this.itemOnPage)
    }

    addItems() {
      this.currentPage++
      const startIndex: number = this.itemOnPage * this.currentPage - this.itemOnPage
      this.pageList.push(...this.getPageList(startIndex))
      if(startIndex + this.itemOnPage >= this.dataService.list.length) {
        this.isLastPage = true
      }
    }

  }
}

export default angular
  .module('home', [])
  .component('homeComponent', new HomeComponent())
