import IGame from '../types/IGame'
import ICategory from '../types/ICategory'
import IMerchant from '../types/IMerchant'

export default class FiltersService {
  private filterBySearch(list: IGame[], searchString: string): IGame[] {
    if (!searchString) {
      return list
    }
    return list.filter((item: IGame) => {
      const lowerString = item.Name.en.toLowerCase()
      return lowerString.includes(searchString.toLowerCase())
    })
  }

  private filterByCategory(list: IGame[], category: ICategory): IGame[] {
    if (category.ID === 'fav') {
      return this.filterByFav(list)
    }
    return list.filter((item: IGame) => {
      return item.CategoryID.includes(category.ID)
    })
  }

  private filterByMerchant(list: IGame[], merchant: IMerchant): IGame[] {
    return list.filter((item: IGame) => {
      return item.MerchantID === merchant.ID
    })
  }

  private filterByFav(list: IGame[], isFav: boolean = true): IGame[] {
    return list.filter((item: IGame) => {
      return isFav ? item.isFav : !item.isFav
    })
  }

  public filterByAll(list: IGame[], category: ICategory, merchant: IMerchant, searchString: string): IGame[] {
    const searchedList: IGame[] = this.filterBySearch(list, searchString)

    const catIdExist: boolean = !!(category && category.ID)
    const merchIdExist: boolean = !!(merchant && merchant.ID)

    if (!catIdExist && !merchIdExist) {
      return searchedList
    } else if (catIdExist && !merchIdExist) {
      return this.filterByCategory(searchedList, category)
    } else if (catIdExist && merchIdExist) {
      return this.filterByCategory(this.filterByMerchant(searchedList, merchant), category)
    } else if (!catIdExist && merchIdExist) {
      return this.filterByMerchant(searchedList, merchant)
    }
  }
}
