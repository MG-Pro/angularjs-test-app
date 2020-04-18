import angular from 'angular'
import IGame from '../types/IGame'

class DataService {
  list: IGame[]

  // set setList(list: IGame[]) {
  //   this.list = list
  // }
  //
  // get getList() {
  //   return this.list
  // }

  filterByCategory (categoryId: number): IGame[] {
    return this.list
  }


}

export default angular
  .module('dataServiceModule', [])
  .service('dataService', DataService)
