import angular from 'angular'
import uiRouter from '@uirouter/angularjs'
import oclazyload from 'oclazyload'
import routing from './app.config'
import './assets/css/common.scss'
import nav from './components/navigation/navigation.component'

const app = angular.module('app', [
  uiRouter,
  oclazyload,
  nav.name
])
  .config(routing)


angular.bootstrap(document, [app.name], {
  strictDi: true,
})
