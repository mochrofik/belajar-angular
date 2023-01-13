

(function(){
    'use strict'

    angular.module('myApp').controller('DefaultCtrl', [  '$scope' ,'$http' , '$globalVariable' , '$sessionData',  function($scope, $http, $globalVariable, $sessionData){
    



        $http({
            method:'GET',
            url: $globalVariable.base_url + '/tna/detail-employee',
            headers: {
                'x-user-key': $sessionData.get('auth').user_key,
            }
        }).then((res)=>{

            console.log(res);

            if(res.status == 200){

                $scope.nik = res.data.data.emp_no;
                $scope.nama_karyawan = res.data.data.nickname + " " + res.data.data.nama;

            }
        }).catch(function (e) {
            
        })
        




    }])

})()

