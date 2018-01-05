(function () {
    'use strict';

    angular.module('app.directives.loading', ['app'])
        .directive('ngLoading', ngLoading);

    ngLoading.$inject = [];

    function ngLoading() {
        var directive = {
            restrict: 'E',
            replace: true,
            template: '<div class="loading"><img src="assets/images/ajax-loader.gif" width="20" height="20" /> Aguarde ...</div>',
            link: loadFunction
        };

        return directive;

        function loadFunction(rootScope, element, attrs) {

            console.log('app.directives.loading');
            $rootScope.$watch('loading', function (val) {
                if (val)
                   $(element).show();
                else
                   $(element).hide();
                }
            );
        }
    }
})();