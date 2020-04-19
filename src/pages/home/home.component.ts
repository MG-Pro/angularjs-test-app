import IGame from '../../types/IGame'
import ICategory from '../../types/ICategory'

export default class HomeComponent {
  template = require('./home.view.html')
  controller = class {
    static $inject = ['apiService', 'dataService']

    isLastPage: boolean = false
    pageList: IGame[] = []
    categoryList: ICategory[] = []


    constructor(private apiService, private dataService) {
      dataService.registerObserverCallback(this.listUpdateHandler.bind(this))
    }

    $onInit() {
      this.apiService.getItems().then((res) => {
        console.log(res.data)
        this.categoryList.push(...res.data.categories)
        this.dataService.list = res.data.games

      })
    }

    listUpdateHandler(list: IGame[]) {
      this.pageList = list
      this.isLastPage = this.dataService.isLastPage
    }

    addItemsHandler() {
      this.dataService.incCurrentPage()
    }

  }
}
