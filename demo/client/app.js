var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    // HOME STATES AND NESTED VIEWS
        .state('signin', {
            url: '/signin',
            templateUrl: './pages/signin.html'
        })

    .state('signup', {
        url: '/signup',
        templateUrl: './pages/signup.html'
    })


});

app.controller('scotchController', function($scope) {

    $scope.message = 'welcome';

});