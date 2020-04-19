import angular from 'angular'
import IGame from '../types/IGame'
import ICategory from '../types/ICategory'

class DataService {
  private _fullList: IGame[] = []
  private _currentCategory: ICategory
  private _observerCallbacks = []
  private _itemOnPage: number = 25
  private _currentPage: number = 1
  private _startIndex: number = 0

  private getPageList(): IGame[] {
    const {_startIndex, _itemOnPage, _currentPage} = this
    return this.filterByCategory()
      .slice(_startIndex, _startIndex + _itemOnPage * _currentPage)
  }

  private filterByCategory(): IGame[] {
    if (!this._currentCategory.ID) {
      return this._fullList
    }
    return this._fullList.filter((item: IGame) => {
      return item.CategoryID.includes(this._currentCategory.ID)
    })
  }

  private notifyObservers(): void {
    angular.forEach(this._observerCallbacks, (callback) => {
      callback(this.list, this.filterByCategory(), this._fullList)
    })
  };

  private addItems(): void {
    this._startIndex = this._itemOnPage * this._currentPage - this._itemOnPage
  }

  public incCurrentPage(): void {
    this._currentPage++
    this.notifyObservers()
  }

  public registerObserverCallback(callback: Function): void {
    this._observerCallbacks.push(callback)
  };

  set currentCategory(category: ICategory) {
    this._currentCategory = category
    this.notifyObservers()
  }

  set list(list: IGame[]) {
    this._fullList = list
    this.notifyObservers()
  }

  get list(): IGame[] {
    return this.getPageList()
  }

  get isLastPage():boolean {
    return this._itemOnPage * this._currentPage >= this.filterByCategory().length
  }











}

export default angular
  .module('dataService', [])
  .service('dataService', DataService)
