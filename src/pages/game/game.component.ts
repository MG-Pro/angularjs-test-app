import IGame from '../../types/IGame'

export default class GameComponent {
  template = require('./game.view.html')

  controller = class {
    static $inject = ['$scope', '$state', 'apiService']

    private game: IGame

    constructor(private $scope, private $state, private apiService) {}

    $onInit() {
      console.log(this.$state.params.id)
      this.apiService.getItem(this.$state.params.id).then(res => {
        this.$scope.$apply(() => {
          this.game = res
        })
      })
    }

  }
}
