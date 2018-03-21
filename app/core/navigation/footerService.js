(function () {
    'use strict';

    angular.module('app.footerService', [])
        .factory('footerService', footerService);

    footerService.$inject = [];

    function footerService() {

        var total = 0;

        return {
            getTotal: getTotal,
            setTotal: setTotal
        };

        function getTotal(){
            return total;
        }

        function setTotal(valor){
            total = valor;
            console.log('footerService - setTotal:' + total);
        }

    }
})();
