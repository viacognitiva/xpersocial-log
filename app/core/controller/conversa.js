(function () {
    'use strict';

    angular.module('app.conversa', ['ngAnimate','ngSanitize','ui.bootstrap'])
        .controller('conversaController', conversaController);

        conversaController.$inject = ['$scope','$log','$http','$filter','$uibModal','$window'];

        function conversaController($scope,$log,$http,$filter,$uibModal,$window) {

            console.log('conversaController');

            var vm = this;
            vm.buscar = buscar;

            buscar();

            vm.opcaoTreinamento = ["Sim", "Não"];
            vm.tpTreinamento = ["Intenção", "Entidade"];
            vm.prcConfianca = ["10", "20","30","40","50","60","70","80","90","100"];
            vm.sinalMaiorMenor = ["<=", ">="];

            function buscar() {

                console.log('conversaController - buscar');

                $scope.loading = true;

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
                        vm.errorMessage='Registro não encontrado.';
                    } else {
                        vm.errorMessage='';
                    }

                    $scope.loading = false;

                });
            };

            $scope.usuario = function(){

                $scope.loading          = true;
                $scope.mostrarUsuario   = false;
                $scope.mostrarChat      = true;
                $scope.mostrarOutros    = true;
                $scope.searchFish       = '';
                $scope.errorMessage     = '';

                $scope.showbtnOutros    = false;
                $scope.showbtnUsers     = true;
                $scope.showbtnChat      = false;

                $scope.mostrarbtnInt    = true;
                $scope.mostrarbtnEnt    = true;

                $scope.tipo             = '';
                var retorno             = [];

                $http.get('/api/logconversation/usuarios').then(

                    function(response){

                        var data = response.data;

                        angular.forEach(data.rows, function(item){

                            var jsonParam = {};

                            jsonParam.nome = item.doc.nome;
                            jsonParam.email = item.doc.email;
                            jsonParam.fone = item.doc.telefone;
                            jsonParam.data = $filter('date')(new Date(item.doc.data), "dd/MM/yyyy HH:mm:ss");

                            if(!angular.equals(jsonParam, {})){
                                retorno.push(jsonParam);
                            }

                        });

                        $scope.itemUsuario = retorno;
                        $scope.filteredUsuario = retorno;

                        if(retorno.length==0 ){
                            vm.errorMessage='Registro não encontrado.';
                        } else {
                            vm.errorMessage='';
                        }
                    },

                    function(erro){
                        console.log(erro);
                        res.status(500).json(erro);
                    }
                );

                $scope.loading = false;
            };

            $scope.outros = function(){

                $scope.loading          = true;
                $scope.mostrarUsuario   = true;
                $scope.mostrarChat      = true;
                $scope.mostrarOutros    = false;
                $scope.searchFish       = '';
                $scope.errorMessage     = '';

                $scope.showbtnOutros    = true;
                $scope.showbtnUsers     = false;
                $scope.showbtnChat      = false;

                $scope.mostrarbtnInt    = false;
                $scope.mostrarbtnEnt    = false;

                $scope.tipo             = 'outros';
                var retorno             = [];

                $http.get('/api/logconversation/outros').then(

                    function(response){

                        var data = response.data;

                        angular.forEach(data.rows, function(item){

                            var jsonParam = {};
                            jsonParam.id = item.doc._id;
                            jsonParam.idchat = item.doc.idchat;
                            jsonParam.msgUser = item.doc.texto;
                            jsonParam.data = $filter('date')(new Date(item.doc.data), "dd/MM/yyyy HH:mm:ss");

                            if(!angular.equals(jsonParam, {})){
                                retorno.push(jsonParam);
                            }

                        });

                        $scope.itemOutros = retorno;
                        $scope.filteredOutros = retorno;

                        if(retorno.length==0 ){
                            $scope.errorMessage='Registro não encontrado.';
                        } else {
                            $scope.errorMessage='';
                        }
                    },

                    function(erro){
                        console.log(erro);
                        res.status(500).json(erro);
                    }
                );

                $scope.loading = false;

            };

            $scope.logout = function() {
                $window.location.href='/';
            };

            $scope.isNumber = angular.isNumber;

            $scope.sort_by = function(newSortingOrder) {
                $scope.sortReverse = ($scope.sortType === newSortingOrder) ? !$scope.sortReverse : false;
                $scope.sortType = newSortingOrder;
            };

            $scope.showDown = function(newSortingOrder) {
                return $scope.sortType == newSortingOrder && !$scope.sortReverse
            };

            $scope.showUp = function(newSortingOrder) {
                return $scope.sortType == newSortingOrder && $scope.sortReverse
            };

            $scope.selection = [];

            // Toggle selection
            $scope.toggleSelection = function (id) {

                var idx = $scope.selection.indexOf(id);

                //Is currently selected
                if (idx > -1) {
                    $scope.selection.splice(idx, 1);
                } else {
                    $scope.selection.push(id);
                }

                if($scope.selection.length>0){
                    $scope.disableBtnTreinarIntencao = false;
                    $scope.disableBtnTreinarEntidade = false;
                } else {
                    $scope.disableBtnTreinarIntencao = true;
                    $scope.disableBtnTreinarEntidade = true;
                }
            };

            $scope.aplicar = function () {

                angular.forEach($scope.selection, function(sel){
                    console.log('checksboxx'+sel)
                });
            };

            var $ctrl = this;

            $scope.modalEntidade = function(size) {

                if($scope.tipo =='chat'){
                    $scope.parametro='entidade';
                }else{
                    $scope.parametro='textoEnt';
                }

                $uibModal.open({
                    scope: $scope,
                    animation: true,
                    controllerAs: '$ctrl',
                    // Esse vai exibir o nome do scope atual
                    templateUrl: 'myModalEntidade.html',
                    controller: 'ModalInstanceCtrl',
                    windowClass: 'custom-dialog',
                    backdrop:false,
                    size: size,
                });
            };

            $scope.modalIntencao = function(size) {

                if($scope.tipo =='chat'){
                    $scope.parametro='intencao';
                }else{
                    $scope.parametro='textoInt';
                }

                $uibModal.open({
                    scope: $scope,
                    animation: true,
                    controllerAs: '$ctrl',
                    // Esse vai exibir o nome do scope atual
                    templateUrl: 'myModalIntencao.html',
                    controller: 'ModalInstanceCtrl',
                    windowClass: 'custom-dialog',
                    backdrop:false,
                    size: size,
                });
            };

        }

})();