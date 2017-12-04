var myApp = angular.module('myApp', ['ngRoute','ngMaterial', 'ngMessages','ngAnimate']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider,$mdThemingProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/profile', {
      templateUrl: '/views/templates/profile.html',
      controller: 'ProfileController as pc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/reviews', {
      templateUrl: '/views/templates/reviews.html',
      controller: 'ReviewsController as rc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/select', {
      templateUrl: '/views/templates/select.html',
      controller: 'SelectController as sc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/rate', {
      templateUrl: '/views/templates/rate.html',
      controller: 'RatingController as rc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/entry', {
      templateUrl: '/views/templates/entry.html',
      controller: 'EntryController as ec',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/about', {
      templateUrl: '/views/templates/about.html',
      controller: 'AboutController as ac',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });

    // $mdThemingProvider.theme('default')
    // .primaryPalette('amber')
    // .backgroundPalette('brown')
    // .accentPalette('orange');
});
