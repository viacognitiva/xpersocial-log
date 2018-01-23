(function () {
    'use strict';

    angular.module('app.nav.menu', ['ui.router'])
        .controller('menuController', menuController);

    menuController.$inject = ['$state'];

    function menuController($state) {

        console.log('menu-controller');

        var vm = this;

        vm.getClass = getClass;

        function getClass(path) {

            console.log('getClass:' + path);

            if ($state.current.name.substr(0, path.length) === path) {
                return 'active';
            } else {
                return '';
            }
        }

    }
})();
