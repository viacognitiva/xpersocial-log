(function () {
    'use strict';

    angular.module('app.nav.footer', ['app.footerService'])
        .controller('footerController', footerController);

    footerController.$inject = ['chatService','footerService'];

    function footerController(chatService, footerService) {

        var vm = this;
        console.log('footerController - 2');
        console.log('footerController: ' + footerService.getTotal());

    }
})();
