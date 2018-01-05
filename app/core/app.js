(function () {
    'use strict';

    angular.module('app', [
        'ui.router',
        'app.index',
        'app.chat',
        'app.filtersC',
        'app.filtersT',
        'app.nav.menu',
        'app.modal',
        'app.directives.loading'
    ]);
})();
