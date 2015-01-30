'use strict';

var app;

// Declare app level module which depends on filters, and services
app = angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
]);

app.config(['$routeProvider', function($routeProvider) {

    // On crée le routage entre une url, un morceau de template et le controller qui le gère
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});

}]);

app.factory('Bookmark', function ($resource) {
    return $resource('/bookmark/:id', {
        id: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    }); // Note the full endpoint address
});

app.factory('Tag', function ($resource) {
    return $resource('/tag/:id', {
        id: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    }); // Note the full endpoint address
});
