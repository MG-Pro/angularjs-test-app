import IGame from '../types/IGame'
import ICategory from '../types/ICategory'
import ISortItem from '../types/ISortItem'
import IMerchant from '../types/IMerchant'

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
  private _currentMerchant: IMerchant

  constructor(private storageService) {
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
    const sortedList: IGame[] = this.sorting(this._fullList)
    const withFavList: IGame[] = this.setFavItems(sortedList)
    const {_startIndex, _itemOnPage, _currentPage} = this

    return this.filterByCatAndMerch(withFavList)
      .slice(_startIndex, _startIndex + _itemOnPage * _currentPage)
  }

  private filterByCategory(list: IGame[]): IGame[] {
    if (this._currentCategory.ID === 'fav') {
      return list.filter((item: IGame) => {
        return item.isFav
      })
    } else {
      return list.filter((item: IGame) => {
        return item.CategoryID.includes(this._currentCategory.ID)
      })
    }
  }

  private filterByMerchant(list: IGame[]): IGame[] {
    return list.filter((item: IGame) => {
      return item.MerchantID === this._currentMerchant.ID
    })
  }

  private filterByCatAndMerch(list: IGame[]): IGame[] {
    const {
      _currentCategory: cCat,
      _currentMerchant: cMerch
    } = this

    const catIdExist: boolean = !!(cCat && cCat.ID)
    const merchIdExist: boolean = !!(cMerch && cMerch.ID)

    if (!catIdExist && !merchIdExist) {
      return  list
    } else if (catIdExist && !merchIdExist) {
      return  this.filterByCategory(list)
    } else if(catIdExist && merchIdExist) {
      return  this.filterByCategory(this.filterByMerchant(list))
    } else if(!catIdExist && merchIdExist) {
      return  this.filterByMerchant(list)
    }
  }

  private notifyObservers(): void {
    this._observerCallbacks.forEach((callback: Function) => {
      callback(this.list, this.filterByCatAndMerch(this._fullList), this._fullList)
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

  set currentMerchant(merchant: IMerchant) {
    this._currentMerchant = merchant
    this.notifyObservers()
  }

  get list(): IGame[] {
    return this.getPageList()
  }

  get isLastPage(): boolean {
    return this._itemOnPage * this._currentPage >= this.filterByCatAndMerch(this._fullList).length
  }


}
