import IGame from '../../types/IGame'
import ICategory from '../../types/ICategory'
import IMerchant from '../../types/IMerchant'

export default class HomeComponent {
  template = require('./home.view.html')
  controller = class {
    static $inject = ['apiService', 'dataService']

    isLastPage: boolean = false
    pageList: IGame[] = []
    categoryList: ICategory[] = []
    merchantList: IMerchant[] = []

    constructor(private apiService, private dataService) {
      dataService.registerObserverCallback(this.listUpdateHandler.bind(this))
    }

    $onInit() {
      this.apiService.getItems().then((res) => {
        console.log(res.data)
        this.categoryList.push(...res.data.categories)
        const merchants: IMerchant[] = Object.values(res.data.merchants)
        this.merchantList.push(...merchants)
        this.dataService.list = res.data.games
      })
    }

    listUpdateHandler(list: IGame[]): void {
      this.pageList = list
      this.isLastPage = this.dataService.isLastPage
    }

    addItemsHandler(): void {
      this.dataService.incCurrentPage()
    }

  }
}
