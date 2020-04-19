import angular from 'angular'
import ICategory from '../../types/ICategory'

class ControlBarComponent {
  template = require('./control-bar.view.html')
  bindings = {
    categoryList: '<'
  }
  controller = class {
    static $inject = ['$scope', 'dataService']

    currentCategory: ICategory
    categoryList: ICategory[]

    constructor(private $scope, private dataService) {
      $scope.$watch(() => $scope.$ctrl.currentCategory, (newValue: ICategory) => {
        this.dataService.currentCategory = newValue
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

