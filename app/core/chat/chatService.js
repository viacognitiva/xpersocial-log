(function () {
    'use strict';

    angular.module('app.chatService', [])

            .factory('chatService', chatService);

    chatService.$inject = ['$http','$filter','$log','$q'];

    function chatService($http, $filter, $log, $q) {

        return {
            getChat: getChat
        };

        function getChat() {

            var retorno = [];

            return $http.get('/api/logconversation/treinamento')
                .then(retornaChat)
                .catch(errorChat);

            function retornaChat(response){

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

                return retorno;

            }

            function errorChat(error){
                var newMessage = 'XHR Failed for getChat.';
                $log.error(newMessage);
                return $q.reject(error);
            }

        }

    }
})();
