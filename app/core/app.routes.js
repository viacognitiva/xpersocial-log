(function () {
    'use strict';
    angular.module('app').config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when('/', '/chat/list');
        $urlRouterProvider.when('/chat', '/chat/list');
        $urlRouterProvider.when('/chat/', '/chat/list');
        $urlRouterProvider.when('/user', '/user/list');
        $urlRouterProvider.when('/user/', '/user/list');

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
                        controller: 'menuController',
                        controllerAs: 'MC'
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
            .state('root.chat', {
                abstract: true,
                url: 'chat',
                data: {
                    title: 'Conversas',
                    breadcrumb: 'Conversas'
                }
            })
            .state('root.chat.list', {
                url: '/list',
                data: {
                    title: 'Conversas',
                    breadcrumb: 'List'
                },
                views: {
                    'content@': {
                        templateUrl: 'core/chat/chat.html',
                        controller: 'chatController',
                        controllerAs: 'CC'
                    }
                }
            })
            .state('root.user', {
                abstract: true,
                url: 'user',
                data: {
                    title: 'Usuários',
                    breadcrumb: 'List'
                }
            })
            .state('root.user.list', {
                url: '/list',
                data: {
                    title: 'Usuários',
                    breadcrumb: 'Usuários'
                },
                views: {
                    'content@': {
                        templateUrl: 'core/user/user.html',
                        controller: 'userController',
                        controllerAs: 'UC'
                    }
                }
            })
            .state('root.outros', {
                abstract: true,
                url: 'outros',
                data: {
                    title: 'Outros',
                    breadcrumb: 'List'
                }
            })
            .state('root.outros.list', {
                url: '/list',
                data: {
                    title: 'Outros',
                    breadcrumb: 'Outros'
                },
                views: {
                    'content@': {
                        templateUrl: 'core/outros/outros.html',
                        controller: 'outrosController',
                        controllerAs: 'OC'
                    }
                }
            });

    }
})();