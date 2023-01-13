

(function(){
    'use strict'

    angular.module('myApp').controller('BerandaCtrl', [  '$scope' ,'$http' , '$globalVariable' , '$sessionData',  function($scope, $http, $globalVariable, $sessionData){
    

      $http({
        method: 'GET',
        url: $globalVariable.base_url + '/role/me',
        headers: {
          'x-user-key': $sessionData.get('auth').user_key
        },
      }).then((res)=>{


        if(res.data.status == 200){
          console.log(res.data.data);
        }

      }).catch(function (e) {
        console.log(e);
      })

      
    }])

    
})()