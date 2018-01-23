(function () {
    'use strict';

    angular.module('app.user', ['ngAnimate','ngSanitize','ui.bootstrap','app.userService'])
        .controller('userController', userController);

        userController.$inject = ['$rootScope','$scope','$log','$http','$uibModal','$window','userService'];

        function userController($rootScope,$scope,$log,$http,$uibModal,$window,userService) {

            console.log('userController');

            var vm = this;

            buscar();

            function getJson() {
                return userService.getUser().then(function(data) {
                    vm.items = data;
                });
            }

            function buscar() {

                $rootScope.loading = true;

                getJson();

                $rootScope.loading = false;
            };

            function toggleSelection (id) {

                var idx = vm.selection.indexOf(id);

                if (idx > -1) {
                    vm.selection.splice(idx, 1);
                } else {
                    vm.selection.push(id);
                }

                if(vm.selection.length>0){
                    vm.disableBtnTreinarIntencao = false;
                    vm.disableBtnTreinarEntidade = false;
                } else {
                    vm.disableBtnTreinarIntencao = true;
                    vm.disableBtnTreinarEntidade = true;
                }
            };

            function sort_by(newSortingOrder) {
                $scope.sortReverse = ($scope.sortType === newSortingOrder) ? !$scope.sortReverse : false;
                $scope.sortType = newSortingOrder;
            };

            function showDown(newSortingOrder) {
                return $scope.sortType == newSortingOrder && !$scope.sortReverse
            };

            function showUp(newSortingOrder) {
                return $scope.sortType == newSortingOrder && $scope.sortReverse
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