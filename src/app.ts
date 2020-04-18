import angular from 'angular'
import '@uirouter/angularjs'
import {routing} from './app.config'

import apiService from './services/apiService'
import dataService from './services/dataService'

import header from './components/header/header.component'
import footer from './components/footer/footer.component'
import home from './pages/home/home.component'
import gameCard from './components/game-card/game-card.component'
import gameList from './components/game-list/game-list.component'
import controlBar from './components/control-bar/control-bar.component'


import './assets/css/common.scss'

console.log(dataService)
const app = angular
  .module('app', [
    'ui.router',
    apiService.name,
    dataService.name,
    header.name,
    footer.name,
    home.name,
    gameCard.name,
    gameList.name,
    controlBar.name,
  ])
  .config(routing)


angular.bootstrap(document, [app.name], {
  strictDi: true
})
