import IGame from '../types/IGame'

export default class StorageService {
  private key = 'fav_games_list'
  private _observerCallbacks: Function[] = []

  public addRemoveFav(item: IGame): void {
    const itemId = +item.ID
    const list: number[] = this.getItem()
    const isExist: boolean = list.includes(itemId)
    if(isExist) {
      const filteredList = list.filter(id => id !== itemId)
      this.setItem(filteredList)
      this.notifyObservers(filteredList)
    } else {
      list.push(itemId)
      this.setItem(list)
      this.notifyObservers(list)
    }
  }
  public registerObserverCallback(callback: Function): void {
    this._observerCallbacks.push(callback)
    this.notifyObservers(this.getItem())
  };

  private notifyObservers(favList: number[]): void {
    this._observerCallbacks.forEach((callback: Function) => {
      callback(favList)
    })
  };

  private getItem(): number[] {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || []
    } catch (e) {
      console.error(e)
    }
  }

  private setItem(value: number[]): void {
    try {
      return localStorage.setItem(this.key, JSON.stringify(value))
    } catch (e) {
      console.error(e)
    }
  }
}


