(function () {
    'use strict';

    angular.module('app.directives.loading', ['app'])
            .directive('loading', loading);

    function loading() {
        return restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="/images/ajax-loader.gif" width="20" height="20" /> Aguarde ...</div>',

        loading : function (scope, element, attr) {

            console.log('app.directives.loading');

            scope.$watch('loading', function (val) {
                if (val)
                   $(element).show();
                else
                   $(element).hide();
                }
            );
        }
    }
})();