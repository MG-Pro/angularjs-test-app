import IGame from '../types/IGame'
import ISortItem from '../types/ISortItem'

export default class SortsService {
  static $inject = ['configService']

  constructor(private configService) {
  }

  private filterByFav(list: IGame[], isFav: boolean = true): IGame[] {
    return list.filter((item: IGame) => {
      return isFav ? item.isFav : !item.isFav
    })
  }

  private filterByPriority(list: IGame[], isPriority = true): IGame[] {
    return list.filter((item: IGame) => {
      const isInclude = this.configService.priorityGamesId.includes(item.ID)
      return isPriority ? isInclude : !isInclude
    })
  }

  private sortingByPriority(list: IGame[]): IGame[] {
    const priorityList = this.filterByPriority(list)
    const restList = this.filterByPriority(list, false)
    return [...priorityList, ...restList]
  }

  private sortingByFav(list: IGame[]): IGame[] {
    const favList: IGame[] = this.filterByFav(list)
    const restList: IGame[] = this.filterByFav(list, false)
    return [...favList, ...restList]
  }

  public sorting(list: IGame[], sortType: ISortItem): IGame[] {
    if (!sortType) {
      return this.sortingByFav(list)
    }
    const sortCallBack = sortType.key === 'A-Z'
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

    return this.sortingByPriority(this.sortingByFav(list.sort(sortCallBack)))
  }
}
