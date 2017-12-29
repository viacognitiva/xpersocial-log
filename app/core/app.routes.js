(function () {
    'use strict';
    angular.module('app').config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        console.log('app.router');

        $urlRouterProvider.when('', '/conversa/list');
        $urlRouterProvider.when('/', '/conversa/list');
        $urlRouterProvider.when('/conversa', '/conversa/list');
        $urlRouterProvider.when('/conversa/', '/conversa/list');
        $urlRouterProvider.when('/usuario', '/usuario/list');
        $urlRouterProvider.when('/usuario/', '/usuario/list');

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('root', {

                abstract: true,
                url: '/',
                data: {
                    title: 'Home',
                    breadcrumb: 'Home'
                },
                views: {
                    'header': {
                        templateUrl: 'core/navigation/headerView.html',
                        controller: '',
                        controllerAs: ''
                    },
                    'menu': {
                        templateUrl: 'core/navigation/menuView.html',
                        controller: '',
                        controllerAs: ''
                    },
                    'breadcrumbs': {
                        templateUrl: 'core/navigation/breadcrumbsView.html',
                        controller: '',
                        controllerAs: ''
                    },
                    'content': {
                        template: 'Choose option from menu...'
                    },
                    'footer': {
                        templateUrl: 'core/navigation/footerView.html',
                        controller: '',
                        controllerAs: ''
                    }
                }
            })
            .state('root.conversa', {
                abstract: true,
                url: 'conversa',
                data: {
                    title: 'Conversas',
                    breadcrumb: 'Conversas'
                }
            })
            .state('root.conversa.list', {
                url: '/list',
                data: {
                    title: 'To-do list',
                    breadcrumb: 'List'
                },
                views: {
                    'content@': {
                        templateUrl: 'core/navigation/conversa.html',
                        controller: 'conversaController',
                        controllerAs: 'CC'
                    }
                }
            });

    }
})();