
(function(){
    'use strict'

    angular.module('myApp').controller('SettingCtrl', [  '$scope' ,'$http' , '$globalVariable' , '$sessionData',  function($scope, $http, $globalVariable, $sessionData){
    

        
        $scope.actionGetKompartemen = () => {
            $http({
              method: 'GET',
              url: $globalVariable.base_url + '/api/get-unitkerja',
              headers: {
                'x-user-key': $sessionData.get("auth").user_key
              },
              params: {
                level: 'kompartemen',
              }
            }).then((res) => {
              if (res.data.status == 200) {
                $scope.kompartemens = res.data.data

              } else {
                Swal.fire(
                  'Warning',
                  res.data.message,
                  'warning'
                )
              }
            })
          }
          $scope.actionGetKompartemen();

          let setting = {};
           setting = {
              title: 'Competency Issues',
              url_add_update: '/tna/competency-issues/add',
              url_delete: '/tna/competency-issues/delete',
              url_list: '/tna/competency-issues/get',
          };

         $scope.setting = setting;
        $scope.listData = function (resetPage = false, search, id_kompartemen) {

            // if(resetPage){
            //     $scope.page = 1;
            //     $scope.limit = 10;
            // }

            // if($scope.page === 1){
            //     $('#btn-prev').prop("disabled", true);
            // }else{
            //   $('#btn-prev').prop("disabled", false);
            // }

            let payload = {};
             payload = {
                page: $scope.page,
                limit: $scope.limit,
                search: search,
                id_dept: id_kompartemen
            };

         
            
            $http({
                method: 'GET',
                url: $globalVariable.base_url + setting.url_list,
                headers: {
                    'x-user-key': $sessionData.get('auth').user_key
                },
                params: payload,
            }).then((res)=> {

              $scope.lists = res.data.data
              
              $('#btn-next').prop("disabled", false);


          
            }).catch(function (err) {
                console.log(err);
                $('#btn-next').prop("disabled", true);
            })
        }

        $scope.search = "";

        $scope.page = 1;
        $scope.limit = 10;

        $scope.listData();

        $scope.nextPage = ()=> {
            $scope.page++;
            $scope.listData();
        }

        $scope.prevPage = ()=> {
            $scope.page--;
            $scope.listData();
        }
        $scope.actionGetKompartemenModal = () => {
            $http({
              method: 'GET',
              url: $globalVariable.base_url + '/api/get-unitkerja',
              headers: {
                'x-user-key': $sessionData.get("auth").user_key
              },
              params: {
                level: 'kompartemen',
              }
            }).then((res) => {
              if (res.data.status == 200) {
                $scope.kompartemens_modal = res.data.data


              } else {
                Swal.fire(
                  'Warning',
                  res.data.message,
                  'warning'
                )
              }
            })
          }
          $scope.actionGetKompartemenModal();

        $scope.actionModalAdd = () => {
            $('#addModal').modal('show');
          }
       

          $scope.addCompetency = function (nama, id_kompartemen) {
              if((nama == "" && id_kompartemen == "") || nama == null && id_kompartemen == null){
                  Swal.fire(
                      'Warning',
                      "Tidak boleh kosong!",
                      'warning'
                      );
                      return;
                    }
                    
                    
                    let params = {};
            params = {
                name_competency_issues: nama,
                komp_id: id_kompartemen
            };

            $http({
                method: 'POST',
                url: $globalVariable.base_url + setting.url_add_update,
                headers: {
                  'x-user-key': $sessionData.get("auth").user_key
                },
                data: params,
              }).then((res) => {
                if(res.data.status == 200){

                    console.log(res.data);
                  Swal.fire(
                    'Success',
                    res.data.message,
                    'success'
                  ).then(() => {
                    $('#addModal').modal('hide');
                    setTimeout(() => {
                      $scope.listData();
                    }, 1000)
                  })
                }else{
                  Swal.fire(
                    'Warning',
                    res.data.message,
                    'warning'
                  )
                }
              })

          }


          $scope.confirmDelete = function (list) {
            let status = list.status == 1 ? 2 : 1 // 1 available, 2 deleted
            let params = {};

            params = {
                id_competency_issues: list.id_competency_issues,
                status: status,
            }

            Swal.fire({
                title: 'Do you want to delete this item ?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'YES',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {

                    $http({
                        method: 'POST',
                        url: $globalVariable.base_url + setting.url_delete,
                        headers: {
                          'x-user-key': $sessionData.get("auth").user_key
                        },
                        data: params,
                      }).then((res) => {
                        if(res.data.status == 200){
                         
                            Swal.fire('Saved!', res.data.message, 'success')
                            $scope.listData();
                        }else{
                          Swal.fire(
                            'Warning',
                            res.data.message,
                            'warning'
                          )
                        }
                      })


                } else if (result.isDenied) {
                //   Swal.fire('Changes are not saved', '', 'info')
                }
              })
            
            
          }

          $scope.actionModalUpdate = (list) => {
            $('#updateModal').modal('show');
            
            $scope.updateId = list.id_competency_issues
            $scope.updateNama = list.name_competency_issues
            $scope.updateKomp = list.komp_id
        }

          $scope.editCompetency= function (id, id_komp, nama) {

            let params = {
              id_competency_issues: id,
              name_competency_issues: nama,
              komp_id: id_komp
            };

            console.log(params);

            $http({
              method: 'POST',
              url: $globalVariable.base_url + setting.url_add_update,
              headers: {
                'x-user-key': $sessionData.get("auth").user_key
              },
              data: params,
            }).then((res) => {
              if (res.data.status == 200){
                Swal.fire(
                  'Success',
                  res.data.message,
                  'success'
                ).then(() => {
                  $('#updateModal').modal('hide');
                  setTimeout(() => {
                    $scope.listData();
                  }, 1000)
                })
              }else{
                Swal.fire(
                  'Warning',
                  res.data.message,
                  'warning'
                )
              }
            })
            
            
          }


          $scope.title = "Setting";
          


    }])
})();
    