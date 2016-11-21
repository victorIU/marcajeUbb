var db;
angular.module('starter', ['ionic', 'starter.controllers','ngCordova', 'ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.resumen', {
    url: '/resumen',
    views: {
      'menuContent': {
        templateUrl: 'templates/resumen.html'
      }
    }
  })
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })
  .state('app.busqueda', {
      url: '/busqueda',
      views: {
        'menuContent': {
          templateUrl: 'templates/busqueda.html'
        }
      }
    })
    .state('app.marcajes', {
      url: '/marcajes',
      views: {
        'menuContent': {
          templateUrl: 'templates/marcajes.html',
          controller: 'marcajesCtrl'
        }
      }
    })

  .state('app.marcaje', {
    url: '/marcajes/:marcajeId',
    views: {
      'menuContent': {
        templateUrl: 'templates/marcaje.html',
        controller: 'marcajeCtrl'
      }
    }
  })
  .state('app.inicio',{
      url: '/inicio',
      views: {
          'menuContent':{
              templateUrl: 'templates/inicio.html',
              controller: 'inicioCtrl'
          }
      }
  });
  $urlRouterProvider.otherwise('/app/inicio');
});
