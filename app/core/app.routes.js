(function () {
    'use strict';
    angular.module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        console.log('config - start');

        $urlRouterProvider.when('/chat', '/chat/list');
        $urlRouterProvider.when('/user', '/user/list');
        $urlRouterProvider.when('/outros', '/outros/list');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'core/login/login.html',
                controller: 'loginController',
                controllerAs: 'LC',
                restrictions: {
                    ensureAuthenticated: false,
                    loginRedirect: false
                }
            })
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
                    breadcrumb: 'Conversas'
                },
                views: {
                    'content@': {
                        templateUrl: 'core/chat/chat.html',
                        controller: 'chatController',
                        controllerAs: 'CC',
                        restrictions: {
                            ensureAuthenticated: true,
                            loginRedirect: false
                        }
                    }
                }
            })
            .state('root.user', {
                abstract: true,
                url: 'user',
                data: {
                    title: 'Usuários',
                    breadcrumb: 'Usuários'
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
                        controllerAs: 'UC',
                        restrictions: {
                            ensureAuthenticated: true,
                            loginRedirect: false
                        }
                    }
                }
            })
            .state('root.outros', {
                abstract: true,
                url: 'outros',
                data: {
                    title: 'Outros',
                    breadcrumb: 'Outros'
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
                        controllerAs: 'OC',
                        restrictions: {
                            ensureAuthenticated: true,
                            loginRedirect: false
                        }
                    }
                }
            })

        };

        angular.module('app').run(run);
        run.$inject = ['$rootScope'];

        function run($rootScope){

            console.log('run - start');

            $rootScope.$on('$stateChangeStart', (event, next, current) => {

                console.log('$rootScope.$on = $stateChangeStart');

                if (next.restrictions.ensureAuthenticated) {

                    console.log('ensureAuthenticated');
                    if (!localStorage.getItem('token')) {
                        $location.path('/login');
                    }
                }
                if (next.restrictions.loginRedirect) {
                    if (localStorage.getItem('token')) {
                        $location.path('/chat');
                    }
                }
            });

        };

})();