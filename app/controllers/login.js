(function(){
  'use strict';

  angular.module('myApp')
   .controller('LoginCtrl', ['$scope', '$http', '$timeout','$state' ,'$globalVariable', '$sessionData', function($scope, $http, $timeout, $state,$globalVariable, $sessionData) {


    $scope.loginAction = function () {
 
      let input = angular.copy($scope.login);


      let url_login = '/userlogin';

      let headers = {
        'x-key': '99089ceb44393c014ff07f33eb39c833',
        'Content-Type': 'application/json'
      };

      let data_request = {
        user_name: input.nik,
        user_pass: input.password,
        user_login_from: 'Web',
        user_type_log: 'Login',
        user_gcid: 'd6VdAze4QUK00Y-TOSBt6m:APA91bHpct_rPj5-oE4ijCwS544bKb9AO00XdoFhxcLI5_Yg34-NH5kBZa8OH9ZqnAr0L6Gn2jZnzx_d1blmszgPBt8NeKhIV2canl_Y9WEGZIlRuRjq14_NIQyQWsS_IjjFBcNkP0-w',
        user_config_release_id: '1',
        user_config_release_code: '100000001',
        user_apps_version: 101
      };


      $http({
        method:'POST',
        url: $globalVariable.base_url_login + '' + url_login,
        headers: headers,
        data: data_request
      }).then(function (res) {
        
        if(res.status == 200){

          if(res.data.body.trx_login_Response){
            let data = res.data.body.trx_login_Response
            let user_key = data.data_mobile_apps.user_key;
            $sessionData.set("auth", data.data_mobile_apps)
            $sessionData.set("employee_id", input.username)
            $sessionData.set("auth_key", data.data_mobile_apps.user_key);
            $sessionData.set("nik", input.nik);
            $sessionData.set("user_role", data.data_mobile_apps.user_role);
            $sessionData.set("deviceDetector", $scope.deviceDetector);
            $sessionData.set("deviceBrowser", $scope.deviceBrowser);
            var user_role = $sessionData.get("user_role");


            console.log( "user role " + user_role);


            $state.go('app.index');
          }

        }else{
        }
      }).catch(function (err) {

        alert("Error");
        
      })
    


      
    }
   }]);
})()