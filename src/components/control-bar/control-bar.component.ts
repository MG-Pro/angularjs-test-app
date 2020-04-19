import angular from 'angular'
import ICategory from '../../types/ICategory'
import ISortItem from '../../types/ISortItem'

class ControlBarComponent {
  template = require('./control-bar.view.html')
  bindings = {
    categoryList: '<'
  }
  controller = class {
    static $inject = ['$scope', 'dataService']

    currentCategory: ICategory
    categoryList: ICategory[]
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

    constructor(private $scope, private dataService) {
      $scope.$watch(() => $scope.$ctrl.currentCategory, (newValue: ICategory) => {
        this.dataService.currentCategory = newValue
      })

      $scope.$watch(() => $scope.$ctrl.currentGameOnPage, (newValue: number) => {
        this.dataService.itemOnPage = newValue
      })

      $scope.$watch(() => $scope.$ctrl.currentSort, (newValue: ISortItem) => {
        this.dataService.currentSort = newValue
      })
    }

    $onInit() {
      this.categoryList.unshift({
        ID: '',
        Name: {
          en: 'All'
        }
      })
      this.currentCategory = this.categoryList[0]
    }
  }
}

export default angular
  .module('controlBar', [])
  .component('controlBarComponent', new ControlBarComponent())

