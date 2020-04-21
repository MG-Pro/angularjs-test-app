import IGame from '../types/IGame'
import ICategory from '../types/ICategory'
import ISortItem from '../types/ISortItem'
import IMerchant from '../types/IMerchant'

export default class DataService {
  static $inject = ['storageService', 'filtersService', 'sortsService']

  private _fullList: IGame[] = []
  private _currentCategory: ICategory
  private _observerCallbacks = []
  private _itemOnPage: number = 25
  private _currentPage: number = 1
  private _startIndex: number = 0
  private _currentSort: ISortItem
  private _favIdList: number[]
  private _currentMerchant: IMerchant
  private _searchString: string = ''

  constructor(private storageService, private filtersService, private sortsService) {
    storageService.registerObserverCallback(this.favItemsHandler.bind(this))
  }

  private favItemsHandler(favIdList: number[]): void {
    this._favIdList = favIdList
    this.notifyObservers()
  }

  private setFavItems(list: IGame[]): IGame[] {
    return list.map(item => {
      item.isFav = this._favIdList.includes(+item.ID)
      return item
    })
  }

  private getPageList(): IGame[] {
    const sortedList: IGame[] = this.sortsService.sorting(this._fullList, this._currentSort)
    const withFavList: IGame[] = this.setFavItems(sortedList)
    const {_startIndex, _itemOnPage, _currentPage} = this

    return this.callFiltersByAll(withFavList)
      .slice(_startIndex, _startIndex + _itemOnPage * _currentPage)
  }

  private notifyObservers(): void {
    this._observerCallbacks.forEach((callback: Function) => {
      callback(this.list, this.callFiltersByAll(this._fullList), this._fullList)
    })
  };

  private callFiltersByAll(list: IGame[]): IGame[] {
    return this.filtersService.filterByAll(
      list,
      this._currentCategory,
      this._currentMerchant,
      this._searchString)
  }

  public incCurrentPage(): void {
    this._currentPage++
    this.notifyObservers()
  }

  public registerObserverCallback(callback: Function): void {
    this._observerCallbacks.push(callback)
  };

  set searchString(string: string) {
    this._searchString = string
    this.notifyObservers()
  }

  set currentSort(sort: ISortItem) {
    this._currentSort = sort
    this.notifyObservers()
  }

  set currentCategory(category: ICategory) {
    this._currentCategory = category
    this.notifyObservers()
  }

  set itemOnPage(num: number) {
    this._itemOnPage = num
    this.notifyObservers()
  }

  set list(list: IGame[]) {
    this._fullList = list
    this.notifyObservers()
  }

  set currentMerchant(merchant: IMerchant) {
    this._currentMerchant = merchant
    this.notifyObservers()
  }

  get list(): IGame[] {
    return this.getPageList()
  }

  get isLastPage(): boolean {
    return this._itemOnPage * this._currentPage >= this.callFiltersByAll(this._fullList).length
  }
}
