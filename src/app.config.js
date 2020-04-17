const home = {
  name: 'home',
  url: '/',
  component: 'homeComponent',
  lazyLoad: lazyLoad('home/home.module'),
}

const about = {
  name: 'about',
  url: '/about',
  component: 'aboutComponent',
  lazyLoad: lazyLoad('about/about.module')
}

function lazyLoad (path) {
  return ($transition$) => {
    const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad')
    return import('./pages/' + path)
      .then(mod => {$ocLazyLoad.load(mod.default)})
      .catch(err => {
        throw new Error('Ooops, something went wrong, ' + err)
      })
  }
}

routing.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider']

export default function routing ($urlRouterProvider, $locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true)
  $stateProvider
    .state(home)
    .state(about)
  $urlRouterProvider.otherwise('/')
}

