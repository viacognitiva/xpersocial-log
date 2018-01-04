(function () {
    'use strict';

    angular.module('app.index',[]).controller('IndexController', IndexController);

    IndexController.$inject = ['$scope','$log'];

    function IndexController($scope, $log) {

        console.log('index-controller')

    }
})();
