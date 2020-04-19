import IGame from '../types/IGame'
import ICategory from '../types/ICategory'
import ISortItem from '../types/ISortItem'

export default class DataService {
  static $inject = ['storageService']

  private _fullList: IGame[] = []
  private _currentCategory: ICategory
  private _observerCallbacks = []
  private _itemOnPage: number = 25
  private _currentPage: number = 1
  private _startIndex: number = 0
  private _currentSort: ISortItem
  private _favIdList: number[]

  constructor(private storageService) {
    storageService.registerObserverCallback(this.favItemsHandler.bind(this))
  }

  private favItemsHandler(favIdList: number[]): void {
    this._favIdList = favIdList
    this.notifyObservers()
  }

  private setFavItems(list: IGame[]): IGame[] {
     return  list.map(item => {
      item.isFav = this._favIdList.includes(+item.ID);
      return item
    })
  }

  private getPageList(): IGame[] {
    const sortedList: IGame[] = this.sorting(this._fullList)
    const withFavList: IGame[] = this.setFavItems(sortedList)
    const {_startIndex, _itemOnPage, _currentPage} = this

    return this.filterByCategory(withFavList)
      .slice(_startIndex, _startIndex + _itemOnPage * _currentPage)
  }

  private filterByCategory(list: IGame[]): IGame[] {
    return !this._currentCategory || !this._currentCategory.ID
      ? list
      : list.filter((item: IGame) => {
        return item.CategoryID.includes(this._currentCategory.ID)
      })
  }

  private notifyObservers(): void {
    this._observerCallbacks.forEach((callback: Function) => {
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

    return list.sort(sortCallBack)
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
