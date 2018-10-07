angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.Keyboard) {
        window.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      .state('tab.login', {
        url: '/login',
        views: {
          'tab-login': {
            templateUrl: 'templates/tab-login.html',
            controller: 'login_controller'
          }
        }
      })

      .state('tab.register', {
        url: '/register',
        views: {
          'tab-register': {
            templateUrl: 'templates/tab-register.html',
            controller: 'register_controller'
          }
        }
      })

      .state('home', {
        url: "/home",
        templateUrl: "templates/home_page.html",
        controller: "home_controller"
      });

    $urlRouterProvider.otherwise('/tab/login');
  });
