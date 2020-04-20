import angular from 'angular'
import '@uirouter/angularjs'
import {routing} from './app.config'

import DataService from './services/dataService'
import StorageService from './services/storageService'
import ApiService from './services/apiService'
import FooterComponent from './components/footer/footer.component'
import HeaderComponent from './components/header/header.component'
import HomeComponent from './pages/home/home.component'
import GameListComponent from './components/game-list/game-list.component'
import ControlBarComponent from './components/control-bar/control-bar.component'
import GameCardComponent from './components/game-card/game-card.component'
import SearchComponent from './components/search/search.component'

import './assets/css/common.scss'

const app = angular
  .module('app', ['ui.router'])
  .component('gameListComponent', new GameListComponent())
  .component('homeComponent', new HomeComponent())
  .component('headerComponent', new HeaderComponent())
  .component('footerComponent', new FooterComponent())
  .component('controlBarComponent', new ControlBarComponent())
  .component('gameCardComponent', new GameCardComponent())
  .component('searchComponent', new SearchComponent())
  .service('apiService', ApiService)
  .service('dataService', DataService)
  .service('storageService', StorageService)
  .config(routing)

angular.bootstrap(document, [app.name], {
  strictDi: true
})

