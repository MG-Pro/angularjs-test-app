import angular from 'angular'
import '@uirouter/angularjs'
import {routing} from './app.config'
import nav from './components/navigation/navigation.component'
import about from './pages/about/about.component'
import home from './pages/home/home.component'
import apiService from './services/apiService'

import './assets/css/common.scss'

console.log(home, about)
const app = angular
  .module('app', [
    'ui.router',
    nav.name,
    about.name,
    home.name,
    apiService.name
  ])
  .config(routing)


angular.bootstrap(document, [app.name], {
  strictDi: true
})
