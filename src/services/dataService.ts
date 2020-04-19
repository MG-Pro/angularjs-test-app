import angular from 'angular'
import IGame from '../types/IGame'
import ICategory from '../types/ICategory'
import ISortItem from '../types/ISortItem'

class DataService {
  private _fullList: IGame[] = []
  private _currentCategory: ICategory
  private _observerCallbacks = []
  private _itemOnPage: number = 25
  private _currentPage: number = 1
  private _startIndex: number = 0
  private _currentSort: ISortItem

  private getPageList(): IGame[] {
    const sortedList: IGame[] = this.sorting(this._fullList)
    const {_startIndex, _itemOnPage, _currentPage} = this

    return this.filterByCategory(sortedList)
      .slice(_startIndex, _startIndex + _itemOnPage * _currentPage)
  }

  private filterByCategory(list: IGame[]): IGame[] {
    return !this._currentCategory.ID
      ? list
      : list.filter((item: IGame) => {
        return item.CategoryID.includes(this._currentCategory.ID)
      })
  }

  private notifyObservers(): void {
    angular.forEach(this._observerCallbacks, (callback) => {
      callback(this.list, this.filterByCategory(this._fullList), this._fullList)
    })
  };

  private sorting(list: IGame[]): IGame[] {
    if (!this._currentSort) {
      return list
    }
    const sortCallBack = this._currentSort.key === 'A-Z'
      ? (a: IGame, b: IGame) => {
        if (a.Name.en > b.Name.en) {
          return 1
        }
        if (a.Name.en < b.Name.en) {
          return -1
        }
        return 0
      }
      : (a: IGame, b: IGame) => {
        if (a.Name.en < b.Name.en) {
          return 1
        }
        if (a.Name.en > b.Name.en) {
          return -1
        }
        return 0
      }
    const a = list.sort(sortCallBack)
    console.log(a[0].Name)
    return a
  }

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

  get list(): IGame[] {
    return this.getPageList()
  }

  get isLastPage(): boolean {
    return this._itemOnPage * this._currentPage >= this.filterByCategory(this._fullList).length
  }


}

export default angular
  .module('dataService', [])
  .service('dataService', DataService)
