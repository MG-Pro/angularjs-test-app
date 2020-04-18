import angular from 'angular'
import '@uirouter/angularjs'
import {routing} from './app.config'
import header from './components/header/header.component'
import footer from './components/footer/footer.component'
import home from './pages/home/home.component'
import apiService from './services/apiService'
import gameCard from './components/game-card/game-card.component'
import gameList from './components/game-list/game-list.component'



import './assets/css/common.scss'

const app = angular
  .module('app', [
    'ui.router',
    header.name,
    footer.name,
    home.name,
    apiService.name,
    gameCard.name,
    gameList.name
  ])
  .config(routing)


angular.bootstrap(document, [app.name], {
  strictDi: true
})
