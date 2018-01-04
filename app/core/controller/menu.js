(function () {
    'use strict';

    angular.module('app.nav.menu', [])
        .controller('menuController', menuController);

    menuController.$inject = [];

    function menuController() {

        console.log('menu-controller');

    }
})();
