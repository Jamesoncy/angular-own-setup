angular.module('app.routes', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
        $routeProvider
         .when('/', {
          templateUrl: 'login/login.html',
          controller: 'Guest.LoginController'
        })
        .when('/dashboard', {
          templateUrl: 'dashboard/dashboard.html',
          controller: 'Admin.DashboardController'
        })
        $locationProvider.hashPrefix('!')
        $routeProvider.otherwise({redirectTo: '/'})
}])
