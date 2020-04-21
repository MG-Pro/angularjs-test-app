const home = {
  name: 'home',
  url: '/',
  component: 'homeComponent',
}

const about = {
  name: 'about',
  url: '/about',
  component: 'aboutComponent',
}

const game = {
  name: 'game',
  url: '/:id',
  component: 'gameComponent',
  params: {
    id: {
      dynamic: true
    }

  }
}

routing.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider']

export function routing ($urlRouterProvider, $locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true)
  $stateProvider
    .state(home)
    .state(about)
    .state(game)
  $urlRouterProvider.otherwise('/')
}

