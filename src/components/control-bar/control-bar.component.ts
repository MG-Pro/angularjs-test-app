import ICategory from '../../types/ICategory'
import ISortItem from '../../types/ISortItem'

export default class ControlBarComponent {
  template = require('./control-bar.view.html')
  bindings = {
    categoryList: '<'
  }
  controller = class {
    static $inject = ['$scope', 'dataService', 'storageService']

    currentCategory: ICategory
    categoryList: ICategory[] = []
    gameOnPage: number[] = [25, 50, 100]
    currentGameOnPage: number = this.gameOnPage[0]
    sorts: ISortItem[] = [
      {
        name: 'Name A-Z',
        key: 'A-Z'
      },
      {
        name: 'Name Z-A',
        key: 'Z-A'
      }
    ]
    currentSort: ISortItem = this.sorts[0]

    constructor(private $scope, private dataService, private storageService) {
      $scope.$watch(() => $scope.$ctrl.currentCategory, (newValue: ICategory) => {
        newValue && (this.dataService.currentCategory = newValue)
      })

      $scope.$watch(() => $scope.$ctrl.currentGameOnPage, (newValue: number) => {
        this.dataService.itemOnPage = newValue
      })

      $scope.$watch(() => $scope.$ctrl.currentSort, (newValue: ISortItem) => {
        this.dataService.currentSort = newValue
      })

    }

    favListHandler(favIdList: number[]): void {
      const favItem: ICategory = {
        ID: 'fav',
        Name: {
          en: 'Favorite games'
        }
      }
      const favIndex = this.categoryList.findIndex(item => item.ID === 'fav')

      if (!!favIdList.length) {
        if (favIndex < 0) {
          this.categoryList.splice(1, 0, favItem)
        }
      } else {
        if (favIndex >= 0) {
          this.categoryList.splice(favIndex, 1)
          this.currentCategory = this.categoryList[0]
        }
      }
    }

    $onInit() {

      this.categoryList.unshift({
        ID: '',
        Name: {
          en: 'All'
        }
      })
      this.currentCategory = this.categoryList[0]

      this.storageService.registerObserverCallback(this.favListHandler.bind(this))
    }
  }
}
