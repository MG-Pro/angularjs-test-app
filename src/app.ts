import angular from 'angular'
import '@uirouter/angularjs'
import {routing} from './app.config'

import DataService from './services/data.service'
import StorageService from './services/storage.service'
import ApiService from './services/api.service'
import ConfigService from './services/config.service'
import FiltersService from './services/filters.service'
import FooterComponent from './components/footer/footer.component'
import HeaderComponent from './components/header/header.component'
import HomeComponent from './pages/home/home.component'
import GameListComponent from './components/game-list/game-list.component'
import ControlBarComponent from './components/control-bar/control-bar.component'
import GameCardComponent from './components/game-card/game-card.component'
import SearchComponent from './components/search/search.component'
import GameComponent from './pages/game/game.component'

import './assets/css/common.scss'
import SortsService from './services/sorts.service'

const app = angular
  .module('app', ['ui.router'])
  .component('gameListComponent', new GameListComponent())
  .component('homeComponent', new HomeComponent())
  .component('headerComponent', new HeaderComponent())
  .component('footerComponent', new FooterComponent())
  .component('controlBarComponent', new ControlBarComponent())
  .component('gameCardComponent', new GameCardComponent())
  .component('searchComponent', new SearchComponent())
  .component('gameComponent', new GameComponent())
  .service('apiService', ApiService)
  .service('dataService', DataService)
  .service('storageService', StorageService)
  .service('configService', ConfigService)
  .service('filtersService', FiltersService)
  .service('sortsService', SortsService)
  .config(routing)

angular.bootstrap(document, [app.name], {
  strictDi: true
})

