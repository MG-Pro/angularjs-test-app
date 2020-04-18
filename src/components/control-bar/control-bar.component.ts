import angular from 'angular'
import ICategory from '../../types/ICategory'

class ControlBarComponent {
  template = require('./control-bar.view.html')
  bindings = {
    categoryList: '<'
  }
  controller = class {
    currentCategory: ICategory
    categoryList: ICategory[]

    $onInit() {
      this.currentCategory = this.categoryList[0]
    }
  }
}

export default angular
  .module('controlBar', [])
  .component('controlBarComponent', new ControlBarComponent())

