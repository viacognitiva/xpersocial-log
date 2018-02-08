(function () {
    'use strict';

    angular.module('app.login',[]).controller('loginController', loginController);

    loginController.$inject = ['$scope','$http','$log','$location'];

    function loginController($scope, $http, $log, $location) {

        var vm = this;
        vm.logar = logar;

        console.log('login Controller');

        function logar(){

            console.log('function Logar');

            var config = {headers : {'Content-Type': 'application/json; charset=utf-8'}}
            var data = {
                username: $scope.user,
                password: $scope.password
            };

            $http.post('/login',JSON.stringify(data),config).then(
                function(response){
                    if(response.status==200){
                        if(response.data.user.name!=''){
                            console.log(response);
                            $location.path('/chat');
                        }
                    }
                },
                function(erro){
                    console.log('Erro '+ JSON.stringify(erro));
                    $scope.errorMessage = "Error : " + erro.data.message;
                }
            );


        }

    }
})();
