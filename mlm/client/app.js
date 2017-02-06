var app = angular.module('app', ['ui.router','ngFileUpload']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    // HOME STATES AND NESTED VIEWS
        .state('customer', {
            url: '/customer',
            templateUrl: './pages/customer.html'
        })

        .state('report', {
            url: '/report',
            templateUrl: './pages/report.html'
        })

        .state('custentry', {
            url: '/custentry',
            templateUrl: './pages/custentryform.html'
        })

        .state('custrecords', {
            url: '/custrecords',
            templateUrl: './pages/customer.html'
        })

});