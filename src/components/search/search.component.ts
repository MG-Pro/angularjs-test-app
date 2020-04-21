export default class SearchComponent {
  template = require('./search.view.html')

  controller = class {
    static $inject = ['$scope', 'dataService']

    private searchString: string = ''

    constructor(private $scope, private dataService) {
      $scope.$watch(() => $scope.$ctrl.searchString, this.debounce(this.searchStringHandler).bind(this))
    }

    searchStringHandler(newValue: string) {
      this.dataService.searchString = newValue
    }

    debounce(fn, interval = 500) {
      let timer
      return function debounced(...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          fn.apply(this, [...args])
        }, interval)
      }
    }
  }
}
