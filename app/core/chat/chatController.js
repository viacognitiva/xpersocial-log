(function () {
    'use strict';

    angular.module('app.chat', ['ngAnimate','ngSanitize','ui.bootstrap','app.chatService'])
        .controller('chatController', chatController);

        chatController.$inject = ['$rootScope','$scope','$log','$http','$filter','$uibModal','$window','chatService'];

        function chatController($rootScope,$scope,$log,$http,$filter,$uibModal,$window,chatService) {

            console.log('chatController');

            var vm      = this;
            vm.buscar   = buscar;
            vm.sort_by  = sort_by;
            vm.showDown = showDown;
            vm.showUp   = showUp;

            vm.modalEntidade    = modalEntidade;
            vm.toggleSelection  = toggleSelection;
            vm.modalIntencao    = modalIntencao;

            vm.opcaoTreinamento = ["Sim", "Não"];
            vm.tpTreinamento    = ["Intenção", "Entidade"];
            vm.prcConfianca     = ["10", "20","30","40","50","60","70","80","90","100"];
            vm.sinalMaiorMenor  = ["<=", ">="];
            vm.selection        = [];

            vm.mostrarbtnInt = false;
            vm.mostrarbtnEnt = false;
            vm.disableBtnTreinarIntencao = true;
            vm.disableBtnTreinarEntidade = true;

            $scope.sortType     = 'name';
            $scope.sortReverse  = true;

            buscar();

            function buscar() {

                $rootScope.loading = true;

                vm.items = chatService.getChat();
                /*
                $http.get('/api/logconversation/treinamento').then(function(response) {

                    var retorno = [];
                    var data = response.data;
                    var pos = 0;

                    angular.forEach(data.docs, function(item){

                        var jsonParam = {};
                        angular.forEach(item.response.entities, function(ent){
                            jsonParam.entidade = ent.entity;
                            jsonParam.confidenceEntidade =parseFloat((ent.confidence*100).toFixed(2)) ;
                        });

                        angular.forEach(item.response.intents, function(int){
                          jsonParam.intencao = int.intent;
                          jsonParam.confidenceIntencao = parseFloat((int.confidence*100).toFixed(2)) ;
                        });

                        angular.forEach(item.response.input, function(text){
                            if(text.length!=0)jsonParam.msgUser = text;
                        });

                        if(item.response.context.conversation_id.length!=0){
                            jsonParam.conversation_id = item.response.context.conversation_id;
                            jsonParam.data = $filter('date')(item.response_timestamp, "dd/MM/yyyy HH:mm:ss");
                            jsonParam.id=item.log_id;
                            jsonParam.treinado=item.treinado;
                        }

                        if(!angular.equals(jsonParam, {})){
                            retorno.push(jsonParam);
                        }
                    });

                    if(retorno.length!=0){
                        retorno.push({selected: {}});
                    }

                    vm.items = retorno;
                    vm.filteredItems = retorno;

                    if(retorno.length==0 ){
                        $rootScope.errorMessage='Registro não encontrado.';
                    } else {
                        $rootScope.errorMessage='';
                    }
                });
                */
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