(function () {
    'use strict';

    angular.module('app.nav.footer', ['app.chatService'])
        .controller('footerController', footerController);

    footerController.$inject = ['chatService'];

    function footerController(chatService) {

        var vm = this;
        vm.ttl = chatService.getNChat();

    }
})();
