(function () {
    'use strict';

    angular.module('app.login',[]).controller('loginController', loginController);

    loginController.$inject = ['$scope','$http','$log','$location','$localStorage'];

    function loginController($scope, $http, $log, $location, $localStorage) {

        var vm = this;
        vm.logar = logar;

        function logar(){

            var config = {headers : {'Content-Type': 'application/json; charset=utf-8'}}
            var data = {
                username: $scope.user,
                password: $scope.password
            };

            $http.post('/login',JSON.stringify(data),config).then(
                function(response){
                    if(response.status==200){
                        if(response.data.user.name!=''){
                            console.log('loginController - token:' + JSON.stringify(response.data));
                            localStorage.setitem('token', response.data);
                            $location.path('/chat');
                        }
                    }
                },
                function(erro){
                    //console.log('Erro '+ JSON.stringify(erro));
                    $scope.errorMessage = "Erro: " + erro.data.message;
                }
            );

        }

    }
})();
