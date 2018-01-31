(function () {
    'use strict';

    angular.module('app.user', ['ngAnimate','ngSanitize','ui.bootstrap','ngMaterial','app.userService'])
        .controller('userController', userController);

        userController.$inject = ['$rootScope','$scope','$log','$http','$uibModal','$window','$mdDialog','userService'];

        function userController($rootScope,$scope,$log,$http,$uibModal,$window,$mdDialog,userService) {

            var vm = this;
            vm.sort_byU  = sort_by;
            vm.showDownU = showDown;
            vm.showUpU = showUp;
            vm.showAlert = showAlert;

            vm.items = [];

            vm.sortTypeU     = 'nome';
            vm.sortReverseU  = true;

            buscar();

            function showAlert(ev) {

                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Abrale')
                    .textContent('Teste prompt.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(ev)
                );
            };

            function getJson() {
                return userService.getUser().then(function(data) {
                    vm.items = data;
                });
            };

            function buscar() {
                $rootScope.loading = true;
                getJson();
                $rootScope.loading = false;
            };

            function sort_by(newSortingOrder) {

                console.log('sort_by:' + newSortingOrder);
                vm.sortReverseU = (vm.sortTypeU === newSortingOrder) ? !vm.sortReverseU : false;
                vm.sortTypeU = newSortingOrder;
            };

            function showDown(newSortingOrder) {
                return vm.sortTypeU == newSortingOrder && !vm.sortReverseU
            };

            function showUp(newSortingOrder) {
                return vm.sortTypeU == newSortingOrder && vm.sortReverseU
            };

            function modalEntidade(size) {

                $uibModal.open({
                    scope: $scope,
                    animation: true,
                    controllerAs: '$ctrl',
                    templateUrl: 'core/navigation/modalEnt.html',
                    controller: 'modalController',
                    windowClass: 'custom-dialog',
                    backdrop:false,
                    size: size,
                    resolve: {
                        valPar: function(){
                            return 'entidade';
                        },
                        valSel: function () {
                           return vm.selection;
                         },
                         valItem: function(){
                            return vm.items;
                         }
                    }
                });
            };

            function modalIntencao(size) {

                $uibModal.open({
                    scope: $scope,
                    animation: true,
                    controllerAs: '$ctrl',
                    templateUrl: 'core/navigation/modalInt.html',
                    controller: 'modalController',
                    windowClass: 'custom-dialog',
                    backdrop:false,
                    size: size,
                    resolve: {
                        valPar: function(){
                            return 'intencao';
                        },
                        valSel: function () {
                           return vm.selection;
                        },
                        valItem: function(){
                            return vm.items;
                        }
                    }
                });
            };

        }

})();